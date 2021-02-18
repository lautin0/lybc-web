/*eslint-disable*/
import React from "react";

// react-bootstrap components
import { Container } from "react-bootstrap";
// core components

import logo from "assets/img/lybc_logo.png";
import bg12 from "assets/img/bg12.jpg";
import bg from "assets/img/ly_bg6.jpg";
import landingVideoSrc from "assets/video/rain.mp4"

function IndexHeader() {
  let pageHeader: any = React.createRef();

  React.useEffect(() => {
    const updateScroll = () => {
      let windowScrollTop = window.pageYOffset / 3;
      pageHeader.current && (pageHeader.current.style.transform =
        `translate3d(0,${windowScrollTop}px,0)`);
    };
    window.addEventListener("scroll", updateScroll);
    return function cleanup() {
      window.removeEventListener("scroll", updateScroll);
    };
  });

  return (
    <>
      <div className="page-header clear-filter" id="index" filter-color="gray">
        <div
          className="index-page-header-image"
          style={{
            backgroundImage: "url(" + bg + "), linear-gradient(105deg, rgb(0, 109, 1) 0%, navy 42%, rgb(107, 0, 0) 100%)",
            // backgroundImage: "url(" + bg + ")",
            // backgroundColor: 'darkslateblue',
            // top: 76,
            backgroundBlendMode: 'screen',
          }}
          ref={pageHeader}
        ></div>
        {/* <div
          className="page-header-image"
          ref={pageHeader}
        >
          <video playsInline autoPlay muted loop id="myVideo" className="video-bg">
            <source src={landingVideoSrc} type="video/mp4" />
          </video>
        </div> */}
        <Container>
          <div id="index-upper-div" className="brand animate__animated animate__fadeInUp animate__fast">
            <img
              alt="..."
              className="n-logo"
              src={logo}
            ></img>
            <h1 style={{ fontWeight: 'bold' }} className="h1-seo">綠楊浸信會</h1>
            <h3 style={{ fontWeight: 'bold' }}>Luk Yeung Baptist Church</h3>
          </div>
          <h6 className="category category-absolute">
            <i style={{ color: 'white', fontSize: 30 }} className="fas fa-chevron-down animate__animated animate__bounce animate__infinite animate__slow"></i>
          </h6>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
