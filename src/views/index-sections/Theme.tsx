import React from "react";

// react-bootstrap components
import { Container, Row, Col } from "react-bootstrap";

// core components

import photoSq5 from "assets/img/photo5_sq.jpg";
import { useIntl } from "react-intl";

function Theme() {

  const intl = useIntl()

  return (
    <>
      <div className="section" data-background-color="violet" style={{ paddingBottom: 100 }}>
        <Container>
          <Row>
            <Col className="justify-content-center text-center" md="6">
              <h2>{intl.formatMessage({ id: "app.theme2.title" })}</h2>
              <img style={{ maxHeight: 400 }} src={photoSq5} alt="bible" />
            </Col>
            <Col className="justify-content-center text-center my-auto" md="6">
              <h3 className="mt-5">{intl.formatMessage({ id: "app.theme2.subtitle" })}</h3>
              <p style={{ fontSize: 20 }} className="description">
                {intl.formatMessage({ id: "app.theme2.l1" })}
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* <div className="d-flex">
        <div className="flex-fill">
          <Container className="justify-content-center text-center">
            <h2>以聖言為中心的信仰</h2>
            <img style={{maxHeight: 400}} src={require("assets/img/photo5_sq.jpg")} alt="bible image" />
          </Container>
        </div>
        <div className="flex-fill" style={{height: 650}} data-background-color="violet">
          <Container className="justify-content-center text-center my-auto">
            <h3 className="mt-5">我們重視什麽？</h3>
            <p style={{ fontSize: 20 }} className="description">
              教會注重信徒的生命，真理的教導和福音的確據。我們鼓勵信徒互作見證，以致互相在真理中扎根，在主裡共成長。
            </p>
          </Container>
        </div>
      </div> */}
    </>
  );
}

export default Theme;
