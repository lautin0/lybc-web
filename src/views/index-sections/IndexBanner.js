import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

function IndexBanner() {
  return (
    <>
      <div className="section clear-filter" filter-color="green" id="church-resources">
        <Container>
          <div className="title" style={{ marginBottom: 100 }}>
            <h2 className="title">教會年題 - 2020</h2>
          </div>
          <Row className="text-center mt-5" style={{ marginBottom: 100 }}>
            <Col className="ml-auto mr-auto d-none d-sm-block" md="8">
              <h1>守真理，結連關係。</h1>
              <h1>證生命，同屬基督。</h1>
            </Col>
            <Col className="ml-auto mr-auto d-sm-none">
              <h2>守真理，結連關係。</h2>
              <h2>證生命，同屬基督。</h2>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default IndexBanner;
