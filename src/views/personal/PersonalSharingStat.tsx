import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import { LinearProgress } from '@material-ui/core';
import { PendingPost, PostStatus, usePendingPostQuery, useUpdatePendingPostMutation } from 'generated/graphql';
import { useHistory, useParams } from 'react-router-dom';
import MuiInputText from 'components/Forms/MuiInputText';
import { FormProvider, useForm } from 'react-hook-form';
import UNIVERSALS from 'Universals';
import red from '@material-ui/core/colors/red';
import DOMPurify from 'dompurify';
import AntdResult from 'components/ImitateAntd/AntdResult';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         width: '100%',
      },
      button: {
         marginRight: theme.spacing(1),
      },
      title: {
         marginTop: theme.spacing(3),
         marginBottom: theme.spacing(3),
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
         "&.MuiButton-contained:hover": {
            backgroundColor: red[500],
         }
      }, progress: {
         marginTop: -20,
         position: 'fixed',
         width: 'calc(100% - 300px)',
         zIndex: 1,
         [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginTop: -30,
            left: 0
         }
      },
      responsiveImgGrid: {
         height: 'auto'
      }
   }),
);

export default function PersonalSharingStat() {

   const { oid } = useParams<any>()
   const history = useHistory()

   const classes = useStyles();
   const [activeStep, setActiveStep] = React.useState(0);
   const [steps, setSteps] = useState(['文章(按此檢視)', '處理中', ''])
   const [completed, setCompleted] = useState<{ [k: number]: boolean }>({})
   const [skipped, setSkipped] = useState(new Set<number>())

   const [, setDocumentURI] = useState("")

   const { data, loading, refetch } = usePendingPostQuery({ variables: { oid: oid }, notifyOnNetworkStatusChange: true })
   const [updatePendingPost, { loading: updateLoading }] = useUpdatePendingPostMutation()

   const methods = useForm<PendingPost>({
      defaultValues: {
         title: "",
         subtitle: "",
         remarks: ""
      }
   })
   const { reset, getValues } = methods

   // const handleNext = () => {
   //    const newActiveStep = activeStep + 1;
   //    setActiveStep(newActiveStep);
   // };

   // const handleBack = () => {
   //    setActiveStep((prevActiveStep) => prevActiveStep - 1);
   // };

   const handleStep = (step: number) => () => {
      if ((data?.pendingPost?.status === PostStatus.Pending && step === 2)
         || (data?.pendingPost?.status !== PostStatus.Pending && step === 1))
         return
      setActiveStep(step);
   };

   const getStepResult = useCallback(() => {
      if (!data) {
         return "發生錯誤，請重新載入。"
      }
      switch (data?.pendingPost?.status) {
         case PostStatus.Approved:
            return (
               <AntdResult
                  status="success"
                  title="已批核並發布"
                  subTitle="謝謝您的分享，您提交的文章已經發布到分享欄，您可以到分享欄查看。"
                  extra={<Button variant="outlined" color="secondary" onClick={() => history.push('/sharing/' + data?.pendingPost?.postID)}>到文章</Button>}
               />
            );
         case PostStatus.Pending:
            return (
               <AntdResult
                  title="處理中"
                  subTitle="謝謝您的分享，同工中在處理您的申請。"
                  extra={
                     <div>
                        <Button style={{ marginRight: 10 }} variant="contained" className={classes.danger} onClick={() => updatePendingPost({
                           variables: {
                              input: {
                                 _id: data?.pendingPost?._id,
                                 status: PostStatus.Withdraw,
                                 remarks: getValues("remarks") as string,
                                 username: getValues("username") as string,
                              }
                           }
                        }).then(res => {
                           setActiveStep(2)
                           reset();
                           refetch();
                        })}>撤回申請</Button>
                        <Button variant="outlined" onClick={() => setActiveStep(0)}>查看提交的資料</Button>
                     </div>}
               />
            );
         case PostStatus.Rejected:
            return (
               <AntdResult
                  status="error"
                  title="已拒絕"
                  subTitle={`拒絕原因: ${data?.pendingPost.remarks}`}
                  extra={<Button variant="outlined" onClick={() => setActiveStep(0)}>查看提交的資料</Button>}
               />
            );
         case PostStatus.Withhold:
            return (
               <AntdResult
                  status="warning"
                  title="已暫緩"
                  subTitle={`暫緩原因: ${data?.pendingPost.remarks}`}
                  extra={<Button variant="outlined" color="secondary" onClick={() => history.push('/personal/sharing-edit/' + data?.pendingPost?._id)}>修改你的申請</Button>}
               />
            );
         case PostStatus.Withdraw:
            return (
               <AntdResult
                  title="您已撤回申請"
                  extra={<Button variant="outlined" onClick={() => setActiveStep(0)}>查看提交的資料</Button>}
               />
            );
         default:
            return "發生錯誤，請重新載入。";
      }
   }, [data, history, refetch, getValues, reset, updatePendingPost, classes])

   useEffect(() => {
      if (data && reset) {
         reset({
            title: data.pendingPost?.title,
            subtitle: data.pendingPost?.subtitle,
            status: data.pendingPost?.status,
            username: data.pendingPost?.username,
            content: data.pendingPost?.content,
            remarks: data.pendingPost?.remarks
         })
         setDocumentURI(data.pendingPost?.documentURI ?? "")

         let lastStep = "完成"
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

         if (data.pendingPost?.status === PostStatus.Pending) {
            let newCompleted = steps.slice(0, -1).map((s, i) => ({ [i]: true })).reduce((a, b, i = 0, arr = []) => (
               {
                  ...a,
                  ...b
               }
            ))
            setCompleted(newCompleted)
            setSkipped(new Set([0]))
            setActiveStep(1)
         } else {
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
   }, [data, reset, steps])

   return (
      <>
         {(loading || updateLoading) && <LinearProgress className={classes.progress} />}
         {!loading && <FormProvider {...methods}>
            <form>
               <Container>
                  <Grid container justify="center" className={classes.title}>
                     <Typography variant="h4" component="strong">分享文章</Typography>
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
                              {/* <Grid item>
                                 <Typography className={classes.documentLabel}>上傳的檔案: </Typography>
                                 <Link href={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + documentURI} rel="noopener noreferrer" target="_blank" className="text-center">
                                    <div>
                                       <InsertDriveFile fontSize="large" />
                                    </div>
                                    <div>
                                       <label style={{ fontSize: 18, overflowWrap: 'anywhere' }}>{stripGCSFileName(documentURI)}</label>
                                    </div>
                                 </Link>
                              </Grid> */}
                              <Grid>
                                 {/* {(data?.pendingPost?.coverImageURI && !data.pendingPost.coverImageURI.match(/.*\.svg$/)) && <img alt="preview-post-cover" src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + data.pendingPost.coverImageURI}></img>} */}
                                 {data?.pendingPost?.coverImageURI && <img className={classes.responsiveImgGrid} alt="preview-post-cover" src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + data.pendingPost.coverImageURI}></img>}
                              </Grid>
                              <Grid item>
                                 <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getValues("content")) }}>
                                 </div>
                              </Grid>
                           </Grid>}
                           {activeStep !== 0 && getStepResult()}
                        </div>
                     </Grid>
                     {/* <Grid container item xs={12} justify="flex-end">
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                           返回
                        </Button>
                        <Button
                           variant="contained"
                           color="primary"
                           onClick={handleNext}
                           className={classes.button}
                           type="button"
                        >
                           下一步
                        </Button>
                     </Grid> */}
                  </Grid>
               </Container>
            </form>
         </FormProvider>}
      </>
   )
}
