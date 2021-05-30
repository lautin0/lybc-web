import React, { useCallback, useContext, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import MuiInputText from 'components/Forms/MuiInputText';
import { FormProvider, useForm } from 'react-hook-form';
import { Result } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import DropzoneCustom from 'components/DropzoneCustom';
import { useDropzone } from 'react-dropzone';
import { NewPendingPost, PendingPost, PostStatus, usePendingPostQuery, useUpdatePendingPostMutation } from 'generated/graphql';
import { Divider, LinearProgress } from '@material-ui/core';
import { getTokenValue } from 'utils/utils';
import AuthContext from 'context/AuthContext';
import { Alert, AlertTitle } from '@material-ui/lab';
import InputQuill from 'components/Forms/InputQuill';
import DOMPurify from 'dompurify';
import UNIVERSALS from 'Universals';

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
      documentLabel: {
         marginBottom: theme.spacing(3)
      },
      progress: {
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
      title: {
         marginTop: theme.spacing(3),
         marginBottom: theme.spacing(3),
      },
      divider: {
         marginTop: theme.spacing(3),
         marginBottom: theme.spacing(3)
      }
   }))

function getSteps() {
   return ['修改文章', '預覽', '提交'];
}

function getAlert(status: PostStatus, remarks: any) {
   switch (status) {
      case PostStatus.Rejected:
         return <Alert severity="error">
            <AlertTitle>已拒絕</AlertTitle>
            拒絕原因: {remarks}
         </Alert>;
      case PostStatus.Withhold:
         return <Alert severity="warning">
            <AlertTitle>已暫緩</AlertTitle>
            暫緩原因: {remarks}
         </Alert>;
      default:
         return <Alert severity="info">發生錯誤!</Alert>
   }
}

export default function PersonalSharingEdit() {

   const { oid } = useParams<any>()

   const dropzoneMethods = useDropzone(
      { 
         // accept: '.docx,.pdf'
         accept: 'image/*'
       }
   )
   const { acceptedFiles } = dropzoneMethods

   const history = useHistory()

   const { tokenPair } = useContext(AuthContext)

   const classes = useStyles();
   const [activeStep, setActiveStep] = React.useState(0);
   const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
   const steps = getSteps();

   const [, setDocumentURI] = useState("")

   const { data, loading } = usePendingPostQuery({
      variables: { oid: oid },
      notifyOnNetworkStatusChange: true
   })
   const [updatePendingPost, { loading: updateLoading }] = useUpdatePendingPostMutation()

   const methods = useForm<PendingPost>({
      defaultValues: {
         title: "",
         subtitle: "",
         remarks: ""
      }
   })

   const { handleSubmit, getValues, setError, clearErrors, reset } = methods

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

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleStep = (step: number) => () => {
      setActiveStep(step);
   };

   const handleComplete = useCallback((e: any) => {
      e.preventDefault()
      let isError = false
      if (activeStep === 0) {
         if ((getValues("title")! as string).trim().length === 0) {
            setError("title", { type: "required" })
            isError = true
         } else {
            clearErrors("title")
         }
         if ((getValues("subtitle")! as string).trim().length === 0) {
            setError("subtitle", { type: "required" })
            isError = true
         } else {
            clearErrors("subtitle")
         }
      }
      if (isError) {
         return
      }
      clearErrors()
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext(e);
   }, [clearErrors, setError, getValues, activeStep, completed, handleNext]);

   // const handleReset = () => {
   //    setActiveStep(0);
   //    setCompleted({});
   // };

   const onSubmit = (data: any) => {
      let tmp: NewPendingPost = { ...data }
      tmp.username = getTokenValue(tokenPair?.token).username
      let file = acceptedFiles[0]
      updatePendingPost({
         variables: {
            input: {
               _id: oid,
               username: tmp.username,
               status: PostStatus.Pending,
               title: data.title,
               subtitle: data.subtitle,
               content: data.content,
               coverImage: file,
               // doc: file
            },
         }
      }).then(res => {
         let newCompleted = steps.map((s, i) => ({ [i]: true })).reduce((a, b, i = 0, arr = []) => (
            {
               ...a,
               ...b
            }
         ))
         setCompleted(newCompleted)
      })
         .catch((err: any) => {
            setActiveStep(-1)
         })
   }


   const getStepContent = useCallback(() => {
      if (!data) {
         return <></>
      }
      switch (activeStep) {
         case 0:
            return <Grid container spacing={3}>
               <Grid item xs={12} md={8} lg={6}>
                  <MuiInputText
                     name="title"
                     label="主題"
                     placeholder="請輸入分享主題"
                  />
               </Grid>
               <Grid item xs={12}>
                  <MuiInputText
                     name="subtitle"
                     label="副標題"
                     placeholder="請輸入副標題"
                  />
               </Grid>
               <InputQuill name="content" label="在此貼上和編輯內容" isReadOnly={false} />
               <Grid item xs={12}>
                  <Typography>選擇封面圖片</Typography>
               </Grid>
               <Grid item xs={12}>
                  <DropzoneCustom lg={12} {...dropzoneMethods} />
               </Grid>
               {/* {data?.pendingPost?.documentURI && <Grid item>
                  <Typography className={classes.documentLabel}>上傳的檔案: </Typography>
                  <Link href={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + data?.pendingPost?.documentURI} rel="noopener noreferrer" target="_blank" className="text-center">
                     <div>
                        <InsertDriveFile fontSize="large" />
                     </div>
                     <div>
                        <label style={{ fontSize: 18, overflowWrap: 'anywhere' }}>{stripGCSFileName(data?.pendingPost?.documentURI)}</label>
                     </div>
                  </Link>
               </Grid>} */}
            </Grid>;
         case 1:
            return <Grid container>
               <Grid item><Typography variant="h5">預覽: </Typography></Grid>
               <Divider className={classes.divider} />
               <Grid item>
                  <Grid container justify="center" item xs={12}>
                     {acceptedFiles && acceptedFiles.length > 0 && <img alt="preview-post-cover" src={URL.createObjectURL(acceptedFiles[0])}></img>}
                     {(!acceptedFiles || acceptedFiles.length === 0) && data?.pendingPost?.coverImageURI && <img alt="preview-post-cover" src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + data?.pendingPost?.coverImageURI}></img>}
                  </Grid>
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getValues("content")) }}>
                  </div>
               </Grid>
            </Grid>
         case 2:
            return <Grid container justify="center">
               <Typography color="secondary">*請確認資料無誤，然後提交。</Typography>
            </Grid>
         default:
            return 'Unknown step';
      }
   }, [activeStep, dropzoneMethods, data, classes, acceptedFiles, getValues])

   useEffect(() => {
      if (data && reset) {
         reset({
            title: data.pendingPost?.title,
            subtitle: data.pendingPost?.subtitle,
            content: data.pendingPost?.content,
            coverImageURI: data.pendingPost?.coverImageURI,
            remarks: data.pendingPost?.remarks
         })
         setDocumentURI(data.pendingPost?.documentURI ?? "")
      }
   }, [data, reset])

   return (
      <>
         {(loading || updateLoading) && <LinearProgress className={classes.progress} />}
         {!loading && <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Container>
                  {(!allStepsCompleted() && data?.pendingPost) && getAlert(data?.pendingPost.status, data.pendingPost.remarks)}
                  <Grid container justify="center" className={classes.title}>
                     <Typography variant="h4" component="strong">提交分享文章</Typography>
                  </Grid>
                  <Grid container>
                     <Grid item xs={12}>
                        <Stepper activeStep={activeStep}>
                           {steps.map((label, index) => (
                              <Step key={label}>
                                 <StepButton onClick={handleStep(index)} completed={completed[index]}>
                                    {label}
                                 </StepButton>
                              </Step>
                           ))}
                        </Stepper>
                     </Grid>
                     <Grid item xs={12} className={classes.formContent}>
                        {allStepsCompleted() ? (
                           <div>
                              {/* <Typography className={classes.instructions}>
                              All steps completed - you&apos;re finished
                           </Typography>
                           <Button onClick={handleReset}>Reset</Button> */}
                              <Result
                                 status="success"
                                 title="已成功提交"
                                 subTitle="謝謝您的分享，同工們會儘快處理。"
                                 extra={<Button variant="outlined" color="secondary" onClick={() => history.push('/personal/center/sharing')}>返回</Button>}
                              />
                           </div>
                        ) : (
                           <div>
                              <div className={classes.instructions}>{getStepContent()}</div>
                           </div>
                        )}
                     </Grid>
                     {!allStepsCompleted() && <Grid container item xs={12} justify="flex-end">
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
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
                                    提交
                                 </Button>
                              ) : (
                                 <Button variant="contained" color="primary" type="button" onClick={handleComplete}>
                                    下一步
                                 </Button>
                              )
                           ))}
                     </Grid>}
                  </Grid>
               </Container>
            </form>
         </FormProvider>}
      </>
   )
}