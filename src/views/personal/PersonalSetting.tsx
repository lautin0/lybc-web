import React, { useContext, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Avatar, Button, Divider, Grid, IconButton, LinearProgress, Radio, Typography } from '@material-ui/core';
import UNIVERSALS from 'Universals';
import { getTokenValue } from 'utils/utils';
import { Gender, NewPassword, UpdateUser, useChangePasswordMutation, User, useUpdateUserMutation, useUserQuery } from 'generated/graphql';
import { useHistory, useLocation } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import imageCompression from 'browser-image-compression';
import moment from 'moment';
import { useDropzone } from 'react-dropzone';
import MuiInputText from 'components/Forms/MuiInputText';
import { Skeleton } from '@material-ui/lab';
import Validators from 'utils/validator';
import MuiDatePicker from 'components/Forms/MuiDatePicker';
import AuthContext from 'context/AuthContext';
import MuiInputRadio from 'components/Forms/MuiInputRadio';
import useGlobalStyles from 'styles/styles';
import { RootStore } from 'store';
import shallow from 'zustand/shallow';
import defaultAvatar from '../../assets/img/default-avatar.png'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '84vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  avatar: {
    border: theme.palette.type === "dark" ? 'none' : '.125rem lightgray solid',
    width: theme.spacing(19),
    height: theme.spacing(19)
  },
  noAvatar: {
    width: theme.spacing(19),
    height: theme.spacing(19)
  },
  iconBtn: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  profilePicContainer: {
    borderRadius: '100%',
    display: 'flex',
    flex: '0 0 150px',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  profilePicOverlay: {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'opacity 0.25s',
    zIndex: 1,

    backgroundColor: 'rgba(46,204,113,0.4)',
    background: 'linear-gradient(65deg, rgba(46,204,113,0.4), rgba(243,156,18,0.4))',
    color: '#fafafa',
    fontSize: 24,
    '&:hover': {
      opacity: 1
    },
  },
  profileBtn: {
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0)'
    }
  },
  circleLoading: {
    width: theme.spacing(14),
    height: theme.spacing(14)
  }
}));

export default function PersonalSetting() {

  const classes = useStyles();

  const history = useHistory()

  const globalClasses = useGlobalStyles()

  const location = useLocation()

  const [setMessage, { setError: setModalError }] = RootStore.useMuiModalStore(state => [state.setMessage, { setError: state.setError }], shallow)


  const { tokenPair } = useContext(AuthContext)

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const dropzoneMethods = useDropzone({
    accept: 'image/*'
  });

  const { acceptedFiles, open, getRootProps, getInputProps } = dropzoneMethods

  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation()

  const { loading, data: userData, refetch } = useUserQuery({
    variables: {
      username: getTokenValue(tokenPair?.token)?.username
    },
    notifyOnNetworkStatusChange: true
  })

  const methods = useForm<User>({
    defaultValues: {
      username: '',
      name: '',
      nameC: '',
      email: '',
      phone: '',
      dob: null,
      gender: Gender.Male
    }
  });

  const { handleSubmit, reset, control, trigger } = methods

  const pwdFormMethods = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const { setError, handleSubmit: handlePasswordSubmit } = pwdFormMethods;

  const [changePassword, { loading: changePwdLoading }] = useChangePasswordMutation()

  const handleOnClick = (e: any) => {
    e.preventDefault();
    open()
  }

  const onPasswordSubmit = (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', {
        type: "manual",
        message: "輸入的新密碼不一致"
      });
      setError('newPassword', {
        type: "manual",
        message: "輸入的新密碼不一致"
      });
      return
    }
    let tmp: NewPassword = {
      password: data.password,
      newPassword: data.newPassword,
      username: getTokenValue(tokenPair?.token).username
    }
    changePassword({
      variables: {
        input: {
          ...tmp
        },
      }
    }).then(res => {
      setMessage('app.sys.save-success')
    }).catch(setModalError)
  }

  const onSubmit = async (data: any) => {
    if (!userData)
      return

    const options = {
      maxSizeMB: .05,
      maxWidthOrHeight: 700,
      useWebWorker: true
    }

    let compressedImg = null
    if (acceptedFiles.length > 0)
      compressedImg = await imageCompression(acceptedFiles[0], options)

    let tmp: UpdateUser = {
      username: userData.user?.username!,
      role: userData.user?.role!,
      name: data.name,
      nameC: data.nameC,
      title: userData?.user?.title,
      titleC: userData?.user?.titleC,
      dob: data.dob === '' ? null : data.dob,
      gender: data.gender,
      profilePic: compressedImg,
      email: data.email ?? null,
      phone: data.phone ?? null,
      status: userData.user?.status
    }

    updateUser({
      variables: {
        input: {
          ...tmp
        },
      }
    }).then(res => {
      setMessage('app.sys.save-success')
      reset();
      history.push('/personal/')
    }).catch(setModalError)
  }

  useEffect(() => {
    if (userData !== undefined) {
      setTimeout(() => {
        reset({
          username: userData.user?.username,
          name: userData.user?.name,
          nameC: userData.user?.nameC,
          gender: userData.user?.gender,
          email: userData.user?.email!,
          phone: userData.user?.phone!,
          dob: userData.user?.dob ? moment(userData.user.dob, 'yyyy-MM-DDTHH:mm:ss-SSSS') : null
        })
      })
    }
  }, [userData, reset])

  useEffect(() => {
    if (refetch !== undefined && trigger !== undefined) {
      refetch()
      trigger()
    }
  }, [location, trigger, refetch])

  return (
    <>
      {(loading || updateUserLoading || changePwdLoading) && <LinearProgress className={globalClasses.progress} />}
      {!loading && <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="更改資訊" {...a11yProps(0)} />
          <Tab label="安全設定" {...a11yProps(1)} />
        </Tabs>
        <div style={{ overflow: 'auto', width: '100%' }}>
          <TabPanel value={value} index={0}>
            {loading && <Grid container item spacing={3} xs={12} md={6} lg={4}>
              <Grid container item xs={12} justify="center">
                <Skeleton animation="wave" variant="circle" className={classes.circleLoading} />
              </Grid>
              <Grid container item justify="center" spacing={1}>
                <Grid item xs={9}>
                  <Typography variant="h5"><Skeleton animation="wave" /></Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h5"><Skeleton animation="wave" /></Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h5"><Skeleton animation="wave" /></Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h5"><Skeleton animation="wave" /></Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h5"><Skeleton animation="wave" /></Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h5"><Skeleton animation="wave" /></Typography>
                </Grid>
              </Grid>
            </Grid>}
            {!loading && <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                </div>
                <Grid container spacing={2} direction="column">
                  <Grid item xs={12} md={6} lg={4} container justify="center">
                    <IconButton onClick={handleOnClick} color="default" className={classes.profileBtn}>
                      <div className={classes.profilePicContainer}>
                        {((acceptedFiles.length === 0 && userData) && !userData.user?.profilePicURI) && <img alt="no avatar" src={defaultAvatar} />}
                        {(acceptedFiles.length > 0) && <Avatar className={classes.avatar} src={URL.createObjectURL(acceptedFiles[0])} />}
                        {(userData && userData.user?.profilePicURI != null && acceptedFiles.length === 0) && <Avatar className={classes.avatar} src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + userData.user.profilePicURI} />}
                        <div className={classes.profilePicOverlay}>
                          <div>
                            <div>
                              <i style={{ fontSize: 36 }} className="fas fa-camera"></i>
                            </div>
                            <div>
                              變更頭像
                            </div>
                          </div>
                        </div>
                      </div>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <MuiInputText
                      name="username"
                      label="用戶編號"
                      md={6}
                      lg={4}
                      isReadOnly={true}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <MuiInputRadio
                      name="gender"
                      itemList={[
                        { value: Gender.Male, control: <Radio />, label: "男" },
                        { value: Gender.Female, control: <Radio />, label: "女" }
                      ]}
                      label="性別"
                      required={true}
                    />
                  </Grid>
                  <Grid item>
                    <MuiInputText
                      name="nameC"
                      label="中文名稱"
                      md={6}
                      lg={4}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <MuiDatePicker
                      control={control}
                      name="dob"
                      data-testid="dob-dtp"
                      variant="inline"
                      margin="normal"
                      label="出生日期"
                      format="dd/MM/yyyy"
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <MuiInputText
                      name="name"
                      label="英文名稱"
                      md={6}
                      lg={4}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <MuiInputText
                      name="phone"
                      label="聯絡電話"
                      md={6}
                      lg={4}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <MuiInputText
                      name="email"
                      label="電郵地址"
                      md={6}
                      lg={4}
                      xs={12}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      更新
                  </Button>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FormProvider {...pwdFormMethods}>
              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                <Typography style={{ marginBottom: 20 }} variant="h5">更改密碼</Typography>
                <Grid container item spacing={3} xs={12} md={6} lg={4} direction="column">
                  <Divider />
                  <Grid item>
                    <MuiInputText
                      size="small"
                      placeholder="請輸入現時密碼"
                      label="現時密碼"
                      type="password"
                      name="password"
                      validateFn={Validators.NoWhiteSpace}
                    />
                  </Grid>
                  <Grid item>
                    <MuiInputText
                      size="small"
                      placeholder="請輸入新密碼"
                      label="新密碼"
                      type="password"
                      name="newPassword"
                      validateFn={Validators.NoWhiteSpace}
                    />
                  </Grid>
                  <Grid item>
                    <MuiInputText
                      size="small"
                      label="確認新密碼"
                      placeholder="確認新密碼"
                      type="password"
                      name="confirmPassword"
                      validateFn={Validators.NoWhiteSpace}
                    />
                  </Grid>
                  <Divider />
                  <Grid item>
                    <Button variant="contained" color="secondary" type="submit">變更密碼</Button>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </TabPanel>
        </div>
      </div>}
    </>
  );
}