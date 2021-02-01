import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { Button, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers';
import { toggleSecurityModal } from 'actions/security/security';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from 'graphqls/graphql';
import { NewPassword } from 'generated/graphql';
import { useForm } from 'react-hook-form';
import { setLoading, setSysMessage, setSystemFailure } from 'actions';
import { getTokenValue } from 'utils/utils';

function PasswordResetModal(props: any) {
  const dispatch = useDispatch();
  const isShowModal = useSelector((state: RootState) => state.security.isShowModal)

  const { setError, handleSubmit, register, errors } = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const [changePassword, { data }] = useMutation<
    { input: NewPassword }
  >(CHANGE_PASSWORD);

  const onHide = () => {
    dispatch(toggleSecurityModal(false))
  }

  useEffect(() => {
    let thisRef = React.createRef();
    ReactDOM.createPortal(thisRef, document.body)
  })

  const onSubmit = (d: any) => {
    if(d.newPassword !== d.confirmPassword){
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
    dispatch(setLoading(true))
    let tmp: NewPassword = {
      password: d.password,
      newPassword: d.newPassword,
      username: getTokenValue(localStorage.getItem('token')).username
    }
    changePassword({
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
    if (data !== undefined) {
      dispatch(setSysMessage('app.sys.save-success'))
      dispatch(setLoading(false))
      onHide()
    }
  }, [data, dispatch])

  return (
    <Modal
      {...props}
      show={isShowModal}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="form"
      >
        <Modal.Header
          closeButton
          className="black-close"
          style={{ backgroundColor: 'lightgray' }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            重設密碼
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="ml-2">
            <Form.Row>
              <label>現時密碼</label>
            </Form.Row>
            <Form.Row>
              <InputGroup
                className={
                  "no-border input-lg col-10"
                }
              >
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="now-ui-icons text_caps-small"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  className="form-control"
                  placeholder="請輸入現時密碼"
                  type="password"
                  name="password"
                  ref={register({
                    required: true,
                    // validate: (value) => { return !!value.trim() },
                    // name: 'username'
                  })}
                ></input>
              </InputGroup>
              {errors.password && <label style={{ opacity: .6, color: '#FF3636' }}>必須填寫這欄</label>}
            </Form.Row>
            <Form.Row>
              <label>新密碼</label>
            </Form.Row>
            <Form.Row>
              <InputGroup
                className={
                  "no-border input-lg col-10"
                }
              >
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="now-ui-icons text_caps-small"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  className="form-control"
                  placeholder="請輸入新密碼"
                  type="password"
                  name="newPassword"
                  ref={register({
                    required: true,
                    // validate: (value) => { return !!value.trim() },
                    // name: 'username'
                  })}
                ></input>
              </InputGroup>
              {errors.newPassword && <label style={{ opacity: .6, color: '#FF3636' }}>{(errors['newPassword'] as any)?.message.length <= 0 ? '必須填寫這欄' : (errors['newPassword'] as any)?.message}</label>}
            </Form.Row>
            <Form.Row>
              <label>確認新密碼</label>
            </Form.Row>
            <Form.Row>
              <InputGroup
                className={
                  "no-border input-lg col-10"
                }
              >
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="now-ui-icons text_caps-small"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  className="form-control"
                  placeholder="確認新密碼"
                  type="password"
                  name="confirmPassword"
                  ref={register({
                    required: true,
                    // validate: (value) => { return !!value.trim() },
                    // name: 'username'
                  })}
                ></input>
              </InputGroup>
              {errors.confirmPassword && <label style={{ opacity: .6, color: '#FF3636' }}>({(errors['confirmPassword'] as any)?.message.length <= 0 ? '必須填寫這欄' : (errors['confirmPassword'] as any)?.message})</label>}
            </Form.Row>
          </Container>
          <hr></hr>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">確定</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default PasswordResetModal;