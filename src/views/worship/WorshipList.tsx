import React, { useCallback, useEffect, useState } from "react";

// react-bootstrap components
import {
  Container,
  Row,
  Table,
  Pagination,
} from "react-bootstrap";

import moment from 'moment'
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_WORSHIPS } from "graphqls/graphql";
import { Worship } from "generated/graphql";

function WorshipList() {
  const history = useHistory();

  const [pageItems, setPageItems] = React.useState<Array<{ worshipId: string, date: moment.Moment, title: string, messenger: string }> | null>(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [data, setData] = useState([])
  const pageSize = 5;

  const { loading, data: worshipData } = useQuery<{ worships: Worship[] }>(GET_WORSHIPS)

  const onPageChanged = useCallback((page: number) => {
    if (page > totalPageNum || page === 0)
      return
    let array: Array<{ worshipId: string, date: moment.Moment, title: string, messenger: string }> = [];
    for (let i = (pageSize * page) - pageSize; i < pageSize * page; i++) {
      data[i] && array.push(data[i])
    }
    setPageItems(array)
    setPageNumber(page)
  }, [data])

  function onCellClicked(id: any) {
    history.push('/worship/' + id)
  };

  const adjacency = 1;

  const totalPageNum = Math.ceil(data.length / pageSize)

  let items = [];
  if (pageItems == null || pageItems.length === 0) {
    items.push(<Pagination.First key={1} />, <Pagination.Prev key={2} />)
    items.push(
      <Pagination.Item key={3} active disabled>
        1
      </Pagination.Item>
    );
    items.push(<Pagination.Next key={4} />, <Pagination.Last key={5} />)
  } else if (totalPageNum <= (5 + (2 * adjacency))) { //5 = start + end + 2 Ellipsis + middle (Enough to show all)
    items.push(<Pagination.First key={1} onClick={() => onPageChanged(1)} />,
      <Pagination.Prev key={2} onClick={() => onPageChanged(pageNumber - 1)} />)
    for (let number = 1; number <= totalPageNum; number++) {
      items.push(
        <Pagination.Item key={number + 2} active={number === pageNumber} onClick={() => onPageChanged(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    items.push(<Pagination.Next key={totalPageNum + 3} onClick={() => onPageChanged(pageNumber + 1)} />,
      <Pagination.Last key={totalPageNum + 4} onClick={() => onPageChanged(totalPageNum)} />)
  } else {
    items.push(<Pagination.First className="d-none d-sm-block" key={1} onClick={() => onPageChanged(1)} />,
      <Pagination.Prev key={2} onClick={() => onPageChanged(pageNumber - 1)} />)

    if (pageNumber <= 2 + (adjacency * 2)) {
      // Close to start, hide close to end
      for (let i = 1; i <= 2 + (adjacency * 2); i++) {
        items.push(
          <Pagination.Item key={i + 2} active={i === pageNumber} onClick={() => onPageChanged(i)}>
            {i}
          </Pagination.Item>,
        )
      }
      items.push(<Pagination.Ellipsis key={totalPageNum + 2} />)
      items.push(
        <Pagination.Item active={totalPageNum === pageNumber} key={totalPageNum + 3} onClick={() => onPageChanged(totalPageNum)}>
          {totalPageNum}
        </Pagination.Item>,
      )
    } else if(pageNumber > (totalPageNum - ((adjacency * 2) + 2))){
      // Close to end, hide close to start
      items.push(
        <Pagination.Item active={1 === pageNumber} key={3} onClick={() => onPageChanged(1)}>
          {1}
        </Pagination.Item>,
      )
      items.push(<Pagination.Ellipsis key={4} />)
      for (let i = (totalPageNum - ((adjacency * 2) + 2)); i <= totalPageNum; i++) {
        items.push(
          <Pagination.Item key={i + 4} active={i === pageNumber} onClick={() => onPageChanged(i)}>
            {i}
          </Pagination.Item>,
        )
      }
    } else {
      // Handle middle, hide close to start and end
      items.push(
        <Pagination.Item active={totalPageNum === pageNumber} key={3} onClick={() => onPageChanged(1)}>
          {1}
        </Pagination.Item>,
      )
      items.push(<Pagination.Ellipsis key={4} />)

      for (let i = pageNumber - adjacency; i <= pageNumber + adjacency; i++) {
        items.push(
          <Pagination.Item key={i + 4} active={i === pageNumber} onClick={() => onPageChanged(i)}>
            {i}
          </Pagination.Item>,
        )
      }

      items.push(<Pagination.Ellipsis key={totalPageNum + 5} />)
      items.push(
        <Pagination.Item active={totalPageNum === pageNumber} key={totalPageNum + 6} onClick={() => onPageChanged(totalPageNum)}>
          {totalPageNum}
        </Pagination.Item>,
      )
    }

    items.push(<Pagination.Next key={totalPageNum + 7} onClick={() => onPageChanged(pageNumber + 1)} />,
      <Pagination.Last className="d-none d-sm-block" key={totalPageNum + 8} onClick={() => onPageChanged(totalPageNum)} />)
  }

  useEffect(() => {
    if (worshipData === undefined)
      return
    let tmp: any = [...worshipData.worships]
    setData(tmp?.sort((a: any, b: any) => {
      if (a.worshipId > b.worshipId) {
        return -1
      } else if (a.worshipId < b.worshipId) {
        return 1
      } else {
        return 0
      }
    })
      .map((x: any) => {
        return {
          worshipId: x.worshipId,
          date: moment(x.worshipId, 'YYYYMMDD'),
          title: x.type === '分享主日' ? '分享主日' : x.title,
          messenger: x.messenger === '' ? '---' : x.messenger
        }
      }))
  }, [worshipData])

  useEffect(() => {
    if (data !== undefined)
      onPageChanged(1)
  }, [data, onPageChanged])

  useEffect(() => {
    document.title = "網上崇拜"
  }, [])

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div
        //className="section section-download"
        className="section"
        id="download-section"
      >
        <Container style={{ marginTop: -50 }}>
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
                {loading && <tr><th className="text-center" colSpan={4}>
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </th></tr>}
                {((pageItems == null || pageItems.length === 0) && !loading) && <tr><th className="text-center" colSpan={4}>沒有記錄</th></tr>}
                {
                  (pageItems && pageItems.length > 0) && pageItems.map((value, index) => {
                    return <tr key={index}>
                      <th scope="row">{value.date.format('YYYY-MM-DD')}</th>
                      <td onClick={() => onCellClicked(value.worshipId)}>{value.title}{(index === 0 && pageNumber === 1) && <b className="ml-3" style={{ color: 'red' }}><i>新</i></b>}</td>
                      <td onClick={() => onCellClicked(value.worshipId)}>{value.messenger}</td>
                      <td onClick={() => onCellClicked(value.worshipId)}><a href="#">前往</a></td>
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