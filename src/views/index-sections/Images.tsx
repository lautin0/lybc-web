import React from "react";
import img1 from "assets/img/hero-image-1.png"
import img2 from "assets/img/hero-image-2.png"
import img3 from "assets/img/hero-image-3.png"

// reactstrap components
import { Container, Row, Col } from "react-bootstrap";

// core components

function Images() {
  return (
    <>
      <div 
        className="section section-images" 
        // data-background-color="black"
      >
        <Container>
          <Row>
            <Col md="12">
              <div className="hero-images-container">
                <img
                  alt="..."
                  src={img1}
                ></img>
              </div>
              <div className="hero-images-container-1">
                <img
                  alt="..."
                  src={img2}
                ></img>
              </div>
              <div className="hero-images-container-2">
                <img
                  alt="..."
                  src={img3}
                ></img>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Images;
