import React from "react";

// react-bootstrap components
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";

import bg7 from "assets/img/bg7.jpg"
import bg3 from "assets/img/bg3.jpg"
import bg8 from "assets/img/bg8.jpg"
import bg4 from "assets/img/bg4.jpg"

function MainSection() {
  return (
    <>
      <div>
        <Container>
          <div className="title">
            <h3 className="title">目錄</h3>
          </div>
          <Row>
            <Col className="img-button-container" style={{ marginBottom: 100 }} md="6">
              <img
                alt="..."
                className="img-raised"
                src={bg7}
                style={{ marginLeft: 40, maxWidth: '80%' }}
              ></img>
              <div className="overlay">
                <div className="img-overlay-text">教會活動</div>
              </div>
            </Col>
            <Col className="img-button-container" style={{ marginBottom: 100 }} md="6">
              <img
                alt="..."
                className="img-raised"
                src={bg3}
                style={{ marginLeft: 40, maxWidth: '80%' }}
              ></img>
              <div className="overlay">
                <div className="img-overlay-text">事工</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="img-button-container" style={{ marginBottom: 100 }} md="6">
              <img
                alt="..."
                className="img-raised"
                src={bg8}
                style={{ marginLeft: 40, maxWidth: '80%' }}
              ></img>
              <div className="overlay">
                <div className="img-overlay-text">分享欄</div>
              </div>
            </Col>
            <Col className="img-button-container" style={{ marginBottom: 100 }} md="6">
              <img
                alt="..."
                className="img-raised"
                src={bg4}
                style={{ marginLeft: 40, maxWidth: '80%' }}
              ></img>
              <div className="overlay">
                <div className="img-overlay-text">相冊</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <hr style={{width: '80%'}} />
    </>
  );
}

export default MainSection;
