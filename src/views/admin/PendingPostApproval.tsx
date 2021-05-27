import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import { Divider, LinearProgress, Link } from '@material-ui/core';
import { NewPost, PendingPost, PostStatus, PostType, UpdatePendingPost, useApprovePostMutation, usePendingPostQuery, useUpdatePendingPostMutation } from 'generated/graphql';
import { useHistory, useParams } from 'react-router-dom';
import MuiInputText from 'components/Forms/MuiInputText';
import { FormProvider, useForm } from 'react-hook-form';
import UNIVERSALS from 'Universals';
import { Result } from 'antd';
import { InsertDriveFile } from '@material-ui/icons';
import { stripGCSFileName } from 'utils/utils';
import { useModalStore } from 'store';
import clsx from 'clsx';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { useDropzone } from 'react-dropzone';
import InputQuill from 'components/Forms/InputQuill';
import DropzoneCustom from 'components/DropzoneCustom';
import RouterBreadcrumbs from 'components/Breadcrumbs/RouterBreadcrumbs';
import DOMPurify from 'dompurify'

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         width: '100%',
      },
      button: {
         marginRight: theme.spacing(1),
      },
      completed: {
         display: 'inline-block',
      },
      instructions: {
         marginTop: theme.spacing(1),
         marginBottom: theme.spacing(1),
      },
      formContent: {
         marginTop: theme.spacing(3),
         marginBottom: theme.spacing(6)
      },
      documentGrid: {
         border: 'solid 1px',
         borderRadius: '0.5rem',
         borderStyle: 'dashed'
      },
      documentLabel: {
         marginBottom: theme.spacing(3)
      },
      danger: {
         backgroundColor: red[600],
         color: theme.palette.primary.contrastText,
         marginLeft: theme.spacing(1),
         marginRight: theme.spacing(1),
         "&.MuiButton-contained:hover": {
            backgroundColor: red[500],
         }
      },
      warning: {
         backgroundColor: yellow[700],
         color: theme.palette.primary.contrastText,
         marginLeft: theme.spacing(1),
         marginRight: theme.spacing(1),
         "&.MuiButton-contained:hover": {
            backgroundColor: yellow[600],
         }
      },
      rowGrid: {
         display: 'flex',
         flexWrap: 'wrap'
      },
      divider: {
         marginTop: theme.spacing(3),
         marginBottom: theme.spacing(3),
      }
   }),
);

const endStatus = [PostStatus.Approved, PostStatus.Rejected, PostStatus.Withdraw, PostStatus.Withhold]

export default function PendingPostApproval() {

   const { oid } = useParams<any>()
   const history = useHistory()

   const classes = useStyles();
   const [activeStep, setActiveStep] = React.useState(0);
   const [steps, setSteps] = useState(['文章資料', '內容', '發布'])
   const [completed, setCompleted] = useState<{ [k: number]: boolean }>({})
   const [skipped, setSkipped] = useState(new Set<number>())

   const setMessage = useModalStore(state => state.setMessage)
   const setModalError = useModalStore(state => state.setError)

   const [documentURI, setDocumentURI] = useState("")

   const { data, loading, refetch } = usePendingPostQuery({ variables: { oid: oid }, notifyOnNetworkStatusChange: true })
   const [updatePendingPost, { loading: updateLoading }] = useUpdatePendingPostMutation()
   const [approvePost, { loading: approveLoading }] = useApprovePostMutation()

   const dropzoneMethods = useDropzone({
      accept: 'image/*'
   });

   const { acceptedFiles } = dropzoneMethods

   const methods = useForm<PendingPost & { content: any }>({
      defaultValues: {
         title: "",
         subtitle: "",
         remarks: ""
      }
   })
   const { reset, getValues, handleSubmit } = methods

   const totalSteps = useCallback(() => {
      return steps.length;
   }, [steps]);

   const completedSteps = useCallback(() => {
      return Object.keys(completed).length;
   }, [completed]);

   const isLastStep = useCallback(() => {
      return activeStep === totalSteps() - 1;
   }, [activeStep, totalSteps]);

   const allStepsCompleted = useCallback(() => {
      return completedSteps() === totalSteps();
   }, [completedSteps, totalSteps]);

   const handleNext = useCallback((e: any) => {
      e.preventDefault()
      const newActiveStep =
         isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
      setActiveStep(newActiveStep);
   }, [isLastStep, allStepsCompleted, steps, completed, activeStep]);

   const handleBack = (e: any) => {
      e.preventDefault()
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleStep = (step: number) => () => {
      if ((data?.pendingPost?.status === PostStatus.Pending && step === 2)
         || (data?.pendingPost?.status !== PostStatus.Pending && step === 1))
         return
      setActiveStep(step);
   };

   const handleComplete = useCallback((e: any) => {
      e.preventDefault()
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext(e);
   }, [activeStep, completed, handleNext]);

   const handlePost = useCallback((s: PostStatus) => {
      let tmp: UpdatePendingPost = {
         _id: data?.pendingPost?._id,
         status: s,
         remarks: getValues("remarks") as string,
         username: getValues("username") as string,
      }
      updatePendingPost({
         variables: {
            input: {
               ...tmp
            },
         }
      }).then(res => {
         let toStep = 2
         let msg = 'app.sys.save-success'
         if (res.data?.updatePendingPost.status === PostStatus.Rejected)
            msg = 'app.post.rejected'
         else if (res.data?.updatePendingPost.status === PostStatus.Approved)
            msg = 'app.post.approved'
         else if (res.data?.updatePendingPost.status === PostStatus.Withhold)
            msg = 'app.post.withheld'

         if (res.data?.updatePendingPost.status === PostStatus.Pending) {
            toStep = 0
            steps[2] = "完成"
            setSteps(steps)
            setCompleted({})
            setSkipped(new Set([0, 1]))
         }
         setActiveStep(toStep)
         setMessage(msg)
         reset();
         refetch();
      }).catch((err: any) => {
         setModalError(err)
      })
   }, [data, getValues, refetch, reset, setMessage, setModalError, updatePendingPost, steps])

   const rejectPost = (e: any) => {
      e.preventDefault()
      handlePost(PostStatus.Rejected)
   }

   const withholdPost = (e: any) => {
      e.preventDefault()
      handlePost(PostStatus.Withhold)
   }

   const resumePost = useCallback((e) => {
      e.preventDefault()
      handlePost(PostStatus.Pending)
   }, [handlePost])

   const getStepResult = useCallback(() => {
      if (!data)
         return <></>
      switch (data.pendingPost?.status) {
         case PostStatus.Approved:
            return (
               <Result
                  status="success"
                  title="已批核並發布"
                  subTitle="文章已經發布到分享欄，您可以到分享欄查看。"
                  extra={<Button variant="outlined" color="secondary" onClick={() => history.push('/sharing/' + data.pendingPost?.postID)}>到文章</Button>}
               />
            );
         case PostStatus.Rejected:
            return (
               <Result
                  status="error"
                  title="已拒絕"
                  subTitle={`已拒絕，原因: ${data.pendingPost.remarks}`}
                  extra={<Button variant="outlined" color="secondary" onClick={() => setActiveStep(0)}>查看提交的資料</Button>}
               />
            );
         case PostStatus.Withhold:
            return (
               <Result
                  status="warning"
                  title="已暫緩"
                  subTitle={`已暫緩，原因: ${data.pendingPost.remarks}`}
                  extra={<div>
                     <Button style={{ marginRight: 10 }} variant="outlined" color="primary" onClick={resumePost}>恢復處理</Button>
                     <Button variant="outlined" onClick={() => setActiveStep(0)}>查看提交的資料</Button>
                  </div>}
               />
            );
         case PostStatus.Withdraw:
            return (
               <Result
                  title="已撤回"
                  subTitle="文章提交者已自行撤回申請"
                  extra={<Button variant="outlined" color="secondary" onClick={() => setActiveStep(0)}>查看提交的資料</Button>}
               />
            );
         default:
            return "發生錯誤，請重新載入。";
      }
   }, [data, history, resumePost])

   useEffect(() => {
      if (data && reset) {
         reset({
            title: data.pendingPost?.title,
            subtitle: data.pendingPost?.subtitle,
            status: data.pendingPost?.status,
            username: data.pendingPost?.username,
            remarks: data.pendingPost?.remarks
         })
         setDocumentURI(data.pendingPost?.documentURI ?? "")

         let lastStep = "完成"

         if (data.pendingPost?.status && endStatus.includes(data.pendingPost?.status)) {

            if (data.pendingPost?.status === PostStatus.Approved) {
               lastStep = "已批核"
            } else if (data.pendingPost?.status === PostStatus.Rejected) {
               lastStep = "已拒絕"
            } else if (data.pendingPost?.status === PostStatus.Withhold) {
               lastStep = "已暫緩"
            } else if (data.pendingPost?.status === PostStatus.Withdraw) {
               lastStep = "已撤回"
            }
            let newSteps = steps
            newSteps[2] = lastStep
            setSteps(newSteps)

            if (data.pendingPost?.status !== PostStatus.Pending) {
               let newCompleted = steps.map((s, i) => ({ [i]: true })).reduce((a, b, i = 0, arr = []) => (
                  {
                     ...a,
                     ...b
                  }
               ))
               setCompleted(newCompleted)
               setSkipped(new Set([0, 1]))
               setActiveStep(2)
            }

         }
      }
   }, [data, reset, steps])

   const onSubmit = (d: any) => {
      console.log(d)
      let tmp: NewPost = {
         title: d.title,
         subtitle: d.subtitle,
         type: d.type,
         content: d.content,
         username: d.username,
         toUsername: d.username
      }
      tmp.type = PostType.Sharing

      let file = acceptedFiles[0]
      let pPostTmp: UpdatePendingPost = {
         _id: data?.pendingPost?._id,
         status: PostStatus.Approved,
         remarks: getValues("remarks") as string,
         username: d.username
      }

      approvePost({
         variables: {
            input: {
               ...tmp
            },
            image: file,
            postRefInput: pPostTmp
         }
      }).then(res => {
         setMessage('app.sys.save-success')
         reset();
         history.push('/admin/post/pending')
      })
         .catch((err: any) => {
            setModalError(err)
            reset();
         })
   }

   return (
      <>
         {(loading || updateLoading || approveLoading) && <LinearProgress style={{
            marginTop: -20,
            position: 'fixed',
            width: 'calc(100% - 300px)',
            zIndex: 1
         }} />}
         {!loading && <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
               <RouterBreadcrumbs />
               <Container>
                  <Grid container justify="center">
                     <Typography variant="h4" component="strong">批核文章</Typography>
                  </Grid>
                  <Grid container>
                     <Grid item xs={12}>
                        <Stepper nonLinear activeStep={activeStep}>
                           {steps.map((label, index) => (
                              <Step key={label}>
                                 <StepButton onClick={handleStep(index)} completed={completed[index] && !skipped.has(index)}>
                                    {label}
                                 </StepButton>
                              </Step>
                           ))}
                        </Stepper>
                     </Grid>
                     <Grid item xs={12} className={classes.formContent}>
                        <div className={classes.instructions}>
                           {activeStep === 0 && <Grid container spacing={3}>
                              <Grid item xs={12} md={8} lg={6}>
                                 <MuiInputText
                                    name="title"
                                    label="主題"
                                    placeholder="請輸入分享主題"
                                    isReadOnly={true}
                                 />
                              </Grid>
                              <Grid item xs={12}>
                                 <MuiInputText
                                    name="subtitle"
                                    label="副標題"
                                    placeholder="請輸入副標題"
                                    isReadOnly={true}
                                 />
                              </Grid>
                              <Grid item>
                                 <Typography className={classes.documentLabel}>上傳的檔案: </Typography>
                                 <Link href={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + documentURI} rel="noopener noreferrer" target="_blank" className="text-center">
                                    <div>
                                       <InsertDriveFile fontSize="large" />
                                    </div>
                                    <div>
                                       <label style={{ fontSize: 18, overflowWrap: 'anywhere' }}>{stripGCSFileName(documentURI)}</label>
                                    </div>
                                 </Link>
                              </Grid>
                              <Grid item xs={12}>
                                 <MuiInputText
                                    name="remarks"
                                    label="備註"
                                    placeholder="請輸入備註(如: 拒絕或暫緩原因)"
                                    rows={4}
                                    multiline={true}
                                    isReadOnly={data?.pendingPost?.status && endStatus.includes(data?.pendingPost?.status)}
                                 />
                              </Grid>
                           </Grid>}
                           {activeStep !== 0 && data?.pendingPost?.status && endStatus.includes(data?.pendingPost?.status) && getStepResult()}
                           {activeStep === 1 && data?.pendingPost?.status && data?.pendingPost?.status === PostStatus.Pending && <Grid container>
                              <InputQuill name="content" label="在此貼上和編輯內容" isReadOnly={false} />
                              <Grid item xs={12}>
                                 <Typography>選擇封面圖片</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                 <DropzoneCustom lg={12} {...dropzoneMethods} />
                              </Grid>
                           </Grid>}
                           {activeStep === 2 && data?.pendingPost?.status && data?.pendingPost?.status === PostStatus.Pending && <Grid container direction="column" spacing={1}>
                              <Grid item><Typography variant="h5">預覽: </Typography></Grid>
                              <Divider className={classes.divider} />
                              <Grid item>
                                 <Typography className={classes.instructions}>作者用戶名稱: </Typography>
                                 <Typography className={classes.instructions} variant="h5">{data.pendingPost.username}</Typography>
                                 <Typography className={classes.instructions}>主題: </Typography>
                                 <Typography className={classes.instructions} variant="h5">{data.pendingPost.title}</Typography>
                                 <Typography className={classes.instructions}>副標題: </Typography>
                                 <Typography className={classes.instructions} variant="h5">{data.pendingPost.subtitle}</Typography>
                                 <Grid container justify="center" item xs={12}>
                                    {acceptedFiles && acceptedFiles.length > 0 && <img alt="preview-post-cover" src={URL.createObjectURL(acceptedFiles[0])}></img>}
                                 </Grid>
                                 <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getValues("content")) }}>
                                 </div>
                              </Grid>
                              <Divider className={classes.divider} />
                              <Grid item><Typography color="secondary">*完成核對後，按「發布」完成批核程序。</Typography></Grid>
                           </Grid>}
                        </div>
                     </Grid>
                     {(!allStepsCompleted() && data?.pendingPost?.status && !endStatus.includes(data?.pendingPost?.status)) && <Grid container item xs={12} justify="space-between" direction="row">
                        <Grid item className={classes.rowGrid}>
                           <Button
                              type="button"
                              variant="contained"
                              style={{ display: endStatus.includes(data.pendingPost.status) || activeStep !== 0 ? 'none' : 'block' }}
                              onClick={withholdPost}
                              className={clsx(classes.button, classes.warning)}
                           >
                              暫緩發布
                           </Button>
                           <Button
                              type="button"
                              variant="contained"
                              style={{ display: endStatus.includes(data.pendingPost.status) || activeStep !== 0 ? 'none' : 'block' }}
                              onClick={rejectPost}
                              className={clsx(classes.button, classes.danger)}
                           >
                              拒絕發布
                           </Button>
                        </Grid>
                        <Grid item className={classes.rowGrid}>
                           <Button type="button" style={{ display: activeStep === 0 ? 'none' : 'block' }} onClick={handleBack} className={classes.button}>
                              返回
                           </Button>
                           {activeStep !== steps.length &&
                              (completed[activeStep] ? (
                                 <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                    type="button"
                                 >
                                    下一步
                                 </Button>
                              ) : (
                                 completedSteps() === totalSteps() - 1 ? (
                                    <Button variant="contained" color="primary" type="submit">
                                       發布
                                    </Button>
                                 ) : (
                                    <Button variant="contained" color="primary" type="button" onClick={handleComplete}>
                                       下一步
                                    </Button>
                                 )
                              ))}
                        </Grid>
                     </Grid>}
                  </Grid>
               </Container>
            </form>
         </FormProvider>}
      </>
   )
}
