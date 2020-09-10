import React, { useState, useRef } from "react";
import _ from 'lodash'
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  InputGroup,
  Container,
  Col,
  FormControl
} from "react-bootstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "actions";
import { RootState } from "reducers";

function LoginPage() {
  const userDef = useSelector((state: RootState) => state.auth.user)

  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [user, setUser] = useState(userDef);
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  const handleInputChange = (e: any) => setUser({
    ...user,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const prevUser = useRef(user)
  React.useEffect(() => {
    if (!_.isEqual(user, prevUser.current)) {
      //INPUT HAS CHANGED
      setUser(user)
    } else if (!_.isEqual(user, userDef)) {
      //REDUX STATE HAS CHANGED
      setUser(userDef)
    }
    prevUser.current = user
  }, [user, userDef])

  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <Card.Header className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("assets/img/lybc_logo.png")}
                      ></img>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        placeholder="用戶名稱"
                        type="text"
                        name="username"
                        value={user.username}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                        onChange={handleInputChange}
                      ></FormControl>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        placeholder="密碼"
                        type="password"
                        name="password"
                        value={user.password}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                        onChange={handleInputChange}
                      ></FormControl>
                    </InputGroup>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button
                      block
                      className="btn-round btn-info"
                      href="#pablo"
                      onClick={(e: any) => dispatch(signIn(user))}
                      size="lg"
                    >
                      登入
                    </Button>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          需要幫助?
                        </a>
                      </h6>
                    </div>
                  </Card.Footer>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
