import React from "react";

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

function LoginPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
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
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
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
                        type="text"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></FormControl>
                    </InputGroup>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button
                      block
                      className="btn-round btn-info"
                      href="#pablo"
                      onClick={(e: any) => e.preventDefault()}
                      size="lg"
                    >
                      登入
                    </Button>
                    {/* <div className="pull-left">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Create Account
                        </a>
                      </h6>
                    </div> */}
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
