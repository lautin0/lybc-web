import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader() {
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
        filter-color="green"
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
            <h2 className="title text-left">教會資源</h2>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
