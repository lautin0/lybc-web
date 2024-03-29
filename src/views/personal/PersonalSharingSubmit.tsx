import React, { useCallback, useContext, useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import MuiInputText from "components/Forms/MuiInputText";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import WrappedDropzone from "components/Dropzone/WrappedDropzone";
import { useDropzone } from "react-dropzone";
import { NewPendingPost, usePendPostMutation } from "generated/graphql";
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Slide,
} from "@material-ui/core";
import { compressImage, getTokenValue } from "utils/utils";
import AuthContext from "context/AuthContext";
import DOMPurify from "dompurify";
import AntdResult from "components/ImitateAntd/AntdResult";
import dogeImg from "../../assets/img/doge-computer.png";
import robotImg from "../../assets/img/robot.png";
import { Close, KeyboardReturn } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert/Alert";
import InputTinyMCE from "components/Forms/InputTinyMCE";
import CustomLinearProgress from "components/Loading/CustomLinearProgress";

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
    divider: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    responsiveImgGrid: {
      height: "auto",
    },
    media: {
      margin: "auto",
      display: "flex",
      alignItems: "center",
      width: 300,
      height: 300,
    },
    clickableGrid: {
      cursor: "pointer",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
    cardAction: {
      textAlign: "center",
      width: "100%",
    },
    alert: {
      marginTop: -theme.spacing(6),
      position: "fixed",
      width: "calc(100% - 300px)",
      zIndex: 999,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginTop: -50,
        left: 0,
      },
    },
    centerText: {
      marginTop: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
    },
    imgGrid: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
  })
);

function getSteps() {
  return ["輸入文章資料", "預覽", "提交"];
}

export default function PersonalSharingSubmit() {
  const dzImg = useDropzone({ accept: { "image/*": [] } });
  const { acceptedFiles: acceptedImgs } = dzImg;
  const dzFile = useDropzone({
    accept: { "application/*": [".docx", ".pdf"] },
  });
  const { acceptedFiles } = dzFile;

  const history = useHistory();

  const { tokenPair } = useContext(AuthContext);

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const steps = getSteps();
  const [method, setMethod] = useState<"EDIT" | "UPLOAD" | null>(null);
  const [alert, setAlert] = useState<{ message: string; cd: number }>({
    message: "",
    cd: 0,
  });

  const [pendPost, { loading }] = usePendPostMutation();

  const initValue = {
    title: "",
    subtitle: "",
    content: "",
  };
  const methods = useForm({
    defaultValues: initValue,
  });

  const { handleSubmit, getValues, setError, clearErrors, reset } = methods;

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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = useCallback(
    (e: any) => {
      e.preventDefault();
      let isError = false;
      if (activeStep === 0) {
        if ((getValues("title")! as string).trim().length === 0) {
          setError("title", { type: "required" });
          isError = true;
        } else {
          clearErrors("title");
        }
        if ((getValues("subtitle")! as string).trim().length === 0) {
          setError("subtitle", { type: "required" });
          isError = true;
        } else {
          clearErrors("subtitle");
        }
        if (method === "UPLOAD" && acceptedFiles.length === 0) {
          isError = true;
          setAlert({ message: "請選擇上載的檔案", cd: 5000 });
        }
      }
      if (isError) {
        return;
      }
      clearErrors();
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext(e);
    },
    [
      clearErrors,
      setError,
      getValues,
      activeStep,
      completed,
      handleNext,
      method,
      acceptedFiles,
    ]
  );

  // const handleReset = () => {
  //    setActiveStep(0);
  //    setCompleted({});
  // };

  const onSubmit = async (data: any) => {
    let tmp: NewPendingPost = { ...data };
    tmp.username = getTokenValue(tokenPair?.token).username;
    let payload;
    if (method === "EDIT") {
      payload = {
        variables: {
          input: {
            ...tmp,
            coverImage: await compressImage(acceptedImgs[0], 1.7),
          },
        },
      };
    } else if (method === "UPLOAD") {
      payload = {
        variables: {
          input: {
            ...tmp,
            doc: acceptedFiles[0],
          },
        },
      };
    } else {
      setActiveStep(-1);
      return;
    }
    pendPost(payload)
      .then((res) => {
        let newCompleted = steps
          .map((s, i) => ({ [i]: true }))
          .reduce((a, b, i = 0, arr = []) => ({
            ...a,
            ...b,
          }));
        setCompleted(newCompleted);
      })
      .catch((err: any) => {
        setActiveStep(-1);
      });
  };

  const getStepContent = useCallback(() => {
    switch (activeStep) {
      case 0:
        if (method === "UPLOAD") {
          return (
            <Grid container spacing={3}>
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
              <Grid item xs={12} style={{ marginTop: 50 }}>
                <Typography>選擇檔案(接受格式: docx, pdf)</Typography>
              </Grid>
              <Grid item xs={12}>
                <WrappedDropzone {...dzFile} />
              </Grid>
            </Grid>
          );
        } else if (method === "EDIT") {
          return (
            <Grid container spacing={3}>
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
              <Grid container item xs={12}>
                <InputTinyMCE
                  name="content"
                  label="在此編輯內容"
                  isReadOnly={false}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: 50 }}>
                <Typography>選擇封面圖片</Typography>
              </Grid>
              <Grid item xs={12}>
                <WrappedDropzone {...dzImg} />
              </Grid>
            </Grid>
          );
        } else {
          return <></>;
        }
      case 1:
        if (method === "UPLOAD") {
          return (
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h5">預覽: </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.instructions}>主題: </Typography>
                <MuiInputText name="title" xs={12} md={6} isReadOnly={true} />
                <Typography className={classes.instructions}>
                  副標題:{" "}
                </Typography>
                <MuiInputText name="subtitle" isReadOnly={true} />
              </Grid>
              <Grid item>
                <div>
                  <Typography>已選擇上載的檔案: </Typography>
                  <Typography className={classes.centerText}>
                    <i
                      style={{
                        fontSize: 48,
                        color: `${
                          acceptedFiles[0].name.includes(".pdf")
                            ? "#f04100"
                            : "#285595"
                        }`,
                      }}
                      className={`far fa-file-${
                        acceptedFiles[0].name.includes(".pdf") ? "pdf" : "word"
                      }`}
                    ></i>
                  </Typography>
                  <Typography className={classes.centerText}>
                    {acceptedFiles[0].name}
                  </Typography>
                  <Typography className={classes.centerText}>
                    {(acceptedFiles[0].size / 1024).toFixed(2)}
                    {"KB"}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          );
        } else if (method === "EDIT") {
          return (
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h5">預覽: </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.instructions}>主題: </Typography>
                <MuiInputText name="title" xs={12} md={6} isReadOnly={true} />
                <Typography className={classes.instructions}>
                  副標題:{" "}
                </Typography>
                <MuiInputText name="subtitle" isReadOnly={true} />
              </Grid>
              <Divider className={classes.divider} />
              <Grid className={classes.imgGrid}>
                {acceptedImgs && acceptedImgs.length > 0 && (
                  <img
                    className={classes.responsiveImgGrid}
                    alt="preview-post-cover"
                    src={URL.createObjectURL(acceptedImgs[0])}
                  ></img>
                )}
              </Grid>
              <Grid item>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(getValues("content")),
                  }}
                ></div>
              </Grid>
              <Divider className={classes.divider} />
              {/* <Grid item><Typography color="secondary">*完成核對後，按「發布」完成批核程序。</Typography></Grid> */}
            </Grid>
          );
        } else {
          return <></>;
        }
      case 2:
        return (
          <Grid container justify="center">
            <Typography color="textSecondary">
              *如已確認內容，請按「提交」。
            </Typography>
          </Grid>
        );
      default:
        return "An Error occurred, please try again.";
    }
  }, [
    acceptedFiles,
    acceptedImgs,
    activeStep,
    classes,
    getValues,
    dzImg,
    dzFile,
    method,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (alert.cd > 0) setAlert({ ...alert, cd: alert.cd - 1000 });
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {loading && <CustomLinearProgress />}
      {
        <Slide direction="down" in={alert.cd > 0}>
          <Alert
            className={classes.alert}
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlert({ ...alert, cd: 0 });
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            {alert.message}
          </Alert>
        </Slide>
      }
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Grid container justify="center" className={classes.title}>
              <Typography variant="h4" component="strong">
                提交分享文章
              </Typography>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepButton
                        onClick={handleStep(index)}
                        completed={completed[index]}
                      >
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid item xs={12} className={classes.formContent}>
                {!method ? (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} className={classes.clickableGrid}>
                      <Card
                        // onClick={() => setAlertCD(5000)}
                        onClick={() => setMethod("UPLOAD")}
                      >
                        <img
                          className={classes.media}
                          alt="upload a file"
                          src={robotImg}
                        ></img>
                        <CardContent className={classes.cardAction}>
                          <Typography color="textSecondary" variant="h5">
                            上傳文章
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.clickableGrid}>
                      <Card onClick={() => setMethod("EDIT")}>
                        <img
                          className={classes.media}
                          alt="Edit yourself"
                          src={dogeImg}
                        ></img>
                        <CardContent className={classes.cardAction}>
                          <Typography color="textSecondary" variant="h5">
                            自行編輯
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                ) : allStepsCompleted() ? (
                  <div>
                    {/* <Typography className={classes.instructions}>
                                       All steps completed - you&apos;re finished
                                    </Typography>
                                    <Button onClick={handleReset}>Reset</Button> */}
                    <AntdResult
                      status="success"
                      title="已成功提交"
                      subTitle="謝謝您的分享，同工們會儘快處理。"
                      extra={
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() =>
                            history.push("/personal/center/sharing")
                          }
                        >
                          返回
                        </Button>
                      }
                    />
                  </div>
                ) : (
                  <div>
                    {activeStep === 0 && (
                      <Button
                        style={{ marginBottom: 30 }}
                        variant="outlined"
                        startIcon={<KeyboardReturn />}
                        onClick={() => {
                          setMethod(null);
                          reset(initValue);
                          clearErrors();
                          setCompleted({});
                        }}
                      >
                        其他方法
                      </Button>
                    )}
                    <div className={classes.instructions}>
                      {getStepContent()}
                    </div>
                  </div>
                )}
              </Grid>
              {!allStepsCompleted() && method && (
                <Grid container item xs={12} justify="flex-end">
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
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
                    ) : completedSteps() === totalSteps() - 1 ? (
                      <Button variant="contained" color="primary" type="submit">
                        提交
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={handleComplete}
                      >
                        下一步
                      </Button>
                    ))}
                </Grid>
              )}
            </Grid>
          </Container>
        </form>
      </FormProvider>
    </>
  );
}
