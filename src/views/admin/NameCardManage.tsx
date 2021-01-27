import { useMutation, useQuery } from '@apollo/client';
import { decisionRequest, setLoading } from 'actions';
import { AccountStatus, Gender, NameCard, Worship } from 'generated/graphql';
import { DELETE_WORSHIP, GET_NAMECARDS, GET_WORSHIPS } from 'graphqls/graphql';
import usePagination from 'hooks/usePagination';
import moment from 'moment';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { Pagination, Container, Row, Table, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

function NameCardManage() {

  const dispatch = useDispatch();

  const location = useLocation();

  const history = useHistory();

  const { data, loading, refetch } = useQuery<{ nameCards: NameCard[] }>(GET_NAMECARDS, { notifyOnNetworkStatusChange: true })

  useEffect(() => {
    if (data != null)
      refetch()
  }, [refetch, location, data])

  const getBadgeClassName = (s: AccountStatus) => {
    console.log(s)
    switch (s) {
      case AccountStatus.Active:
        return "success"
      case AccountStatus.Inactive:
        return "danger"
      case AccountStatus.Pending:
        return "primary"
      case AccountStatus.Suspended:
        return "warning"
      case AccountStatus.Contacting:
        return "info"
    }
  }

  const getStatus = (s: AccountStatus) => {
    console.log(s === AccountStatus.Pending)
    switch (s) {
      case AccountStatus.Active:
        return "已處理"
      case AccountStatus.Inactive:
        return "取消申請"
      case AccountStatus.Pending:
        return "待接觸"
      case AccountStatus.Suspended:
        return "暫緩申請"
      case AccountStatus.Contacting:
        return "接觸中"
    }
  }

  return (
    <>
      <Container className="mt-5">
        <Row className="text-left">
          <h3>網上新來賓名單</h3>
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
          {data!.nameCards.map((n, i) => {
            return <div key={n._id}>
              <Row className="card quick-item d-none d-lg-block mt-3 pt-5 pl-5 pr-5 pb-3">
                <div className="d-flex justify-content-between" style={{ fontSize: 18 }}>
                  <Col md={2}>
                    <div>
                      <label>名字: </label>
                    </div>
                    <div>
                      <label>聯絡電話: </label>
                    </div>
                    <div>
                      <label>備註: </label>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.name}</label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.phone}</label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.remarks}</label>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div>
                      <label>稱呼: </label>
                    </div>
                    <div>
                      <label>電郵地址: </label>
                    </div>
                    <div>
                      <label>最後更新: </label>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.gender === Gender.Male ? "先生" : (n.gender === Gender.Female ? "女士" : "")}</label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.email}</label>
                    </div>
                    <div>
                      <label style={{ color: 'gray' }}>{moment(n.lupdDttm).format('LLL')}</label>
                    </div>
                  </Col>
                </div>
                <div className="d-flex justify-content-end">
                  <span style={{ position: 'relative', fontSize: 16 }} className={`m-1 p-2 badge badge-${getBadgeClassName(n.status)}`}>{getStatus(n.status)}</span>
                </div>
              </Row>
              <Row className="card quick-item mt-3 d-none d-md-block d-lg-none p-3">
                <div className="d-flex justify-content-between" style={{ fontSize: 18 }}>
                  <Col md={6}>
                    <div>
                      <label>名字: </label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.name}</label>
                    </div>
                    <div>
                      <label>聯絡電話: </label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.phone}</label>
                    </div>
                    <div>
                      <label>備註: </label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.remarks}</label>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div>
                      <label>稱呼: </label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.gender === Gender.Male ? "先生" : (n.gender === Gender.Female ? "女士" : "")}</label>
                    </div>
                    <div>
                      <label>電郵地址: </label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.email}</label>
                    </div>
                    <div>
                      <label>最後更新: </label>
                    </div>
                    <div>
                      <label style={{ color: 'gray' }}>{moment(n.lupdDttm).format('LLL')}</label>
                    </div>
                  </Col>
                </div>
                <div className="d-flex justify-content-end">
                  <span style={{ position: 'relative', fontSize: 16 }} className={`m-1 p-2 badge badge-${getBadgeClassName(n.status)}`}>{getStatus(n.status)}</span>
                </div>
              </Row>
              <Row className="card quick-item mt-3 d-block d-md-none p-3">
                <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
                  <Col>
                    <div>
                      <label>名字: </label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.name}</label>
                    </div>
                    <div>
                      <label>聯絡電話: </label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.phone}</label>
                    </div>
                    <div>
                      <label>備註: </label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.remarks}</label>
                    </div>
                    <div>
                      <label>稱呼: </label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.gender === Gender.Male ? "先生" : (n.gender === Gender.Female ? "女士" : "")}</label>
                    </div>
                    <div>
                      <label>電郵地址: </label>
                    </div>
                    <div>
                      <label style={{ fontWeight: 'bold' }}>{n.email}</label>
                    </div>
                    <div>
                      <label>最後更新: </label>
                    </div>
                    <div>
                      <label style={{ color: 'gray' }}>{moment(n.lupdDttm).format('LLL')}</label>
                    </div>
                  </Col>
                </div>
                <div className="d-flex justify-content-end">
                  <span style={{ position: 'relative', fontSize: 16 }} className={`m-1 p-2 badge badge-${getBadgeClassName(n.status)}`}>{getStatus(n.status)}</span>
                </div>
              </Row>
            </div>
          })}
        </>}
      </Container>
    </>
  )
}

export default NameCardManage;