import { useMutation, useQuery } from '@apollo/client';
import { decisionRequest, setLoading } from 'actions';
import { AccountStatus, Gender, NameCard, PendingPost, PostStatus, Worship } from 'generated/graphql';
import { DELETE_WORSHIP, GET_NAMECARDS, GET_PENDING_POSTS, GET_WORSHIPS } from 'graphqls/graphql';
import usePagination from 'hooks/usePagination';
import moment from 'moment';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { Pagination, Container, Row, Table, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import UNIVERSALS from 'Universals';

function PersonalSharing() {

  const dispatch = useDispatch();

  const location = useLocation();

  const history = useHistory();

  const { data, loading, refetch } = useQuery<{ pendingPosts: PendingPost[] }>(GET_PENDING_POSTS, { notifyOnNetworkStatusChange: true })

  useEffect(() => {
    if (data != null)
      refetch()
  }, [refetch, location, data])

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

  return (
    <>
      <Container className="mt-5">
        <Row className="text-left">
          <h3>檢視文章狀態</h3>
        </Row>
        <hr></hr>
        {(loading) && <Container>
          <div className="text-center">
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </Container>}
        {(!loading) && <>
          {data!.pendingPosts.map((p, i) => {
            return <div key={p._id}>
              <Col className="card quick-item mt-3 p-3" md={4} xs={12}>
                <div>
                  <label>標題: </label>
                </div>
                <div>
                  <label style={{ fontWeight: 'bold', fontSize: 18 }}>{p.title}</label>
                </div>
                <div>
                  <label>備註: </label>
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>{p.remarks != null ? p.remarks : "---"}</label>
                </div>
                <div>
                  <label>上傳的檔案: </label>
                </div>
                <div>
                  <a target="_blank" href={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + p.documentURI} style={{ fontWeight: 'bold' }}>下載</a>
                </div>
                <div className="d-flex justify-content-end">
                  <span style={{ position: 'relative', fontSize: 16 }} className={`m-1 p-2 badge badge-${getBadgeClassName(p.status)}`}>{getStatus(p.status)}</span>
                </div>
              </Col>
            </div>
          })}
        </>}
      </Container>
    </>
  )
}

export default PersonalSharing;