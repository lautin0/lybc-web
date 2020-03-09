import React from "react";

// react-bootstrap components
import {
  Container,
  Row,
  Table,
  Pagination,
  PageItem,
} from "react-bootstrap";

import moment from 'moment';

const data = [
  { uri: require('assets/pdf/journal7.pdf'), date: moment('01/12/2019', 'DD/MM/YYYY'), title: '聖誕特別刊 - 耶穌是我的牧羊人' },
  { uri: require('assets/pdf/journal6.pdf'), date: moment('01/11/2019', 'DD/MM/YYYY'), title: '盼望' },
  { uri: require('assets/pdf/journal5.pdf'), date: moment('01/10/2019', 'DD/MM/YYYY'), title: '世代的禱告' },
  { uri: require('assets/pdf/journal4.pdf'), date: moment('01/09/2019', 'DD/MM/YYYY'), title: '和平之子' },
  { uri: require('assets/pdf/journal3.pdf'), date: moment('01/08/2019', 'DD/MM/YYYY'), title: '行公義好憐憫' },
  { uri: require('assets/pdf/journal2.pdf'), date: moment('01/07/2019', 'DD/MM/YYYY'), title: '主的屬性 - 愛' },
  { uri: require('assets/pdf/journal1.pdf'), date: moment('01/06/2019', 'DD/MM/YYYY'), title: '主的見證人' }
]

function Download() {

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
                  <th>刊登日期</th>
                  <th style={{ width: '60%' }}>標題</th>
                  <th style={{ width: '20%' }}>下載</th>
                </tr>
              </thead>
              <tbody>
                {(data == null || data.length == 0) && <tr><th className="text-center" colSpan={3}>沒有記錄</th></tr>}
                {
                  (data && data.length > 0) && data.map((value, index) => {
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

export default Download;
