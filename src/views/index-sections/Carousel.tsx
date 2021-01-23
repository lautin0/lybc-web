import { useQuery } from "@apollo/client";
import { GET_MAX_WORSHIP_ID } from "graphqls/graphql";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Button, Carousel, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UNIVERSALS from "Universals";

// core components

function CarouselSection() {

  const history = useHistory()

  const [worshipId, setWorshipId] = useState('')
  const [index, setIndex] = useState(0);

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

  return (
    <>
      <div className="section" id="carousel" style={{ marginBottom: 30 }}>
        <div>
          <Row className="justify-content-center" style={{ marginRight: 0, marginLeft: 0 }}>
            <Col lg="8" md="12">

              <Carousel activeIndex={index} onSelect={handleSelect} style={{ cursor: "pointer" }}>
                <Carousel.Item>
                  <img
                    style={{ maxHeight: 500, objectFit: "cover" }}
                    className="d-block w-100"
                    src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/church-bench-md.jpg"}
                    alt="First slide"
                    onClick={handleClick}
                  />
                  <Carousel.Caption style={{ background: "rgba(100,100,100,.5)" }}>
                    <Button onClick={handleClick} style={{ color: 'white', textDecoration: 'none' }} className="btn-link">
                      {window.innerWidth > 991 && <><h1>主日崇拜</h1>
                        <h3>按此進入本週主日崇拜</h3></>}
                      {window.innerWidth <= 991 && <><h3>主日崇拜</h3>
                      <h5>按此進入本週主日崇拜</h5></>}
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
                {/* <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x400"
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
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
