import LoadingDiv from "components/Loading/LoadingDiv";
import { PostType, useMaxWorshipIdQuery, usePostsQuery } from "generated/graphql";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";

// react-bootstrap components
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { FormattedDate, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UNIVERSALS from "Universals";

// core components

function CarouselSection() {

  const intl = useIntl()

  const history = useHistory()

  const dispatch = useDispatch()

  const { data: newsData, loading: newsLoading, refetch } = usePostsQuery({ variables: { last: 5, postFilter: { type: PostType.News } }, fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true })

  const [worshipId, setWorshipId] = useState('')
  const [index, setIndex] = useState(0);
  const [clickFunc, setClickFunc] = useState<((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined>((e: any) => { })
  // const [votd, setVotd] = useState('')
  // const [votdImg, setVotdImg] = useState('')
  // const [votdSrc, setVotdSrc] = useState('')

  const { data, loading } = useMaxWorshipIdQuery()

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const handleClick = useCallback(() => {
    history.push('/worship/' + worshipId)
  }, [worshipId])

  useEffect(() => {
    if (data !== undefined) {
      // dispatch(setLoading(false))
      setWorshipId(data?.maxWorshipId.toString())
    }
  }, [data])

  useEffect(() => {
    worshipId.length > 0 && setClickFunc(() => handleClick)
  }, [worshipId])

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
              {!loading && newsData?.posts.edges?.map((x, i) => (
                <div key={x.node?._id}>
                  <h5><FormattedDate
                        value={moment(x.node?.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').toDate()}
                        year="numeric"
                        month="short"
                        day="numeric"
                     /><a href="#" onClick={e => { e.preventDefault(); history.push('news/' + x.node?._id) }} className="ml-3">{x.node?.title}</a></h5>
                  <hr style={{ width: '80%' }}></hr>
                </div>
              ))}
            </Col>
            <Col lg={6} sm={12}>
              {!loading &&
                <Carousel activeIndex={index} onSelect={handleSelect} style={{ cursor: "pointer" }}>
                  <Carousel.Item>
                    <img
                      style={{ height: 400, objectFit: "cover" }}
                      className="d-block w-100"
                      src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/worship-bg.jpg"}
                      alt="First slide"
                      onClick={handleClick}
                    />
                    <Carousel.Caption style={{ background: "rgba(100,100,100,.5)" }} onClick={handleClick}>
                      <Button style={{ color: 'white', textDecoration: 'none' }} className="btn-link">
                        {window.innerWidth > 991 && <><h2>{intl.formatMessage({ id: "app.index.title" })}</h2>
                          <h3>{intl.formatMessage({ id: "app.index.subtitle" })}</h3></>}
                        {window.innerWidth <= 991 && <><h3>{intl.formatMessage({ id: "app.index.title" })}</h3>
                          <h5>{intl.formatMessage({ id: "app.index.subtitle" })}</h5></>}
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item style={{ background: 'lightgray' }}>
                    <img
                      style={{ height: 400, objectFit: "cover" }}
                      className="d-block w-100"
                      src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/together_md.jpg"}
                      alt="Second slide"
                    />

                    <Carousel.Caption style={{
                      // background: "linear-gradient(20deg, rgba(253,187,45,.5) 0%, rgba(34,193,195,.8) 100%)"
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
                  <Carousel.Item style={{ background: '#2c2c2c' }}>
                    <img
                      style={{ height: 400, objectFit: "contain" }}
                      className="d-block w-100"
                      src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/WhatsApp%20Image%202021-03-17%20at%2014.07.56.jpeg"}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  {/* <Carousel.Item style={{ background: 'lightgray' }}>
                  <img
                    style={{ maxHeight: 500, objectFit: "cover" }}
                    className="d-block w-100"
                    src={votdImg}
                    alt="Second slide"
                  />

                  <Carousel.Caption style={{
                    background: "linear-gradient(20deg, rgba(253,187,45,.5) 0%, rgba(34,193,195,.8) 100%)"
                  }}>
                    <h3>今日經文</h3>
                    <p style={{ fontWeight: 'bold' }}>{votd}</p>
                    <p>{votdSrc}</p>
                  </Carousel.Caption>
                </Carousel.Item> */}
                  {/* <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x400"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
                  </Carousel.Caption>
                </Carousel.Item> */}
                </Carousel>}
              {loading && <LoadingDiv />}
            </Col>
          </Row>
        </Container>
      </div>
      {/* <hr style={{ width: '80%' }} /> */}
    </>
  );
}

export default CarouselSection;
