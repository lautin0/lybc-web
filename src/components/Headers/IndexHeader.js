/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components

function IndexHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    const updateScroll = () => {
      let windowScrollTop = window.pageYOffset / 3;
      pageHeader.current.style.transform =
        "translate3d(0," + windowScrollTop + "px,0)";
    };
    window.addEventListener("scroll", updateScroll);
    return function cleanup() {
      window.removeEventListener("scroll", updateScroll);
    };    
  });

  return (
    <>
      <div className="page-header clear-filter" id="index" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg12.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand">
            <img
              alt="..."
              className="n-logo"
              src={require("assets/img/lybc_logo.png")}
            ></img>
            <h1 className="h1-seo">綠楊浸信會</h1>
            <h3>Luk Yeung Baptist Church</h3>
          </div>
          <h6 className="category category-absolute">
            {/* Last updated on 2019 Dec */}
            {" "}
            {/* <a href="http://invisionapp.com/?ref=creativetim" target="_blank">
              <img
                alt="..."
                className="invision-logo"
                src={require("assets/img/invision-white-slim.png")}
              ></img>
            </a> 
            . Coded by{" "}
            <a
              href="https://www.creative-tim.com?ref=nukr-index-header"
              target="_blank"
            >
              <img
                alt="..."
                className="creative-tim-logo"
                src={require("assets/img/creative-tim-white-slim2.png")}
              ></img>
            </a> */}
            <i style={{ color: 'white', fontSize: 30 }} className="fas fa-chevron-down"></i>
          </h6>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
