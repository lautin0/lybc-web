import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { Button, Form, Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useStore } from 'store';
import SharingForm from 'views/articles/SharingForm';
import { useForm, FormProvider } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setSysMessage, setSystemFailure } from 'actions';
import { NewPendingPost, PendingPost } from 'generated/graphql';
import { getTokenValue } from 'utils/utils';
import { RootState } from 'reducers';
import { useMutation } from '@apollo/client';
import { PEND_POST } from 'graphqls/graphql';

function SharingModal(props: any) {

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const dispatch = useDispatch()

  const [pendPost, { data }] = useMutation<
    { pendingPost: PendingPost },
    { input: NewPendingPost, doc: any }
  >(PEND_POST);

  const title = useStore(state => state.title)
  const isOpen = useStore(state => state.isOpen)
  const setOpen = useStore(state => state.setOpen)

  const intl = useIntl()

  const dropzoneMethods = useDropzone({
    accept: '.docx,.pdf'
  });

  const { acceptedFiles } = dropzoneMethods

  const methods = useForm({
    defaultValues: {}
  })

  const { handleSubmit, reset } = methods

  const onSubmit = (data: any) => {
    dispatch(setLoading(true))
    let tmp: NewPendingPost = { ...data }
    tmp.username = getTokenValue(tokenPair?.token).username
    let file = acceptedFiles[0]
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
      reset();
    })
  }

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setSysMessage('app.sys.save-success'))
      dispatch(setLoading(false))
      reset();
    }
  }, [data, dispatch, reset])

  const onHide = () => {
    setOpen(false)
  }

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
              <SharingForm dropzoneMethods={dropzoneMethods} />
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-end">
            <div>
              <Button type="submit" onClick={onHide}>{intl.formatMessage({ id: "app.buttons.save" })}</Button>
              <Button onClick={onHide} variant="secondary" className="ml-2">{intl.formatMessage({ id: "app.buttons.cancel" })}</Button>
            </div>
          </Modal.Footer>
        </Form>
      </FormProvider>
    </Modal >
  );
}

export default SharingModal;