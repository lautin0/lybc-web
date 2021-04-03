import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Slider from "react-slick";
import UNIVERSALS from 'Universals';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  pauseOnHover: true,
  autoplaySpeed: 6000,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }
  ]
};

function SlideSection() {

  const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])

  return <div className="photos section" id="Photos">
    <Container>
      <div className="section-head">
        <h2>Photos</h2>
      </div>
      <div className="slider-section photos-list">
        <Slider {...settings}>
          {data.slice(0, 9).map((item, index) => {
            return (
              <div key={index} className="photos-item">
                <div className="gatsby-image-wrapper">
                  <img
                    src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/bg-color-oil-paint.jpeg"}
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </Container>
  </div>
}
export default SlideSection