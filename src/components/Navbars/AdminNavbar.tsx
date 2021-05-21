import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
// react-bootstrap components
import {
  Navbar
} from "react-bootstrap";
import { RootState } from "reducers";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from 'utils/utils';
import logo from "assets/img/lybc_logo.png";
import { useUserProfilePicUriQuery } from "generated/graphql";
import defaultAvatar from "assets/img/default-avatar.png";
import UNIVERSALS from "Universals";

function AdminNavbar() {

  const history = useHistory();

  const location = useLocation();

  const dispatch = useDispatch();

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);
  // const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarColor, setNavbarColor] = useState("");
  const [collapseOpen, setCollapseOpen] = useState(false);

  const { loading, data: profilePicData } = useUserProfilePicUriQuery({
    variables: {
      username: localStorage.getItem('token') != null ? getTokenValue(localStorage.getItem('token')).username : ''
    },
    notifyOnNetworkStatusChange: true
  })

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
      <Navbar expand="lg" style={{ background: '#292961' }}>
        <div className="navbar-translate navbar-admin-translate">
          <Navbar.Brand
            className="d-none d-lg-block"
            style={{ color: 'lightgray', fontWeight: 'bold', fontSize: 18 }}
            href="#pablo"
            id="admin-index-navbar-brand"
            onClick={(e: any) => {
              e.preventDefault();
              window.scrollTo(0, 0);
              history.push('/')
            }}
          >
            <img
              style={{ maxHeight: 30, maxWidth: 30, marginRight: 10 }}
              alt="logo"
              src={logo}
            ></img>
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
              <span className="navbar-toggler-bar toggler-bar-admin top-bar"></span>
              <span className="navbar-toggler-bar toggler-bar-admin middle-bar"></span>
              <span className="navbar-toggler-bar toggler-bar-admin bottom-bar"></span>
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
                    setCollapseOpen(!collapseOpen)
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
                    setCollapseOpen(!collapseOpen)
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
                    setCollapseOpen(!collapseOpen)
                    history.push('/admin/users')
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
                    setCollapseOpen(!collapseOpen)
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
            style={{ color: 'lightgray' }}
          >
            <i className="fas fa-home" style={{ fontSize: 18 }}></i>
          </Link>
          <Link
            className="nav-link"
            href="#pablo"
            id="profile"
            to="/personal"
            style={{
              color: 'lightgray',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              paddingTop: 10
            }}
          // onClick={() => setCollapseOpen(!collapseOpen)}
          >
            {/* <i className="fas fa-user" style={{ fontSize: 14 }}></i> */}
            <div className="profile-page mr-2">
              <div className="photo-container mb-3 my-auto ml-3 mx-auto" style={{ width: 28, height: 28 }}>
                {(loading || !profilePicData?.user?.profilePicURI) && <img alt="..." src={defaultAvatar}></img>}
                {(!loading && profilePicData?.user?.profilePicURI) && <img alt="..." src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + profilePicData?.user.profilePicURI}></img>}
              </div>
            </div>
            <p className="d-none d-md-inline-block">{getTokenValue(tokenPair?.token)?.username.toUpperCase()}</p>
          </Link>
        </div>
      </Navbar>
    </>
  );
}

export default AdminNavbar;