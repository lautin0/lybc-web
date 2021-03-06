import usePost from 'hooks/usePost';
import moment from 'moment';
import { useContext } from 'react';
import { Row, Col, Form, Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { getRoleDisplay, getTimePastStr, getTokenValue } from 'utils/utils';
import Validators from 'utils/validator';

import defaultAvatar from "assets/img/default-avatar.png";
import { Post, Role, useUserProfilePicUriQuery } from 'generated/graphql';
import UNIVERSALS from 'Universals';
import { useIntl } from 'react-intl';
import AuthContext from 'context/AuthContext';
import { RootStore } from 'store';

function CommentSection(props: any) {

  const intl = useIntl()

  const setSysFailure = RootStore.useModalStore(state => state.setSysFailure)

  const { id, type } = props

  const { tokenPair } = useContext(AuthContext)

  const location = useLocation();

  const { commentPending, postData, addComment, setCommentPending } = usePost({ id: id })

  const { loading, data: profilePicData } = useUserProfilePicUriQuery({
    variables: {
      username: tokenPair?.token != null ? getTokenValue(tokenPair.token).username : ''
    },
    notifyOnNetworkStatusChange: true
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    setCommentPending(true)
    addComment({
      variables: {
        input: {
          parentId: id,
          title: "",
          subtitle: "",
          type: type,
          content: data.content,
          username: getTokenValue(tokenPair?.token)?.username,
          toUsername: postData?.post?.user.username
        },
      }
    }).then(res => {
      setCommentPending(false)
      reset()
    }).catch(setSysFailure)
  }

  return <Row className="justify-content-md-center mt-5">
    <Col md={12} lg={8} className="mb-3"><h4>{intl.formatMessage({ id: "app.comment" })}</h4></Col>
    {postData && postData.post?.comments.map(c => {
      let e = c as Post
      return <Col key={e._id} md={12} lg={8} className="my-2 d-inline-flex">
        <div className="profile-page pt-3">
          <div className="photo-container" style={{ width: 50, height: 50 }}>
            {!e.user.profilePicURI && <img alt="..." src={defaultAvatar}></img>}
            {e.user.profilePicURI && <img alt="..." src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + e.user.profilePicURI}></img>}
          </div>
        </div>
        <div className="ml-5">
          <div className="mb-2">
            {["SUPER", "ADMIN", "WORKER"].includes(e.user.role) && <OverlayTrigger overlay={(props: any) => <Tooltip {...props}>{getRoleDisplay(e.user.role as Role)}</Tooltip>}>
              <a
                href="/"
                onClick={(e) => e.preventDefault()}
                style={{ fontSize: 20 }}
                className={"comment-user-link " + (e.user.role === "SUPER" ? "super" : (e.user.role === "ADMIN" ? "admin" : (e.user.role === "WORKER" ? "worker" : "")))}
              >{e.username}{["SUPER", "ADMIN", "WORKER"].includes(e.user.role) && <i className={`ml-1 fas fa-star user-badge ${e.user.role === "SUPER" ? "super" : (e.user.role === "ADMIN" ? "admin" : "worker")}-badge`}></i>}</a>
            </OverlayTrigger>}
            {e.user.role === "MEMBER" && <a
              href="/"
              onClick={(e) => e.preventDefault()}
              className={"comment-user-link "}
            >{e.username}</a>}
          </div>
          <p><b>{e.content}</b></p>
          <p className="category">{getTimePastStr(moment(e.creDttm))}</p>
        </div>
      </Col>
    })}
    {(tokenPair?.token && getTokenValue(tokenPair?.token)?.role.toUpperCase() !== 'PUBLIC') && <Col
      style={{ borderTop: '.5px lightgrey solid' }}
      md={12} lg={8}
      className="my-2 pt-5 d-md-inline-flex"
    >
      <div className="profile-page pt-3">
        <div className="photo-container mb-3 my-md-0 ml-3 mx-md-auto" style={{ width: 50, height: 50 }}>
          {(loading || !profilePicData?.user?.profilePicURI) && <img alt="..." src={defaultAvatar}></img>}
          {(!loading && profilePicData?.user?.profilePicURI) && <img alt="..." src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + profilePicData?.user.profilePicURI}></img>}
        </div>
      </div>
      <Form className="ml-md-5 col-md-10 col-sm-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2" style={{ fontSize: 20 }}>{intl.formatMessage({ id: "app.comment.your-comment" })}</div>
        <Form.Control
          {...register('content', { validate: Validators.NoWhiteSpace })}
          style={{
            borderLeft: '.5px lightgrey solid',
            borderRight: '.5px lightgrey solid',
            borderTop: '.5px lightgrey solid',
            borderRadius: '.5rem',
            minHeight: 150,
            fontSize: 18,
            padding: 10
          }}
          as="textarea"
          rows={4}
          placeholder={intl.formatMessage({ id: "app.comment.comment-here" })}
          className="my-3"
        ></Form.Control>
        {errors.content && <label style={{ opacity: .6, color: 'red' }}>{intl.formatMessage({ id: "app.validation.required" })}</label>}
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
            {intl.formatMessage({ id: "app.buttons.send" })}</Button>
        </div>
      </Form>
    </Col>}
    {(tokenPair?.token && getTokenValue(tokenPair?.token)?.role.toUpperCase() === 'PUBLIC') && <Col style={{ borderTop: '.5px lightgrey solid' }} md={12} lg={8} className="my-2 pt-5 d-inline-flex">
      <div style={{ fontSize: 18 }}>{intl.formatMessage({ id: "app.comment.please-use-personal-account-to-comment" })}</div>
    </Col>}
    {!tokenPair?.token && <Col style={{ borderTop: '.5px lightgrey solid' }} md={12} lg={8} className="my-2 pt-5 d-inline-flex">
      <div style={{ fontSize: 18 }}>{intl.formatMessage({ id: "app.comment.please" })} <Link to={`/login-page?relayState=${location.pathname}`}>{intl.formatMessage({ id: "app.login" })}</Link> {intl.formatMessage({ id: "app.comment.to-comment" })}</div>
    </Col>}
  </Row>
}

export default CommentSection;