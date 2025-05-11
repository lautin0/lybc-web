import React, { useEffect } from "react";

import serviceSchedule from "assets/img/service-schedule.jpeg";

// react-bootstrap components
import { Table, Container, Row, Col } from "react-bootstrap";
import { useIntl } from "react-intl";

// core components

function SundayServiceInfo() {

  const intl = useIntl()

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="section">
      <Container>
        <Row className="justify-content-md-center">
          <Col className="text-left" lg="8" md="12">
            <img alt="service-schedule" src={serviceSchedule} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SundayServiceInfo;
