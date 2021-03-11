import moment from 'moment';
import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedDate } from 'react-intl';

function LatestNews() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <div className="section">
        <Container style={{ borderRadius: '.5rem', marginBottom: 100 }}>
            <Row className="d-block d-md-none text-left" style={{ alignItems: 'baseline' }}>
                <Col><h2><strong>本年度免稅慈善奉獻收據</strong></h2></Col>
            </Row>
            <Row className="d-none d-md-block text-center" style={{ alignItems: 'baseline' }}>
                <Col><h2><strong>本年度免稅慈善奉獻收據</strong></h2></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col className="text-left sharing my-3 d-flex" lg="8" md="12" >
                    <div className="my-auto" style={{ color: 'gray' }}>
                        <div><i>{<FormattedDate
                            value={moment('2021-02-17', 'YYYY-MM-DD').toDate()}
                            year="numeric"
                            month="short"
                            day="numeric"
                        />}</i></div>
                    </div>
                </Col>
            </Row>
            {/* {post.imageURI != null && <Row className="d-flex justify-content-md-center mb-5">
            <Col className="text-center" lg="8" md="12"><img src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${post.imageURI}`}></img></Col>
        </Row>} */}
            <Row className="justify-content-md-center">
                <Col className="text-left sharing" lg="8" md="12">
                    <div>
                        <p>奉獻港幣100元或以上可獲奉獻收據，可按香港特別行政區稅務條例申請扣稅。</p>
                        <p>本年度『收據』的奉獻截數日期為28-3-2021 。此日期以後收到的奉獻，將撥落下一報稅年度。</p>
                        <p>奉獻教會存款戶口： 匯豐銀行1 1 9 -3 7 9 -2 9 5 -0 0 1</p>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
}

export default LatestNews;