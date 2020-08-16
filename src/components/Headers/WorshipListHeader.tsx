import React from "react";

// reactstrap components
import { Button, Container } from "react-bootstrap";

// core components

function WorshipListHeader() {
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
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">網上崇拜</h1>
            <div className="text-center">
              我要聽　神—耶和華所說的話，因為他必應許賜平安給他的百姓，就是他的聖民；
              他們卻不可再轉向愚昧。他的救恩誠然與敬畏他的人相近，
              使榮耀住在我們的地上。
              (詩篇 85:8-9 和合本2010)
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default WorshipListHeader;
