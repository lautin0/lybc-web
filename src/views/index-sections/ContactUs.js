import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

// core components

function ContactUs() {
  return (
    <>
      <div
        className="section section-download"
        id="contact-us-section"
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col className="text-left" lg="8" md="12">
              <h3 className="title">聯絡我們</h3>

              <p>堂主任：黃雪梅姑娘</p>

              <p>傳道同工：繆振聲先生</p>

              <p>幹事同工：李殷枏姊妹</p>

              <p>顧問：林瑞興牧師</p>

              <p>教會地址：荃灣綠楊新邨 J 座地下</p>

              <p>通訊地址：荃灣青山公路264-298號南豐中心20/F 02D室</p>

              <p>教會電話：2493 8994</p>

              <p>教會電郵：lukyeungchurch@gmail.com</p>
            </Col>
          </Row>
          <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
              <h3>立即加入我們!</h3>
            </Col>
            <Col className="text-center" lg="8" md="12">
              <Button
                className="btn-neutral btn-icon btn-round"
                color="twitter"
                href="https://www.twitter.com"
                id="tooltip86114138"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip86114138">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="facebook"
                href="https://www.facebook.com/lukYeungBaptistChurch"
                id="tooltip735272548"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip735272548">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="linkedin"
                href="https://www.linkedin.com/"
                id="tooltip647117716"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-linkedin"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip647117716">
                Follow us
              </UncontrolledTooltip>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ContactUs;
