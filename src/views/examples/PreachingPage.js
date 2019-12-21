import React from "react";

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function PreachingPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <LandingPageHeader />
        <div className="section section-about-us">
          <Container>
            <div className="separator separator-primary"></div>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">2020 年度主題：興起信徒心，關心宣教事</h2>
                <h5 className="description">
                  本部致力興起教會眾人為主奔跑的心，推動信徒關心社區和海外工場的屬靈需要，讓我們一起拓展神的國，實踐大使命。
                </h5>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section section-team text-center">
          <Container>
            <h2 className="title">我們的成員</h2>
            <div className="team">
              <Row className="mb-3">
                <Col md="12">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/avatar.jpg")}
                    ></img>
                    <h4 className="title">黃姑娘</h4>
                    <p className="category text-info">部牧</p>
                    <p className="description">
                      負責部門牧養工作，協調部員，兼任顧問。
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-instagram"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/eva.jpg")}
                    ></img>
                    <h4 className="title">余小姐</h4>
                    <p className="category text-info">部長</p>
                    <p className="description">
                      負責計劃、統籌與參與傳道和宣教事工。
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-youtube"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/ryan.jpg")}
                    ></img>
                    <h4 className="title">劉先生</h4>
                    <p className="category text-info">副部長</p>
                    <p className="description">
                      負責輔助部門工作，輔助部長部牧。
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-linkedin"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/ryan.jpg")}
                    ></img>
                    <h4 className="title">陳先生</h4>
                    <p className="category text-info">副部長</p>
                    <p className="description">
                      負責輔助部門工作，輔助部長部牧。
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-linkedin"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col md="6">
                <h3>
                  傳道部月刊
                  </h3>
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
        <DefaultFooter />
      </div>
    </>
  );
}

export default PreachingPage;
