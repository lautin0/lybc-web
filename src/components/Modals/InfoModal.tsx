import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { Button, Form, Modal } from 'react-bootstrap';
import UNIVERSALS from "Universals";
import DOMPurify from 'dompurify'
import moment from 'moment';
import { isEmpty } from 'lodash';
import { getNullableString } from 'utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { SetSysInfoMessage } from 'actions';
import { useIntl } from 'react-intl';
import { useMaxWorshipIdQuery } from 'generated/graphql';

function InfoModal(props: any) {

  const intl = useIntl()

  const dispatch = useDispatch()

  const message = useSelector((state: RootState) => state.sysInfo.message);  
  const [title] = useState(UNIVERSALS.NOTIFICATION.TITLE);
  const [checked, setChecked] = useState(false)

  const { data } = useMaxWorshipIdQuery()

  const onHide = () => {
    dispatch(SetSysInfoMessage(''))
  }

  const handleChecked = (e: any) => {
    if(!checked){
      localStorage.setItem('SUSPEND_FOR_TODAY_TS', moment().unix().toString())
    } else {
      localStorage.setItem('SUSPEND_FOR_TODAY_TS', "")
    }
    setChecked(!checked)    
  }

  useEffect(() => {
    let thisRef = React.createRef();
    ReactDOM.createPortal(thisRef, document.body)
  })

  useEffect(() => {    
    let suspendForTodayTs = localStorage.getItem('SUSPEND_FOR_TODAY_TS')
    let suspended = !isEmpty(suspendForTodayTs) && moment.unix(parseInt(getNullableString(suspendForTodayTs))).startOf('day').isSame(moment().startOf('day'))
    setChecked(suspended)
    if (data !== undefined && !suspended) {
      const maxDate = moment(data.maxWorshipId, 'YYYYMMDD')
      dispatch(SetSysInfoMessage((UNIVERSALS.NOTIFICATION.MESSAGE as string)
        .replace("{0}", data?.maxWorshipId.toString())
        .replace("{1}", `(更新: ${maxDate.format('YYYY')} 年 ${maxDate.format('M')} 月 ${maxDate.format('D')} 日)`)))
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
        <Modal.Title id="contained-modal-title-vcenter" as="h3">
          {intl.formatMessage({ id: title })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{ maxHeight: '50vh', overflowY: 'scroll' }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }}
        ></div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>{intl.formatMessage({ id: "app.buttons.ok" })}</Button>
        <Form.Check
          checked={checked}
          onChange={handleChecked}
          className="form-check mx-2"
          type="checkbox"
          id="suspendForToday"
          name="suspendForToday"
          label={<>{intl.formatMessage({ id: "app.modal.hide-for-today" })}<span className="form-check-sign"></span></>}
        ></Form.Check>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;