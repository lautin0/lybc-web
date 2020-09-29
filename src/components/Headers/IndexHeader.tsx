/*eslint-disable*/
import React from "react";

// react-bootstrap components
import { Container } from "react-bootstrap";
// core components

function IndexHeader() {
  let pageHeader: any = React.createRef();

  React.useEffect(() => {
    const updateScroll = () => {
      let windowScrollTop = window.pageYOffset / 3;
      pageHeader.current.style.transform =
        `translate3d(0,${windowScrollTop}px,0)`;
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
            backgroundImage: "url(" + require("assets/img/bg12.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="brand animate__animated animate__fadeInUp animate__fast" style={{ marginTop: 100 }}>
            <img
              alt="..."
              className="n-logo"
              src={require("assets/img/lybc_logo.png")}
            ></img>
            <h1 className="h1-seo">綠楊浸信會</h1>
            <h3>Luk Yeung Baptist Church</h3>
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
