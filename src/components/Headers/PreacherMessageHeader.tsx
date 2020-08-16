import React from "react";

// reactstrap components
import { Container } from "react-bootstrap";

// core components

function PreacherMessageHeader() {
  let pageHeader: any = React.createRef();

  React.useEffect(() => {
    // if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    // }
  });
  return (
    <>
      <div
        className="page-header page-header-small"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg8.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">牧者的話</h1>
            <p className="category">黃雪梅 主任傳道</p>
          </Container>
        </div>
      </div>
    </>
  );
}

export default PreacherMessageHeader;
