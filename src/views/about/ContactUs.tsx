import React, { useEffect } from "react";

// react-bootstrap components
import { Button, Container, Row, Col } from "react-bootstrap";
import { useIntl } from "react-intl";

// core components

function ContactUs() {

  const intl = useIntl()

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  },[])
  
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
          {/* <Tooltip delay={0} target="tooltip515203352">
                Follow me on Twitter
              </Tooltip> */}
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
          {/* <Tooltip delay={0} target="tooltip340339231">
                Follow me on Instagram
              </Tooltip> */}
        </div>
        <Row className="justify-content-md-center mt-5">
          <Col className="text-left" lg="8" md="12">
            <p>{intl.formatMessage({ id: "app.contact.head-preacher" })}：{intl.formatMessage({ id: "app.contact.head-preacher.value" })}</p>

            <p>{intl.formatMessage({ id: "app.contact.preacher-worker" })}：{intl.formatMessage({ id: "app.contact.preacher-worker.value" })}</p>

            <p>{intl.formatMessage({ id: "app.contact.theology-student" })}：{intl.formatMessage({ id: "app.contact.theology-student.value" })}</p>

            <p>{intl.formatMessage({ id: "app.contact.church-address" })}：{intl.formatMessage({ id: "app.contact.church-address.value" })}</p>

            <p>{intl.formatMessage({ id: "app.contact.corresp-address" })}：{intl.formatMessage({ id: "app.contact.corresp-address.value" })}</p>

            <p>{intl.formatMessage({ id: "app.contact.phone" })}：<i className="fas fa-phone"></i> | <i className="fab fa-whatsapp" style={{ fontSize: 18 }}></i> {intl.formatMessage({ id: "app.contact.phone.value" })}</p>

            <p>{intl.formatMessage({ id: "app.contact.email" })}：{intl.formatMessage({ id: "app.contact.email.value" })}</p>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ marginTop: 30 }}>
          <Col className="d-none d-sm-block" lg="8" md="12">
            <iframe title="contact-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1986.463662122686!2d114.11918983575359!3d22.373117473260436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x46c212d153af24cd!2z57ag5qWK5rW45L-h5pyD!5e0!3m2!1szh-TW!2shk!4v1577628204298!5m2!1szh-TW!2shk" width="700" height="450" frameBorder="0" style={{ border: 0 }} allowFullScreen></iframe>
          </Col>
        </Row>
        <Row className="justify-content-md-center sharing-area text-center">
          {/* <Col className="text-center" lg="8" md="12">
            <h3>立即加入我們!</h3>
          </Col>
          <Col className="text-center" lg="8" md="12">
            <Button
              className="btn-neutral btn-facebook btn-icon btn-round"
              href="https://www.facebook.com/lukYeungBaptistChurch"
              id="tooltip735272548"
              size="lg"
              target="_blank"
              as="a"
            >
              <i className="fab fa-facebook-square"></i>
            </Button>
            <Button
              className="btn-neutral btn-instagram btn-icon btn-round"
              href="https://www.instagram.com/lybc1997"
              id="tooltip647117716"
              size="lg"
              target="_blank"
              as="a"
            >
              <i className="fab fa-instagram"></i>
            </Button>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
}

export default ContactUs;
