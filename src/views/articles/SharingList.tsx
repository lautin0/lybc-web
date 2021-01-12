import React, { useEffect } from "react";

// react-bootstrap components
import { Container, Row, Card, Col, Button, Nav, Tabs, Tab } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { css } from "styles/styles";
import storm from 'assets/img/storm.jpg'
import gethsemane from 'assets/img/gethsemane.jpg'
import heart from 'assets/img/heart.jpg'

// core components

function SharingList() {

  const history = useHistory();

  const navigate = (id: string) => {
    history.push('/sharing/' + id)
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
              分享您的想法
            </Button>
          </div>
          <h5 className="description">
            相信弟兄姊妹在生活中會遇上不少困難和信仰上的衝激，但同行路上不孤單！歡迎弟兄姊妹投稿，分享您的想法，讓我們彼此激勵，互作見證，在主內共成長。
          </h5>
          <hr></hr>
          <Row className="my-1">
            <Col md={8} xs={12}>
              <div className="my-5" onClick={() => { navigate('5ffda6d9ad3e428c49801c94') }}>
                <div className={css.blog}>
                  <div className={css.blogText}>
                    <div className={css.blogOP}>
                      黃雪梅主任傳道
                    </div>
                    <div className={css.blogHeader}>
                      <b>重見初心</b>
                    </div>
                    <label className={css.blogQuote}>
                      天寒，樹葉落下，露出樹幹。 沒有了遮掩，沒有了自建的掩護，那支撐著我們的，清清楚楚就是主自己
                    </label>
                    <p className={css.blogFooter}>
                      2021年1月12日
                    </p>
                  </div>
                  <div className={css.blogImg}>
                    <img src={heart}></img>
                  </div>
                  <div className={css.blogImgMobile}>
                    <img src={heart}></img>
                  </div>
                </div>
              </div>
              <div className="my-5" onClick={() => { navigate('5f850a38227dc4647ac6c586') }}>
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
              <div className="my-5" onClick={() => { navigate('5ffcfcf7bc28ffba6fbac2bb') }}>
                <div className={css.blog}>
                  <div className={css.blogText}>
                    <div className={css.blogOP}>
                      黃雪梅主任傳道
                    </div>
                    <div className={css.blogHeader}>
                      <b>在客西馬尼園!醒來吧!</b>
                    </div>
                    <label className={css.blogQuote}>
                      上帝和主耶穌基督的僕人、綠楊家的牧者問候你們——就是在疫情下，守望家人、教會和香港、及至世界的兄姊妹們
                    </label>
                    <p className={css.blogFooter}>
                      2020年4月5日
                    </p>
                  </div>
                  <div className={css.blogImg}>
                    <img src={gethsemane}></img>
                  </div>
                  <div className={css.blogImgMobile}>
                    <img src={gethsemane}></img>
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
