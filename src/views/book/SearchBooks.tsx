import QueryFilter from "components/QueryFilter/QueryBar";
import useQueryFilter, { locationType } from "hooks/useQueryFilter";
import React, { useEffect } from "react";

// react-bootstrap components
import { Row, Col } from "react-bootstrap";
import { FormControl, InputGroup } from "react-bootstrap";

// core components

function SearchBooks() {

  const qfHooks = useQueryFilter()

  const { data, filterBooks, handleFilterChange, hasAttribute } = qfHooks

  //Default scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="mt-3" style={{ marginBottom: 200 }}>
      <div className="mx-5">
        <Row>
          <Col lg={{ offset: 3, span: 6 }} md={12}>
            <InputGroup
              className="no-border w-100"
              style={{
                fontSize: 20
              }}
            >
              <FormControl
                placeholder="輸入關鍵字 (作者/書名/ISBN)"
                type="text"
                onChange={(e: any) => handleFilterChange(e)}
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

        <QueryFilter hooks={qfHooks} />

        <Row>

          {data.filter(x => filterBooks(x)).map((x) => {
            return <Col key={x.id} lg={3} md={6} sm={12}>
              <div className="p-3">
                <Row>
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
                  <div className="col">
                    <div className="card-block px-2">
                      <div><h5><b>{x.title}</b></h5></div>
                      <div><b>作者: </b>{x.author}</div>
                      <div><b>ISBN: </b>{x.isbn}</div>
                    </div>
                  </div>
                </Row>
                <div>
                  {hasAttribute("CHRH", locationType.value, x.attributes) && <span style={{ position: 'relative' }} className="m-1 badge badge-default">Church</span>}
                  {hasAttribute("ELIB", locationType.value, x.attributes) && <span style={{ position: 'relative' }} className="m-1 badge badge-warning">EE Library</span>}
                </div>
              </div>
            </Col>
          })}

        </Row>

      </div>
    </div>
  );
}

export default SearchBooks;
