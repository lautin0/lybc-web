import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { Button, Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useStore } from 'store';
import SharingForm from 'views/articles/SharingForm';

function SharingModal(props: any) {

  const title = useStore(state => state.title)
  const isOpen = useStore(state => state.isOpen)
  const setOpen = useStore(state => state.setOpen)

  const intl = useIntl()

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
      <Modal.Header closeButton className="black-close">
        <Modal.Title id="contained-modal-title-vcenter" as="h3">
          {intl.formatMessage({ id: title })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{ minHeight: '40vh', overflowY: 'scroll' }}
        >
          <SharingForm />
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-end">
        <div>
          <Button onClick={onHide}>{intl.formatMessage({ id: "app.buttons.save" })}</Button>
          <Button onClick={onHide} variant="secondary" className="ml-2">{intl.formatMessage({ id: "app.buttons.cancel" })}</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SharingModal;