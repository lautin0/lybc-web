import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function MainPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-tiny"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          // style={{
          //   backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")"
          // }}
          ref={pageHeader}
        ></div>
        <Container>
          <div>
            <h2 style={{color: 'indigo'}} className="title text-left">香港萬國宣道浸信聯會』簡介</h2>
          </div>
        </Container>
      </div>
    </>
  );
}

export default MainPageHeader;
