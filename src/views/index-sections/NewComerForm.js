import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap";

// core components

function NewComerForm() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  return (
    <div className="d-flex flex-wrap" data-background-color="black" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="flex-fill my-auto text-center">
        <h2 className="pt-5">讓綠楊家認識您</h2>
      </div>
      <div className="flex-fill mt-5 mb-5">
        <Container>
          <Row>
            <Col className="justify-content-center" sm="12" md="10">
              <Form action="" className="form" method="">
                <CardHeader className="text-left">
                  <h3 className="title-up description">
                    留下資料，以便我們聯絡您。
                  </h3>
                </CardHeader>
                <CardBody>
                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <label className="col-sm-4 col-md-2 col-form-label p-2">
                      名字
                    </label>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      style={{ maxWidth: 300 }}
                      placeholder="輸入名字"
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <label className="col-sm-4 col-md-2 col-form-label p-2">
                      聯絡電話
                    </label>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons tech_mobile"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      style={{ maxWidth: 300 }}
                      placeholder="輸入聯絡電話"
                      type="text"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    <label className="col-sm-4 col-md-2 col-form-label p-2">
                      電子郵件
                    </label>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      style={{ maxWidth: 400 }}
                      placeholder="輸入電子郵件"
                      type="text"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    ></Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    className="btn-neutral btn-round"
                    color="info"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    提交
              </Button>
                </CardFooter>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default NewComerForm;
