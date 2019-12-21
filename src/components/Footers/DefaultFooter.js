/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  target="_blank"
                >
                  ABWE
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                >
                  About Us
                </a>
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
            . Modified by{" "}Tinyu
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
