/*eslint-disable*/
import { Link } from 'react-router-dom'

// react-bootstrap components
import { Container } from "react-bootstrap";
import { useIntl } from "react-intl";
import AuthContext from 'context/AuthContext';
import { useContext } from 'react';

// core components

function DefaultFooter() {

  const intl = useIntl()

  const { tokenPair } = useContext(AuthContext)

  return (
    <footer
      className="footer footer-default"
      style={{ marginTop: 100 }}
    >
      <div className="d-flex flex-wrap" style={{ marginBottom: '7vh' }}>
        <div className="offset-sm-2 col-sm-1 col-md-2" style={{ width: '50%' }}>
          <h4>{intl.formatMessage({ id: "app.menu.about-us.lybc" })}</h4>
          <ul className="sitemap">
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
          </ul>
        </nav>
        <div className="copyright" id="copyright" style={{ paddingTop: 2 }}>
          {intl.formatMessage({ id: "app.copyright" }, { year: new Date().getFullYear() })}
        </div>
      </Container>
    </footer>
  );
}

export default DefaultFooter;
