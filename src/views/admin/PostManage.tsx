import { useQuery } from '@apollo/client';
import { PendingPost } from 'generated/graphql';
import { GET_PENDING_POSTS } from 'graphqls/graphql';
import useLanguage from 'hooks/useLanguage';
import usePagination from 'hooks/usePagination';
import moment from 'moment';
import React, { SyntheticEvent, useEffect } from 'react'
import { Container, Row, Table, Pagination } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useLocation, useHistory } from 'react-router-dom';

function PostManage() {

  const [locale] = useLanguage()

  const intl = useIntl()

  const location = useLocation();

  const history = useHistory();

  const { pageItems, pageNumber, items, setData } = usePagination<PendingPost>()

  const { loading, data: pPostData, refetch } = useQuery<{ pPost: PendingPost[] }>(GET_PENDING_POSTS, { notifyOnNetworkStatusChange: true })

  function onEditClicked(e: SyntheticEvent, id: any) {
    e.preventDefault();
    history.push('/admin/worship/' + id)
  }

  useEffect(() => {
    if (pPostData === undefined)
      return
    let tmp: any = [...pPostData.pPost]
    setData(tmp?.sort((a: PendingPost, b: PendingPost) => {
      if (a.creDttm > b.creDttm) {
        return -1
      } else if (a.creDttm < b.creDttm) {
        return 1
      } else {
        return 0
      }
    })
      .map((x: PendingPost): PendingPost => {
        return {
          _id: x._id,
          title: x.title,
          username: x.username,
          creDttm: moment(x.creDttm, 'YYYYMMDD'),
          subtitle: x.subtitle,
          status: x.status,
          documentURI: x.documentURI
        }
      }))
  }, [pPostData])

  useEffect(() => {
    document.title = intl.formatMessage({ id: "app.menu.activity.online-sermon" })
  }, [locale])

  useEffect(() => {
    pPostData && refetch();
  }, [location, refetch, pPostData])

  return (
    <>
      <Container className="mt-5">
        <Row className="text-left">
          <h3>待審閱列表</h3>
        </Row>
        <Row className="mt-3">
          <Table striped className={pageItems && pageItems.length > 0 ? 'clickable' : ''}>
            <thead>
              <tr>
                <th style={{ width: '50%' }}>標題</th>
                <th style={{ width: '35%' }}>投稿人</th>
                <th style={{ width: '15%' }}>投稿日期</th>
                <th style={{ width: '10%' }}></th>
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
                  return <tr key={value._id}>
                    <td>{value.title}{(index === 0 && pageNumber === 1) && <b className="ml-3" style={{ color: 'red' }}><i>新</i></b>}</td>
                    <td>{value.username}</td>
                    <th scope="row">{value.creDttm.format('YYYY-MM-DD')}</th>
                    <td><a onClick={(e: any) => onEditClicked(e, value._id)}><i className="fa fa-pencil-alt"></i></a></td>
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

export default PostManage;