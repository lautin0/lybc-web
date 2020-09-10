import React, { useEffect } from "react";

// react-bootstrap components
import {
  Container,
  Row,
  Table,
  Pagination,
} from "react-bootstrap";

import moment from 'moment'
import { useHistory } from "react-router";
import worshipData from "../../assets/data/data.json"



function WorshipList() {
  const history = useHistory();

  const [pageItems, setPageItems] = React.useState<Array<{ id: string, date: moment.Moment, title: string, messenger: string }> | null>(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const pageSize = 5;

  const data = worshipData.map(x => { return {
    id: x.id, 
    date: moment(x.id, 'YYYYMMDD'), 
    title: x.type == '分享主日' ? '分享主日' : x.title, 
    messenger: x.messenger == '' ? '---' : x.messenger
  } })

  function onCellClicked(id: any) {
    history.push('/worship/' + id)
  };

  let items = [];
  if (pageItems == null || pageItems.length == 0) {
    items.push(<Pagination.First key={1} />, <Pagination.Prev key={2} />)
    items.push(
      <Pagination.Item key={3} active disabled>
        1
      </Pagination.Item>
    );
    items.push(<Pagination.Next key={4} />, <Pagination.Last key={5} />)
  } else {
    items.push(<Pagination.First key={1} onClick={() => onPageChanged(1)} />,
      <Pagination.Prev key={2} onClick={() => onPageChanged(pageNumber - 1)} />)
    for (let number = 1; number <= Math.ceil(data.length / pageSize); number++) {
      items.push(
        <Pagination.Item key={number + 2} active={number === pageNumber} onClick={() => onPageChanged(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    items.push(<Pagination.Next key={Math.ceil(data.length / pageSize) + 3} onClick={() => onPageChanged(pageNumber + 1)} />,
      <Pagination.Last key={Math.ceil(data.length / pageSize) + 4} onClick={() => onPageChanged(Math.ceil(data.length / pageSize))} />)
  }

  const onPageChanged = (page: number) => {
    if (page > Math.ceil(data.length / pageSize) || page == 0)
      return
    let array: Array<{ id: string, date: moment.Moment, title: string, messenger: string }> = [];
    for (let i = (pageSize * page) - pageSize; i < pageSize * page; i++) {
      data[i] && array.push(data[i])
    }
    setPageItems(array)
    setPageNumber(page)
  }

  useEffect(() => {

    //Default scroll to top
    window.scrollTo(0, 0)

    onPageChanged(1)
    
  }, [])

  return (
    <>
      <div
        //className="section section-download"
        className="section"
        id="download-section"
      >
        <Container style={{ marginTop: -50 }}>
          <Row className="text-center mb-3 mx-3">
            {/* <p className="w-100">
              我要聽　神—耶和華所說的話，因為他必應許賜平安給他的百姓，就是他的聖民；<br />
              他們卻不可再轉向愚昧。他的救恩誠然與敬畏他的人相近，<br />
              使榮耀住在我們的地上。<br />
              (詩篇 85:8-9 和合本2010)<br />
            </p> */}
          </Row>
          <Row className="mt-5">
            <Table striped className={pageItems && pageItems.length > 0 ? 'clickable' : ''}>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>日期</th>
                  <th style={{ width: '45%' }}>標題</th>
                  <th style={{ width: '30%' }}>講員</th>
                  <th style={{ width: '10%' }}></th>
                </tr>
              </thead>
              <tbody>
                {(pageItems == null || pageItems.length == 0) && <tr><th className="text-center" colSpan={4}>沒有記錄</th></tr>}
                {
                  (pageItems && pageItems.length > 0) && pageItems.map((value, index) => {
                    return <tr key={index}>
                      <th scope="row">{value.date.format('YYYY-MM-DD')}</th>
                      <td onClick={() => onCellClicked(value.id)}>{value.title}{(index == 0 && pageNumber == 1) && <b className="ml-3" style={{ color: 'red' }}><i>新</i></b>}</td>
                      <td onClick={() => onCellClicked(value.id)}>{value.messenger}</td>
                      <td onClick={() => onCellClicked(value.id)}><a href="#">前往</a></td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
            <Pagination
              className="w-100 pagination-primary justify-content-center"
            >
              {items}
            </Pagination>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default WorshipList;