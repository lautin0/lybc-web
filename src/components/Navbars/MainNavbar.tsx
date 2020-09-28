import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Link, useHistory } from "react-router-dom";
// react-bootstrap components
import {
  Button,
  NavDropdown,
  Navbar,
  Nav,
  Container
} from "react-bootstrap";
import UNIVERSALS, { Role } from "Universals";
import { getTokenValue, hasRole, isTokenExpired } from "utils/utils"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import { gql, useMutation } from "@apollo/client";
import { signInFailure, signInSuccess } from "actions";
import { resetClient } from "utils/auth.client";

const REFRESH_TOKEN = gql`
  mutation refresh($input: RefreshTokenInput!){
    refreshToken(input: $input){
      token
      refreshToken
    }
  }
`;

type MainNavbarProps = {
  page: string
}

function MainNavbar(props: MainNavbarProps) {

  const [refreshToken, { data, loading: refreshTokenLoading, error: refreshTokenError }] = useMutation(REFRESH_TOKEN);

  const dispatch = useDispatch()

  const history = useHistory()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  useEffect(() => {
    if (tokenPair?.token && isTokenExpired(tokenPair.token)) {
      refreshToken({ variables: { input: { token: tokenPair.refreshToken } } })
        .catch(err => {
          // dispatch(signInFailure(err))
          localStorage.clear();
          resetClient()
        })
    }
  })

  useEffect(() => {
    if (data !== undefined)
      dispatch(signInSuccess(data.refreshToken))
  }, [data])

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
      <Navbar className="fixed-top flex-wrap" expand="lg" style={{ paddingTop: 20, height: '114px', background: '#45934c' }}>
        <Container style={{ height: '100%', display: 'block' }}>
          <div className="navbar-translate">
            <Navbar.Brand
              as={Link}
              to="/index"
              id="main-navbar-brand"
              onClick={(e: any) => {
                // e.preventDefault();
                // window.scrollTo(0, 0);
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
            style={{ marginTop: -42 }}
          >
            <Nav>
              <NavDropdown id="" title={<><i className="fas fa-map-signs mr-1"></i>教會活動</>}>
                <NavDropdown.Item as={Link} to="/worship-list">
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
                  <p>事工介紹</p>
                </Nav.Link>
              </Nav.Item>
              <NavDropdown id="" title={<><i className="fas fa-book mr-1"></i>教會刊物</>}>
                <NavDropdown.Item as={Link} to="/journal">
                  教會月刊
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sharing-list">
                  分享欄
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/preacher-message">
                  牧者的話
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown id="" title={<><i className="fas fa-info-circle mr-1"></i>認識綠楊</>}>
                <NavDropdown.Item as={Link} to="/about-us">
                  關於聯會
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/doctrine">
                  教會信條
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link} to="sunday-service-info"
                >
                  聚會時間
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link} to="/contact-us"
                >
                  聯絡我們
                </NavDropdown.Item>
              </NavDropdown>
              {!tokenPair?.token && <Nav.Item>
                <Button
                  className="nav-link btn-neutral"
                  // color="success"
                  href="#pablo"
                  id="login"
                  as={Link}
                  to="/login-page"
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
                  <NavDropdown.Item
                    as="a"
                    href="javascript:void(0)"
                    onClick={(e: any) => {
                      e.preventDefault();
                      localStorage.clear();
                      resetClient()
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
          <div style={{ marginTop: -26 }}>
            <h3 style={{ color: 'white' }} className="title text-left d-none d-sm-block">{UNIVERSALS.TITLE_MAP[props.page].title}</h3>
            <h4 style={{ color: 'white', marginTop: 10 }} className="title text-left d-sm-none">{UNIVERSALS.TITLE_MAP[props.page].title}</h4>
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
