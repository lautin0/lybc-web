import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators
} from "reactstrap";

// core components

const items = [
  {
    src: require("assets/img/photo1.jpg"),
    altText: "策劃會",
    caption: "策劃會"
  },
  {
    src: require("assets/img/photo2.jpg"),
    altText: "仁濟醫院 午間閒情",
    caption: "仁濟醫院 午間閒情"
  },
  {
    src: require("assets/img/photo3.jpg"),
    altText: "浸禮",
    caption: "浸禮"
  },
  {
    src: require("assets/img/photo4.jpg"),
    altText: "聖誕街頭佈道",
    caption: "聖誕街頭佈道"
  }
];

function Journal() {
  return (
    <>
      <div className="section" id="journal">
        <Container>
          <Row>
            <Col md="6">
              <h4>
                教會月刊
              </h4>
              <p>
                <a href={require("assets/pdf/journal7.pdf")}
                  target="_blank">
                  2019{" - "}12{" : "}<label style={{ color: "red", fontSize: 18, fontWeight: "bold" }} >聖誕特別刊</label>
                </a>
              </p>
              <p>
                <a href={require("assets/pdf/journal6.pdf")} target="_blank">2019{" - "}11{" : "}第六期</a>
              </p>
              <p>
                <a href={require("assets/pdf/journal5.pdf")} target="_blank">2019{" - "}10{" : "}第五期</a>
              </p>
              <p>
                <a href={require("assets/pdf/journal4.pdf")} target="_blank">2019{" - "}9{" : "}第四期</a>
              </p>
              <p>
                <a href={require("assets/pdf/journal3.pdf")} target="_blank">2019{" - "}8{" : "}第三期</a>
              </p>
              <p>
                <a href={require("assets/pdf/journal2.pdf")} target="_blank">2019{" - "}7{" : "}第二期</a>
              </p>
              <p>
                <a href={require("assets/pdf/journal1.pdf")} target="_blank">2019{" - "}6{" : "}第一期</a>
              </p>

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Journal;
