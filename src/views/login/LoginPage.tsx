import React, { useState, useContext, useCallback } from "react";
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  InputGroup,
  Container,
  Col
} from "react-bootstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import { useForm } from "react-hook-form";

import logo from "assets/img/lybc_logo.png";
import loginImg from "assets/img/login.jpg";
import { Login, useLoginMutation } from "generated/graphql";
import { useIntl } from "react-intl";
import AuthContext from "context/AuthContext";
import { useHistory, useLocation } from "react-router-dom";
import { RootStore } from "store";

function LoginPage({ loginFn }: any) {

  const intl = useIntl()

  const { setSysFailure } = RootStore.useModalStore()

  const history = useHistory()
  const location = useLocation()

  const { signInComplete } = useContext(AuthContext)

  const [login, { loading }] = useLoginMutation({ errorPolicy: 'all' })

  const { reset, register, handleSubmit, formState: { errors } } = useForm()

  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);

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

  const onSubmit = useCallback((data: any) => {
    const payload: Login = { username: data.username, password: data.password }
    if (loginFn != null) {
      loginFn(payload)
      reset()
      return
    }
    login({
      variables: { input: payload }
    }).then(res => {
      if (res.errors && res.errors.length > 0) {
        throw new Error(res.errors[0].message)
      }
      signInComplete && signInComplete(res)
      const relayState = new URLSearchParams(location.search).get('relayState')
      if (relayState != null) {
        history.push(relayState)
      } else {
        history.push('/')
      }
    })
      .catch(setSysFailure)
  }, [signInComplete, loginFn, reset, login, history, location, setSysFailure])

  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + loginImg + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form
                  // onSubmit={(e: any) => {
                  //   e.preventDefault()
                  //   onSubmit()
                  // }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="form"
                  style={!errors.username && !errors.password ? {} : { color: '#FF3636' }}
                >
                  <Card.Header className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={logo}
                      ></img>
                    </div>
                  </Card.Header>
                  <Card.Body className="text-right">
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "") +
                        (errors.username ? " has-danger" : "")
                      }
                    >
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <input
                        {...register("username", {
                          required: true
                        })}
                        placeholder={intl.formatMessage({ id: "app.forms.username" })}
                        className={errors.username ? "form-control" : "form-control form-control-danger"}
                        type="text"
                        // value={user.username}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      // onChange={handleInputChange}
                      ></input>
                    </InputGroup>
                    {errors.username && <label role="alert" style={{ opacity: .6 }}>{intl.formatMessage({ id: "app.validation.required" })}</label>}
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "") +
                        (errors.password ? " has-danger" : "")
                      }
                    >
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <input
                        {...register("password", {
                          required: true
                        })}
                        className={errors.password ? "form-control" : "form-control form-control-danger"}
                        placeholder={intl.formatMessage({ id: "app.forms.password" })}
                        type="password"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></input>
                    </InputGroup>
                    {errors.password && <label role="alert" style={{ opacity: .6 }}>{intl.formatMessage({ id: "app.validation.required" })}</label>}
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button
                      type="submit"
                      block
                      className="btn-round btn-info"
                      // href="#pablo"
                      // onClick={(e: any) => dispatch(signIn(user))}
                      // onClick={(e: any) => login({ variables: { input: { username: user.username, password: user.password } } })}
                      size="lg"
                    >
                      {intl.formatMessage({ id: "app.login" })}
                      {loading && <span className="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                    </Button>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          {intl.formatMessage({ id: "app.need-help" })}
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
