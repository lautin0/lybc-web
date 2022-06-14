import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { Button, Modal } from 'react-bootstrap';
import { RootStore } from 'store';

function ImageModal(props: any) {

  const { setImage, dataUrl } = RootStore.useImageStore()

  const onHide = () => {
    setImage(null)
  }

  useEffect(() => {
    let thisRef = React.createRef() as any;
    ReactDOM.createPortal(thisRef, document.body)
  })

  return (
    <Modal
      {...props}
      show={dataUrl != null}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div
          style={{ maxHeight: '55vh', overflowY: 'scroll' }}
          className="align-middle justify-content-center">
          <img src={dataUrl} alt="printout"></img>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>確定</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageModal;