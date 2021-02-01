import { decisionComplete } from 'actions';
import React, { useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';

function DecisionModal(props: any) {

  const intl = useIntl()

  const dispatch = useDispatch()

  const decision = useSelector((state: RootState) => state.system.decision)

  const onConfirm = () => {
    decision.positiveAction?.call()
    onHide()
  }

  const onCancel = () => {
    decision.negativeAction?.call()
    onHide()
  }

  const onHide = () => {
    dispatch(decisionComplete())
  }

  useEffect(() => {
    let thisRef = React.createRef();
    ReactDOM.createPortal(thisRef, document.body)
  })

  return (
    <Modal
      {...props}
      show={decision.isPending}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header 
        closeButton 
        className="black-close" 
        style={{backgroundColor: 'lightgray'}}
      >
        <Modal.Title id="contained-modal-title-vcenter">

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          {decision && decision.message}
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm}>{intl.formatMessage({ id: "app.buttons.confirm" })}</Button>
        <Button onClick={onCancel}>{intl.formatMessage({ id: "app.buttons.cancel" })}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DecisionModal;