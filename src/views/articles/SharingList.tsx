import React, { useEffect } from "react";

// react-bootstrap components
import { Container, Row, Card, Col, Button, Nav, Tabs, Tab } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { css } from "styles/styles";
import storm from 'assets/img/storm.jpg'

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
  }, [])

  return (
    <>
      <div
        className="section"
      >
        <Container>
          <div className="button-container">
            <Button className="btn-round" color="info" size="lg">
              分享您的見證
            </Button>
          </div>
          <h5 className="description">
            相信弟兄姊妹在生活中會遇上不少困難和信仰上的衝激，但同行路上不孤單！歡迎弟兄姊妹投稿，分享您的見證，讓我們彼此激勵，互作見證，在主內共成長。
          </h5>
          <hr></hr>
          <Row className="my-1">
            <Col md={8} xs={12}>
              <div className="my-5" onClick={() => { navigate(1) }}>
                <div className={css.blog}>
                  <div className={css.blogText}>
                    <div className={css.blogOP}>
                      古偉健弟兄
                    </div>
                    <div className={css.blogHeader}>
                      <b>祈禱會分享(但以理組) 之 疫情中的信仰 - 神的應許和人的盼望</b>
                    </div>
                    <label className={css.blogQuote}>
                      在 1 Mar 2020的崇拜講道之領受
                    </label>
                    <p className={css.blogFooter}>
                      2020年4月5日
                    </p>
                  </div>
                  <div className={css.blogImg}>
                    <img src={storm}></img>
                  </div>
                  <div className={css.blogImgMobile}>
                    <img src={storm}></img>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="d-none d-md-block" md={4}>

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SharingList;
