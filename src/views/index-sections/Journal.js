import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

function Journal() {
  return (
    <>
      <div
        id="journal"
        className="section navigation-example"        
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(" + require("assets/img/bg1.jpg") + ")"
        }}
      >
        <Container>
          <Row>
            <Col md="6">
              <h3 className="title">教會月刊</h3>
              <p>
                <a href={require("assets/pdf/journal7.pdf")}
                  target="_blank">
                  <span style={{ color: "brown", fontWeight: "bold" }} >2019{" - "}12{" : "}</span>
                  <span style={{ color: "red", fontSize: 18, fontWeight: "bold", background: 'yellow' }} >聖誕特別刊</span>
                </a>
              </p>
              <p>
                <a href={require("assets/pdf/journal6.pdf")} target="_blank">
                  <span style={{ color: "brown", fontWeight: "bold" }} >2019{" - "}11{" : "}第六期</span>
                </a>
              </p>
              <p>
                <a href={require("assets/pdf/journal5.pdf")} target="_blank">
                  <span style={{ color: "brown", fontWeight: "bold" }} >2019{" - "}10{" : "}第五期</span>
                </a>
              </p>
              <p>
                <a href={require("assets/pdf/journal4.pdf")} target="_blank">
                  <span style={{ color: "brown", fontWeight: "bold" }} >2019{" - "}9{" : "}第四期</span>
                </a>
              </p>
              <p>
                <a href={require("assets/pdf/journal3.pdf")} target="_blank">
                  <span style={{ color: "brown", fontWeight: "bold" }} >2019{" - "}8{" : "}第三期</span>
                </a>
              </p>
              <p>
                <a href={require("assets/pdf/journal2.pdf")} target="_blank">
                  <span style={{ color: "brown", fontWeight: "bold" }} >2019{" - "}7{" : "}第二期</span>
                </a>
              </p>
              <p>
                <a href={require("assets/pdf/journal1.pdf")} target="_blank">
                  <span style={{ color: "brown", fontWeight: "bold" }} >2019{" - "}6{" : "}第一期</span>
                </a>
              </p>

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Journal;
