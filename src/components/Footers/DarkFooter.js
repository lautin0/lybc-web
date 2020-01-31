/*eslint-disable*/
import React from "react";
import { Link } from 'react-router-dom'

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
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
            <li>
              <a
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          . 版權所有{" "}©2020{" "}綠楊浸信會 .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
