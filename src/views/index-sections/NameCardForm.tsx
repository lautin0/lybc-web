import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import _ from 'lodash'

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
  Container,
  Row
} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Gender, NameCard, NewNameCard } from "generated/graphql";
import { useMutation } from "@apollo/client";
import { ADD_NAMECARD } from "graphqls/graphql";
import { setLoading, setSysMessage, setSystemFailure } from "actions";
import Validators from "utils/validator";
import { useLocation } from "react-router-dom";

// core components

export default function NameCardForm() {

  const location = useLocation()

  const dispatch = useDispatch();

  const [nameFocus, setNameFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [addNameCard, { data }] = useMutation<
    { createNameCard: NameCard },
    { input: NewNameCard }
  >(ADD_NAMECARD);

  const methods = useForm({
    defaultValues: {
      name: '',
      gender: '',
      email: '',
      phone: ''
    }
  });

  const { handleSubmit, reset, getValues, control, errors, register, trigger } = methods

  const onSubmit = (data: any) => {
    dispatch(setLoading(true))
    addNameCard({
      variables: {
        input: {
          name: data.name,
          email: data.email.length > 0 ? data.email : null,
          gender: data.gender.length > 0 ? data.gender : null,
          phone: data.phone.length > 0 ? data.phone : null
        },
      }
    }).catch((err: any) => {
      dispatch(setLoading(false))
      dispatch(setSystemFailure(err))
      reset();
    })
  }

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setSysMessage('謝謝你對教會的興趣! 我們會盡快聯絡你'))
      dispatch(setLoading(false))
      reset();
    }
  }, [data, dispatch, reset])

  useEffect(() => {
    reset();
  }, [location])

  return (
    <>
      <div className="new-comer-section"></div>
      <div className="d-flex flex-wrap">
        <div className="flex-fill my-auto text-center" style={{ zIndex: 1 }}>
          <h2 className="pt-5 name-card-title">讓綠楊家認識您</h2>
        </div>
        <div className="flex-fill mt-5 mb-5">
          <Container>
            <Row>
              <Card className="col-sm-12 col-md-10 p-3 m-2" style={{ borderRadius: '0.7rem' }}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Card.Header className="text-left">
                    <h3 className="title-up description">
                      留下資料，以便我們聯絡您
                    </h3>
                  </Card.Header>
                  <Card.Body>
                    <InputGroup
                      className={
                        "no-border" + (nameFocus ? " input-group-focus" : "")
                      }
                    >
                      <label className="col-sm-4 col-md-2 col-form-label p-2">
                        名字
                      </label>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        style={{ maxWidth: 300 }}
                        placeholder="輸入名字"
                        type="text"
                        name="name"
                        ref={register({ validate: Validators.NoWhiteSpace })}
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => { setNameFocus(false); }}
                      ></FormControl>
                    </InputGroup>
                    {errors.name && <label style={{ opacity: .6, color: 'red' }}>必須填寫這欄</label>}
                    <InputGroup
                      className={
                        "no-border" + (phoneFocus ? " input-group-focus" : "")
                      }
                    >
                      <label className="col-sm-4 col-md-2 col-form-label p-2">
                        聯絡電話
                      </label>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="now-ui-icons tech_mobile"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        style={{ maxWidth: 300 }}
                        placeholder="輸入聯絡電話"
                        type="text"
                        onFocus={() => setPhoneFocus(true)}
                        onBlur={() => { setPhoneFocus(false); }}
                        name="phone"
                        ref={register({ validate: Validators.NoWhiteSpaceForWhiteSpace(getValues("email")) })}
                      ></FormControl>
                    </InputGroup>
                    {errors.phone && <label style={{ opacity: .6, color: 'red' }}>必須提供其中一種聯絡方式</label>}
                    <InputGroup
                      className={
                        "no-border" + (emailFocus ? " input-group-focus" : "")
                      }
                    >
                      <label className="col-sm-4 col-md-2 col-form-label p-2">
                        電子郵件
                      </label>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        style={{ maxWidth: 400 }}
                        placeholder="輸入電子郵件"
                        type="text"
                        name="email"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => { setEmailFocus(false); }}
                        ref={register({ validate: Validators.NoWhiteSpaceForWhiteSpace(getValues("phone")) })}
                      ></FormControl>
                    </InputGroup>
                    {errors.email && <label style={{ opacity: .6, color: 'red' }}>必須提供其中一種聯絡方式</label>}
                    <InputGroup>
                      <label className="col-sm-4 col-md-2 col-form-label p-2">
                        稱呼
                      </label>
                      <div className="d-flex justify-content-start" style={{ marginTop: -5 }}>
                        <Controller
                          render={({ onChange, onBlur, value }) => <Form.Check
                            className="form-check-radio mx-2"
                            type="radio"
                            id="rbM"
                            value={Gender.Male.toString()}
                            onChange={(val) => onChange(val.currentTarget.value)}
                            checked={Gender.Male.toString() === getValues().gender}
                            name="rbGender"
                            label={<><span className="form-check-sign"></span>先生</>}
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
                            label={<><span className="form-check-sign"></span>女士</>}
                          ></Form.Check>}
                          control={control}
                          name="gender"
                        />
                      </div>
                    </InputGroup>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button
                      className="btn-info btn-round"
                      // href="#pablo"
                      // onClick={() => dispatch(saveNewComer(person))}
                      type="submit"
                      size="lg"
                    >
                      提交
                    </Button>
                  </Card.Footer>
                </Form>
              </Card>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}