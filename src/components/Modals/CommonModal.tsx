import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap';
import { RootState } from '../../reducers';
import { resetSysError, resetSysMessage } from 'actions';
import { useIntl } from 'react-intl';

function CommonModal(props: any) {

  const intl = useIntl()

  const result = useSelector((state: RootState) => state.system.general.result);
  const error = useSelector((state: RootState) => state.system.general.error);
  const dispatch = useDispatch();

  const onHide = () => {
    let func
    func = result?.callback
    error && dispatch(resetSysError());
    result && dispatch(resetSysMessage());
    func && func.call(null);
  }

  useEffect(() => {
    let thisRef = React.createRef();
    ReactDOM.createPortal(thisRef, document.body)
  })

  return (
    <Modal
      {...props}
      show={error != null || result != null}
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
      {result && <Modal.Header closeButton className="black-close">
        <Modal.Title id="contained-modal-title-vcenter" as="h3">
          {intl.formatMessage({ id: "app.modal.header.info" })}
        </Modal.Title>
      </Modal.Header>}
      <Modal.Body>
        {/* <h4>系統錯誤</h4> */}
        <h4>
          {error && error.toString()}
          {result && intl.formatMessage({ id: result.message })}
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>{intl.formatMessage({ id: "app.buttons.ok" })}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommonModal;