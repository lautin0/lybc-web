import classes from '*.module.css'
import { useMutation, useQuery } from '@apollo/client'
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, makeStyles, Typography } from '@material-ui/core'
import { cyan, green, red, yellow } from '@material-ui/core/colors'
import { ExpandMore } from '@material-ui/icons'
import { setLoading } from 'actions'
import { RBRef } from 'adapter/types'
import DropzoneCustom from 'components/DropzoneCustom'
import InputQuill from 'components/Forms/InputQuill'
import InputText from 'components/Forms/InputText'
import MuiInputText from 'components/Forms/MuiInputText'
import { Post, NewPost, PostType, PendingPost, UpdatePendingPost, PostStatus, QueryPendingPostArgs, MutationUpdatePendingPostArgs, MutationApprovePostArgs, useUpdatePendingPostMutation, usePendingPostQuery, useApprovePostMutation } from 'generated/graphql'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Form, Card } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { RootState } from 'reducers'
import { useModalStore } from 'store'
import UNIVERSALS from 'Universals'
import { getTokenValue } from 'utils/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  success: {
    backgroundColor: green[600],
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(1),
  },
  danger: {
    backgroundColor: red[600],
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(1),
  },
  warning: {
    backgroundColor: yellow[700],
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(1),
  },
  info: {
    backgroundColor: cyan[800],
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(1),
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))


function PendingPostEdit() {

  const intl = useIntl()

  const [readOnly, setReadOnly] = useState(false)

  const { id } = useParams<any>()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const history = useHistory()

  const dispatch = useDispatch()

  const classes = useStyles()

  const setMessage = useModalStore(state => state.setMessage)
  const setModalError = useModalStore(state => state.setError)

  const [documentURI, setDocumentURI] = useState("")

  const [updatePendingPost, { data: updatePendingPostData }] = useUpdatePendingPostMutation()

  const { loading, data: pData, refetch } = usePendingPostQuery({ variables: { oid: id }, notifyOnNetworkStatusChange: true })

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
      setDocumentURI(pData.pendingPost?.documentURI!)
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
      setModalError(err)
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
      setModalError(err)
    })
  }

  const getBadgeClassName = (s: PostStatus) => {
    switch (s) {
      case PostStatus.Approved:
        return classes.success
      case PostStatus.Rejected:
      case PostStatus.Withdraw:
        return classes.danger
      case PostStatus.Pending:
      case PostStatus.Withhold:
        return classes.warning
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
      setMessage('app.sys.save-success')
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
      setMessage(msg)
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
        {/* <h2 className="category mt-5" style={{ color: 'black' }}>管理員代發文章</h2> */}
        <Typography className="my-3" variant="h4">管理員代發文章</Typography>
        <Typography className="mb-3" variant="h5">
          狀態: <Chip label={getStatus(pData?.pendingPost?.status!)} className={getBadgeClassName(pData?.pendingPost?.status!)} />
        </Typography>
        <Accordion defaultExpanded={true}>
          {!readOnly && <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography variant="h6" className={classes.heading}>第一部份：文章資料</Typography>
          </AccordionSummary>}
          <AccordionDetails className="d-block">
            <div>
              <Form.Row className="my-5">
                <MuiInputText
                  md={5}
                  xs={12}
                  name="title"
                  label="主題"
                  isReadOnly={true}
                />
              </Form.Row>
              <Form.Row className="mb-3">
                <MuiInputText
                  md={11}
                  xs={12}
                  name="subtitle"
                  label="副標題"
                  isReadOnly={true}
                />
              </Form.Row>
              <Form.Row className="mb-3">
                <MuiInputText
                  md={5}
                  xs={12}
                  name="username"
                  label="投稿人"
                  isReadOnly={true}
                />
                <MuiInputText
                  md={5}
                  xs={12}
                  name="creDttm"
                  label="投稿日期"
                  isReadOnly={true}
                />
              </Form.Row>
              <Form.Row className="mb-3">
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
              <Typography variant="h5">備註：</Typography>
              <MuiInputText
                name="remarks"
                multiline={true}
                rows={4}
                isReadOnly={readOnly}
              ></MuiInputText>
              <Form.Row className="mb-3">
                <Form.Group>
                  {!readOnly && <Button
                    variant="contained"
                    className={classes.warning}
                    onClick={withholdPost}
                  >
                    暫緩發佈
                  </Button>}
                  {!readOnly && <Button
                    variant="contained"
                    className={classes.danger}
                    onClick={rejectPost}
                  >
                    拒絕發佈
                  </Button>}
                </Form.Group>
              </Form.Row>
              {(readOnly && (pData?.pendingPost?.status != null && ![PostStatus.Rejected, PostStatus.Approved, PostStatus.Withdraw].includes(pData?.pendingPost.status!))) && <Form.Row className="mb-3">
                <Form.Group>
                  <Button
                    variant="contained"
                    className={classes.success}
                    onClick={resumePost}
                  >
                    恢復處理
                  </Button>
                </Form.Group>
              </Form.Row>}
            </div>
          </AccordionDetails>
        </Accordion>
        {!readOnly && <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography variant="h6" className={classes.heading}>第二部份：發佈</Typography>
          </AccordionSummary>
          <AccordionDetails className="d-block">
            <div>
              <Form.Row>
                <InputQuill name="content" label="內文" isReadOnly={false} />
              </Form.Row>
              <label className="mt-5">選擇封面</label>
              <DropzoneCustom {...dropzoneMethods} />
              <Form.Row>
                <Form.Group>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    批准及發佈
                    </Button>
                  <Button
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
          </AccordionDetails>
        </Accordion>}
      </Form>
    </FormProvider >
  );
}

export default PendingPostEdit