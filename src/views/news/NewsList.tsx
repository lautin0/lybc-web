import { usePostsQuery, PostType } from 'generated/graphql';
import moment from 'moment';
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedDate } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

function NewsList() {

   const location = useLocation()
   const history = useHistory()

   const { data, loading, refetch } = usePostsQuery({ variables: { first: 100, postFilter: { type: PostType.News } }, notifyOnNetworkStatusChange: true })

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      refetch && refetch()
   }, [location, refetch])

   return (
      <div
         className="section"
      >
         {loading && <Container>
            <div
               className="wrapper-cell"
            >
               <div>
                  <div style={{ height: 30, width: '100%', marginBottom: 20 }} className="text-line"></div>
                  <div style={{ height: 30, width: '100%', marginBottom: 20 }} className="text-line"></div>           
                  <div style={{ height: 30, width: '100%', marginBottom: 20 }} className="text-line"></div>
                  <div style={{ height: 30, width: '100%', marginBottom: 20 }} className="text-line"></div>
               </div>
            </div>
         </Container>}
         {(!loading && data != null) && <Container>
            {data.posts.edges?.filter(p => p.node?.type === PostType.News).map((x, i) => (
               <Row className="mb-3" key={x.node?._id}>
                  <Col>
                     <h3 className="mb-1"><a href="./" onClick={e => { e.preventDefault(); history.push('news/' + x.node?._id) }}>{x.node?.title}</a></h3>
                     <p><FormattedDate
                        value={moment(x.node?.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').toDate()}
                        year="numeric"
                        month="short"
                        day="numeric"
                     /></p>
                  </Col>
               </Row>
            ))}
            {/* <Row className="mb-3">
               <Col>
                  <h3 className="mb-1"><a href="./" onClick={e => { e.preventDefault(); history.push('news2') }}>本年度免稅慈善奉獻收據</a></h3>
                  <p>11-03-2021</p>
               </Col>
            </Row>
            <Row className="mb-3">
               <Col>
                  <h3 className="mb-1"><a href="#" onClick={e => { e.preventDefault(); history.push('news') }}>記念聖灰日</a></h3>
                  <p>17-02-2021</p>
                  <p>大齋期又稱四旬期，是教會年曆中的一個重要節期，由塗灰日至復活前夕的星期六（主日不算在內），為期四十日......</p>
               </Col>
            </Row>
            <Row className="mb-3">
               <Col>
                  <h3 className="mb-1"><a href="./" onClick={e => { e.preventDefault(); history.push('careers') }}>教會招聘教牧同工</a></h3>
                  <p>15-02-2021</p>
               </Col>
            </Row> */}
         </Container>}
      </div>
   )
}

export default NewsList;