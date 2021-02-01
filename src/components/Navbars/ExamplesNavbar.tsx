import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import { useIntl } from "react-intl";

function ExamplesNavbar() {

  const intl = useIntl()

  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("bg-info");
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
      <Navbar className={"fixed-top " + navbarColor} color="danger" expand="lg">
        <Container>
          {/* <Dropdown
            id=""
            title=""
            aria-labelledby="navbarDropdown"
          >
            <Dropdown.Toggle id="">
              <button
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
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header as="a">
                Dropdown header
              </Dropdown.Header>
              <Dropdown.Item href="#pablo" onClick={(e: any) => e.preventDefault()}>
                Action
              </Dropdown.Item>
              <Dropdown.Item href="#pablo" onClick={(e: any) => e.preventDefault()}>
                Another action
              </Dropdown.Item>
              <Dropdown.Item href="#pablo" onClick={(e: any) => e.preventDefault()}>
                Something else here
              </Dropdown.Item>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Item href="#pablo" onClick={(e: any) => e.preventDefault()}>
                Separated link
              </Dropdown.Item>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Item href="#pablo" onClick={(e: any) => e.preventDefault()}>
                One more separated link
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          <div className="navbar-translate">
            <Navbar.Brand
              href="#"
              target="_blank"
              id="navbar-brand"
              as="a"
            >
            </Navbar.Brand>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar" style={{ background: 'white' }}></span>
              <span className="navbar-toggler-bar middle-bar" style={{ background: 'white' }}></span>
              <span className="navbar-toggler-bar bottom-bar" style={{ background: 'white' }}></span>
            </button>
          </div>
          <Navbar.Collapse
            className="justify-content-end"
            appear={collapseOpen}
          >
            <Nav>
              <Nav.Item>
                <Nav.Link to="/index" as={Link} style={{ color: collapseOpen ? 'black' : 'white' }}>
                  {intl.formatMessage({ id: "app.back-to-home" })}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#pablo" style={{ color: collapseOpen ? 'black' : 'white' }}>
                  {intl.formatMessage({ id: "app.support" })}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  style={{
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    paddingTop: 10
                  }}
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
                  style={{
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    paddingTop: 10
                  }}
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
