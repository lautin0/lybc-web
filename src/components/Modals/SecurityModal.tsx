import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setImage } from 'actions';
import { RootState } from '../../reducers';

function SecurityModal(props: any) {
  // const dispatch = useDispatch();
  // const dataUrl = useSelector((state: RootState) => state.worship.image.dataUrl)

  // const onHide = () => {
  //   dispatch(setImage(null))
  // }

  // useEffect(() => {
  //   let thisRef = React.createRef();
  //   ReactDOM.createPortal(thisRef, document.body)
  // })

  return (
    <></>
    // <Modal
    //   {...props}
    //   show={dataUrl != null}
    //   onHide={onHide}
    //   size="lg"
    //   aria-labelledby="contained-modal-title-vcenter"
    //   centered
    // >
    //   <Modal.Body>
    //     <div
    //       style={{ maxHeight: '55vh', overflowY: 'scroll' }}
    //       className="align-middle justify-content-center">
    //       <img src={dataUrl} alt="printout"></img>
    //     </div>
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button onClick={onHide}>確定</Button>
    //   </Modal.Footer>
    // </Modal>
  );
}

export default SecurityModal;