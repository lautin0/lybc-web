import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
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
import { getTokenValue, hasRole } from 'utils/utils'
import { SetSysInfoMessage, signOut } from "actions";
import NotificationBell from "components/Notification/NotificationBell";

import logo from "assets/img/lybc_logo.png";
import { Role } from "generated/graphql";
import { useQuery } from "@apollo/client";
import { GET_MAX_WORSHIP_ID } from "graphqls/graphql";
import moment from "moment";
import UNIVERSALS from "Universals";

function IndexNavbar() {

  const history = useHistory();

  const location = useLocation();

  const dispatch = useDispatch();

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);
  // const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarColor, setNavbarColor] = useState("");
  const [collapseOpen, setCollapseOpen] = useState(false);

  const [show, setShow] = useState([false, false, false]);
  const showDropdown = (e: any, idx: number) => {
    let clone = [...show].map(x => false);
    clone[idx] = !show[idx]
    setShow(clone);
  }

  const { data } = useQuery<{ maxWorshipId: string }>(GET_MAX_WORSHIP_ID)

  const hideDropdown = (e: any, idx: number) => {
    let clone = [...show];
    clone[idx] = false
    setShow(clone);
  }

  useEffect(() => {
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
        // setNavbarColor("navbar-transparent");
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
      <Navbar className={"fixed-top " + navbarColor} expand="lg" style={{ background: 'white' }}>
        <Container>
          <div className="navbar-translate">
            <Navbar.Brand
              style={{ zIndex: 9999, fontSize: '1.5rem', fontWeight: 'bold' }}
              href="#pablo"
              id="index-navbar-brand"
              onClick={(e: any) => {
                e.preventDefault();
                window.scrollTo(0, 0);
                history.push('/')
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
          >
            <Nav>
              <Nav.Item>
                <Nav.Link
                  href="#pablo"
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (data != null) {
                      const maxDate = moment(data.maxWorshipId, 'YYYYMMDD')
                      dispatch(SetSysInfoMessage((UNIVERSALS.NOTIFICATION.MESSAGE as string)
                        .replace("{0}", data.maxWorshipId)
                        .replace("{1}", `(更新: ${maxDate.format('YYYY')} 年 ${maxDate.format('M')} 月 ${maxDate.format('D')} 日)`)))
                    }
                  }}
                >
                  <i style={{ fontSize: 18, color: 'steelblue' }} className="fas fa-info-circle"></i>
                </Nav.Link>
              </Nav.Item>
              <NavDropdown
                id=""
                title={<><i className="fas fa-map-signs mr-1"></i><div className="d-inline-block d-lg-none d-xl-inline-block">教會活動</div></>}
                show={show[0]}
                onMouseEnter={(e: any) => showDropdown(e, 0)}
                onMouseLeave={(e: any) => hideDropdown(e, 0)}
              >
                {/* {tokenPair?.token && <NavDropdown.Item as={Link} to="/worship-list" onClick={() => setCollapseOpen(!collapseOpen)}>
                  網上崇拜
                </NavDropdown.Item>} */}
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
                  disabled
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
                title={<><i className="fas fa-book mr-1"></i><div className="d-inline-block d-lg-none d-xl-inline-block">教會資源</div></>}
                show={show[1]}
                onMouseEnter={(e: any) => showDropdown(e, 1)}
                onMouseLeave={(e: any) => hideDropdown(e, 1)}
              >
                <NavDropdown.Item as={Link} to="/journal" onClick={() => setCollapseOpen(!collapseOpen)}>
                  教會月刊
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sharing-list" onClick={() => setCollapseOpen(!collapseOpen)}>
                  分享欄
                </NavDropdown.Item>
                {tokenPair?.token && <NavDropdown.Item as={Link} to="/library">
                  書藉查詢
                </NavDropdown.Item>}
              </NavDropdown>
              <NavDropdown
                id=""
                title={<><i className="fas fa-info-circle mr-1"></i><div className="d-inline-block d-lg-none d-xl-inline-block">認識綠楊</div></>}
                show={show[2]}
                onMouseEnter={(e: any) => showDropdown(e, 2)}
                onMouseLeave={(e: any) => hideDropdown(e, 2)}
              >
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
                <NavDropdown.Item as={Link} to="/preacher-message" onClick={() => setCollapseOpen(!collapseOpen)}>
                  牧者的話
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
              {tokenPair?.token && <NotificationBell className="d-none d-lg-inline" />}
              {!tokenPair?.token && <Nav.Item>
                <Nav.Link
                  className="nav-link btn-outline-secondary"
                  // color="success"
                  href="#pablo"
                  id="login"
                  as={Link}
                  to={`/login-page?relayState=${location.pathname}`}
                  onClick={() => setCollapseOpen(!collapseOpen)}
                  // style={{ color: 'white', background: '#45934c' }}
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
                  <NavDropdown.Item as={Link} to="/personal" onClick={() => setCollapseOpen(!collapseOpen)}>
                    個人中心
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as="a"
                    href="#"
                    onClick={(e: any) => {
                      e.preventDefault();
                      dispatch(signOut())
                      window.location.href = `.${location.pathname}`
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
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
