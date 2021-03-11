import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function LatestNewsList() {

    const history = useHistory()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return <div
        className="section"
    >
        <Container>
            <Row className="mb-3">
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
            </Row>
        </Container>
    </div>
}

export default LatestNewsList;