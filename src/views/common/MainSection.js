import React from "react";

// reactstrap components
import {
  Button,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

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
                src={require("assets/img/bg7.jpg")}
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
                src={require("assets/img/bg3.jpg")}
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
                src={require("assets/img/bg8.jpg")}
                style={{ marginLeft: 40, maxWidth: '80%' }}
              ></img>
              <div className="overlay">
                <div className="img-overlay-text">見證欄</div>
              </div>
            </Col>
            <Col className="img-button-container" style={{ marginBottom: 100 }} md="6">
              <img
                alt="..."
                className="img-raised"
                src={require("assets/img/bg4.jpg")}
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
