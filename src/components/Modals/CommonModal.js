import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function CommonModal(props) {

  const [ error, setError ] = React.useState(null);
  const [ message, setMessage ] = React.useState(null);

  React.useEffect(() => {
    setError(props.error);
    setMessage(props.message);
  },[props.error, props.message])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton data-background-color={error && 'error'}>
        <Modal.Title id="contained-modal-title-vcenter">
          {error && `系統錯誤`}
          {message && `系統提示`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>系統錯誤</h4> */}
        <h4>
          {error && error.toString()}
          {message && message.toString()}
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>確定</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommonModal;