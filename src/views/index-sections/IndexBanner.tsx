import React, { createRef, useEffect } from "react";
import { Link } from "react-router-dom";

// react-bootstrap components
import {
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";

function IndexBanner() {

  let myRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (window.innerWidth > 991) {
      const curr = myRef.current

      // Some random colors
      // const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
      const colors = ["#3CC157", "#2AA7FF", "#737373", "#FCBC0F", "#F85F36"];

      const numBalls = 40
      const balls = [];

      for (let i = 0; i < numBalls; i++) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.style.background = colors[Math.floor(Math.random() * colors.length)];
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        ball.style.width = `${(Math.random() * 2) + .5}em`;
        ball.style.height = ball.style.width;

        balls.push(ball);
        curr?.append(ball);
      }

      // Keyframes
      balls.forEach((el, i, ra) => {
        let to = {
          x: Math.random() * (i % 2 === 0 ? -11 : 11),
          y: Math.random() * 12
        };

        let anim = el.animate(
          [
            { transform: "translate(0, 0)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` }
          ],
          {
            duration: (Math.random() + 1) * 2000, // random duration
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
          }
        );
      });
    }
  },[]);

  return (
    <>
      <div ref={myRef} style={{ zIndex: 0 }}>
        <div className="section clear-filter" id="index-banner" style={{ zIndex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
          <Container>
            <div className="title" style={{ marginBottom: 50 }}>
              <h2 className="title">教會年題 - 2020</h2>
            </div>
            <Row className="text-center">
              <div className="w-100"><i style={{ fontSize: '4rem', position: 'relative' }} className="fa fa-cross"></i></div>
            </Row>
            <Row className="text-center mt-5">
              <Col className="ml-auto mr-auto d-none d-sm-block" md="8">
                <h1><b>守真理，結連關係</b></h1>
                <h1><b>證生命，同屬基督</b></h1>
              </Col>
              <Col className="ml-auto mr-auto d-sm-none">
                <h2><b>守真理，結連關係</b></h2>
                <h2><b>證生命，同屬基督</b></h2>
              </Col>
            </Row>
            <div className="text-center" style={{ marginBottom: 100, fontSize: 24 }}>
              <Button className="btn-info" size="lg" as={Link} to="/about-us">探索更多</Button>
            </div>
          </Container>
        </div>
      </div>
      {/* <div className="space-star section clear-filter" id="index-banner">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <Container id="index-banner-title" style={{ color: 'white', zIndex: 0 }}>
          <div className="title" style={{ marginBottom: 50 }}>
            <h2 className="title">教會年題 - 2020</h2>
          </div>
          <Row className="text-center" style={{ color: 'white', zIndex: 1 }}>
            <div className="w-100"><i style={{ fontSize: '5rem', position: 'relative' }} className="fa fa-cross"></i></div>
          </Row>
          <Row className="text-center mt-5">
            <Col className="ml-auto mr-auto d-none d-sm-block" md="8">
              <h1>守真理，結連關係</h1>
              <h1>證生命，同屬基督</h1>
            </Col>
            <Col className="ml-auto mr-auto d-sm-none">
              <h2>守真理，結連關係</h2>
              <h2>證生命，同屬基督</h2>
            </Col>
          </Row>
          <div className="text-center" style={{ marginBottom: 100, fontSize: 24, zIndex: 1 }}>
            <Button style={{ position: 'relative' }} className="btn-info" size="lg" as={Link} to="/about-us">探索更多</Button>
          </div>
        </Container>
      </div> */}
    </>
  );
}

export default IndexBanner;
