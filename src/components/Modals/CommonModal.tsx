import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap';
import { RootState } from '../../reducers';
import { resetSysError, resetSysMessage } from 'actions';

function CommonModal(props: any) {
  const message = useSelector((state: RootState) => state.system.message);
  const error = useSelector((state: RootState) => state.system.error);
  const dispatch = useDispatch();

  const onHide = () => {
    error && dispatch(resetSysError());
    message && dispatch(resetSysMessage());
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
        <Modal.Title id="contained-modal-title-vcenter">
          系統錯誤
        </Modal.Title>
      </Modal.Header>}
      {message &&  <Modal.Header closeButton className="black-close">
        <Modal.Title id="contained-modal-title-vcenter">
          系統提示
        </Modal.Title>
      </Modal.Header>}
      <Modal.Body>
        {/* <h4>系統錯誤</h4> */}
        <h4>
          {error && error.toString()}
          {message && message.toString()}
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>確定</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommonModal;