import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { Button, Modal } from 'react-bootstrap';
import UNIVERSALS from "Universals";
import DOMPurify from 'dompurify'
import { GET_MAX_WORSHIP_ID } from 'graphqls/graphql';
import { useQuery } from '@apollo/client';
import moment from 'moment';

function InfoModal(props: any) {
  const [message, setMessage] = useState<any>();
  const [title] = useState(UNIVERSALS.NOTIFICATION.TITLE);

  const { data } = useQuery(GET_MAX_WORSHIP_ID)

  const onHide = () => {
    setMessage('');
  }

  useEffect(() => {
    let thisRef = React.createRef();
    ReactDOM.createPortal(thisRef, document.body)
  })

  useEffect(() => {
    if (data !== undefined) {
      const maxDate = moment(data.maxWorshipId, 'YYYYMMDD')
      setMessage((UNIVERSALS.NOTIFICATION.MESSAGE as string)
      .replace("{0}", data.maxWorshipId)
      .replace("{1}", `(更新: ${maxDate.format('YYYY')} 年 ${maxDate.format('M')} 月 ${maxDate.format('D')} 日)`))
    }
  }, [data])

  return (
    <Modal
      {...props}
      show={message != null && message !== ''}
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
          style={{ maxHeight: '50vh', overflowY: 'scroll' }}
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