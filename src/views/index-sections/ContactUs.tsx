import React from "react";

// react-bootstrap components
import { Button, Container, Row, Col, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

// core components

function ContactUs() {
  return (
    <>
      <div
        className="section"
        id="contact-us-section"
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col className="text-left" lg="8" md="12">
              <h3 className="title">聯絡我們</h3>

              <p>堂主任：黃雪梅姑娘</p>

              <p>傳道同工：繆振聲先生</p>

              <p>幹事同工：李殷枏姊妹</p>

              <p>教會地址：荃灣綠楊新邨 J 座地下</p>

              <p>通訊地址：荃灣青山公路264-298號南豐中心20/F 02D室</p>

              <p>教會電話：2493 8994</p>

              <p>教會電郵：lukyeungchurch@gmail.com</p>
            </Col>
          </Row>
          <Row className="justify-content-center" style={{marginTop: 30}}>
            <Col className="d-none d-sm-block" lg="8" md="12">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1986.463662122686!2d114.11918983575359!3d22.373117473260436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x46c212d153af24cd!2z57ag5qWK5rW45L-h5pyD!5e0!3m2!1szh-TW!2shk!4v1577628204298!5m2!1szh-TW!2shk" width="700" height="450" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
            </Col>
          </Row>
          <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
              <h3>立即加入我們!</h3>
            </Col>
            <Col className="text-center" lg="8" md="12">
              {/* <Button
                className="btn-neutral btn-icon btn-round"
                color="twitter"
                href="https://www.twitter.com"
                id="tooltip86114138"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Tooltip delay={0} target="tooltip86114138">
                Follow us
              </Tooltip> */}
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ContactUs;
