import React from "react";

// react-bootstrap components
import {
  Container,
  Row,
  Table,
  Pagination,
  PageItem,
} from "react-bootstrap";

import moment from 'moment'
import { useHistory } from "react-router";

const data = [
  { id: '20200329', date: moment('29/03/2020', 'DD/MM/YYYY'), title: '分享主日', messanger: '---' },
  { id: '20200322', date: moment('22/03/2020', 'DD/MM/YYYY'), title: '與神摔跤的人', messanger: '黃雪梅傳道' },
  { id: '20200315', date: moment('15/03/2020', 'DD/MM/YYYY'), title: '主恩奇妙，因病得福', messanger: '林瑞興牧師' },
  { id: '20200308', date: moment('08/03/2020', 'DD/MM/YYYY'), title: '作耶穌的見證人', messanger: '繆振聲傳道' },
  { id: '20200223', date: moment('23/02/2020', 'DD/MM/YYYY'), title: '成為別人的祝福', messanger: '潘仕楷傳道' },
  // { id: '20200216', date: moment('16/02/2020', 'DD/MM/YYYY'), title: '穿上新人', messanger: '繆振聲傳道' },
]

function WorshipList() {
  const history = useHistory();

  //Default scroll to top
  window.scrollTo(0, 0)

  function onCellClicked(id: any) {
    history.push('/worship/' + id)
  };

  return (
    <>
      <div
        //className="section section-download"
        className="section"
        id="download-section"
      >
        <Container style={{marginTop: -50}}>
          <Row className="text-center">
            <p className="w-100">
              我要聽　神—耶和華所說的話，<br />
              因為他必應許賜平安給他的百姓，就是他的聖民；<br />
              他們卻不可再轉向愚昧。<br />
              他的救恩誠然與敬畏他的人相近，<br />
              使榮耀住在我們的地上。<br />
              (詩篇 85:8-9 和合本2010)<br /><br /><br />
            </p>
          </Row>
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
                {(data == null || data.length == 0) && <tr><th className="text-center" colSpan={3}>沒有記錄</th></tr>}
                {
                  (data && data.length > 0) && data.map((value, index) => {
                    return <tr key={index}>
                      <th scope="row">{value.date.format('YYYY-MM-DD')}</th>
                      <td onClick={() => onCellClicked(value.id)}>{value.title}{index == 0 && <b className="ml-3" style={{color: 'red'}}><i>新</i></b>}</td>
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