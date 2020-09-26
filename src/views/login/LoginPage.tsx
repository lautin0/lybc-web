import React, { useState, useRef, useEffect } from "react";
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
import { signIn, signInFailure, signInSuccess, User } from "actions";
import { RootState } from "reducers";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { nullOrEmpty } from "utils/utils";

const LOGIN = gql`
  mutation login($input: Login!){
    login(input: $input)
  }
`;

// type LoginFormErrors = {
//   username?: any
//   password?: any
// }

function LoginPage() {

  const history = useHistory();

  const userDef = useSelector((state: RootState) => state.auth.user)

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      username: null,
      password: null
    }
  })

  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  // const [user, setUser] = useState(userDef);
  // const [errors, setErrors] = useState<LoginFormErrors>({});
  // const [submitted, setSubmitted] = useState<boolean>(false);

  // const [user, setUser] = useState<User>({ username: '', password: ''});
  const dispatch = useDispatch();

  const [login, { data, loading: loginLoading, error: loginError }] = useMutation(LOGIN, { errorPolicy: 'all' });

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

  // const handleInputChange = (e: any) => setUser({
  //   ...user,
  //   [e.currentTarget.name]: e.currentTarget.value
  // })

  const onSubmit = (data: any, e: any) => {
    // setSubmitted(true)
    // validateForm() && login({ variables: { input: { username: user.username, password: user.password } } })
    login({ variables: { input: { username: data.username, password: data.password } } })
    .catch(err => 
      dispatch(signInFailure(err))
    )
  }

  // const onError = (errors: any, e: any) => {
  //   console.log(errors)
  // }

  // const validateForm = () => {
  //   let valid = true

  //   let tmp = errors

  //   if (nullOrEmpty(user.username)) {
  //     tmp = { ...tmp, username: { required: true } }
  //     valid = false;
  //   } else {
  //     delete tmp.username
  //   }

  //   if (nullOrEmpty(user.password)) {
  //     tmp = { ...tmp, password: { required: true } }
  //     valid = false;
  //   } else {
  //     delete tmp.password
  //   }

  //   setErrors(tmp)

  //   return valid
  // }

  // const prevUser = useRef(user)
  // React.useEffect(() => {
  //   if (!_.isEqual(user, prevUser.current)) {
  //     //INPUT HAS CHANGED
  //     setUser(user)

  //     validateForm()
  //   } else if (!_.isEqual(user, userDef)) {
  //     //REDUX STATE HAS CHANGED
  //     setUser(userDef)
  //   }
  //   prevUser.current = user
  // }, [user, userDef])

  useEffect(() => {
    if (loginError != null) {
      dispatch(signInFailure(loginError))
      return
    }
    if (data !== undefined) {
      // setSubmitted(false)

      dispatch(signInSuccess(data.login))
      history.push('/')
    }
  }, [data])

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
                        src={require("assets/img/lybc_logo.png")}
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
                        placeholder="用戶名稱"
                        className={errors.username ? "form-control" : "form-control form-control-danger"}
                        type="text"
                        name="username"
                        ref={register({
                          required: true,
                          // validate: (value) => { return !!value.trim() },
                          // name: 'username'
                        })}
                        // value={user.username}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      // onChange={handleInputChange}
                      ></input>
                    </InputGroup>
                    {errors.username && <label style={{ opacity: .6 }}>必須填寫這欄</label>}
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
                        className={errors.password ? "form-control" : "form-control form-control-danger"}
                        placeholder="密碼"
                        type="password"
                        name="password"
                        // value={user.password}
                        ref={register({
                          required: true,
                          // validate: (value) => { return !!value.trim() },
                          // name: 'password'
                        })}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      // onChange={handleInputChange}
                      ></input>
                    </InputGroup>
                    {errors.password && <label style={{ opacity: .6 }}>必須填寫這欄</label>}
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
                      登入
                      {loginLoading && <span className="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
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
