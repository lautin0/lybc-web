import React from "react";
import { Link, useHistory } from "react-router-dom";
// react-bootstrap components
import {
  Button,
  NavDropdown,
  Navbar,
  Nav,
  Container
} from "react-bootstrap";
import { RootState } from "reducers";
import { useDispatch, useSelector } from "react-redux";
import { Role } from "Universals";
import { getTokenValue, hasRole } from 'utils/utils'
import { signOut } from "actions";

function IndexNavbar() {

  const history = useHistory();

  const dispatch = useDispatch();

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 249 ||
        document.body.scrollTop > 249
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 350 ||
        document.body.scrollTop < 350
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
      <Navbar className={"fixed-top " + navbarColor} expand="lg" style={{ background: '#45934c' }}>
        <Container>
          <div className="navbar-translate">
            <Navbar.Brand
              style={{ zIndex: 9999 }}
              href="#pablo"
              id="index-navbar-brand"
              onClick={(e: any) => {
                e.preventDefault();
                window.scrollTo(0, 0);
                history.push('/')
              }}
            >
              <img
                style={{ maxHeight: 30, maxWidth: 30, marginRight: 5 }}
                alt="logo"
                src={require("assets/img/lybc_logo.png")}
              ></img>
              {" "}綠楊浸信會
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
              <NavDropdown id="" title={<><i className="fas fa-map-signs mr-1"></i>教會活動</>}>
                <NavDropdown.Item as={Link} to="/worship-list" onClick={() => setCollapseOpen(!collapseOpen)}>
                  網上崇拜
                </NavDropdown.Item>
                <NavDropdown.Item>
                  最新活動
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/apply-activity" onClick={() => setCollapseOpen(!collapseOpen)}>
                  活動報名
                </NavDropdown.Item>
                <NavDropdown.Item>
                  團契
                </NavDropdown.Item>
                <NavDropdown.Item>
                  點滴回顧
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
                <Nav.Link
                  href="#pablo"
                  onClick={(e: any) => {
                    e.preventDefault();
                  }}
                >
                  <i className="fas fa-hammer"></i>
                  <p>事工介紹</p>
                </Nav.Link>
              </Nav.Item>
              <NavDropdown id="" title={<><i className="fas fa-book mr-1"></i>教會刊物</>}>
                <NavDropdown.Item as={Link} to="/journal" onClick={() => setCollapseOpen(!collapseOpen)}>
                  教會月刊
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sharing-list" onClick={() => setCollapseOpen(!collapseOpen)}>
                  分享欄
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/preacher-message" onClick={() => setCollapseOpen(!collapseOpen)}>
                  牧者的話
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown id="" title={<><i className="fas fa-info-circle mr-1"></i>認識綠楊</>}>
                <NavDropdown.Item as={Link} to="/about-us" onClick={() => setCollapseOpen(!collapseOpen)}>
                  關於聯會
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/doctrine" onClick={() => setCollapseOpen(!collapseOpen)}>
                  教會信條
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link} to="/sunday-service-info"
                  onClick={() => setCollapseOpen(!collapseOpen)}
                >
                  聚會時間
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link} to="/contact-us"
                  onClick={() => setCollapseOpen(!collapseOpen)}
                >
                  聯絡我們
                </NavDropdown.Item>
                {/* <NavDropdown.Item
                  target="_blank"
                  onClick={e => {
                    e.preventDefault();
                    document
                      .getElementById("sunday-service-info-section")
                      .scrollIntoView();
                  }}
                >
                  聚會時間
                </NavDropdown.Item>
                <NavDropdown.Item
                  target="_blank"
                  onClick={e => {
                    e.preventDefault();
                    document
                      .getElementById("contact-us-section")
                      .scrollIntoView();
                  }}
                >
                  聯絡我們
                </NavDropdown.Item> */}
              </NavDropdown>
              {!tokenPair?.token && <Nav.Item>
                <Button
                  className="nav-link btn-neutral"
                  // color="success"
                  href="#pablo"
                  id="login"
                  as={Link}
                  to="/login-page"
                  onClick={() => setCollapseOpen(!collapseOpen)}
                  style={{ color: 'rgb(69, 147, 76)' }}
                >
                  <i className="fas fa-user" style={{ fontSize: 14 }}></i>
                  <p>會友登入</p>
                </Button>
              </Nav.Item>}
              {tokenPair?.token &&
                <NavDropdown id="" title={<><i className="fas fa-user"></i><p>{getTokenValue(tokenPair.token)?.username}</p></>}>
                  {hasRole(tokenPair.token, Role.ADMIN) && <NavDropdown.Item as={Link} to="/admin" onClick={() => setCollapseOpen(!collapseOpen)}>
                    管理控制台
                  </NavDropdown.Item>}
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as="a"
                    href="#"
                    onClick={(e: any) => {
                      e.preventDefault();
                      dispatch(signOut())
                      window.location.href = './'
                    }}
                  >
                    登出
                  </NavDropdown.Item>
                </NavDropdown>}
              <Nav.Item>
                <Nav.Link
                  href="https://www.facebook.com/lukYeungBaptistChurch"
                  target="_blank"
                  id="facebook-tooltip"
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

export default IndexNavbar;
