import React, { useCallback, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';

function Careers() {

  const intl = useIntl()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <div
    className="pb-5"
  >
    <Container>
      <h3 className="mb-5">{intl.formatMessage({ id: 'app.careers.header' })}: </h3>
      <Row>
        <Col sm={12} md={6}>
          <b className="pl-3" style={{ borderLeft: 'solid .5rem #FFB236', fontSize: 22 }}>{intl.formatMessage({ id: 'app.careers.l1' })}</b>
          <p className="pl-4" style={{ fontSize: 22 }}>{intl.formatMessage({ id: 'app.careers.l2' })}</p>
          <p className="pl-4">15-02-2021</p>
        </Col>
      </Row>
      <div className="text-center mt-5" style={{ fontSize: 18 }}>
        <p><i>{intl.formatMessage({ id: 'app.careers.contact' })} lukyeungchurch@gmail.com</i></p>
      </div>
    </Container>
  </div>
}

export default Careers;