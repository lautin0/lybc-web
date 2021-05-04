import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Button, Grid } from '@material-ui/core';
import UNIVERSALS from 'Universals';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER, UPDATE_USER } from 'graphqls/graphql';
import { getTokenValue } from 'utils/utils';
import { Gender, UpdateUser, User } from 'generated/graphql';
import { useHistory, useLocation } from 'react-router-dom';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { setLoading, setSystemFailure, setSysMessage } from 'actions';
import { toggleSecurityModal } from 'actions/security/security';
import imageCompression from 'browser-image-compression';
import InputText from 'components/Forms/InputText';
import moment, { Moment } from 'moment';
import { Form, Col } from 'react-bootstrap';
import { SingleDatePicker } from 'react-dates';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { AccountCircle } from '@material-ui/icons';
import MuiInputText from 'components/Forms/MuiInputText';

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
    height: '75vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  avatar: {
    border: '.1rem lightgray solid',
    width: theme.spacing(14),
    height: theme.spacing(14)
  },
  iconBtn: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
}));

export default function PersonalSetting() {
  const classes = useStyles();


  const history = useHistory()

  const dispatch = useDispatch()

  const location = useLocation()


  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [date, setDate] = useState<Moment | null>(null)
  const [focused, setFocused] = useState<boolean>(false)

  const dropzoneMethods = useDropzone({
    accept: 'image/*'
  });

  const { acceptedFiles, open, getRootProps, getInputProps } = dropzoneMethods

  const [updateUser, { data: updatedUserData }] = useMutation<
    { updateUser: User },
    { input: UpdateUser }
  >(UPDATE_USER);

  const { loading, data: userData, refetch } = useQuery<{ user: User }, { username: string }>(GET_USER, { variables: { username: getTokenValue(localStorage.getItem('token')).username }, notifyOnNetworkStatusChange: true })

  const methods = useForm({
    defaultValues: {
      username: '',
      name: '',
      nameC: '',
      gender: '',
      email: '',
      phone: ''
    }
  });

  const { register, handleSubmit, reset, getValues, control, trigger } = methods

  const watchType = useWatch({
    control,
    name: 'gender',
  })

  const handleOnClick = (e: any) => {
    e.preventDefault();
    open()
  }

  const onSubmit = async (data: any) => {
    if (userData == null)
      return
    let dob = date?.format('yyyy-MM-DDTHH:mm:ssZ')
    dispatch(setLoading(true))

    const options = {
      maxSizeMB: .05,
      maxWidthOrHeight: 700,
      useWebWorker: true
    }

    let compressedImg = await acceptedFiles.length > 0 ? imageCompression(acceptedFiles[0], options) : null

    let tmp: UpdateUser = {
      username: userData?.user.username,
      role: userData?.user.role,
      name: data.name,
      nameC: data.nameC,
      title: userData?.user.title,
      titleC: userData?.user.titleC,
      dob: dob,
      gender: data.gender,
      profilePic: compressedImg,
      email: data.email.length == 0 ? null : data.email,
      phone: data.phone.length == 0 ? null : data.phone
    }

    updateUser({
      variables: {
        input: {
          ...tmp
        },
      }
    }).catch((err: any) => {
      dispatch(setLoading(false))
      dispatch(setSystemFailure(err))
    })
  }

  useEffect(() => {
    if (updatedUserData !== undefined) {
      dispatch(setSysMessage('app.sys.save-success!'))
      dispatch(setLoading(false))
      reset();
      history.push('/personal/')
    }
  }, [updatedUserData, dispatch, reset, history])

  useEffect(() => {
    if (userData !== undefined) {
      setTimeout(() => {
        reset({
          username: userData.user.username,
          name: userData.user.name,
          nameC: userData.user.nameC,
          gender: userData.user.gender.toString(),
          email: userData.user.email!,
          phone: userData.user.phone!,
        })
        if (userData.user.dob != null) {
          setDate(moment(userData.user.dob, 'yyyy-MM-DDTHH:mm:ss-SSSS'))
        }
      })
    }
  }, [userData, reset])

  useEffect(() => {
    dispatch(setLoading(true))
  }, [])

  useEffect(() => {
    if (userData != null) {
      dispatch(setLoading(true))
      refetch();
      setTimeout(() => {
        trigger()
      }, 1000);
    }
  }, [location, dispatch, refetch])

  useEffect(() => {
    if (loading === false) {
      dispatch(setLoading(false))
    }
  }, [loading, dispatch])

  useEffect(() => {
    if (watchType !== undefined)
      trigger()
  }, [watchType, trigger])

  return (
    <div className={classes.root}>
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
          {(!loading && userData != null) && <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
              </div>
              <Grid>
                <Grid>
                  <a className="profile-pic mx-auto" href="#" onClick={handleOnClick}>
                    <div className="profile-pic-overlay">
                      <div>
                        <div>
                          <i style={{ fontSize: 36 }} className="fas fa-camera"></i>
                        </div>
                        <div>
                          變更頭像
                        </div>
                      </div>
                    </div>
                    {(acceptedFiles.length == 0 && userData.user.profilePicURI == null) && <AccountCircle />}
                    {(acceptedFiles.length > 0) && <img src={URL.createObjectURL(acceptedFiles[0])} />}
                    {(userData.user.profilePicURI != null && acceptedFiles.length == 0) && <img src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + userData.user.profilePicURI} />}
                  </a>
                </Grid>
              </Grid>
              <hr></hr>
              <Grid>
                <MuiInputText
                  name="username"
                  label="用戶編號"
                  md={5}
                  isReadOnly={true}
                />
                <Grid>
                  <label>性別</label>
                  <div className="d-flex justify-content-start" style={{ fontSize: 18 }}>
                    <Controller
                      render={({ onChange, onBlur, value }) => <Form.Check
                        className="form-check-radio mx-2"
                        type="radio"
                        id="rbM"
                        value={Gender.Male.toString()}
                        onChange={(val) => onChange(val.currentTarget.value)}
                        checked={Gender.Male.toString() === getValues().gender}
                        name="rbGender"
                        label={<><span className="form-check-sign"></span>男</>}
                      ></Form.Check>
                      }
                      control={control}
                      name="gender"
                    />
                    <Controller
                      render={({ onChange, onBlur, value }) => <Form.Check
                        className="form-check-radio mx-2"
                        type="radio"
                        id="rbF"
                        value={Gender.Female.toString()}
                        onChange={(val) => onChange(val.currentTarget.value)}
                        checked={Gender.Female.toString() === getValues().gender}
                        name="rbGender"
                        label={<><span className="form-check-sign"></span>女</>}
                      ></Form.Check>}
                      control={control}
                      name="gender"
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid>
                <MuiInputText
                  name="nameC"
                  label="中文名稱"
                  md={5}
                />
                <Grid>
                  <label>出生日期</label><br></br>
                  <SingleDatePicker
                    placeholder="出生日期"
                    isOutsideRange={() => false}
                    numberOfMonths={1}
                    date={date} // momentPropTypes.momentObj or null
                    onDateChange={date => setDate(date)} // PropTypes.func.isRequired
                    focused={focused} // PropTypes.bool
                    onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
                    showDefaultInputIcon
                    inputIconPosition="after"
                    // displayFormat="yyyyMMDD"
                    id="dob" // PropTypes.string.isRequired,
                  />
                </Grid>
              </Grid>
              <Grid>
                <MuiInputText
                  name="name"
                  label="英文名稱"
                  md={5}
                />
              </Grid>
              <Grid>
                <MuiInputText
                  name="phone"
                  label="聯絡電話"
                  md={5}
                />
                <MuiInputText
                  name="email"
                  label="電郵地址"
                  md={5}
                  xs={12}
                />
              </Grid>
              <hr></hr>
              <Grid container>
                <Grid item>
                  <Button
                    style={{ background: '#009999' }}
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
          安全設定
      </TabPanel>
      </div>
    </div>
  );
}