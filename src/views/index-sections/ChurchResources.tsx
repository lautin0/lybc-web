import React, { useEffect } from "react";

// react-bootstrap components
import {
  Row,
  Col,
  Card
} from "react-bootstrap";

import { useHistory } from "react-router-dom";

import sharing from "assets/img/microphone_sm.jpg";
import news from "assets/img/lightbulb_sm.jpg";
import sermon from "assets/img/sermon_sm.jpg";
import { useCallback } from "react";
import { useIntl } from "react-intl";

function ChurchResources() {

  const intl = useIntl()

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
    window.addEventListener("scroll", () => {
      handleScroll();
    })

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll])

  return (
    <>
      <div
        className="section clear-filter"
      >
        <Row className="justify-content-center mx-auto scroll-animations" style={{ marginTop: 100, marginBottom: 100 }}>
          <Col className="animated animate__animated text-center" md="6" lg="3">
            <Card
              className="text-center"
              onClick={() => { history.push('/worship-list') }}
              style={{ cursor: 'pointer', maxWidth: 350 }}
            >
              <Card.Img src={sermon} style={{ width: 350, height: 215, objectFit: 'fill' }} />
              <Card.Body>
                <Card.Title>{intl.formatMessage({ id: "app.title.worship" })}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col className="animated animate__animated text-center" md="6" lg="3">
            <Card
              onClick={() => { history.push('/news-list') }}
              className="text-center"
              style={{ cursor: 'pointer', maxWidth: 350 }}
            >
              <Card.Img src={news} style={{ width: 350, height: 215, objectFit: 'fill' }} />
              <Card.Body>
                <Card.Title>{intl.formatMessage({ id: "app.latest-updates" })}</Card.Title>
              </Card.Body>
            </Card>
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
                <Card.Title>{intl.formatMessage({ id: "app.title.sharing" })}</Card.Title>
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
