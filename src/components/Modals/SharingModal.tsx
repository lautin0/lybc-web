import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { Button, Form, Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useStore } from 'store';
import SharingForm from 'views/articles/SharingForm';
import { useForm, FormProvider } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { setLoading, setSysMessage, setSystemFailure } from 'actions';
import { NewPendingPost, PostStatus, UpdatePendingPost, usePendingPostLazyQuery, usePendPostMutation, useUpdatePendingPostMutation } from 'generated/graphql';
import { getTokenValue } from 'utils/utils';
import AuthContext from 'context/AuthContext';

function SharingModal(props: any) {

  const { tokenPair } = useContext(AuthContext)

  const dispatch = useDispatch()

  const [pendPost] = usePendPostMutation()
  const [updatePendingPost] = useUpdatePendingPostMutation()

  const [readOnly, setReadOnly] = useState(false)

  const title = useStore(state => state.title)
  const isOpen = useStore(state => state.isOpen)
  const pendingPostID = useStore(state => state.pendingPostID)
  const setOpen = useStore(state => state.setOpen)
  const setPendingPostID = useStore(state => state.setPendingPostID)

  const intl = useIntl()

  // const [loadingPendingPost, { called, loading, data: pPostData, refetch }] = useLazyQuery<{ pendingPost: PendingPost }, { oid: string }>
  //   (GET_PENDING_POST, { variables: { oid: pendingPostID! }, notifyOnNetworkStatusChange: true });

  const [loadingPendingPost, { data: pPostData }] = usePendingPostLazyQuery({
    variables: { oid: pendingPostID! },
    notifyOnNetworkStatusChange: true
  })

  const dropzoneMethods = useDropzone({
    accept: '.docx,.pdf'
  });

  const { acceptedFiles } = dropzoneMethods

  const methods = useForm({
    defaultValues: {
      title: '',
      subtitle: '',
      remarks: ''
    }
  })

  const { handleSubmit, reset } = methods

  const onSubmit = (data: any) => {
    dispatch(setLoading(true))
    let tmp: NewPendingPost = { ...data }
    tmp.username = getTokenValue(tokenPair?.token).username
    let file = acceptedFiles[0]
    if (pendingPostID.length > 0) {
      updatePendingPost({
        variables: {
          input: {
            _id: pendingPostID,
            username: getTokenValue(tokenPair?.token).username,
            status: PostStatus.Pending,
            doc: file
          },
        }
      }).then(res => {
        dispatch(setSysMessage('app.sys.save-success'))
        onHide()
      })
        .catch((err: any) => {
          dispatch(setSystemFailure(err))
          onHide()
        }).finally(() => dispatch(setLoading(false)))
    } else {
      pendPost({
        variables: {
          input: {
            ...tmp
            , doc: file
          },
        }
      }).then(res => {
        dispatch(setSysMessage('app.sys.save-success'))
        onHide()
      })
        .catch((err: any) => {
          dispatch(setSystemFailure(err))
          onHide()
        }).finally(() => dispatch(setLoading(false)))
    }
  }

  const withdraw = () => {
    dispatch(setLoading(true))
    setReadOnly(false)
    let tmp: UpdatePendingPost = {
      _id: pPostData?.pendingPost?._id,
      status: PostStatus.Withdraw,
      username: getTokenValue(tokenPair?.token).username
    }
    updatePendingPost({
      variables: {
        input: {
          ...tmp
        },
      }
    }).then(res => {
      dispatch(setSysMessage('app.sys.save-success'))
      onHide()
    })
      .catch((err: any) => {
        dispatch(setSystemFailure(err))
        onHide()
      }).finally(() => dispatch(setLoading(false)))
  }

  const onHide = () => {
    reset({
      title: '',
      subtitle: '',
      remarks: ''
    })
    setReadOnly(false)
    setOpen(false)
    setPendingPostID('')
  }

  useEffect(() => {
    if (pendingPostID !== null && loadingPendingPost !== null) {
      loadingPendingPost()
    }
  }, [pendingPostID, loadingPendingPost])

  useEffect(() => {
    if (pPostData != null) {
      reset({
        title: pPostData.pendingPost?.title,
        subtitle: pPostData.pendingPost?.subtitle,
        remarks: !pPostData.pendingPost?.remarks ? "" : pPostData.pendingPost.remarks
      })
      setReadOnly(true)
    }
  }, [pPostData, reset])

  useEffect(() => {
    let thisRef = React.createRef();
    ReactDOM.createPortal(thisRef, document.body)
  })

  return (
    <Modal
      {...props}
      show={isOpen}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton className="black-close">
            <Modal.Title id="contained-modal-title-vcenter" as="h3">
              {intl.formatMessage({ id: title })}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{ minHeight: '40vh', overflowY: 'scroll' }}
            >
              <SharingForm status={pPostData?.pendingPost?.status} readOnly={readOnly} dropzoneMethods={dropzoneMethods} />
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-end">
            {(!pPostData?.pendingPost?.status || pPostData.pendingPost.status === PostStatus.Withhold) && <div>
              <Button type="submit">{intl.formatMessage({ id: "app.buttons.submit" })}</Button>
              <Button onClick={onHide} variant="secondary" className="ml-2">{intl.formatMessage({ id: "app.buttons.cancel" })}</Button>
            </div>}
            {(pPostData?.pendingPost?.status && pPostData.pendingPost.status === PostStatus.Pending) && <div>
              <Button
                type="button"
                variant="danger"
                onClick={withdraw}
              >{intl.formatMessage({ id: "app.buttons.withdraw" })}</Button>
            </div>}
          </Modal.Footer>
        </Form>
      </FormProvider>
    </Modal >
  );
}

export default SharingModal;