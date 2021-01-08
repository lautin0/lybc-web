import React, { useEffect } from "react";

// react-bootstrap components
import {
  Row,
  Col,
  Card
} from "react-bootstrap";

import { useHistory } from "react-router-dom";

import bg7 from "assets/img/bg7.jpg";
import bg5 from "assets/img/bg5.jpg";
import bg3 from "assets/img/bg3.jpg";
import sharing from "assets/img/microphone.jpg";
import news from "assets/img/lightbulb.jpg";
import sermon from "assets/img/sermon.png";
import { useCallback } from "react";

function ChurchResources() {
  const history = useHistory();

  // Check if element is scrolled into view
  const isScrolledIntoView = (elem: Element) => {
    var docViewTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var docViewBottom = docViewTop + window.innerHeight

    var elemTop = elem.getBoundingClientRect().top
    var elemBottom = elemTop + elem.clientHeight

    let footerEl: any = document.querySelector("footer.footer");

    return docViewBottom - footerEl.clientHeight > elemBottom

    // return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }

  // If element is scrolled into view, fade it in
  const handleScroll = useCallback(() => {
    document.querySelectorAll(".scroll-animations .animated").forEach(e => {
      if (isScrolledIntoView(e) === true) {
        e.classList.add("animate__fadeInLeft");
      }
    })
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", (e: any) => {
      handleScroll();
    })

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll])

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
      <div
        className="section clear-filter"
      // data-background-color="black"
      >
        <Row className="justify-content-center mx-auto scroll-animations" style={{ marginTop: 100, marginBottom: 100 }}>
          <Col className="animated animate__animated text-center" md="6" lg="3">
            <Card
              className="text-center"
              onClick={() => { history.push('/worship-list') }}
              style={{ cursor: 'pointer', maxWidth: 350 }}
            >
              <Card.Img src={sermon} style={{ width: 350, height: 215, objectFit: 'fill' }} />
              {/* <Card.ImgOverlay>
                <i style={{marginTop: 50}} className="fas title-fa fa-scroll"></i>
              </Card.ImgOverlay> */}
              <Card.Body>
                <Card.Title>網上崇拜</Card.Title>
              </Card.Body>
            </Card>
            {/* <div className="my-3" onClick={() => { history.push('/worship-list') }}>
              <img src={require("assets/img/bg7.jpg")}></img>
            </div>
            <div className="text-center">
              <Button
                onClick={() => { history.push('/worship-list') }}
                style={{ minWidth: 150, fontSize: 24 }} variant="outline-info"
              >
                網上崇拜
              </Button>
            </div> */}
          </Col>
          <Col className="animated animate__animated text-center" md="6" lg="3">
            <Card
              className="text-center"
              style={{ maxWidth: 350 }}
            >
              <Card.Img src={news} style={{ width: 350, height: 215, objectFit: 'fill' }} />
              {/* <Card.ImgOverlay>
                <Card.Title></Card.Title>
                <Card.Text></Card.Text>
              </Card.ImgOverlay> */}
              <Card.Body>
                <Card.Title>最新消息</Card.Title>
              </Card.Body>
            </Card>
            {/* <div className="my-3">
              <img src={require("assets/img/bg5.jpg")}></img>
            </div>
            <div className="text-center">
              <Button
                style={{ minWidth: 150, fontSize: 24 }} variant="outline-info"
              >
                最新消息
              </Button>
            </div> */}
          </Col>
          <Col className="animated animate__animated text-center" md="6" lg="3">
            <Card
              className="text-center"
              onClick={() => { history.push('/sharing-list') }}
              style={{ cursor: 'pointer', maxWidth: 350 }}
            >
              <Card.Img src={sharing} style={{ width: 350, height: 215, objectFit: 'fill' }} />
              <Card.ImgOverlay>
                <Card.Title></Card.Title>
                <Card.Text></Card.Text>
              </Card.ImgOverlay>
              <Card.Body>
                <Card.Title>分享欄</Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
            {/* <div className="my-3" onClick={() => { history.push('/sharing-list') }}>
              <img src={require("assets/img/bg1.jpg")}></img>
            </div>
            <div className="text-center">
              <Button
                onClick={() => { history.push('/sharing-list') }}
                style={{ minWidth: 150, fontSize: 24 }} variant="outline-info"
              >
                分享欄
                </Button>
            </div> */}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ChurchResources;
