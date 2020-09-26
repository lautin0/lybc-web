/*eslint-disable*/
import React from "react";

// react-bootstrap components
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function TransparentFooter() {
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
                ABWE
                </a>
            </li>
            <li>
              <Link
                to="/about-us"
              >
                About Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright" style={{ paddingTop: 2 }}>
          版權所有{" "}©2020{" "}綠楊浸信會
        </div>
      </Container>
    </footer>
  );
}

export default TransparentFooter;
