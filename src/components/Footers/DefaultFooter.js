/*eslint-disable*/
import React from "react";
import { Link } from 'react-router-dom'

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default" style={{marginTop: '20vh'}}>
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
                  target="_blank"
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
    </>
  );
}

export default DefaultFooter;
