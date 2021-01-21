import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Container, Row, Card, Col, Button, Nav, Tabs, Tab } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { css } from "styles/styles";
import { GET_POSTS } from "graphqls/graphql";
import { useQuery } from "@apollo/client";
import { Post, PostType, Role } from "generated/graphql";
import moment from 'moment'
import UNIVERSALS from "Universals";

// core components

function SharingList() {

  const history = useHistory();

  const [data, setData] = useState<Post[]>()

  const { loading, data: postData, refetch } = useQuery<{ posts: Post[] }>(GET_POSTS, { notifyOnNetworkStatusChange: true })

  const navigate = (id: string) => {
    history.push('/sharing/' + id)
  }

  const getTitleDisplay = (p: Post) => {
    if (p.user.role === Role.Admin)
      return ""
    let result = ""
    if (p.user.role === 'WORKER') {
      result = p.user.titleC ? p.user.titleC : ""
    } else if (p.user.gender === 'MALE') {
      result = '弟兄'
    } else if (p.user.gender === 'FEMALE') {
      result = '姊妹'
    }
    return result
  }

  useEffect(() => {
    if (postData === undefined)
      return
    let tmp: Post[] = [...postData.posts]
    console.log(tmp)
    setData(tmp
      ?.filter(x => x.type == PostType.Sharing)
      ?.filter(x => x.parantId == null)
      .sort((a: Post, b: Post) => {
        let aDate = moment(a.creDttm, 'YYYY-MM-DDTHH:mm:ssZ')
        let bDate = moment(b.creDttm, 'YYYY-MM-DDTHH:mm:ssZ')
        if (aDate.isAfter(bDate)) {
          return -1
        } else if (aDate.isBefore(bDate)) {
          return 1
        } else {
          return 0
        }
      }))
  }, [postData])

  const trimSubtitle = (txt: string) => {
    if (txt.length <= 50) {
      return txt
    } else {
      return txt.substring(0, 50) + '...'
    }
  }

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div
        className="section"
      >
        <Container>
          <div className="button-container">
            <Button className="btn-round" color="info" size="lg">
              分享您的想法
            </Button>
          </div>
          <h5 className="description">
            相信弟兄姊妹在生活中會遇上不少困難和信仰上的衝激，但同行路上不孤單！歡迎弟兄姊妹投稿，分享您的想法，讓我們彼此激勵，互作見證，在主內共成長。
          </h5>
          <hr></hr>
          {(loading && !data) && <Row className="text-center my-5">
            <div className="w-100">
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </Row>}
          {(!loading && data) && <Row className="my-1">
            <Col md={12} lg={8}>
              {data.map((p: Post) => {
                return <div key={p._id} className="my-5" onClick={() => { navigate(p._id) }}>
                  <div className={css.blog}>
                    <div className={css.blogText}>
                      <div className={css.blogOP}>
                        {p.user.nameC}{getTitleDisplay(p)}
                      </div>
                      <div className={css.blogHeader}>
                        <b>{p.title}</b>
                      </div>
                      <label className={css.blogQuote}>
                        {p.subtitle && trimSubtitle(p.subtitle)}
                      </label>
                      <p className={css.blogFooter}>
                        {moment(p.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').format('Y')}年{moment(p.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').format('M')}月{moment(p.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').format('D')}日
                    </p>
                    </div>
                    <div className={css.blogImg}>
                      <img src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${p.imageURI}`}></img>
                    </div>
                    <div className={css.blogImgMobile}>
                      <img src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${p.imageURI}`}></img>
                    </div>
                  </div>
                </div>
              })}
            </Col>
            <Col className="d-none d-md-block" lg={4}>

            </Col>
          </Row>}
        </Container>
      </div>
    </>
  );
}

export default SharingList;
