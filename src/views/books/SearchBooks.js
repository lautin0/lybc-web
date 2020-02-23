import React from "react";

// react-bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import { FormControl, InputGroup, Button, Card } from "react-bootstrap";

// core components

function SearchBooks() {

  //Default scroll to top
  window.scrollTo(0, 0)

  return (
    <div className="section">
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="8" md="12">
            <InputGroup
              className="no-border w-100"
              style={{ height: 60, fontSize: 20 }}
            >
              <FormControl
                placeholder="輸入關鍵字"
                type="text"
                onBlur={() => { }}
              ></FormControl>
              <InputGroup.Append>
                <Button
                  style={{
                    margin: 0,
                    borderRadius: '5px 30px 30px 5px',
                    backgroundColor: 'rgba(222, 222, 222, 0.3)',
                    color: 'grey'
                  }}
                  variant="primary">
                  <i className="fa fa-search"></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex flex-wrap align-items-start">
          <Col md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title><h4>ACT</h4></Card.Title>
                <Card.Text className="h4"><b>Phone: </b>Activity</Card.Text>
                <Card.Text className="h4"><b>Email: </b>Activity 1</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title><h4>ACT</h4></Card.Title>
                <Card.Text className="h4"><b>Phone: </b>Activity</Card.Text>
                <Card.Text className="h4"><b>Email: </b>Ahfguiochbguirnduvgihnrtuivgnruguvrohvguierhniuomcimfeirmhcfxiouewrhmcfiuxomewiufhmxwctivity 1</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title><h4>ACT</h4></Card.Title>
                <Card.Text className="h4"><b>Phone: </b>Activity</Card.Text>
                <Card.Text className="h4"><b>Email: </b>Activity 1</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title><h4>ACT</h4></Card.Title>
                <Card.Text className="h4"><b>Phone: </b>Activity</Card.Text>
                <Card.Text className="h4"><b>Email: </b>Actigretgctregtregvtrgcergcvity 1</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title><h4>ACT</h4></Card.Title>
                <Card.Text className="h4"><b>Phone: </b>Activity</Card.Text>
                <Card.Text className="h4"><b>Email: </b>Activityddddsvffedgvrtegvvgtrevgtrvgetrgergfbvfvdgcegcecret 1</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </div>

      </Container>
    </div>
  );
}

export default SearchBooks;
