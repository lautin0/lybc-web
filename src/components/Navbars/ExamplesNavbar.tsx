import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavDropdown,
  Navbar,
  Nav,
  Container,
  Tooltip
} from "react-bootstrap";

function ExamplesNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
        <Container>
          {/* <UncontrolledDropdown className="button-dropdown"> */}
          <NavDropdown id="" title="">
            <button
              // caret
              className="navbar-toggler navbar-toggler"
              data-toggle="dropdown"
              id="navbarDropdown"
              type="button"
              onClick={(e: any) => e.preventDefault()}
            >
              <span className="button-bar"></span>
              <span className="button-bar"></span>
              <span className="button-bar"></span>
            </button>
            {/* <DropdownMenu aria-labelledby="navbarDropdown">
              <DropdownItem header tag="a">
                Dropdown header
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                Action
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                Another action
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                Something else here
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                Separated link
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                One more separated link
              </DropdownItem>
            </DropdownMenu> */}
          </NavDropdown>
          <div className="navbar-translate">
            <Navbar.Brand
              href="#"
              target="_blank"
              id="navbar-brand"
            >
              {/* Now Ui Kit */}
            </Navbar.Brand>
            {/* <UncontrolledTooltip target="#navbar-brand">
              Designed by Invision. Coded by Creative Tim
            </UncontrolledTooltip> */}
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Navbar.Collapse
            className="justify-content-end"
            appear={collapseOpen}
          >
            <Nav>
              <Nav.Item>
                <Nav.Link to="/index" as={Link}>
                  回主頁
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#pablo">
                  技術支援
                </Nav.Link>
              </Nav.Item>
              {/* <NavItem>
                <NavLink
                  target="_blank"
                  id="twitter-tooltip"
                >
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem> */}
              <Nav.Item>
                <Nav.Link
                  target="_blank"
                  id="facebook-tooltip"
                  href="https://www.facebook.com/lukYeungBaptistChurch"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="https://www.instagram.com/lybc1997"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ExamplesNavbar;
