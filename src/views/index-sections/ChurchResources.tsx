import React from "react";

// react-bootstrap components
import {
  Row,
  Col,
  Card
} from "react-bootstrap";

import { useHistory } from "react-router";

function ChurchResources() {
  const history = useHistory();

  return (
    <>
      {/* <div className="section clear-filter">
        <Container>
          <Row className="justify-content-center" style={{marginTop: 100, marginBottom: 100}}>
            <Col md="12" lg="3">
              <div className="text-center">
                <a href="#" onClick={(e)=>{e.preventDefault()}}><span><i className="fas title-fa fa-scroll"></i></span></a>
                <h4 className="title">週刊</h4>
              </div>
            </Col>
            <Col md="12" lg="3">
              <div className="text-center">
              <a href="#" onClick={(e)=>{e.preventDefault()}}><span><i className="fas title-fa fa-headphones-alt" style={{color: 'rgb(35, 134, 35)'}}></i></span></a>
                <h4 className="title">講道錄音</h4>
              </div>
            </Col>
            <Col md="12" lg="3">
              <div className="text-center">
              <a href="#" onClick={(e)=>{e.preventDefault()}}><span><i className="fas title-fa fa-music" style={{color: '#000000'}}></i></span></a>
                <h4 className="title">詩歌庫</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}
      <div className="section clear-filter">
        <Row className="justify-content-center mx-auto" style={{ marginTop: 100, marginBottom: 100 }}>
          <Col md="6" lg="3">
            <Card 
              className="text-center" 
              onClick={() => { history.push('/worship-list') }}
              style={{cursor: 'pointer'}}
            >
              <Card.Img src={require("assets/img/bg7.jpg")} />
              <Card.ImgOverlay>
                {/* <i style={{marginTop: 50}} className="fas title-fa fa-scroll"></i> */}
              </Card.ImgOverlay>
              <Card.Body>
                <Card.Title>網上崇拜</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6" lg="3">
            <Card className="text-center">
              <Card.Img src={require("assets/img/bg1.jpg")} />
              <Card.ImgOverlay>
                <Card.Title></Card.Title>
                <Card.Text></Card.Text>
              </Card.ImgOverlay>
              <Card.Body>
                <Card.Title>最新消息</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6" lg="3">
            <Card 
              className="text-center" 
              onClick={() => { history.push('/sharing-list') }} 
              style={{cursor: 'pointer'}}
            >
              <Card.Img src={require("assets/img/bg3.jpg")} />
              <Card.ImgOverlay>
                <Card.Title></Card.Title>
                <Card.Text></Card.Text>
              </Card.ImgOverlay>
              <Card.Body>
                <Card.Title>分享欄</Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ChurchResources;
