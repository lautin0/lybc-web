import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

function ChurchResources() {
  return (
    <>
      <div className="section clear-filter" filter-color="green" id="church-resources">
        <Container>
          <div className="title">
            <h3 className="title">教會資源</h3>
          </div>
          <Row className="justify-content-center" style={{marginTop: 100, marginBottom: 100}}>
            <Col md="12" lg="3">
              <div className="text-center">
                <a href="#index"><span><i class="fas title-fa fa-scroll"></i></span></a>
                <h4 className="title">週刊</h4>
              </div>
            </Col>
            <Col md="12" lg="3">
              <div className="text-center">
              <a href="#index"><span><i class="fas title-fa fa-headphones-alt" style={{color: 'rgb(35, 134, 35)'}}></i></span></a>
                <h4 className="title">講道錄音</h4>
              </div>
            </Col>
            <Col md="12" lg="3">
              <div className="text-center">
              <a href="#index"><span><i class="fas title-fa fa-music" style={{color: '#000000'}}></i></span></a>
                <h4 className="title">詩歌庫</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ChurchResources;
