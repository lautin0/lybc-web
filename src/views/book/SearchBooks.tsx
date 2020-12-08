import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import { FormControl, InputGroup, Button, Card } from "react-bootstrap";
import Select from "react-select";

// core components

const dataSrc = [
  { id: 1, title: 'The meaning of Marriage', author: 'Timothy Keller', isbn: '9780525952473', stockAt: [1, 2] },
  { id: 2, title: 'The Power of Significance', author: 'John C. Maxwell', isbn: '9781478921950', stockAt: [1] },
  { id: 3, title: 'The Power of Your Potential', author: 'John C. Maxwell', isbn: '9781549198427', stockAt: [2] }
]

const options = [
  { value: 1, label: 'Church' },
  { value: 2, label: 'EE Library' },
]

function SearchBooks() {

  const [data, setData] = useState(dataSrc)

  const handleChange = (options: any) => {
    if(options == null)
      setData(dataSrc)
    else
      setData(dataSrc.filter(x => (options as Array<any>).map(y => y.value).some(r => x.stockAt.includes(r))))
  };

  //Default scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
              <InputGroup.Append style={{ marginLeft: 0 }}>
                <InputGroup.Text style={{ width: 50, backgroundColor: 'rgba(222, 222, 222, 0.3)', border: 'none' }}>
                  <i className="ml-1 fa fa-search" style={{ fontSize: 24 }}></i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md="12" lg="4">
            <label>館藏地點</label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={options}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row>

          {data.map((x, i) => {
            return <Col key={x.id} md={12}>
              <Card className="p-3">
                <Row>
                  <div className="col">
                    <div className="card-block px-2">
                      <Card.Title><h4>{x.title}</h4></Card.Title>
                      <Card.Text className="h4"><b>作者: </b>{x.author}</Card.Text>
                      <Card.Text className="h4"><b>ISBN: </b>{x.isbn}</Card.Text>
                      <a href="#" className="btn btn-info">詳細資料</a>
                    </div>
                  </div>
                  <div
                    className="col-auto"
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex'
                    }}
                  >
                    <img src="//placehold.it/200" className="img-fluid" alt="" ></img>
                  </div>
                </Row>
                <Card.Footer>
                  {x.stockAt.includes(1) && <span style={{ position: 'relative' }} className="m-1 badge badge-success">Church</span>}
                  {x.stockAt.includes(2) && <span style={{ position: 'relative' }} className="m-1 badge badge-primary">EE Library</span>}
                </Card.Footer>
              </Card>
            </Col>
          })}

        </Row>

      </Container>
    </div>
  );
}

export default SearchBooks;
