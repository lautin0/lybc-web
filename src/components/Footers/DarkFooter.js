/*eslint-disable*/
import React from "react";

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
              >
                ABWE
              </a>
            </li>
            <li>
              <a
              >
                About Us
              </a>
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
          . Modified by{" "}
            Tinyu
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
