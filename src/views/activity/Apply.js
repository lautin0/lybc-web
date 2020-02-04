import React from "react";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import * as moment from 'moment'

const data = []

function Apply() {

  //Default scroll to top
  window.scrollTo(0, 0)

  function onCellClicked(uri) {
    window.open(uri, '_blank', null, null);
  };

  return (
    <>
      <div
        //className="section section-download"
        className="section"
        id="download-section"
      >
        <Container>
          <Row>
            <Table striped className={data && data.length > 0 ? 'clickable' : ''}>
              <thead>
                <tr>
                  <th>截止日期</th>
                  <th style={{ width: '60%' }}>活動名稱</th>
                  <th style={{ width: '20%' }}>連結</th>
                </tr>
              </thead>
              <tbody>
                {(data == null || data.length == 0) && <tr><th className="text-center" colSpan="3">沒有記錄</th></tr>}
                {
                  (data && data.length > 0) && data.map((value, index) => {
                    console.log(value.uri)
                    return <tr key={index}>
                      <th scope="row">{value.date.format('YYYY-MM')}</th>
                      <td onClick={() => onCellClicked(value.uri)}>{value.title}</td>
                      <td onClick={() => onCellClicked(value.uri)}><a href="#">下載</a></td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
            <Pagination 
              className="w-100"
              listClassName="pagination-primary justify-content-center"
            >
              <PaginationItem>
                <PaginationLink
                  aria-label="Previous"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span aria-hidden={true}>
                    <i
                      aria-hidden={true}
                      className="fa fa-angle-double-left"
                    ></i>
                  </span>
                </PaginationLink>
              </PaginationItem>              
              <PaginationItem className="active disabled">
                <PaginationLink
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  aria-label="Next"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span aria-hidden={true}>
                    <i
                      aria-hidden={true}
                      className="fa fa-angle-double-right"
                    ></i>
                  </span>
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Apply;
