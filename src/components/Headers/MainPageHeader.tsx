import React from "react";
import PropTypes from 'prop-types';

// reactstrap components
import { Button, Container } from "react-bootstrap";
import UNIVERSALS from "Universals";

// core components

type MainPageHeaderType = {
  page: string,
}

function MainPageHeader(props: MainPageHeaderType) {
  let pageHeader: any = React.createRef();

  React.useEffect(() => {
    // if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current && (pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)");
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    // }
  });

  React.useEffect(() => {
    document.title = UNIVERSALS.TITLE_MAP[props.page].title
  },[props.page])

  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg" + UNIVERSALS.TITLE_MAP[props.page].bg + ".jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">{UNIVERSALS.TITLE_MAP[props.page].title}</h1>
            {UNIVERSALS.TITLE_MAP[props.page].subtitle && <div className="text-center">
              <p className="category">{UNIVERSALS.TITLE_MAP[props.page].subtitle}</p>
              {/* <Button
                className="btn-icon btn-round"
                color="info"
                href="#pablo"
                onClick={(e: any) => e.preventDefault()}
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <Button
                className="btn-icon btn-round"
                color="info"
                href="#pablo"
                onClick={(e: any) => e.preventDefault()}
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button
                className="btn-icon btn-round"
                color="info"
                href="#pablo"
                onClick={(e: any) => e.preventDefault()}
              >
                <i className="fab fa-google-plus"></i>
              </Button> */}
            </div>}
          </Container>
        </div>
      </div>
    </>
  );
}

MainPageHeader.propTypes = {
  page: PropTypes.string.isRequired
};

export default MainPageHeader;
