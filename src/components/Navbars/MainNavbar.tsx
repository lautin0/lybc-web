import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";
// react-bootstrap components
import {
  Button,
  NavDropdown,
  Navbar,
  Nav,
  Container
} from "react-bootstrap";
import UNIVERSALS from "Universals";
import { getTokenValue, hasRole } from "utils/utils"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import { signOut } from "actions";
import NotificationBell from "components/Notification/NotificationBell";

import logo from "assets/img/lybc_logo.png";
import { Role } from "generated/graphql";

type MainNavbarProps = {
  page: string
}

function MainNavbar(props: MainNavbarProps) {

  const location = useLocation();

  const dispatch = useDispatch()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  const [show, setShow] = useState([false, false, false]);
  const showDropdown = (e: any, idx: number) => {
    let clone = [...show].map(x => false);
    clone[idx] = !show[idx]
    setShow(clone);
  }
  const hideDropdown = (e: any, idx: number) => {
    let clone = [...show];
    clone[idx] = false
    setShow(clone);
  }

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
      <Navbar className="fixed-top flex-wrap" expand="lg" style={{ paddingTop: 20, height: '135px', background: 'white' }}>
        <Container style={{ height: '100%', display: 'block' }}>
          <div className="navbar-translate">
            <Navbar.Brand
              style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
              as={Link}
              to="/index"
              id="main-navbar-brand"
              onClick={() => {
                // e.preventDefault();
                // window.scrollTo(0, 0);
              }}
            >
              <img
                style={{ maxHeight: 40, maxWidth: 40, marginRight: 5 }}
                alt="logo"
                src={logo}
              ></img>
              {" "}綠楊浸信會
            </Navbar.Brand>
            <div>
              {tokenPair?.token && <div className="d-inline-block d-lg-none"><NotificationBell className="d-inline d-lg-none" /></div>}
              <button
                className="navbar-toggler navbar-toggler"
                onClick={() => {
                  document.documentElement.classList.toggle("nav-open");
                  setCollapseOpen(!collapseOpen);
                }}
                style={{ verticalAlign: 'middle' }}
                aria-expanded={collapseOpen}
                type="button"
              >
                <span className="navbar-toggler-bar top-bar"></span>
                <span className="navbar-toggler-bar middle-bar"></span>
                <span className="navbar-toggler-bar bottom-bar"></span>
              </button>
            </div>
          </div>
          <Navbar.Collapse
            className="justify-content-end"
            appear={collapseOpen}
            style={{ marginTop: -42 }}
          >
            <Nav>
              <NavDropdown
                id=""
                title={<><i className="fas fa-map-signs mr-1"></i><p className="d-inline-block d-lg-none d-xl-inline-block">教會活動</p></>}
                show={show[0]}
                onMouseEnter={(e: any) => showDropdown(e, 0)}
                onMouseLeave={(e: any) => hideDropdown(e, 0)}
              >
                {/* {tokenPair?.token && <NavDropdown.Item as={Link} to="/worship-list">
                  網上崇拜
                </NavDropdown.Item>} */}
                <NavDropdown.Item as={Link} to="/worship-list" onClick={() => setCollapseOpen(!collapseOpen)}>
                  網上崇拜
                </NavDropdown.Item>
                <NavDropdown.Item>
                  最新活動
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/apply-activity">
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
                  <div className="d-inline-block d-lg-none d-xl-inline-block">事工介紹</div>
                </Nav.Link>
              </Nav.Item>
              <NavDropdown
                id=""
                title={<><i className="fas fa-book mr-1"></i><div className="d-inline-block d-lg-none d-xl-inline-block">教會刊物</div></>}
                show={show[1]}
                onMouseEnter={(e: any) => showDropdown(e, 1)}
                onMouseLeave={(e: any) => hideDropdown(e, 1)}
              >
                <NavDropdown.Item as={Link} to="/journal">
                  教會月刊
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sharing-list">
                  分享欄
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                id=""
                title={<><i className="fas fa-info-circle mr-1"></i><div className="d-inline-block d-lg-none d-xl-inline-block">認識綠楊</div></>}
                show={show[2]}
                onMouseEnter={(e: any) => showDropdown(e, 2)}
                onMouseLeave={(e: any) => hideDropdown(e, 2)}
              >
                <NavDropdown.Item as={Link} to="/about-us">
                  關於聯會
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/doctrine">
                  教會信條
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link} to="/sunday-service-info"
                >
                  聚會時間
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link} to="/contact-us"
                >
                  聯絡我們
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/preacher-message">
                  牧者的話
                </NavDropdown.Item>
              </NavDropdown>
              {tokenPair?.token && <NotificationBell className="d-none d-lg-inline" />}
              {!tokenPair?.token && <Nav.Item>
                <Nav.Link
                  className="nav-link btn-outline-secondary"
                  // color="success"
                  href="#pablo"
                  id="login"
                  as={Link}
                  to={`/login-page?relayState=${location.pathname}`}
                  // style={{ color: 'rgb(69, 147, 76)' }}
                  style={{ fontSize: '1.2rem', borderRadius: 12 }}
                >
                  {/* <i className="fas fa-user" style={{ fontSize: 14 }}></i> */}
                  <p>登入</p>
                </Nav.Link>
              </Nav.Item>}
              {tokenPair?.token &&
                <NavDropdown id="" title={<><i className="fas fa-user"></i><p>{getTokenValue(tokenPair.token)?.username}</p></>}>
                  {hasRole(tokenPair.token, Role.Admin) && <NavDropdown.Item as={Link} to="/admin" onClick={() => setCollapseOpen(!collapseOpen)}>
                    管理控制台
                  </NavDropdown.Item>}
                  {hasRole(tokenPair.token, Role.Admin) && <NavDropdown.Divider />}
                  <NavDropdown.Item
                    as="a"
                    href="#"
                    onClick={(e: any) => {
                      e.preventDefault();
                      dispatch(signOut())
                      window.location.href = "./"
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
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    paddingTop: 10
                  }}
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
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    paddingTop: 10
                  }}
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <div style={{ marginTop: -26 }}>
            <h3 className="title text-left d-none d-sm-block">{UNIVERSALS.TITLE_MAP[props.page].title}</h3>
            <h4 className="my-3 title text-left d-sm-none">{UNIVERSALS.TITLE_MAP[props.page].title}</h4>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

MainNavbar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default MainNavbar;
