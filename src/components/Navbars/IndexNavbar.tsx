import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
// react-bootstrap components
import {
  NavDropdown,
  Navbar,
  Nav,
  Container
} from "react-bootstrap";
import { getTokenValue, hasRole } from 'utils/utils'
import NotificationBell from "components/Notification/NotificationBell";

import logo from "assets/img/lybc_logo.png";
import { Role, useMaxWorshipIdQuery } from "generated/graphql";
import moment from "moment";
import UNIVERSALS from "Universals";
import { useIntl } from "react-intl";
import { LocaleContext } from "context/LocaleContext";
import AuthContext from "context/AuthContext";
import { RootStore } from "store";

function IndexNavbar() {

  const { locale, persistLocale } = useContext(LocaleContext)

  const intl = useIntl()

  const history = useHistory();

  const location = useLocation();

  const { tokenPair, signOut } = useContext(AuthContext)

  const { setSysInfoMessage } = RootStore.useSysInfoStore()

  // const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarColor, setNavbarColor] = useState("");
  const [collapseOpen, setCollapseOpen] = useState(false);

  const [show, setShow] = useState([false, false, false]);
  const showDropdown = (e: any, idx: number) => {
    let clone = [...show].map(x => false);
    clone[idx] = !show[idx]
    setShow(clone);
  }

  const { data } = useMaxWorshipIdQuery()

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
              style={{ zIndex: 9999, fontSize: window.innerHeight > 375 ? '1.5rem' : '1.2rem', fontWeight: 'bold' }}
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
              {" "}{intl.formatMessage({ id: "app.title" })}
            </Navbar.Brand>
            <div>
              {(['/', '/index'].includes(location.pathname) && UNIVERSALS.NOTIFICATION.MESSAGE != null && UNIVERSALS.NOTIFICATION.MESSAGE.length > 0) && <div className="d-inline-block d-lg-none">
                <a
                  href="#pablo"
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (data != null) {
                      const maxDate = moment(data.maxWorshipId, 'YYYYMMDD')
                      setSysInfoMessage((UNIVERSALS.NOTIFICATION.MESSAGE as string)
                        .replace("{0}", data?.maxWorshipId.toString())
                        .replace("{1}", `(更新: ${maxDate.format('YYYY')} 年 ${maxDate.format('M')} 月 ${maxDate.format('D')} 日)`))
                    }
                  }}
                >
                  <i style={{ fontSize: 18, color: 'steelblue' }} className="fas fa-info-circle"></i>
                </a>
              </div>}
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
              {(['/', '/index'].includes(location.pathname) && UNIVERSALS.NOTIFICATION.MESSAGE != null && UNIVERSALS.NOTIFICATION.MESSAGE.length > 0) && <Nav.Item className="d-none d-lg-inline">
                <Nav.Link
                  href="#pablo"
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (data != null) {
                      const maxDate = moment(data.maxWorshipId, 'YYYYMMDD')
                      setSysInfoMessage((UNIVERSALS.NOTIFICATION.MESSAGE as string)
                        .replace("{0}", data?.maxWorshipId.toString())
                        .replace("{1}", `(更新: ${maxDate.format('YYYY')} 年 ${maxDate.format('M')} 月 ${maxDate.format('D')} 日)`))
                    }
                  }}
                >
                  <i style={{ fontSize: 18, color: 'steelblue' }} className="fas fa-info-circle"></i>
                </Nav.Link>
              </Nav.Item>}
              <NavDropdown
                id=""
                title={<div style={{ fontSize: 18, fontWeight: 'bold' }}>{intl.formatMessage({ id: "app.menu.activity" })}</div>}
                show={show[0]}
                onMouseEnter={(e: any) => showDropdown(e, 0)}
                onMouseLeave={(e: any) => hideDropdown(e, 0)}
              >
                <NavDropdown.Item as={Link} to="/worship-list" onClick={() => setCollapseOpen(!collapseOpen)}>
                  {intl.formatMessage({ id: "app.menu.activity.online-sermon" })}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/news-list" onClick={() => setCollapseOpen(!collapseOpen)}>
                  {intl.formatMessage({ id: "app.latest-updates" })}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/apply-activity" onClick={() => setCollapseOpen(!collapseOpen)}>
                  {intl.formatMessage({ id: "app.menu.activity.apply" })}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {intl.formatMessage({ id: "app.menu.activity.fellowship" })}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {intl.formatMessage({ id: "app.menu.activity.memories" })}
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
                <Nav.Link
                  style={{ fontSize: 18, fontWeight: 'bold' }}
                  href="#pablo"
                  disabled
                  onClick={(e: any) => {
                    e.preventDefault();
                  }}
                >
                  {intl.formatMessage({ id: "app.menu.ministries" })}
                </Nav.Link>
              </Nav.Item>
              <NavDropdown
                id=""
                title={<div style={{ fontSize: 18, fontWeight: 'bold' }}>{intl.formatMessage({ id: "app.menu.resources" })}</div>}
                show={show[1]}
                onMouseEnter={(e: any) => showDropdown(e, 1)}
                onMouseLeave={(e: any) => hideDropdown(e, 1)}
              >
                <NavDropdown.Item as={Link} to="/journal" onClick={() => setCollapseOpen(!collapseOpen)}>
                  {intl.formatMessage({ id: "app.menu.resources.journal" })}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sharing-list" onClick={() => setCollapseOpen(!collapseOpen)}>
                  {intl.formatMessage({ id: "app.menu.resources.sharing" })}
                </NavDropdown.Item>
                {tokenPair?.token && <NavDropdown.Item as={Link} to="/library">
                  {intl.formatMessage({ id: "app.menu.resources.books-enquiry" })}
                </NavDropdown.Item>}
              </NavDropdown>
              <NavDropdown
                id=""
                title={<div style={{ fontSize: 18, fontWeight: 'bold' }}>{intl.formatMessage({ id: "app.menu.about-us.lybc" })}</div>}
                show={show[2]}
                onMouseEnter={(e: any) => showDropdown(e, 2)}
                onMouseLeave={(e: any) => hideDropdown(e, 2)}
              >
                <NavDropdown.Item as={Link} to="/doctrine" onClick={() => setCollapseOpen(!collapseOpen)}>
                  {intl.formatMessage({ id: "app.menu.about-us.doctrine" })}
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link} to="/sunday-service-info"
                  onClick={() => setCollapseOpen(!collapseOpen)}
                >
                  {intl.formatMessage({ id: "app.menu.about-us.timetable" })}
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link} to="/contact-us"
                  onClick={() => setCollapseOpen(!collapseOpen)}
                >
                  {intl.formatMessage({ id: "app.menu.about-us.contact" })}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/preacher-message" onClick={() => setCollapseOpen(!collapseOpen)}>
                  {intl.formatMessage({ id: "app.menu.about-us.preacher-message" })}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/careers" onClick={() => setCollapseOpen(!collapseOpen)}>
                  {intl.formatMessage({ id: "app.title.careers" })}
                </NavDropdown.Item>
              </NavDropdown>
              {tokenPair?.token && <NotificationBell className="d-none d-lg-inline" />}
              {!tokenPair?.token && <Nav.Item>
                <Nav.Link
                  className="nav-link btn-outline-dark"
                  href="#pablo"
                  id="login"
                  as={Link}
                  to={`/login-page?relayState=${location.pathname}`}
                  onClick={() => setCollapseOpen(!collapseOpen)}
                  style={{ fontSize: '1.2rem', borderRadius: 12, fontWeight: 'normal' }}
                >
                  <p>
                    {intl.formatMessage({ id: "app.login" })}
                  </p>
                </Nav.Link>
              </Nav.Item>}
              {tokenPair?.token &&
                <NavDropdown id="" title={<><i className="fas fa-user"></i><p style={{ fontWeight: 'bolder' }}>{getTokenValue(tokenPair.token)?.username}</p></>}>
                  {hasRole(tokenPair.token, [Role.Admin, Role.Worker]) && <NavDropdown.Item as={Link} to="/admin" onClick={() => setCollapseOpen(!collapseOpen)}>
                    {intl.formatMessage({ id: "app.admin.panel" })}
                  </NavDropdown.Item>}
                  {hasRole(tokenPair.token, [Role.Admin, Role.Worker]) && <NavDropdown.Divider />}
                  <NavDropdown.Item as={Link} to="/personal" onClick={() => setCollapseOpen(!collapseOpen)}>
                    {intl.formatMessage({ id: "app.personal" })}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as="a"
                    href="#"
                    onClick={(e: any) => {
                      e.preventDefault();
                      signOut()
                      window.location.href = `.${location.pathname}`
                    }}
                  >
                    {intl.formatMessage({ id: "app.logout" })}
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
              <Nav.Item>
                <Nav.Link
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault()
                    persistLocale && persistLocale(locale === "en" ? "zh" : "en")
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    paddingTop: 10,
                    fontWeight: 'bolder'
                  }}
                >
                  <i className="fas fa-globe-asia"></i>
                  <p>{locale === "en" ? "中" : "En"}</p>
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
