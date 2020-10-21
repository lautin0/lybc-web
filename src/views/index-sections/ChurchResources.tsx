import React, { useEffect } from "react";

// react-bootstrap components
import {
  Row,
  Col,
  Card,
  Button
} from "react-bootstrap";

import { useHistory } from "react-router";

function ChurchResources() {
  const history = useHistory();

  useEffect(() => {
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

    const memoHandleScroll = () => handleScroll()

    // If element is scrolled into view, fade it in
    const handleScroll = () => {
      document.querySelectorAll(".scroll-animations .animated").forEach(e => {
        if (isScrolledIntoView(e) === true) {
          e.classList.add("animate__fadeInLeft");
        }
      })
    }

    window.addEventListener("scroll", memoHandleScroll)

    return function cleanup() {
      window.removeEventListener("scroll", memoHandleScroll);
    };
  })

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
          <Col className="animated animate__animated" md="6" lg="3">
            <Card
              className="text-center"
              onClick={() => { history.push('/worship-list') }}
              style={{ cursor: 'pointer' }}
            >
              <Card.Img src={require("assets/img/bg7.jpg")} />
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
          <Col className="animated animate__animated" md="6" lg="3">
            <Card className="text-center">
              <Card.Img src={require("assets/img/bg5.jpg")} />
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
          <Col className="animated animate__animated" md="6" lg="3">
            <Card
              className="text-center"
              onClick={() => { history.push('/sharing-list') }}
              style={{ cursor: 'pointer' }}
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
