import React, { useCallback, useEffect, useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import { Divider, Link, useMediaQuery } from "@material-ui/core";
import {
  NewPost,
  PendingPost,
  PostStatus,
  PostType,
  UpdatePendingPost,
  useApprovePostMutation,
  usePendingPostQuery,
  useUpdatePendingPostMutation,
} from "generated/graphql";
import { useHistory, useParams } from "react-router-dom";
import MuiInputText from "components/Forms/MuiInputText";
import { FormProvider, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import WrappedDropzone from "components/Dropzone/WrappedDropzone";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import DOMPurify from "dompurify";
import UNIVERSALS from "Universals";
import AntdResult from "components/ImitateAntd/AntdResult";
import InputTinyMCE from "components/Forms/InputTinyMCE";
import shallow from "zustand/shallow";
import { RootStore } from "store";
import CustomLinearProgress from "components/Loading/CustomLinearProgress";
import ExtendColorButton from "components/Buttons/ExtendColorButton";
import { InsertDriveFile } from "@material-ui/icons";
import { compressImage, stripGCSFileName } from "utils/utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    title: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    completed: {
      display: "inline-block",
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    formContent: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(6),
    },
    documentGrid: {
      border: "solid 1px",
      borderRadius: "0.5rem",
      borderStyle: "dashed",
    },
    documentLabel: {
      marginBottom: theme.spacing(3),
    },
    rowGrid: {
      display: "flex",
      flexWrap: "wrap",
    },
    divider: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    responsiveImgGrid: {
      height: "auto",
    },
    formLabel: {
      width: 135,
    },
    formData: {
      fontWeight: "bold",
    },
    imgGrid: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
  })
);

const endStatus = [
  PostStatus.Approved,
  PostStatus.Rejected,
  PostStatus.Withdraw,
  PostStatus.Withhold,
];

export default function PendingPostApproval() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const mdUpHidden = useMediaQuery(theme.breakpoints.up("md"));

  const { oid } = useParams<any>();
  const history = useHistory();

  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = useState(["檢視文章", "修改內容", "發布"]);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [skipped, setSkipped] = useState(new Set<number>());
  const [previewContent, setPreviewContent] = useState("");

  const [setMessage, { setError: setModalError }] = RootStore.useMuiModalStore(
    (state) => [state.setMessage, { setError: state.setError }],
    shallow
  );

  const [documentURI, setDocumentURI] = useState<string | null>(null);

  const { data, loading, refetch } = usePendingPostQuery({
    variables: { oid: oid },
    notifyOnNetworkStatusChange: true,
  });
  const [updatePendingPost, { loading: updateLoading }] =
    useUpdatePendingPostMutation();
  const [approvePost, { loading: approveLoading }] = useApprovePostMutation();

  const dropzoneMethods = useDropzone({
    accept: { "image/*": [] },
  });

  const { acceptedFiles } = dropzoneMethods;

  const methods = useForm<PendingPost & { content: any }>({
    defaultValues: {
      title: "",
      subtitle: "",
      remarks: "",
    },
  });
  const { reset, getValues, handleSubmit } = methods;

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

  const handleNext = useCallback(
    (e: any) => {
      e.preventDefault();
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    },
    [isLastStep, allStepsCompleted, steps, completed, activeStep]
  );

  const handleBack = (e: any) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    if (
      (data?.pendingPost?.status === PostStatus.Pending && step === 2) ||
      (data?.pendingPost?.status !== PostStatus.Pending && step === 1)
    )
      return;
    setActiveStep(step);
  };

  const handleComplete = useCallback(
    (e: any) => {
      e.preventDefault();
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext(e);
    },
    [activeStep, completed, handleNext]
  );

  const handlePost = useCallback(
    async (s: PostStatus) => {
      let tmp: UpdatePendingPost = {
        _id: data?.pendingPost?._id,
        status: s,
        remarks: getValues("remarks") as string,
        username: getValues("username") as string,
      };

      if (s === PostStatus.Withhold) {
        let file = await compressImage(acceptedFiles[0], 1.7);
        tmp.coverImage = file;
        tmp.content = getValues("content") as string;
      }

      updatePendingPost({
        variables: {
          input: {
            ...tmp,
          },
        },
      })
        .then((res) => {
          let toStep = 2;
          if (res.data?.updatePendingPost.status === PostStatus.Pending) {
            toStep = 0;
            steps[2] = "完成";
            setSteps(steps);
            setCompleted({});
            setSkipped(new Set([0, 1]));
          }
          setActiveStep(toStep);
          reset();
          refetch();
        })
        .catch(setModalError);
    },
    [
      data,
      getValues,
      refetch,
      reset,
      setModalError,
      updatePendingPost,
      steps,
      acceptedFiles,
    ]
  );

  const rejectPost = (e: any) => {
    e.preventDefault();
    handlePost(PostStatus.Rejected);
  };

  const withholdPost = (e: any) => {
    e.preventDefault();
    handlePost(PostStatus.Withhold);
  };

  const resumePost = useCallback(
    (e: any) => {
      e.preventDefault();
      handlePost(PostStatus.Pending);
    },
    [handlePost]
  );

  const getStepResult = useCallback(() => {
    if (!data) return <></>;
    switch (data.pendingPost?.status) {
      case PostStatus.Approved:
        return (
          <AntdResult
            status="success"
            title="已批核並發布"
            subTitle="文章已經發布到分享欄，您可以到分享欄查看。"
            extra={
              <>
                <Button
                  style={{ marginRight: 10 }}
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    history.push("/sharing/" + data.pendingPost?.postID)
                  }
                >
                  到文章
                </Button>
                <Button variant="outlined" onClick={() => setActiveStep(0)}>
                  內容預覽
                </Button>
              </>
            }
          />
        );
      case PostStatus.Rejected:
        return (
          <AntdResult
            status="error"
            title="已拒絕"
            subTitle={`已拒絕，原因: ${data.pendingPost.remarks}`}
            extra={
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setActiveStep(0)}
              >
                查看提交的資料
              </Button>
            }
          />
        );
      case PostStatus.Withhold:
        return (
          <AntdResult
            status="warning"
            title="已暫緩"
            subTitle={`已暫緩，原因: ${data.pendingPost.remarks}`}
            extra={
              <div>
                <Button
                  style={{ marginRight: 10 }}
                  variant="outlined"
                  color="primary"
                  onClick={resumePost}
                >
                  恢復處理
                </Button>
                <Button variant="outlined" onClick={() => setActiveStep(0)}>
                  查看提交的資料
                </Button>
              </div>
            }
          />
        );
      case PostStatus.Withdraw:
        return (
          <AntdResult
            title="已撤回"
            subTitle="文章提交者已自行撤回申請"
            extra={
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setActiveStep(0)}
              >
                查看提交的資料
              </Button>
            }
          />
        );
      default:
        return "發生錯誤，請重新載入。";
    }
  }, [data, history, resumePost]);

  useEffect(() => {
    if (data && reset) {
      reset({
        title: data.pendingPost?.title,
        subtitle: data.pendingPost?.subtitle,
        status: data.pendingPost?.status,
        username: data.pendingPost?.username,
        content: data.pendingPost?.content,
        remarks: data.pendingPost?.remarks,
      });
      setPreviewContent(data.pendingPost?.content ?? "");
      setDocumentURI(data.pendingPost?.documentURI ?? null);

      let lastStep = "完成";

      if (
        data.pendingPost?.status &&
        endStatus.includes(data.pendingPost?.status)
      ) {
        if (data.pendingPost?.status === PostStatus.Approved) {
          lastStep = "已批核";
        } else if (data.pendingPost?.status === PostStatus.Rejected) {
          lastStep = "已拒絕";
        } else if (data.pendingPost?.status === PostStatus.Withhold) {
          lastStep = "已暫緩";
        } else if (data.pendingPost?.status === PostStatus.Withdraw) {
          lastStep = "已撤回";
        }
        let newSteps = steps;
        newSteps[2] = lastStep;
        setSteps(newSteps);

        if (data.pendingPost?.status !== PostStatus.Pending) {
          let newCompleted = steps
            .map((s, i) => ({ [i]: true }))
            .reduce((a, b, i = 0, arr = []) => ({
              ...a,
              ...b,
            }));
          setCompleted(newCompleted);
          setSkipped(new Set([0, 1]));
          setActiveStep(2);
        }
      }
    }
  }, [data, reset, steps]);

  const onSubmit = (d: any) => {
    let tmp: NewPost = {
      title: d.title,
      subtitle: d.subtitle,
      type: PostType.Sharing,
      content: d.content,
      username: d.username,
      toUsername: d.username,
    };

    let file = acceptedFiles[0];
    let pPostTmp: UpdatePendingPost = {
      _id: data?.pendingPost?._id,
      status: PostStatus.Approved,
      remarks: getValues("remarks") as string,
      username: d.username,
      content: d.content,
      oriCoverImageURI: data?.pendingPost?.coverImageURI,
    };

    approvePost({
      variables: {
        input: {
          ...tmp,
          image: file,
        },
        postRefInput: pPostTmp,
      },
    })
      .then((res) => {
        setMessage("app.sys.save-success");
        reset();
        history.push("/admin/post/pending");
      })
      .catch(setModalError);
  };

  return (
    <>
      {(loading || updateLoading || approveLoading) && <CustomLinearProgress />}
      {!loading && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RouterBreadcrumbs />
            <Container>
              <Grid container justify="center" className={classes.title}>
                <Typography variant="h4" component="strong">
                  批核文章
                </Typography>
              </Grid>
              <Grid>
                <Grid item xs={12}>
                  <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepButton
                          onClick={handleStep(index)}
                          completed={completed[index] && !skipped.has(index)}
                        >
                          {label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
                <Grid item xs={12} className={classes.formContent}>
                  <div className={classes.instructions}>
                    {activeStep === 0 && (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h5">第一部分：預覽</Typography>
                        </Grid>
                        <Grid item xs={12} md={8} lg={6}>
                          <Typography
                            variant="h6"
                            component="label"
                            className={classes.formLabel}
                          >
                            提交用戶:
                          </Typography>
                          <Typography
                            variant="h5"
                            className={classes.formData}
                            component="label"
                          >
                            {data?.pendingPost?.username}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            component="label"
                            className={classes.formLabel}
                          >
                            主題:
                          </Typography>
                          <Typography
                            variant="h5"
                            className={classes.formData}
                            component="label"
                          >
                            {data?.pendingPost?.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            component="label"
                            className={classes.formLabel}
                          >
                            副標題:
                          </Typography>
                          <Typography
                            variant="h5"
                            className={classes.formData}
                            component="label"
                          >
                            {data?.pendingPost?.subtitle}
                          </Typography>
                        </Grid>
                        {documentURI && (
                          <Grid item xs={12}>
                            <Typography
                              variant="h6"
                              component="label"
                              className={classes.formLabel}
                            >
                              上傳的檔案:
                            </Typography>
                            <Typography
                              variant="h5"
                              className={classes.formData}
                              component="label"
                            >
                              <Link
                                href={
                                  UNIVERSALS.GOOGLE_STORAGE_ENDPOINT +
                                  documentURI
                                }
                                rel="noopener noreferrer"
                                target="_blank"
                                className="text-center"
                              >
                                <div>
                                  <InsertDriveFile fontSize="large" />
                                </div>
                                <div>
                                  <label
                                    style={{
                                      fontSize: 18,
                                      overflowWrap: "anywhere",
                                    }}
                                  >
                                    {stripGCSFileName(documentURI)}
                                  </label>
                                </div>
                              </Link>
                            </Typography>
                          </Grid>
                        )}
                        {!documentURI && (
                          <>
                            <Divider className={classes.divider} />
                            <Grid className={classes.imgGrid}>
                              {/* {acceptedFiles && acceptedFiles.length > 0 && <img alt="preview-post-cover" src={URL.createObjectURL(acceptedFiles[0])}></img>} */}
                              {data?.pendingPost?.coverImageURI && (
                                <img
                                  className={classes.responsiveImgGrid}
                                  alt="preview-post-cover"
                                  src={
                                    UNIVERSALS.GOOGLE_STORAGE_ENDPOINT +
                                    data?.pendingPost?.coverImageURI
                                  }
                                ></img>
                              )}
                            </Grid>
                            <Grid item>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(previewContent),
                                }}
                              ></div>
                            </Grid>
                            <Divider className={classes.divider} />
                          </>
                        )}
                        <Grid item xs={12}>
                          <Typography variant="h5">
                            第二部分：備註(選填)
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <MuiInputText
                            name="remarks"
                            label="備註"
                            placeholder="請輸入備註(如: 拒絕或暫緩原因)"
                            rows={4}
                            multiline={true}
                            isReadOnly={
                              data?.pendingPost?.status &&
                              endStatus.includes(data?.pendingPost?.status)
                            }
                          />
                        </Grid>
                      </Grid>
                    )}
                    {activeStep !== 0 &&
                      data?.pendingPost?.status &&
                      endStatus.includes(data?.pendingPost?.status) &&
                      getStepResult()}
                    {activeStep === 1 &&
                      data?.pendingPost?.status &&
                      data?.pendingPost?.status === PostStatus.Pending && (
                        <Grid container>
                          <InputTinyMCE
                            name="content"
                            label="在此貼上和編輯內容"
                            isReadOnly={false}
                          />
                          <Grid item xs={12} style={{ marginTop: 50 }}>
                            <Typography>選擇封面圖片</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <WrappedDropzone lg={12} {...dropzoneMethods} />
                          </Grid>
                          <Grid item xs={12}>
                            <MuiInputText
                              name="remarks"
                              label="備註"
                              placeholder="請輸入備註(如: 拒絕或暫緩原因)"
                              rows={4}
                              multiline={true}
                              isReadOnly={
                                data?.pendingPost?.status &&
                                endStatus.includes(data?.pendingPost?.status)
                              }
                            />
                          </Grid>
                        </Grid>
                      )}
                    {activeStep === 2 &&
                      data?.pendingPost?.status &&
                      data?.pendingPost?.status === PostStatus.Pending && (
                        <Grid container direction="column" spacing={1}>
                          <Grid item>
                            <Typography color="secondary">
                              *最後預覽，完成核對後，按「發布」完成批核程序。
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={8} lg={6}>
                            <Typography
                              variant="h6"
                              component="label"
                              className={classes.formLabel}
                            >
                              提交用戶:
                            </Typography>
                            <Typography
                              variant="h5"
                              className={classes.formData}
                              component="label"
                            >
                              {data?.pendingPost?.username}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="h6"
                              component="label"
                              className={classes.formLabel}
                            >
                              主題:
                            </Typography>
                            <Typography
                              variant="h5"
                              className={classes.formData}
                              component="label"
                            >
                              {data?.pendingPost?.title}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="h6"
                              component="label"
                              className={classes.formLabel}
                            >
                              副標題:
                            </Typography>
                            <Typography
                              variant="h5"
                              className={classes.formData}
                              component="label"
                            >
                              {data?.pendingPost?.subtitle}
                            </Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid className={classes.imgGrid}>
                            {acceptedFiles && acceptedFiles.length > 0 && (
                              <img
                                className={classes.responsiveImgGrid}
                                alt="preview-post-cover"
                                src={URL.createObjectURL(acceptedFiles[0])}
                              ></img>
                            )}
                            {(!acceptedFiles || acceptedFiles.length === 0) &&
                              data?.pendingPost?.coverImageURI && (
                                <img
                                  className={classes.responsiveImgGrid}
                                  alt="preview-post-cover"
                                  src={
                                    UNIVERSALS.GOOGLE_STORAGE_ENDPOINT +
                                    data?.pendingPost?.coverImageURI
                                  }
                                ></img>
                              )}
                          </Grid>
                          <Grid item>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  getValues("content")
                                ),
                              }}
                            ></div>
                          </Grid>
                          <Divider className={classes.divider} />
                        </Grid>
                      )}
                  </div>
                </Grid>
                {!allStepsCompleted() &&
                  data?.pendingPost?.status &&
                  !endStatus.includes(data?.pendingPost?.status) && (
                    <Grid
                      container
                      item
                      xs={12}
                      justify="space-between"
                      direction="row"
                    >
                      <Grid item className={classes.rowGrid}>
                        <ExtendColorButton
                          type="button"
                          size={isMobile ? "small" : "medium"}
                          style={{
                            display:
                              endStatus.includes(data.pendingPost.status) ||
                              activeStep === 2
                                ? "none"
                                : "block",
                          }}
                          onClick={withholdPost}
                          className={classes.button}
                          color="warning"
                        >
                          {!isMobile && <Typography>暫緩發布</Typography>}
                          {!mdUpHidden && <Typography>暫緩</Typography>}
                        </ExtendColorButton>
                        <ExtendColorButton
                          type="button"
                          size={isMobile ? "small" : "medium"}
                          style={{
                            display:
                              endStatus.includes(data.pendingPost.status) ||
                              activeStep === 2
                                ? "none"
                                : "block",
                          }}
                          onClick={rejectPost}
                          className={classes.button}
                          color="danger"
                        >
                          {!isMobile && <Typography>拒絕發布</Typography>}
                          {!mdUpHidden && <Typography>拒絕</Typography>}
                        </ExtendColorButton>
                      </Grid>
                      <Grid item className={classes.rowGrid}>
                        <Button
                          type="button"
                          size={isMobile ? "small" : "medium"}
                          style={{
                            display: activeStep === 0 ? "none" : "block",
                          }}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          返回
                        </Button>
                        {activeStep !== steps.length &&
                          (completed[activeStep] ? (
                            <Button
                              size={isMobile ? "small" : "medium"}
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
                              className={classes.button}
                              type="button"
                            >
                              下一步
                            </Button>
                          ) : completedSteps() === totalSteps() - 1 ? (
                            <Button
                              size={isMobile ? "small" : "medium"}
                              variant="contained"
                              color="primary"
                              type="submit"
                            >
                              發布
                            </Button>
                          ) : (
                            <Button
                              size={isMobile ? "small" : "medium"}
                              variant="contained"
                              color="primary"
                              type="button"
                              onClick={handleComplete}
                            >
                              繼續
                            </Button>
                          ))}
                      </Grid>
                    </Grid>
                  )}
              </Grid>
            </Container>
          </form>
        </FormProvider>
      )}
    </>
  );
}
