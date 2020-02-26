import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import { Button, Modal } from 'react-bootstrap';
import UNIVERSALS from "Universals";
import DOMPurify from 'dompurify'

function InfoModal(props) {
  const [ message , setMessage ] = useState(UNIVERSALS.NOTIFICATION.MESSAGE);
  const [ title , setTitle ] = useState(UNIVERSALS.NOTIFICATION.TITLE);

  const onHide = () => {
    setMessage('');
  }

  useEffect(() => {
    let thisRef = React.createRef();
    ReactDOM.createPortal(thisRef, document.body)
  })

  return (
    <Modal
      {...props}
      show={message != null && message != ''}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="black-close">
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div 
          style={{maxHeight: '55vh', overflowY: 'scroll'}}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }}
        ></div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>確定</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;