import { useQuery } from "@apollo/client";
import { setLoading } from "actions";
import axios from "axios";
import { GET_MAX_WORSHIP_ID } from "graphqls/graphql";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UNIVERSALS from "Universals";

// core components

function CarouselSection() {

  const intl = useIntl()

  const history = useHistory()

  const dispatch = useDispatch()

  const [worshipId, setWorshipId] = useState('')
  const [index, setIndex] = useState(0);
  const [clickFunc, setClickFunc] = useState<((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined>((e: any) => { })
  // const [votd, setVotd] = useState('')
  // const [votdImg, setVotdImg] = useState('')
  // const [votdSrc, setVotdSrc] = useState('')

  const { data } = useQuery<{ maxWorshipId: string }>(GET_MAX_WORSHIP_ID)

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const handleClick = () => {
    history.push('/worship/' + worshipId)
  }

  useEffect(() => {
    dispatch(setLoading(true))
  }, [])

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setLoading(false))
      setWorshipId(data.maxWorshipId)
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
      <div className="section" id="carousel" style={{ marginTop: 50, marginBottom: 30 }}>
        <Container>
          <Row style={{ marginRight: 0, marginLeft: 0 }}>
            <Col md={6} sm={12} className="mb-5">
              <h3><b className="pl-3" style={{ borderLeft: 'solid .5rem #FFB236' }}>{intl.formatMessage({ id: 'app.latest-updates' })}</b></h3>
              <h5>17-02-2021<a href="#" onClick={e => { e.preventDefault() }} className="ml-3">記念聖灰日</a></h5>
              <hr style={{ width: '80%' }}></hr>
              <h5>15-02-2021<a href="./" onClick={e => { e.preventDefault(); history.push('careers') }} className="ml-3">教會招聘教牧同工</a></h5>
              <hr style={{ width: '80%' }}></hr>
              {/* <div className="text-right pr-5"><a href="#" onClick={e => { e.preventDefault() }}><h5>{intl.formatMessage({ id: 'app.show-more' })}</h5></a></div> */}
            </Col>
            <Col md={6} sm={12}>
              <Carousel activeIndex={index} onSelect={handleSelect} style={{ cursor: "pointer" }}>
                <Carousel.Item>
                  <img
                    style={{ maxHeight: 500, objectFit: "cover" }}
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
                    style={{ maxHeight: 500, objectFit: "cover" }}
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
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <hr style={{ width: '80%' }} /> */}
    </>
  );
}

export default CarouselSection;
