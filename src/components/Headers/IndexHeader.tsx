/*eslint-disable*/
import React from "react";

// react-bootstrap components
import { Container } from "react-bootstrap";
// core components

import logo from "assets/img/lybc_logo.png";
import bg12 from "assets/img/bg12.jpg";

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
          className="page-header-image"
          style={{
            backgroundImage: "url(" + bg12 + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="brand animate__animated animate__fadeInUp animate__fast" style={{ marginTop: 100 }}>
            <img
              alt="..."
              className="n-logo"
              src={logo}
            ></img>
            <h1 className="h1-seo">綠楊浸信會</h1>
            <h3>Luk Yeung Baptist Church</h3>
          </div>
          <h6 className="category category-absolute" style={{ top: '90vh' }}>
            <i style={{ color: 'white', fontSize: 30 }} className="fas fa-chevron-down animate__animated animate__bounce animate__infinite animate__slow"></i>
          </h6>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
