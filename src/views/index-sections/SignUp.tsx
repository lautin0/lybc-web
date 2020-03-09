import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
  Container,
  Row
} from "react-bootstrap";

// core components

function SignUp() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  return (
    <>
      <div
        className="section section-signup"
        style={{
          backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "700px"
        }}
      >
        <Container>
          <Row>
            <Card className="card-signup" data-background-color="blue">
              <Form action="" className="form" method="">
                <Card.Header className="text-center">
                  <Card.Title className="title-up" as="h3">
                    Sign Up
                  </Card.Title>
                  <div className="social-line">
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="facebook"
                      href="#pablo"
                      onClick={(e: any) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="twitter"
                      href="#pablo"
                      onClick={(e: any) => e.preventDefault()}
                      size="lg"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="google"
                      href="#pablo"
                      onClick={(e: any) => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body>
                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="First Name..."
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></FormControl>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="now-ui-icons text_caps-small"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Last Name..."
                      type="text"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                    ></FormControl>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Email..."
                      type="text"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    ></FormControl>
                  </InputGroup>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button
                    className="btn-neutral btn-round"
                    color="info"
                    href="#pablo"
                    onClick={(e: any) => e.preventDefault()}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </Card.Footer>
              </Form>
            </Card>
          </Row>
          <div className="col text-center">
            <Button
              className="btn-round btn-white"
              color="default"
              to="/login-page"
              size="lg"
              as={Link}
            >
              View Login Page
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SignUp;
