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
      <div className="section">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="10">
              <Row className="collections">
                <Col md="6">
                  <img
                    alt="..."
                    className="img-raised"
                    src={require("assets/img/bg3.jpg")}
                  ></img>
                  <img
                    alt="..."
                    className="img-raised"
                    src={require("assets/img/bg8.jpg")}
                  ></img>
                </Col>
                <Col md="6">
                  <img
                    alt="..."
                    className="img-raised"
                    src={require("assets/img/bg7.jpg")}
                  ></img>
                  <img
                    alt="..."
                    className="img-raised"
                    src={require("assets/img/bg6.jpg")}
                  ></img>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default MainSection;
