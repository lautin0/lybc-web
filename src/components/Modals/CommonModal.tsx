import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { Button, Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { RootStore } from 'store';
import shallow from 'zustand/shallow';

function CommonModal(props: any) {

  const intl = useIntl()  

  const [ error, message, setSysMessage, setSysFailure ] = RootStore.useModalStore(state => [state.error, state.message, state.setSysMessage, state.setSysFailure], shallow)

  const onHide = () => {
    error && setSysFailure(null)
    message && setSysMessage(null)
  }

  useEffect(() => {
    let thisRef = React.createRef();
    ReactDOM.createPortal(thisRef, document.body)
  })

  return (
    <Modal
      {...props}
      show={error != null || message != null}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {error && <Modal.Header closeButton data-background-color="error">
        <Modal.Title id="contained-modal-title-vcenter" as="h3">
          {intl.formatMessage({ id: "app.modal.header.error" })}
        </Modal.Title>
      </Modal.Header>}
      {message && <Modal.Header closeButton className="black-close">
        <Modal.Title id="contained-modal-title-vcenter" as="h3">
          {intl.formatMessage({ id: "app.modal.header.info" })}
        </Modal.Title>
      </Modal.Header>}
      <Modal.Body>
        {/* <h4>系統錯誤</h4> */}
        <h4>
          {error && error.toString()}
          {message && intl.formatMessage({ id: message })}
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>{intl.formatMessage({ id: "app.buttons.ok" })}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommonModal;