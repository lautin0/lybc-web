import { useMutation, useQuery } from '@apollo/client';
import { decisionRequest, setLoading } from 'actions';
import { DELETE_WORSHIP, GET_WORSHIPS } from 'graphqls/graphql';
import moment from 'moment';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Pagination, Container, Row, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

function WorshipManage() {

  const dispatch = useDispatch();

  const location = useLocation();

  const history = useHistory();

  const [pageItems, setPageItems] = React.useState<Array<{ worshipId: string, date: moment.Moment, title: string, messenger: string }> | null>(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [data, setData] = useState([])
  const pageSize = 5;

  const { loading, error, data: worshipData, refetch } = useQuery(GET_WORSHIPS, { notifyOnNetworkStatusChange: true })

  const [deleteWorship, { data: deleteResult, loading: deleteWorshipLoading, error: deleteWorshipError }] = useMutation(DELETE_WORSHIP)

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
          title: x.type == '分享主日' ? '分享主日' : x.title,
          messenger: x.messenger == '' ? '---' : x.messenger
        }
      }))
  }, [worshipData])

  useEffect(() => {
    if (data !== undefined)
      onPageChanged(1)
  }, [data])

  useEffect(() => {
    document.title = "網上崇拜"
  }, [])

  function onDeleteClicked(e: SyntheticEvent, id: any) {
    e.preventDefault()
    dispatch(decisionRequest('確認刪除?', () => {
      dispatch(setLoading(true))
      deleteWorship({
        variables: {
          input: id
        }
      })
    }))
  };

  function onEditClicked(e: SyntheticEvent, id: any) {
    e.preventDefault();
    history.push('/admin/worship/' + id)
  }

  useEffect(() => {
    if (deleteResult != null && deleteResult.deleteWorship > 0) {
      dispatch(setLoading(false))
      refetch()
    }
  }, [deleteResult])

  useEffect(() => {
    worshipData && refetch();
  }, [location])

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
    let array: Array<{ worshipId: string, date: moment.Moment, title: string, messenger: string }> = [];
    for (let i = (pageSize * page) - pageSize; i < pageSize * page; i++) {
      data[i] && array.push(data[i])
    }
    setPageItems(array)
    setPageNumber(page)
  }

  return (
    <>
      <Container className="mt-5">
        <Row className="text-left">
          <h3>崇拜管理</h3>
        </Row>
        <Row className="mt-3">
          <Table striped className={pageItems && pageItems.length > 0 ? 'clickable' : ''}>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>日期</th>
                <th style={{ width: '50%' }}>標題</th>
                <th style={{ width: '35%' }}>講員</th>
                <th style={{ width: '5%' }}></th>
                <th style={{ width: '5%' }}></th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><th className="text-center" colSpan={5}>
                <div className="spinner-grow text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </th></tr>}
              {((pageItems == null || pageItems.length == 0) && !loading) && <tr><th className="text-center" colSpan={5}>沒有記錄</th></tr>}
              {
                (pageItems && pageItems.length > 0 && !loading) && pageItems.map((value, index) => {
                  return <tr key={index}>
                    <th scope="row">{value.date.format('YYYY-MM-DD')}</th>
                    <td>{value.title}{(index == 0 && pageNumber == 1) && <b className="ml-3" style={{ color: 'red' }}><i>新</i></b>}</td>
                    <td>{value.messenger}</td>
                    <td><a onClick={(e: any) => onEditClicked(e, value.worshipId)}><i className="fa fa-pencil-alt"></i></a></td>
                    <td><a onClick={(e: any) => onDeleteClicked(e, value.worshipId)}><i className="fa fa-trash"></i></a></td>
                  </tr>
                })
              }
            </tbody>
          </Table>
          <Pagination
            className="w-100 pagination-primary justify-content-center"
          >
            {!loading && items}
          </Pagination>
        </Row>
      </Container>
    </>
  )
}

export default WorshipManage;