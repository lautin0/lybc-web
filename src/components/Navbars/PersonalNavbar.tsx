import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
// react-bootstrap components
import {
  Button,
  Navbar
} from "react-bootstrap";
import { RootState } from "reducers";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue, hasRole } from 'utils/utils';
import { Role } from "generated/graphql";

function PersonalNavbar() {

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
            <b>個人中心</b>
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
                  style={location.pathname.includes('info') ? { backgroundColor: 'lightgray' } : {}}
                  onClick={(e: any) => {
                    e.preventDefault()
                    history.push('/personal/info')
                  }}
                  href="#"
                ><i className="fa fa-user mr-2"></i>帳戶管理</a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={location.pathname.includes('sharing') ? { backgroundColor: 'lightgray' } : {}}
                  onClick={(e: any) => {
                    e.preventDefault()
                    history.push('/personal/sharing')
                  }}
                  href="#"
                ><i className="fas fa-file-alt mr-2"></i>檢視文章狀態</a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={location.pathname.includes('other') ? { backgroundColor: 'lightgray' } : {}}
                  onClick={(e: any) => {
                    e.preventDefault()
                    history.push('/personal/other')
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
            style={{ color: 'navy' }}
          >
            回主頁
            </Link>
          {(tokenPair && hasRole(tokenPair.token, Role.Admin)) && <Button
            className="nav-link"
            style={{ background: 'navy' }}
            href="#pablo"
            id="profile"
            as={Link}
            to="/admin"
          // onClick={() => setCollapseOpen(!collapseOpen)}
          >
            <i className="fa fa-cog" style={{ fontSize: 14 }}></i>
            <p>前往控制台</p>
          </Button>}
        </div>
      </Navbar>
    </>
  );
}

export default PersonalNavbar;
