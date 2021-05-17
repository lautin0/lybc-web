import DOMPurify from 'dompurify';
import { usePostQuery } from 'generated/graphql';
import moment from 'moment';
import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedDate } from 'react-intl';
import { useParams } from 'react-router';

function News() {

    const { id } = useParams<any>()

    const { data, loading } = usePostQuery({ variables: { oid: id }, notifyOnNetworkStatusChange: true })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <div className="section">
        {loading && <Container style={{ marginTop: -20, marginBottom: 60 }}>
            <div className="text-center">
                <div className="spinner-grow text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </Container>}
        {(!loading && data != null) && <Container style={{ borderRadius: '.5rem', marginBottom: 100 }}>
            <Row className="d-block d-md-none text-left" style={{ alignItems: 'baseline' }}>
                <Col><h2><strong>{data?.post?.title}</strong></h2></Col>
            </Row>
            <Row className="d-none d-md-block text-center" style={{ alignItems: 'baseline' }}>
                <Col><h2><strong>{data?.post?.title}</strong></h2></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col className="text-left sharing my-3 d-flex" lg="8" md="12" >
                    <div className="my-auto" style={{ color: 'gray' }}>
                        <div><i>{<FormattedDate
                            value={moment(data?.post?.creDttm, 'YYYY-MM-DD').toDate()}
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
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.post?.content!, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }) }}></div>
                </Col>
            </Row>
        </Container>}
    </div>
}

export default News;