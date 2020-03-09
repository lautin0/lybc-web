import React from "react";

// react-bootstrap components
import {
  Container,
  Row,
  Table,
  Pagination,
  PageItem
} from "react-bootstrap";

import moment from 'moment'

const data: Array<any> = []

function Apply() {

  //Default scroll to top
  window.scrollTo(0, 0)

  function onCellClicked(uri: string) {
    window.open(uri, '_blank');
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
                {(data == null || data.length == 0) && <tr><th className="text-center" colSpan={3}>沒有記錄</th></tr>}
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
            <Pagination size="lg"
              className="w-100 pagination-primary justify-content-center"
            >
              <Pagination.First />
              <Pagination.Prev />
              <PageItem active disabled>
                  1
              </PageItem>
              <Pagination.Next />
              <Pagination.Last />
              {/* <Pagination.Last
                onClick={e => e.preventDefault()}
              >
                <span aria-hidden={true}>
                  <i
                    aria-hidden={true}
                    className="fa fa-angle-double-right"
                  ></i>
                </span>
              </Pagination.Last> */}
            </Pagination>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Apply;
