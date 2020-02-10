import React from "react";

import { useDispatch, useSelector } from 'react-redux'

import { saveNewComer } from '../../actions'

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
  Container,
  Col,
  Row
} from "react-bootstrap";

// core components

export default function NewComerForm() {
  const dispatch = useDispatch();

  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  return (
    <div 
      className="d-flex flex-wrap"
      // data-background-color="black" 
      // style={{ paddingTop: 80, paddingBottom: 80 }}
      style={{ backgroundColor: 'lightgray' }}
    >
      <div className="flex-fill my-auto text-center">
        <h2 className="pt-5">讓綠楊家認識您</h2>
      </div>
      <div className="flex-fill mt-5 mb-5">
        <Container>
          <Row>
            <Card className="col-sm-12 col-md-10 p-3 m-2" style={{borderRadius: '0.7rem'}}>
              <Form action="" className="form" method="">
                <Card.Header className="text-left">
                  <h3 className="title-up description">
                    留下資料，以便我們聯絡您
                  </h3>
                </Card.Header>
                <Card.Body>
                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <label className="col-sm-4 col-md-2 col-form-label p-2">
                      名字
                    </label>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      style={{ maxWidth: 300 }}
                      placeholder="輸入名字"
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={(evt) => {setFirstFocus(false);setName(evt.target.value);}}
                    ></FormControl>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <label className="col-sm-4 col-md-2 col-form-label p-2">
                      聯絡電話
                    </label>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="now-ui-icons tech_mobile"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      style={{ maxWidth: 300 }}
                      placeholder="輸入聯絡電話"
                      type="text"
                      onFocus={() => setLastFocus(true)}
                      onBlur={(evt) => {setLastFocus(false);setPhone(evt.target.value);}}
                    ></FormControl>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    <label className="col-sm-4 col-md-2 col-form-label p-2">
                      電子郵件
                    </label>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      style={{ maxWidth: 400 }}
                      placeholder="輸入電子郵件"
                      type="text"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={(evt) => {setEmailFocus(false);setEmail(evt.target.value);}}
                    ></FormControl>
                  </InputGroup>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button
                    className="btn-info btn-round"
                    // href="#pablo"
                    onClick={() => dispatch(saveNewComer({name: name, email: email, phone: phone}))}
                    size="lg"
                  >
                    提交
                  </Button>
                </Card.Footer>
              </Form>
            </Card>
          </Row>
        </Container>
      </div>
    </div>
  );
}