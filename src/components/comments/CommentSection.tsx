import { setSystemFailure } from 'actions';
import { RBRef } from 'adapter/types';
import usePost from 'hooks/usePost';
import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'reducers';
import { getTimePastStr, getTokenValue } from 'utils/utils';
import Validators from 'utils/validator';

function CommentSection(props: any) {

  const { id, type } = props

  const dispatch = useDispatch()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const { commentPending, postData, addComment, setCommentPending } = usePost({ id: id })

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    setCommentPending(true)
    addComment({
      variables: {
        input: {
          parantId: id,
          title: "",
          subtitle: "",
          type: type,
          content: data.content,
          username: getTokenValue(tokenPair?.token)?.username,
          toUsername: postData.post.user.username
        },
      }
    }).catch(e => {
      dispatch(setSystemFailure(e))
    })
  }

  useEffect(() => {
    if (commentPending !== undefined)
      !commentPending && reset()
  }, [commentPending])

  return <Row className="justify-content-md-center mt-5">
    <Col md={12} lg={8} className="mb-3"><h4>回應</h4></Col>
    {postData && postData.post.comments.map((e: any) => {
      return <Col key={e._id} style={{ display: 'inline-flex' }} md={12} lg={8} className="my-2">
        <div className="profile-page pt-3">
          <div className="photo-container" style={{ width: 50, height: 50 }}>
            <img alt="..." src={require("assets/img/default-avatar.png")}></img>
          </div>
        </div>
        <div className="ml-5">
          <div className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 20 }}>{e.username}</a></div>
          <p><b>{e.content}</b></p>
          <p className="category">{getTimePastStr(moment(e.creDttm))}</p>
        </div>
      </Col>
    })}
    {tokenPair?.token && <Col style={{ display: 'inline-flex', borderTop: '.5px lightgrey solid' }} md={12} lg={8} className="my-2 pt-5">
      <div className="profile-page pt-3">
        <div className="photo-container" style={{ width: 50, height: 50 }}>
          <img alt="..." src={require("assets/img/default-avatar.png")}></img>
        </div>
      </div>
      <Form className="ml-5 col-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2" style={{ fontSize: 20 }}>您的回應</div>
        <Form.Control
          style={{
            borderLeft: '.5px lightgrey solid',
            borderRight: '.5px lightgrey solid',
            borderTop: '.5px lightgrey solid',
            borderRadius: '.5rem',
            minHeight: 150,
            fontSize: 18,
            padding: 10
          }}
          name="content"
          ref={register({ validate: Validators.Default }) as RBRef}
          as="textarea"
          rows={4}
          placeholder="在此分享您的回應..."
          className="my-3"
        ></Form.Control>
        <div className="text-right">
          <Button
            variant="primary"
            type="submit"
          >
            {!commentPending && <i className="fas fa-paper-plane mr-2"></i>}
            {commentPending && <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />}
            發送</Button>
        </div>
      </Form>
    </Col>}
    {!tokenPair?.token && <Col style={{ display: 'inline-flex', borderTop: '.5px lightgrey solid' }} md={12} lg={8} className="my-2 pt-5">
      <div style={{ fontSize: 18 }}>請先 <Link to="/login-page">登入</Link> 以發表回應</div>
    </Col>}
  </Row>
}

export default CommentSection;