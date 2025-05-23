// import { useMediaQuery, useTheme } from "@material-ui/core";
import { PostType, useMaxWorshipIdQuery, usePostsQuery } from "generated/graphql";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

// react-bootstrap components
import { Col, Container, Row } from "react-bootstrap";
import { FormattedDate, useIntl } from "react-intl";
import { useHistory } from "react-router-dom";

function CarouselSection() {
  const intl = useIntl()

  const history = useHistory()

  const { data: newsData } = usePostsQuery({ variables: { last: 5, postFilter: { type: PostType.News } }, fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true })

  const [worshipId, setWorshipId] = useState('')
  const [setClickFunc] = useState<any>(() => { })

  const { data, loading } = useMaxWorshipIdQuery()

  const handleClick = useCallback(() => {
    history.push('/worship/' + worshipId)
  }, [worshipId, history])

  useEffect(() => {
    if (data !== undefined) {
      setWorshipId(data?.maxWorshipId.toString())
    }
  }, [data])

  useEffect(() => {
    if (!setClickFunc || !handleClick)
      return
    worshipId.length > 0 && setClickFunc(() => handleClick)
  }, [worshipId, setClickFunc, handleClick])

  return (
    <>
      <div className="section" id="carousel" style={{ marginTop: 50, marginBottom: 50 }}>
        <Container>
          <Row style={{ marginRight: 0, marginLeft: 0 }}>
            <Col className="mb-5">
              <h3><b className="pl-3" style={{ borderLeft: 'solid .5rem #FFB236' }}>{intl.formatMessage({ id: 'app.latest-updates' })}</b></h3>
              {loading && <div
                className="wrapper-cell"
              >
                <div>
                  <div className="text-line"></div>
                  <div className="text-line"></div>
                  <div className="text-line"></div>
                  <div className="text-line"></div>
                  <div className="text-line"></div>
                </div>
              </div>}
              {!loading && newsData?.posts.edges?.map((x) => (
                <div key={x.node?._id}>
                  <h5><FormattedDate
                    value={moment(x.node?.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').toDate()}
                    year="numeric"
                    month="short"
                    day="numeric"
                  /><a href="/" onClick={e => { e.preventDefault(); history.push('news/' + x.node?._id) }} className="ml-3">{x.node?.title}</a></h5>
                  <hr style={{ width: '80%' }}></hr>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CarouselSection;
