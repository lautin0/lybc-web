import React, { useCallback, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';

function Careers() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <div
    className="pb-5"
  >
    <Container>
      <h3 className="mb-5">現開放招聘: </h3>
      <Row style={{ borderLeft: 'solid .5rem #FFB236' }}>
        <Col sm={12} md={6}>
          <b style={{ fontSize: 22 }}>教牧同工</b>
          <p style={{ fontSize: 22 }}>負責範疇：主要牧養職青及成人</p>
          <p>15-02-2021</p>
        </Col>
      </Row>
      <div className="text-center mt-5" style={{ fontSize: 18 }}>
        <p><i>請申請者電郵求職信及履歷致 lukyeungchurch@gmail.com</i></p>
      </div>
    </Container>
  </div>
}

export default Careers;