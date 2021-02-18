/*eslint-disable*/
import React from "react";
import { Link } from 'react-router-dom'

// react-bootstrap components
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import { useIntl } from "react-intl";

// core components

function DefaultFooter() {

  const intl = useIntl()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  return (
    <footer
      className="footer footer-default"
      style={{ marginTop: 150 }}
    >
      <div className="d-flex flex-wrap" style={{ marginBottom: '7vh' }}>
        <div className="offset-sm-2 col-sm-1 col-md-2" style={{ width: '50%' }}>
          <h4>{intl.formatMessage({ id: "app.menu.activity" })}</h4>
          <ul className="sitemap">
            {/* {tokenPair?.token && <li>
              <Link to="/worship-list">
                網上崇拜
              </Link>
            </li>} */}
            <li>
              <Link to="/worship-list">
                {intl.formatMessage({ id: "app.menu.activity.online-sermon" })}
              </Link>
            </li>
            <li>
              <Link to="/">
                {intl.formatMessage({ id: "app.latest-updates" })}
              </Link>
            </li>
            <li>
              <Link to="/apply-activity">
                {intl.formatMessage({ id: "app.menu.activity.apply" })}
              </Link>
            </li>
            <li>
              <Link to="/">
                {intl.formatMessage({ id: "app.menu.activity.fellowship" })}
              </Link>
            </li>
            <li>
              <Link to="/">
                {intl.formatMessage({ id: "app.menu.activity.memories" })}
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-1 col-md-2" style={{ width: '50%' }}>
          <h4>{intl.formatMessage({ id: "app.menu.ministries" })}</h4>
          <ul className="sitemap">
            <li>
              <Link to="/">
                {intl.formatMessage({ id: "app.menu.ministries.visits" })}
              </Link>
            </li>
            <li>
              <Link to="/">
                {intl.formatMessage({ id: "app.menu.ministries.youth" })}
              </Link>
            </li>
            <li>
              <Link to="/">
                {intl.formatMessage({ id: "app.menu.ministries.outreach" })}
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-1 col-md-2" style={{ width: '50%' }}>
          <h4>{intl.formatMessage({ id: "app.menu.resources" })}</h4>
          <ul className="sitemap">
            <li>
              <Link to="/journal">
                {intl.formatMessage({ id: "app.menu.resources.journal" })}
              </Link>
            </li>
            <li>
              <Link to="/sharing-list">
                {intl.formatMessage({ id: "app.menu.resources.sharing" })}
              </Link>
            </li>
            {tokenPair?.token && <li>
              <Link to="/library">
                {intl.formatMessage({ id: "app.menu.resources.books-enquiry" })}
              </Link>
            </li>}
          </ul>
        </div>
        <div className="col-sm-1 col-md-2" style={{ width: '50%' }}>
          <h4>{intl.formatMessage({ id: "app.menu.about-us.lybc" })}</h4>
          <ul className="sitemap">
            {/* <li>
              <Link to="/about-us">
                {intl.formatMessage({ id: "app.menu.about-us.abwe" })}
              </Link>
            </li> */}
            <li>
              <Link to="/doctrine">
                {intl.formatMessage({ id: "app.menu.about-us.doctrine" })}
              </Link>
            </li>
            <li>
              <Link
                to="/sunday-service-info"
              >
                {intl.formatMessage({ id: "app.menu.about-us.timetable" })}
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
              >
                {intl.formatMessage({ id: "app.menu.about-us.contact" })}
              </Link>
            </li>
            <li>
              <Link to="/preacher-message">
                {intl.formatMessage({ id: "app.menu.about-us.preacher-message" })}
              </Link>
            </li>
            <li>
              <Link to="/careers">
                {intl.formatMessage({ id: "app.title.careers" })}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Container>
        <nav>
          <ul>
            <li>
              <a
                target="_blank"
                href="http://www.hkabwe.org/"
              >
                {intl.formatMessage({ id: "app.abwe" })}
              </a>
            </li>
            {/* <li>
              <Link
                to="/about-us"
              >
                {intl.formatMessage({ id: "app.menu.about-us" })}
              </Link>
            </li> */}
          </ul>
        </nav>
        <div className="copyright" id="copyright" style={{ paddingTop: 2 }}>
          {intl.formatMessage({ id: "app.copyright" })}
        </div>
      </Container>
    </footer>
  );
}

export default DefaultFooter;
