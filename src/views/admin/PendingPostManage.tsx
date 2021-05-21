import { PendingPost, PostStatus, usePendingPostsQuery } from 'generated/graphql';
import useLanguage from 'hooks/useLanguage';
import usePagination from 'hooks/usePagination';
import moment from 'moment';
import { SyntheticEvent, useEffect } from 'react'
import { Container, Row, Table, Pagination } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useLocation, useHistory } from 'react-router-dom';

function PendingPostManage() {

  const [locale] = useLanguage()

  const location = useLocation();

  const history = useHistory();

  const { pageItems, items, setData } = usePagination<PendingPost>()

  const { loading, data: pPostData, refetch } = usePendingPostsQuery({ notifyOnNetworkStatusChange: true })
  
  function onEditClicked(e: SyntheticEvent, id: any) {
    e.preventDefault();
    history.push('/admin/post/pending/' + id)
  }

  useEffect(() => {
    if (pPostData === undefined)
      return
    let tmp: Array<PendingPost> = pPostData.pendingPosts != null ? [...pPostData.pendingPosts] : []
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

  const getBadgeClassName = (s: PostStatus) => {
    switch (s) {
      case PostStatus.Approved:
        return "success"
      case PostStatus.Rejected:
      case PostStatus.Withdraw:
        return "danger"
      case PostStatus.Pending:
        return "primary"
      case PostStatus.Withhold:
        return "warning"
    }
  }

  const getStatus = (s: PostStatus) => {
    switch (s) {
      case PostStatus.Approved:
        return "已發佈"
      case PostStatus.Rejected:
        return "已拒絕"
      case PostStatus.Pending:
        return "待審閱"
      case PostStatus.Withhold:
        return "暫緩發佈"
      case PostStatus.Withdraw:
        return "已撤回"
    }
  }

  useEffect(() => {
    pPostData && refetch();
  }, [location, refetch, pPostData])

  return (
    <>
      <Container className="mt-5">
        <Row className="text-left">
          <h3>待審閱文章</h3>
        </Row>
        <Row className="mt-3">
          <Table striped className={pageItems && pageItems.length > 0 ? 'clickable' : ''}>
            <thead>
              <tr>
                <th style={{ width: '50%' }}>標題</th>
                <th style={{ width: '25%' }}>投稿人</th>
                <th style={{ width: '15%' }}>投稿日期</th>
                <th style={{ width: '10%' }}></th>
                <th style={{ width: '10%' }}></th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><th className="text-center" colSpan={5}>
                <div className="spinner-grow text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </th></tr>}
              {((!pageItems || pageItems.length === 0) && !loading) && <tr><th className="text-center" colSpan={5}>沒有記錄</th></tr>}
              {
                (pageItems && pageItems.length > 0 && !loading) && pageItems.map((value) => {
                  return <tr key={value._id}>
                    <td>{value.title}</td>
                    <td>{value.username}</td>
                    <th scope="row">{value.creDttm.format('YYYY-MM-DD')}</th>
                    <td><span style={{ position: 'relative', fontSize: 16 }} className={`badge badge-${getBadgeClassName(value.status)}`}>{getStatus(value.status)}</span></td>
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

export default PendingPostManage;