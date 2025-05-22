// import { useMediaQuery, useTheme } from "@material-ui/core";
import LoadingDiv from "components/Loading/LoadingDiv";
import { PostType, useMaxWorshipIdQuery, usePostsQuery } from "generated/graphql";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

// react-bootstrap components
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { FormattedDate, useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import UNIVERSALS from "Universals";

function CarouselSection() {
  const intl = useIntl()

  const history = useHistory()

  const { data: newsData } = usePostsQuery({ variables: { last: 5, postFilter: { type: PostType.News } }, fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true })

  const [worshipId, setWorshipId] = useState('')
  const [index, setIndex] = useState(0);
  const [setClickFunc] = useState<any>(() => { })

  // const [votd, setVotd] = useState<string>()
  // const[votdImg, setVotdImg] = useState<string>()
  // const[votdSrc, setVotdSrc] = useState<string>()

  const { data, loading } = useMaxWorshipIdQuery()

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const handleClick = useCallback(() => {
    history.push('/worship/' + worshipId)
  }, [worshipId, history])

  useEffect(() => {
    if (data !== undefined) {
      // dispatch(setLoading(false))
      setWorshipId(data?.maxWorshipId.toString())
    }
  }, [data])

  useEffect(() => {
    if (!setClickFunc || !handleClick)
      return
    worshipId.length > 0 && setClickFunc(() => handleClick)
  }, [worshipId, setClickFunc, handleClick])

  // useEffect(() => {
  //   axios.get("https://www.bible.com/verse-of-the-day").then((res) => {
  //     var parser = new DOMParser();
  //     var htmlDoc = parser.parseFromString(res.data, 'text/html');
  //     let imgs = htmlDoc.getElementsByTagName("amp-img")
  //     for (let i = 0; i < imgs.length; i++) {
  //       let img = imgs.item(i)
  //       if (img != null && img.classList.contains("img-wrap")) {
  //         let uri = img.getAttribute("src");
  //         if (uri != null) {
  //           let trimKey = "https://s3.amazonaws.com/"
  //           uri = uri?.substring(uri.indexOf(trimKey), uri.length + trimKey.length)
  //           console.log(uri)
  //           setVotdImg(uri)
  //         }
  //       }
  //     }
  //   })
  //   axios.get("https://www.bible.com/zh-HK/verse-of-the-day").then((res) => {
  //     var parser = new DOMParser();
  //     var htmlDoc = parser.parseFromString(res.data, 'text/html');
  //     let votdHtml = htmlDoc.getElementsByClassName("near-black mt0 mb2")[0]
  //     setVotd(votdHtml.innerHTML)
  //     let votdSrcHtml = htmlDoc.getElementsByClassName("usfm fw7 mt0 mb0 gray f7 ttu")[0]
  //     setVotdSrc(votdSrcHtml.innerHTML)
  //   })
  // }, [])

  return (
    <>
      <div className="section" id="carousel" style={{ marginTop: 50, marginBottom: 50 }}>
        <Container>
          <Row style={{ marginRight: 0, marginLeft: 0 }}>
            <Col lg={6} sm={12} className="mb-5">
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
            <Col lg={6} sm={12}>
              {!loading &&
                <Carousel activeIndex={index} onSelect={handleSelect} style={{ cursor: "pointer" }}>
                  <Carousel.Item style={{ background: 'lightgray' }}>
                    <img
                      style={{ width: '100%', objectFit: "cover" }}
                      src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/togetherness_md.jpg"}
                      alt="Second slide"
                    />

                    <Carousel.Caption style={{
                      background: 'rgba(100, 100, 100, .5)'
                    }}>
                      <Button style={{ color: 'white', textDecoration: 'none' }} className="btn-link">
                        {window.innerWidth > 991 && <><h4>{intl.formatMessage({ id: "app.theme.title" })}</h4>
                          <h3>{intl.formatMessage({ id: "app.theme.l1" })}</h3>
                          <h3>{intl.formatMessage({ id: "app.theme.l2" })}</h3>
                        </>}
                        {window.innerWidth <= 991 && <><h5>{intl.formatMessage({ id: "app.theme.title" })}</h5>
                          <h4 style={{ marginTop: 0 }}>{intl.formatMessage({ id: "app.theme.l1" })}</h4>
                          <h4 style={{ marginTop: 0 }}>{intl.formatMessage({ id: "app.theme.l2" })}</h4>
                        </>}
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>}
              {loading && <LoadingDiv />}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CarouselSection;
