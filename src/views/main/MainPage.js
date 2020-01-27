import React from "react";

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
import MainNavbar from "components/Navbars/MainNavbar.js";
import MainPageHeader from "components/Headers/MainPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function MainPage() {
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <MainNavbar />
      <div className="wrapper">
        <MainPageHeader />
        <div className="section">
          <Container>
            <Row>
              <Col className="img-button-container mb-3" md="6">
                <img
                  alt="..."
                  className="img-raised"
                  src={require("assets/img/bg1.jpg")}
                ></img>
                <div class="overlay">
                  <div class="img-overlay-text">見證</div>
                </div>
              </Col>
              <Col className="img-button-container mb-3" md="6">
                <img
                  alt="..."
                  className="img-raised"
                  src={require("assets/img/bg3.jpg")}
                ></img>
                <div class="overlay">
                  <div class="img-overlay-text">講道錄音</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="img-button-container mb-3" md="6">
                <img
                  alt="..."
                  className="img-raised"
                  src={require("assets/img/bg8.jpg")}
                ></img>
                <div class="overlay">
                  <div class="img-overlay-text">詩歌庫</div>
                </div>
              </Col>
              <Col className="img-button-container mb-3" md="6">
                <img
                  alt="..."
                  className="img-raised"
                  src={require("assets/img/bg7.jpg")}
                ></img>
                <div class="overlay">
                  <div class="img-overlay-text">相冊</div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default MainPage;
