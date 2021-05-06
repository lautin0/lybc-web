import { useQuery } from '@apollo/client';
import LoadingDiv from 'components/Loading/LoadingDiv';
import { PostsConnection, QueryPostsArgs } from 'generated/graphql';
import { GET_POSTS } from 'graphqls/graphql';
import moment from 'moment';
import React, { useCallback, useRef, useState } from 'react'
import { FormattedDate, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Slider from "react-slick";
import UNIVERSALS from 'Universals';
import noImg from 'assets/img/no-img.jpg';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: false,
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

  const history = useHistory()

  const intl = useIntl()

  const dummyList = useRef([{}, {}, {}])

  const { loading, data: postData, refetch, fetchMore } = useQuery<
    { posts: PostsConnection },
    QueryPostsArgs
  >(GET_POSTS, { variables: { first: 5 }, notifyOnNetworkStatusChange: true })

  // const [data, setData] = useState([
  //   { date: moment('01/20/2021', 'MM/DD/YYYY').toDate(), title: '個人召命反思', link: 'sharing/600793e496f47f672e379c7b', imgUri: 'bg-color-oil-paint.jpeg' },
  //   { date: moment('01/12/2021', 'MM/DD/YYYY').toDate(), title: '重見初心', link: 'sharing/5ffda6d9ad3e428c49801c94', imgUri: 'bg-blue-oil-paint.jpeg' },
  //   { date: moment('04/05/2020', 'MM/DD/YYYY').toDate(), title: '疫情中的信仰 - 神的應許和人的盼望', link: 'sharing/5f850a38227dc4647ac6c586', imgUri: 'storm_sm.jpg' },
  //   { date: moment('04/05/2020', 'MM/DD/YYYY').toDate(), title: '在客西馬尼園!醒來吧!', link: 'sharing/5ffcfcf7bc28ffba6fbac2bb', imgUri: 'bg-orange-oil-paint.jpeg' }
  // ])

  const [dragging, setDragging] = useState(false)

  const handleBeforeChange = useCallback(() => {
    setDragging(true)
  }, [setDragging])

  const handleAfterChange = useCallback(() => {
    setDragging(false)
  }, [setDragging])

  const handleOnItemClick = useCallback(
    e => {
      if (dragging) e.stopPropagation()
    },
    [dragging]
  )

  return <div className="photos section mx-5" style={{ marginTop: 150, marginBottom: 150 }} id="Photos">
    <div className="section-head">
      <h2>{intl.formatMessage({ id: 'app.featured' })}</h2>
    </div>
    <div className="slider-section photos-list">
      <Slider
        beforeChange={handleBeforeChange}
        afterChange={handleAfterChange}
        {...settings}
      >
        {loading && dummyList.current.map((item, idx) => {
          return <LoadingDiv key={idx} />
        })}
        {!loading && (postData?.posts.edges!).slice(0, 9).map((item, index) => {
          return (
            <div onClickCapture={handleOnItemClick} key={index} className="photos-item">
              <div
                className="gatsby-image-wrapper"
                onClick={() => { history.push("sharing/" + item.node?._id) }}
              >
                {item.node?.imageURI && <>
                  <img
                    className="d-none d-lg-block"
                    style={{ width: '100%', height: 350, objectFit: 'cover' }}
                    src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + item.node?.imageURI}
                  />
                  <img
                    className="d-none d-md-block d-lg-none"
                    style={{ width: 410, height: 270, objectFit: 'cover' }}
                    src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + item.node?.imageURI}
                  />
                  <img
                    className="d-block d-md-none"
                    src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + item.node?.imageURI}
                  />
                </>}
                {!item.node?.imageURI && <>
                  <img
                    className="d-none d-lg-block"
                    style={{ width: '100%', height: 350, objectFit: 'cover' }}
                    src={noImg}
                  />
                  <img
                    className="d-none d-md-block d-lg-none"
                    style={{ width: 410, height: 270, objectFit: 'cover' }}
                    src={noImg}
                  />
                  <img
                    className="d-block d-md-none"
                    src={noImg}
                  />
                </>}
                <h4>{<FormattedDate
                  value={item.node?.creDttm}
                  year="numeric"
                  month="short"
                  day="numeric"
                />}</h4>
                <h3><strong>{item.node?.title}</strong></h3>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  </div>
}
export default SlideSection