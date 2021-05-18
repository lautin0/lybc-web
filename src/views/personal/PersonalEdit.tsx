import { setLoading, setSysMessage, setSystemFailure } from "actions";
import InputText from "components/Forms/InputText";
import { Gender, UpdateUser, useUpdateUserMutation, useUserQuery } from "generated/graphql";
import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getTokenValue } from "utils/utils";
import { SingleDatePicker } from 'react-dates';

import defaultAvatar from "assets/img/default-avatar.png";
import { Moment } from "moment";
import { toggleSecurityModal } from "actions/security/security";
import moment from "moment";
import UNIVERSALS from "Universals";

import imageCompression from 'browser-image-compression';

function PersonalEdit() {

  const history = useHistory()

  const dispatch = useDispatch()

  const location = useLocation()

  const [date, setDate] = useState<Moment | null>(null)
  const [focused, setFocused] = useState<boolean>(false)

  const dropzoneMethods = useDropzone({
    accept: 'image/*'
  });

  const { acceptedFiles, open, getRootProps, getInputProps } = dropzoneMethods

  const [updateUser, { data: updatedUserData }] = useUpdateUserMutation()

  const { loading, data: userData, refetch } = useUserQuery({
    variables: { username: getTokenValue(localStorage.getItem('token')).username }, notifyOnNetworkStatusChange: true
  })

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

  const { handleSubmit, reset, getValues, control, trigger } = methods

  const watchType = useWatch({
    control,
    name: 'gender',
  })

  const handleOnClick = (e: any) => {
    e.preventDefault();
    open()
  }

  const onSubmit = async (data: any) => {
    if (!userData)
      return
    let dob = date?.format('yyyy-MM-DDTHH:mm:ssZ')
    dispatch(setLoading(true))

    const options = {
      maxSizeMB: .05,
      maxWidthOrHeight: 700,
      useWebWorker: true
    }

    let compressedImg = null
    if (acceptedFiles.length > 0)
      compressedImg = await imageCompression(acceptedFiles[0], options)
      
    let tmp: UpdateUser = {
      username: userData?.user?.username!,
      role: userData?.user?.role!,
      name: data.name,
      nameC: data.nameC,
      title: userData?.user?.title,
      titleC: userData?.user?.titleC,
      dob: dob,
      gender: data.gender,
      profilePic: compressedImg,
      email: data.email.length === 0 ? null : data.email,
      phone: data.phone.length === 0 ? null : data.phone
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
          username: userData.user?.username,
          name: userData.user?.name,
          nameC: userData.user?.nameC,
          gender: userData.user?.gender.toString(),
          email: userData.user?.email!,
          phone: userData.user?.phone!,
        })
        if (userData.user?.dob != null) {
          setDate(moment(userData.user?.dob, 'yyyy-MM-DDTHH:mm:ss-SSSS'))
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
    <div className="mt-5">
      {(!loading && userData != null) && <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
          </div>
          <Form.Row>
            <Form.Group as={Col} md={5} className="text-center">
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
                {(acceptedFiles.length === 0 && !userData.user?.profilePicURI) && <img src={defaultAvatar} />}
                {(acceptedFiles.length > 0) && <img src={URL.createObjectURL(acceptedFiles[0])} />}
                {(userData.user?.profilePicURI != null && acceptedFiles.length === 0) && <img src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + userData.user.profilePicURI} />}
              </a>
            </Form.Group>
          </Form.Row>
          <hr></hr>
          <Form.Row>
            <InputText
              name="username"
              label="用戶編號"
              md={5}
              isReadOnly={true}
            />
            <Form.Group as={Col} md={{ span: 5, offset: 1 }}>
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
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <InputText
              name="nameC"
              label="中文名稱"
              md={5}
            />
            <Form.Group as={Col} md={{ span: 5, offset: 1 }}>
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
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <InputText
              name="name"
              label="英文名稱"
              md={5}
            />
            <Form.Group as={Col} md={{ span: 5, offset: 1 }}>
              <Button
                className="btn-reset-pwd"
                variant="warning"
                type="button"
                onClick={() => { dispatch(toggleSecurityModal(true)) }}
              >
                <i className="fas fa-key"></i>重設密碼
            </Button>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <InputText
              name="phone"
              label="聯絡電話"
              md={5}
            />
            <InputText
              name="email"
              label="電郵地址"
              md={{ span: 5, offset: 1 }}
            />
          </Form.Row>
          <hr></hr>
          <Form.Row className="text-center">
            <Form.Group>
              <Button
                style={{ background: '#009999' }}
                variant="success"
                type="submit"
              >
                更新
            </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </FormProvider>}
      { (loading && !userData) && <h3>loading data, please wait...</h3>}
    </div>
  );
}

export default PersonalEdit;