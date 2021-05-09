import { useMutation, useQuery } from '@apollo/client'
import { setLoading, setSystemFailure, setSysMessage } from 'actions'
import { RBRef } from 'adapter/types'
import DropzoneCustom from 'components/DropzoneCustom'
import InputQuill from 'components/Forms/InputQuill'
import InputText from 'components/Forms/InputText'
import { Post, NewPost, PostType, PendingPost, UpdatePendingPost, PostStatus, QueryPendingPostArgs, MutationUpdatePendingPostArgs, MutationApprovePostArgs, useUpdatePendingPostMutation, usePendingPostQuery, useApprovePostMutation } from 'generated/graphql'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Form, Button, Accordion, Card } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { RootState } from 'reducers'
import UNIVERSALS from 'Universals'
import { getTokenValue } from 'utils/utils'
import Validators from 'utils/validator'

function PendingPostEdit() {

  const intl = useIntl()

  const [readOnly, setReadOnly] = useState(false)

  const { id } = useParams<any>()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const history = useHistory()

  const dispatch = useDispatch()

  const [documentURI, setDocumentURI] = useState("")

  const [updatePendingPost, { data: updatePendingPostData }] = useUpdatePendingPostMutation()

  const { loading, data: pData, refetch } = usePendingPostQuery({
    variables: { oid: id }, notifyOnNetworkStatusChange: true
  })
  const dropzoneMethods = useDropzone({
    accept: 'image/*'
  });

  const { acceptedFiles } = dropzoneMethods

  const [approvePost, { data }] = useApprovePostMutation()

  const methods = useForm({
    defaultValues: {
      username: '',
      title: '',
      subtitle: '',
      documentURI: '',
      remarks: '',
      status: '',
      creDttm: '',
      content: ''
    }
  });

  const { handleSubmit, getValues, reset, register } = methods

  useEffect(() => {
    if (pData !== undefined) {
      reset({
        ...pData.pendingPost,
        remarks: pData.pendingPost?.remarks!,
        status: pData.pendingPost?.status.toString(),
        creDttm: moment(pData.pendingPost?.creDttm).format('DD/MM/YYYY')
      })
      setDocumentURI(pData.pendingPost?.documentURI as string)
      if (pData.pendingPost?.status !== PostStatus.Pending)
        setReadOnly(true)
    }
  }, [pData, reset])

  const onSubmit = (data: any) => {
    dispatch(setLoading(true))
    let tmp: NewPost = {
      title: data.title,
      subtitle: data.subtitle,
      type: data.type,
      content: data.content,
      username: data.username,
      toUsername: data.username
    }
    tmp.type = PostType.Sharing
    tmp.username = getTokenValue(tokenPair?.token).username
    let file = acceptedFiles[0]
    let pPostTmp: UpdatePendingPost = {
      _id: pData?.pendingPost?._id,
      status: PostStatus.Approved,
      remarks: getValues("remarks") as string,
      username: data.username
    }
    approvePost({
      variables: {
        input: {
          ...tmp
        },
        image: file,
        postRefInput: pPostTmp
      }
    }).catch((err: any) => {
      dispatch(setLoading(false))
      dispatch(setSystemFailure(err))
      reset();
    })
  }

  const stripFileName = (s: string) => {
    if (s == null) return ""
    const word = '/lybcstorage/'
    return s.substring(word.length, s.length)
  }

  const rejectPost = () => {
    handlePost(PostStatus.Rejected)
  }

  const withholdPost = () => {
    handlePost(PostStatus.Withhold)
  }

  const resumePost = () => {
    handlePost(PostStatus.Pending)
  }

  const handlePost = (s: PostStatus) => {
    dispatch(setLoading(true))
    setReadOnly(false)
    let tmp: UpdatePendingPost = {
      _id: pData?.pendingPost?._id,
      status: s,
      remarks: getValues("remarks") as string,
      username: getValues("username") as string,
    }
    updatePendingPost({
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

  const getBadgeClassName = (s: PostStatus) => {
    switch (s) {
      case PostStatus.Approved:
        return "success"
      case PostStatus.Rejected:
      case PostStatus.Withdraw:
        return "danger"
      case PostStatus.Pending:
        return "primary"
      case PostStatus.Withhold:
        return "warning"
    }
  }

  const getStatus = (s: PostStatus) => {
    switch (s) {
      case PostStatus.Approved:
        return "已發佈"
      case PostStatus.Rejected:
        return "已拒絕"
      case PostStatus.Pending:
        return "待審閱"
      case PostStatus.Withhold:
        return "暫緩發佈"
      case PostStatus.Withdraw:
        return "已撤回"
    }
  }

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setSysMessage('app.sys.save-success'))
      dispatch(setLoading(false))
      reset();
      history.push('/admin/post/pending')
    }
  }, [data, dispatch, reset, history])

  useEffect(() => {
    if (updatePendingPostData !== undefined) {
      let msg = 'app.sys.save-success'
      if (updatePendingPostData?.updatePendingPost.status === PostStatus.Rejected)
        msg = 'app.post.rejected'
      else if (updatePendingPostData?.updatePendingPost.status === PostStatus.Approved)
        msg = 'app.post.approved'
      else if (updatePendingPostData?.updatePendingPost.status === PostStatus.Withhold)
        msg = 'app.post.withheld'
      dispatch(setSysMessage(msg))
      dispatch(setLoading(false))
      reset();
      refetch();
      if (updatePendingPostData?.updatePendingPost.status !== PostStatus.Pending)
        setReadOnly(true)
    }
  }, [updatePendingPostData, dispatch, reset, history])

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="category mt-5" style={{ color: 'black' }}>管理員代發文章</h2>
        <div className="mb-3" style={{ fontSize: 22 }}>
          狀態: <span style={{ position: 'relative', fontSize: 22 }} className={`p-2 badge badge-${getBadgeClassName(pData?.pendingPost?.status! as PostStatus)}`}>{getStatus(pData?.pendingPost?.status! as PostStatus)}</span>
        </div>
        <Accordion defaultActiveKey="0">
          {!readOnly && <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ color: '#0056b3', fontWeight: 'bold' }}>
              第一部份：文章資料
            </Accordion.Toggle>
          </Card.Header>}
          <Accordion.Collapse eventKey="0">
            <div>
              <Form.Row>
                <InputText
                  md={5}
                  sm={12}
                  name="title"
                  label="主題"
                  isReadOnly={true}
                />
              </Form.Row>
              <Form.Row>
                <InputText
                  md={11}
                  sm={12}
                  name="subtitle"
                  label="副標題"
                  isReadOnly={true}
                />
              </Form.Row>
              <Form.Row>
                <InputText
                  md={5}
                  sm={12}
                  name="username"
                  label="投稿人"
                  isReadOnly={true}
                />
                <InputText
                  md={{ offset: 1, span: 5 }}
                  sm={12}
                  name="creDttm"
                  label="投稿日期"
                  isReadOnly={true}
                />
              </Form.Row>
              <Form.Row>
                <div
                  style={{
                    border: 'solid 1px',
                    borderRadius: '0.5rem',
                    borderStyle: 'dashed'
                  }}
                  className="mr-3 col-md-5 col-sm-12"
                >
                  <label className="mb-5" style={{ fontSize: 22 }}>檢視上傳的檔案</label>
                  <a href={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + documentURI} rel="noopener noreferrer" target="_blank" className="dl-link text-center">
                    <div>
                      <i style={{ fontSize: 72, color: '#f04100' }} className="fas fa-file-alt"></i>
                    </div>
                    <div>
                      <label style={{ fontSize: 18, overflowWrap: 'anywhere' }}>{stripFileName(documentURI)}</label>
                    </div>
                  </a>
                </div>
              </Form.Row>
              <div className="mb-2" style={{ fontSize: 20 }}>備註：</div>
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
                name="remarks"
                ref={register({ validate: Validators.Default }) as RBRef}
                as="textarea"
                rows={4}
                readOnly={readOnly}
                className="my-3"
              ></Form.Control>
              <Form.Row>
                <Form.Group>
                  {!readOnly && <Button
                    variant="warning"
                    onClick={withholdPost}
                  >
                    暫緩發佈
                  </Button>}
                  {!readOnly && <Button
                    variant="danger"
                    className="mx-3"
                    onClick={rejectPost}
                  >
                    拒絕發佈
                  </Button>}
                </Form.Group>
              </Form.Row>
              {(readOnly && (pData?.pendingPost?.status != null && ![PostStatus.Rejected, PostStatus.Approved, PostStatus.Withdraw].includes(pData?.pendingPost.status!))) && <Form.Row>
                <Form.Group>
                  <Button
                    variant="success"
                    style={{ background: '#009999' }}
                    onClick={resumePost}
                  >
                    恢復處理
                  </Button>
                </Form.Group>
              </Form.Row>}
            </div>
          </Accordion.Collapse>
          {!readOnly && <><Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1" style={{ color: '#0056b3', fontWeight: 'bold' }}>
              第二部份：發佈
            </Accordion.Toggle>
          </Card.Header>
            <Accordion.Collapse eventKey="1">
              <div>
                <Form.Row>
                  <InputQuill name="content" label="內文" isReadOnly={false} />
                </Form.Row>
                <label className="mt-5">選擇封面</label>
                <DropzoneCustom {...dropzoneMethods} />
                <Form.Row>
                  <Form.Group>
                    <Button
                      variant="primary"
                      style={{ background: '#009999' }}
                      type="submit"
                    >
                      批准及發佈
                    </Button>
                    <Button
                      variant="secondary"
                      className="mx-3"
                      onClick={() => {
                        reset()
                      }}
                    >
                      重設
                  </Button>
                  </Form.Group>
                </Form.Row>
              </div>
            </Accordion.Collapse></>}
        </Accordion>
      </Form>
    </FormProvider>
  );
}

export default PendingPostEdit