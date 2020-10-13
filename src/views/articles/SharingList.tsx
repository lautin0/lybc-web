import React, { useEffect } from "react";

// react-bootstrap components
import { Container, Row, Card, Col, Button, Nav, Tabs, Tab } from "react-bootstrap";
import { useHistory } from "react-router";

// core components

function SharingList() {

  const history = useHistory();
  const [pills, setPills] = React.useState("1");

  const navigate = (id: any) => {
    history.push(`/sharing/5f850a38227dc4647ac6c586`)
  }

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  },[])
  
  return (
    <>
      <div
        //className="section section-download"
        className="section"
        // className="my-5"
      // data-background-color="black"
      // id="about-us-section"
      >
        <Container style={{ marginBottom: 200 }}>
          <div className="button-container">
            <Button className="btn-round" color="info" size="lg">
              分享您的見證
              </Button>
            {/* <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip515203352"
                size="lg"
              >
                <i className="fab fa-twitter"></i>
              </Button> */}
            {/* <Tooltip delay={0} target="tooltip515203352">
                Follow me on Twitter
              </Tooltip> */}
            {/* <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip340339231"
                size="lg"
              >
                <i className="fab fa-instagram"></i>
              </Button> */}
            {/* <Tooltip delay={0} target="tooltip340339231">
                Follow me on Instagram
              </Tooltip> */}
          </div>
          {/* <h3 className="title">一起分享所想</h3> */}
          <h5 className="description">
            相信弟兄姊妹在生活中會遇上不少困難和信仰上的衝激，但同行路上不孤單！歡迎弟兄姊妹投稿，分享您的見證，讓我們彼此激勵，互作見證，在主內共成長。
            </h5>
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <h4 className="title text-center">
                {pills === '1' && '盼望'}
                {pills === '2' && '信心'}
                {pills === '3' && '愛心'}
              </h4>
              <div className="nav-align-center">
                <Nav
                  className="nav-pills nav-pills-info nav-pills-just-icons"
                  role="tablist"
                >
                  <Nav.Item>
                    <Nav.Link
                      className={pills == "1" ? "active" : ""}
                      // href="#pablo"
                      onClick={(e: any) => {
                        e.preventDefault();
                        setPills("1");
                      }}
                    >
                      <i className="fas fa-star"></i>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={pills == "2" ? "active" : ""}
                      // href="#pablo"
                      onClick={(e: any) => {
                        e.preventDefault();
                        setPills("2");
                      }}
                    >
                      <i className="fas fa-cross"></i>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={pills == "3" ? "active" : ""}
                      // href="#pablo"
                      onClick={(e: any) => {
                        e.preventDefault();
                        setPills("3");
                      }}
                    >
                      <i className="fas fa-heart"></i>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>
            <Tabs
              id=""
              activeKey={pills}
              // onSelect={(k: any) => setPills(k)}
              className="nav-justified w-100"
            >
              <Tab eventKey="1" title={null}>
                <Col className="ml-auto mr-auto" md="10">
                  <Col className="text-left" style={{ borderRadius: '.5rem' }} onClick={() => { navigate(1) }}>
                    <Card.Header
                      style={{
                        borderBottom: 0,
                        borderLeft: '1px solid rgba(0,0,0,.125)',
                        borderRight: '1px solid rgba(0,0,0,.125)',
                        borderTop: '1px solid rgba(0,0,0,.125)'
                      }}
                    ></Card.Header>
                    <Card.Body style={{ border: '1px solid rgba(0,0,0,.125)', borderRadius: '0px 0px .2rem .2rem' }}>
                      <blockquote className="blockquote" style={{ border: 0 }}>
                        <a href="javascript:void(0)">
                          <p>
                            {' '}
                            祈禱會分享 (但以理組)
                            {' '}
                          </p>
                          <p>
                            疫情中的信仰 - 神的應許和人的盼望
                            </p>
                        </a>
                        <footer className="blockquote-footer">
                          古偉健弟兄<br /><cite title="Source Title">2020年4月5日</cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Col>
                  {/* <Row className="collections">
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg1.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg3.jpg")}
                        ></img>
                      </Col>
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg8.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg7.jpg")}
                        ></img>
                      </Col>
                    </Row> */}
                </Col>
              </Tab>
              <Tab eventKey="2" title={null}>
                <Col className="ml-auto mr-auto" md="10">
                  {/* <Row className="collections">
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg6.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg11.jpg")}
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
                          src={require("assets/img/bg8.jpg")}
                        ></img>
                      </Col>
                    </Row> */}
                </Col>
              </Tab>
              <Tab eventKey="3" title={null}>
                <Col className="ml-auto mr-auto" md="10">
                  {/* <Row className="collections">
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
                    </Row> */}
                </Col>
              </Tab>
            </Tabs>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SharingList;
