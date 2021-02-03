import { useMutation, useQuery } from '@apollo/client';
import { decisionRequest, setLoading } from 'actions';
import { Worship } from 'generated/graphql';
import { DELETE_WORSHIP, GET_WORSHIPS } from 'graphqls/graphql';
import useLanguage from 'hooks/useLanguage';
import usePagination from 'hooks/usePagination';
import moment from 'moment';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { Pagination, Container, Row, Table } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

function WorshipManage() {

  const [locale] = useLanguage()

  const intl = useIntl()

  const dispatch = useDispatch();

  const location = useLocation();

  const history = useHistory();

  const { pageItems, pageNumber, items, setData } = usePagination()

  const { loading, data: worshipData, refetch } = useQuery<{ worships: Worship[] }>(GET_WORSHIPS, { notifyOnNetworkStatusChange: true })

  const [deleteWorship, { data: deleteResult }] = useMutation<
   { deleteWorship: any },
   { input: string }
  >(DELETE_WORSHIP)

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
    document.title = intl.formatMessage({ id: "app.menu.activity.online-sermon" })
  }, [locale])

  useEffect(() => {
    if (deleteResult != null && deleteResult.deleteWorship > 0) {
      dispatch(setLoading(false))
      refetch()
    }
  }, [deleteResult, dispatch, refetch])

  useEffect(() => {
    worshipData && refetch();
  }, [location, refetch, worshipData])

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
              {((pageItems == null || pageItems.length === 0) && !loading) && <tr><th className="text-center" colSpan={5}>沒有記錄</th></tr>}
              {
                (pageItems && pageItems.length > 0 && !loading) && pageItems.map((value, index) => {
                  return <tr key={index}>
                    <th scope="row">{value.date.format('YYYY-MM-DD')}</th>
                    <td>{value.title}{(index === 0 && pageNumber === 1) && <b className="ml-3" style={{ color: 'red' }}><i>新</i></b>}</td>
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