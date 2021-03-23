import React from "react";
import PropTypes from 'prop-types';

// reactstrap components
import { Container } from "react-bootstrap";
import UNIVERSALS from "Universals";
import { useIntl } from "react-intl";
import useLanguage from "hooks/useLanguage";

// core components

type MainPageHeaderType = {
  page: string,
}

function MainPageHeader(props: MainPageHeaderType) {
  let pageHeader: any = React.createRef();

  const [locale] = useLanguage()
  
  const intl = useIntl()

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
    document.title = intl.formatMessage({ id: UNIVERSALS.TITLE_MAP[props.page].title })
  }, [props.page, locale])

  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + UNIVERSALS.TITLE_MAP[props.page].bg + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            {window.innerHeight > 375 && <h1 className="title" style={{ textAlign: 'left' }}>{intl.formatMessage({ id: UNIVERSALS.TITLE_MAP[props.page].title })}</h1>}
            {window.innerHeight <= 375 && <h3 className="title">{intl.formatMessage({ id: UNIVERSALS.TITLE_MAP[props.page].title })}</h3>}
            {UNIVERSALS.TITLE_MAP[props.page].subtitle && <div className="text-center">
              <p className="category">{intl.formatMessage({ id: UNIVERSALS.TITLE_MAP[props.page].subtitle })}</p>
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
