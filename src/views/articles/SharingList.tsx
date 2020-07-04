import React from "react";

// react-bootstrap components
import { Container, Row, Card, Col } from "react-bootstrap";
import { useHistory } from "react-router";

// core components

function SharingList() {

  const history = useHistory();

  //Default scroll to top
  window.scrollTo(0, 0)

  const navigate = (id: any) => {
    history.push(`/sharing/${id}`)
  }

  return (
    <>
      <div
        //className="section section-download"
        // className="section"
        className="my-5"
      // data-background-color="black"
      // id="about-us-section"
      >
        <Container style={{ marginBottom: 200 }}>
          <Row className="card mx-auto my-3" style={{ borderRadius: '0.3rem' }}>
            <Card.Header style={{ background: 'lightgrey', borderRadius: '0.3rem 0.3rem 0rem 0rem' }}><label className="m-3" style={{ fontSize: '1.5rem' }}>盼望</label></Card.Header>
            <Card.Body className="row">
              <Col className="text-left" md={4} xs={12} style={{ borderRadius: '.5rem' }} onClick={() => { navigate(1) }}>
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
              </Col>
            </Card.Body>
          </Row>
          <Row className="card mx-auto my-3" style={{ borderRadius: '0.3rem' }}>
            <Card.Header style={{ background: 'lightgrey', borderRadius: '0.3rem 0.3rem 0rem 0rem' }}><label className="m-3" style={{ fontSize: '1.5rem' }}>信心</label></Card.Header>
          </Row>
          <Row className="card mx-auto my-3" style={{ borderRadius: '0.3rem' }}>
            <Card.Header style={{ background: 'lightgrey', borderRadius: '0.3rem 0.3rem 0rem 0rem' }}><label className="m-3" style={{ fontSize: '1.5rem' }}>愛心</label></Card.Header>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SharingList;
