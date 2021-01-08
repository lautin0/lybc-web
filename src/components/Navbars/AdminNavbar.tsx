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
import { signOut } from "actions";
import NotificationBell from "components/Notification/NotificationBell";

import logo from "assets/img/lybc_logo.png";
import { Role } from "generated/graphql";

function AdminNavbar() {

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
      <Navbar expand="lg" style={{ background: 'white' }}>
        <div className="navbar-translate navbar-admin-translate">
          <Navbar.Brand
            className="d-none d-lg-block"
            style={{ color: 'gray', fontWeight: 'bold', fontSize: 24 }}
            href="#pablo"
            id="admin-index-navbar-brand"
            onClick={(e: any) => {
              e.preventDefault();
              window.scrollTo(0, 0);
              history.push('/')
            }}
          >
            <b>管理控制台</b>
          </Navbar.Brand>
          <div className="d-block d-lg-none">
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
          <nav className="navbar fixed-top navbar-light d-flex flex-column left-panel d-block d-lg-none">
            <ul className="navbar-nav mt-3">
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={location.pathname.includes('worship') ? { backgroundColor: 'lightgray' } : {}}
                  onClick={(e: any) => {
                    e.preventDefault()
                    history.push('/admin/worships')
                  }}
                  href="#"
                ><i className="fa fa-th-list mr-2"></i>崇拜管理</a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={location.pathname.includes('page-management') ? { backgroundColor: 'lightgray' } : {}}
                  onClick={(e: any) => {
                    e.preventDefault()
                    history.push('/admin/page-management')
                  }}
                  href="#"
                ><i className="fa fa-file mr-2"></i>頁面管理</a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={location.pathname.includes('member') ? { backgroundColor: 'lightgray' } : {}}
                  onClick={(e: any) => {
                    e.preventDefault()
                    history.push('/admin/members')
                  }}
                  href="#"
                ><i className="fa fa-user mr-2"></i>會員管理</a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={location.pathname.includes('other') ? { backgroundColor: 'lightgray' } : {}}
                  onClick={(e: any) => {
                    e.preventDefault()
                    history.push('/admin/other')
                  }}
                  href="#"
                ><i className="fa fa-cog mr-2"></i>其他功能</a>
              </li>
            </ul>
          </nav>
        </Navbar.Collapse>
        <div className="form-inline">
          {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
          {/* <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button> */}
          <Link
            to="/index"
            className="mx-3"
            style={{ color: 'orange' }}
          >
            回主頁
            </Link>
          <Button
            className="nav-link"
            // color="success"
            href="#pablo"
            id="profile"
            as={Link}
            to="/profile-page"
          // onClick={() => setCollapseOpen(!collapseOpen)}
          >
            <i className="fas fa-user" style={{ fontSize: 14 }}></i>
            <p>{getTokenValue(tokenPair?.token)?.username}</p>
          </Button>
        </div>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
