import React, { useEffect } from "react";

// react-bootstrap components
import { Button, Container, Row, Col } from "react-bootstrap";
import { useIntl } from "react-intl";

// core components

function ContactUs() {
  const intl = useIntl();

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section">
      <Container>
        <div className="button-container">
          <Button
            className="btn-round"
            color="info"
            size="lg"
            href="https://www.facebook.com/lukYeungBaptistChurch"
            as="a"
            target="_blank"
          >
            {intl.formatMessage({ id: "app.buttons.follow" })}
          </Button>
          <Button
            className="btn-round btn-icon"
            color="default"
            href="https://www.facebook.com/lukYeungBaptistChurch"
            id="tooltip515203352"
            size="lg"
            target="_blank"
            as="a"
          >
            <i className="fab fa-facebook"></i>
          </Button>
          <Button
            className="btn-round btn-icon"
            color="default"
            id="tooltip340339231"
            size="lg"
            href="https://www.instagram.com/lybc1997"
            as="a"
            target="_blank"
          >
            <i className="fab fa-instagram"></i>
          </Button>
        </div>
        <Row className="justify-content-md-center mt-5">
          <Col className="text-left" lg="8" md="12">
            <p className="pl-3" style={{ fontSize: 18 }}>
              <strong style={{ fontWeight: "bold" }}>
                {intl.formatMessage({ id: "app.contact.preacher-worker" })}
              </strong>
              ：
              <b>
                {intl.formatMessage({
                  id: "app.contact.preacher-worker.value",
                })}
              </b>
            </p>

            <p className="pl-3" style={{ fontSize: 18 }}>
              <strong style={{ fontWeight: "bold" }}>
                {intl.formatMessage({ id: "app.contact.theology-student" })}
              </strong>
              ：
              <b>
                {intl.formatMessage({
                  id: "app.contact.theology-student.value",
                })}
              </b>
            </p>

            <p className="pl-3" style={{ fontSize: 18 }}>
              <strong style={{ fontWeight: "bold" }}>
                {intl.formatMessage({ id: "app.contact.church-address" })}
              </strong>
              ：
              <b>
                {intl.formatMessage({ id: "app.contact.church-address.value" })}
              </b>
            </p>
            <p className="pl-3" style={{ fontSize: 18 }}>
              <strong style={{ fontWeight: "bold" }}>
                {intl.formatMessage({ id: "app.contact.phone" })}
              </strong>
              ：
              <b>
                <i className="fas fa-phone"></i> |{" "}
                <i className="fab fa-whatsapp" style={{ fontSize: 18 }}></i>{" "}
                9455 3514
              </b>
            </p>

            <p className="pl-3" style={{ fontSize: 18 }}>
              <strong style={{ fontWeight: "bold" }}>
                {intl.formatMessage({ id: "app.contact.email" })}
              </strong>
              ：<b>{intl.formatMessage({ id: "app.contact.email.value" })}</b>
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ marginTop: 30 }}>
          <Col className="d-none d-sm-block" lg="8" md="12">
            <iframe
              title="contact-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.59323470960254!2d114.12110421709619!3d22.372811749397613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f88d5bc3b421%3A0x3c6ccb58980ac7f2!2z6aaZ5riv6I2D54Gj6JWZ6I2D6LevMjItNjbomZ_ntqDmpYrmlrDpgqhK5bqn!5e0!3m2!1szh-TW!2sca!4v1747968940508!5m2!1szh-TW!2sca"
              width="700"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </Col>
        </Row>
        <Row className="justify-content-md-center sharing-area text-center">
        </Row>
      </Container>
    </div>
  );
}

export default ContactUs;
