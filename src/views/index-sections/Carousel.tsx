import { useQuery } from "@apollo/client";
import axios from "axios";
import { GET_MAX_WORSHIP_ID } from "graphqls/graphql";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Button, Carousel, Col, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import UNIVERSALS from "Universals";

// core components

function CarouselSection() {

  const intl = useIntl()

  const history = useHistory()

  const [worshipId, setWorshipId] = useState('')
  const [index, setIndex] = useState(0);
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
    if (data !== undefined) {
      setWorshipId(data.maxWorshipId)
    }
  }, [data])

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
      <div className="section" id="carousel" style={{ marginBottom: 30 }}>
        <div>
          <Row className="justify-content-center" style={{ marginRight: 0, marginLeft: 0 }}>
            <Col xl={6} md={8} sm={12}>

              <Carousel activeIndex={index} onSelect={handleSelect} style={{ cursor: "pointer" }}>
                <Carousel.Item>
                  <img
                    style={{ maxHeight: 500, objectFit: "cover" }}
                    className="d-block w-100"
                    src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/worship-bg.jpg"}
                    alt="First slide"
                    onClick={handleClick}
                  />
                  <Carousel.Caption style={{ background: "rgba(100,100,100,.5)" }}>
                    <Button onClick={handleClick} style={{ color: 'white', textDecoration: 'none' }} className="btn-link">
                      {window.innerWidth > 991 && <><h1>{intl.formatMessage({ id: "app.index.title" })}</h1>
                        <h3>{intl.formatMessage({ id: "app.index.subtitle" })}</h3></>}
                      {window.innerWidth <= 991 && <><h3>{intl.formatMessage({ id: "app.index.title" })}</h3>
                        <h5>{intl.formatMessage({ id: "app.index.subtitle" })}</h5></>}
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
        </div>
      </div>
      <hr style={{ width: '80%' }} />
    </>
  );
}

export default CarouselSection;
