import React from "react";

// react-bootstrap components
import {
  Container,
  Row,
  Table,
  Pagination,
  PageItem,
} from "react-bootstrap";

import * as moment from 'moment'
import { useHistory } from "react-router";

const data = [
  { id: '20200223', date: moment('23/02/2020', 'DD/MM/YYYY'), title: '成為別人的祝福', messanger: '潘仕楷老師' },
  { id: '20200216', date: moment('16/02/2020', 'DD/MM/YYYY'), title: '穿上新人', messanger: '繆振聲傳道' },
]

function WorshipList() {
  const history = useHistory();

  //Default scroll to top
  window.scrollTo(0, 0)

  function onCellClicked(id) {
    history.push('/worship/' + id)
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
                  <th>日期</th>
                  <th style={{ width: '50%' }}>標題</th>
                  <th style={{ width: '20%' }}>講員</th>
                  <th style={{ width: '10%' }}></th>
                </tr>
              </thead>
              <tbody>
                {(data == null || data.length == 0) && <tr><th className="text-center" colSpan="3">沒有記錄</th></tr>}
                {
                  (data && data.length > 0) && data.map((value, index) => {
                    return <tr key={index}>
                      <th scope="row">{value.date.format('YYYY-MM-DD')}</th>
                      <td onClick={() => onCellClicked(value.id)}>{value.title}</td>
                      <td onClick={() => onCellClicked(value.id)}>{value.messanger}</td>
                      <td onClick={() => onCellClicked(value.id)}><a href="#">前往</a></td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
            <Pagination 
              className="w-100 pagination-primary justify-content-center"
            >
              <Pagination.First />
              <Pagination.Prev />
              <PageItem active disabled>
                  1
              </PageItem>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default WorshipList;