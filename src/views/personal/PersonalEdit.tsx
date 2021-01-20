import { useMutation, useQuery } from "@apollo/client";
import { setLoading, setSysMessage, setSystemFailure } from "actions";
import InputText from "components/Forms/InputText";
import { Gender, UpdateUser, User } from "generated/graphql";
import { GET_USER_BY_USERNAME, UPDATE_USER } from "graphqls/graphql";
import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getTokenValue } from "utils/utils";
import { SingleDatePicker } from 'react-dates';

import defaultAvator from "assets/img/default-avatar.png";
import { Moment } from "moment";
import { toggleSecurityModal } from "actions/security/security";
import moment from "moment";
import UNIVERSALS from "Universals";

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

  const [updateUser, { data: updatedUserData }] = useMutation<
    { updateUser: User },
    { input: UpdateUser }
  >(UPDATE_USER);

  const { loading, data: userData, refetch } = useQuery<{ user: User }, { username: string }>(GET_USER_BY_USERNAME, { variables: { username: getTokenValue(localStorage.getItem('token')).username }, notifyOnNetworkStatusChange: true })

  const methods = useForm({
    defaultValues: {
      username: '',
      name: '',
      nameC: '',
      gender: '',
    }
  });

  const { handleSubmit, register, reset } = methods

  const handleOnClick = (e: any) => {
    e.preventDefault();
    open()
  }

  const onSubmit = (data: any) => {
    if (userData == null)
      return
    let dob = date?.format('yyyy-MM-DDTHH:mm:ssZ')
    console.log(dob)
    dispatch(setLoading(true))
    let tmp: UpdateUser = {
      username: userData?.user.username,
      role: userData?.user.role,
      name: data.name,
      nameC: data.nameC,
      title: userData?.user.title,
      titleC: userData?.user.titleC,
      dob: dob,
      gender: data.gender,
      profilePic: acceptedFiles[0]
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
      dispatch(setSysMessage('儲存成功!'))
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
    }
  }, [location, dispatch, refetch])

  useEffect(() => {
    if (loading === false) {
      dispatch(setLoading(false))
    }
  }, [loading, dispatch])

  return (
    <>
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
                {(acceptedFiles.length == 0 && userData.user.profilePicURI == null) && <img src={defaultAvator} />}
                {(acceptedFiles.length > 0) && <img src={URL.createObjectURL(acceptedFiles[0])} />}
                {(userData.user.profilePicURI != null && acceptedFiles.length == 0) && <img src={UNIVERSALS.GOOGLE_API_ENDPOINT + userData.user.profilePicURI} />}
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
                <Form.Check
                  className="form-check-radio mx-2"
                  type="radio"
                  name="gender"
                  disabled={true}
                  ref={register({})}
                  value={Gender.Male.toString()}
                  label={<><span className="form-check-sign"></span>男</>}
                ></Form.Check>
                <Form.Check
                  className="form-check-radio mx-2"
                  type="radio"
                  name="gender"
                  disabled={true}
                  ref={register({})}
                  value={Gender.Female.toString()}
                  label={<><span className="form-check-sign"></span>女</>}
                ></Form.Check>
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
                style={{ position: 'absolute', bottom: 0, marginBottom: 0 }}
                variant="warning"
                type="button"
                onClick={() => { dispatch(toggleSecurityModal(true)) }}
              >
                <i className="fas fa-key"></i>重設密碼
            </Button>
            </Form.Group>
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
      {(loading && userData == null) && <h3>loading data, please wait...</h3>}
    </>
  );
}

export default PersonalEdit;