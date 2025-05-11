/*eslint-disable*/
import React from "react";

// react-bootstrap components
import { Container } from "react-bootstrap";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

function TransparentFooter() {

  const intl = useIntl()

  return (
    <footer className="footer">
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
            <li>
              <Link
                to="/about-us"
              >
                {intl.formatMessage({ id: "app.menu.about-us" })}
              </Link>
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

export default TransparentFooter;
