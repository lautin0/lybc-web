import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { Button, Form, Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useStore } from 'store';
import SharingForm from 'views/articles/SharingForm';
import { useForm, FormProvider } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setSysMessage, setSystemFailure } from 'actions';
import { MutationPendPostArgs, MutationUpdatePendingPostArgs, NewPendingPost, PendingPost, PostStatus, UpdatePendingPost } from 'generated/graphql';
import { getTokenValue } from 'utils/utils';
import { RootState } from 'reducers';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_PENDING_POST, PEND_POST, UPDATE_PENDING_POST } from 'graphqls/graphql';

function SharingModal(props: any) {

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const dispatch = useDispatch()

  const [pendPost, { data }] = useMutation<
    { pendingPost: PendingPost },
    MutationPendPostArgs
  >(PEND_POST);
  const [updatePendingPost, { data: updateData }] = useMutation<
    { pendingPost: PendingPost },
    MutationUpdatePendingPostArgs
  >(UPDATE_PENDING_POST);

  const [readOnly, setReadOnly] = useState(false)

  const title = useStore(state => state.title)
  const isOpen = useStore(state => state.isOpen)
  const pendingPostID = useStore(state => state.pendingPostID)
  const setOpen = useStore(state => state.setOpen)
  const setPendingPostID = useStore(state => state.setPendingPostID)

  const intl = useIntl()

  const [loadingPendingPost, { called, loading, data: pPostData, refetch }] = useLazyQuery<{ pendingPost: PendingPost }, { oid: string }>
    (GET_PENDING_POST, { variables: { oid: pendingPostID! }, notifyOnNetworkStatusChange: true });

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
            status: PostStatus.Pending
          },
          doc: file
        }
      }).catch((err: any) => {
        dispatch(setLoading(false))
        dispatch(setSystemFailure(err))
        onHide()
      })
    } else {
      pendPost({
        variables: {
          input: {
            ...tmp
          },
          doc: file
        }
      }).catch((err: any) => {
        dispatch(setLoading(false))
        dispatch(setSystemFailure(err))
        onHide()
      })
    }
  }

  const withdraw = () => {
    dispatch(setLoading(true))
    setReadOnly(false)
    let tmp: UpdatePendingPost = {
      _id: pPostData?.pendingPost._id,
      status: PostStatus.Withdraw,
      username: getTokenValue(tokenPair?.token).username
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
      onHide()
    })
  }

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setSysMessage('app.sys.save-success'))
      dispatch(setLoading(false))
      onHide()
    }
  }, [data, dispatch, reset])

  useEffect(() => {
    if (updateData !== undefined) {
      dispatch(setSysMessage('app.sys.save-success'))
      dispatch(setLoading(false))
      onHide()
    }
  }, [updateData, dispatch, reset])

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
    if (pendingPostID != null) {
      loadingPendingPost()
    }
  }, [pendingPostID])

  useEffect(() => {
    if (pPostData != null) {
      reset({
        title: pPostData.pendingPost.title,
        subtitle: pPostData.pendingPost.subtitle,
        remarks: pPostData.pendingPost.remarks == null ? "" : pPostData.pendingPost.remarks
      })
      setReadOnly(true)
    }
  }, [pPostData])

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
              <SharingForm status={pPostData?.pendingPost.status} readOnly={readOnly} dropzoneMethods={dropzoneMethods} />
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-end">
            {(pPostData?.pendingPost.status == null || pPostData.pendingPost.status === PostStatus.Withhold) && <div>
              <Button type="submit">{intl.formatMessage({ id: "app.buttons.submit" })}</Button>
              <Button onClick={onHide} variant="secondary" className="ml-2">{intl.formatMessage({ id: "app.buttons.cancel" })}</Button>
            </div>}
            {(pPostData?.pendingPost.status != null && pPostData.pendingPost.status === PostStatus.Pending) && <div>
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