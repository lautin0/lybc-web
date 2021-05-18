import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import UNIVERSALS from 'Universals'

function ImageRotateSection() {

  const intl = useIntl()

  const [src] = useState(UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/website-window.jpg")

  return <Container className="pt-5" style={{ paddingBottom: '8rem' }}>
    <Row className="d-flex align-items-center">
      <Col md="6">
        <div className="mb-4">
          <h2><strong>{intl.formatMessage({ id: 'app.anytime-anywhere' })}</strong></h2>
          {/* <p className="text-muted">於電腦，手機等平台隨時使用</p> */}
        </div>
        <div className="pl-3" style={{ borderLeft: 'solid .5rem #FFB236', fontSize: 22 }}><strong>{intl.formatMessage({ id: 'app.menu.activity.online-sermon' })}</strong></div>
        <p className="mt-3 mb-5" style={{ fontSize: 20 }}>{intl.formatMessage({ id: 'app.online-sermon.content' })}</p>
        <div className="pl-3" style={{ borderLeft: 'solid .5rem #FFB236', fontSize: 22 }}><strong>{intl.formatMessage({ id: 'app.testimony' })}</strong></div>
        <p className="mt-3 mb-5" style={{ fontSize: 20 }}>{intl.formatMessage({ id: 'app.testimony.content' })}</p>
        <div className="pl-3" style={{ borderLeft: 'solid .5rem #FFB236', fontSize: 22 }}><strong>{intl.formatMessage({ id: 'app.latest-updates' })}</strong></div>
        <p className="mt-3 mb-5" style={{ fontSize: 20 }}>{intl.formatMessage({ id: 'app.latest-updates.content' })}</p>
      </Col>
      <Col md="6">
        <div className="rotate-img">
          <img src={src}></img>
        </div>
      </Col>
    </Row>
  </Container>
}

export default ImageRotateSection