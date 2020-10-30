import { useMutation, useQuery } from "@apollo/client";
import { setSysMessage, setSystemFailure } from "actions";
import CommentSection from "components/comments/CommentSection";
import DOMPurify from "dompurify";
import { ADD_POST, GET_POST, REACT_TO_POST } from "graphqls/graphql";
import usePost from "hooks/usePost";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Tooltip, Container, Row, OverlayTrigger, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// react-bootstrap components
import { useLocation, useParams } from "react-router";
import { RootState } from "reducers";
import { getTokenValue } from "utils/utils";

// core components

function Sharing() {

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const { id } = useParams<any>();

  const dispatch = useDispatch()

  const location = useLocation()

  const [post, setPost] = useState<any>()

  const [react, { data: result }] = useMutation(REACT_TO_POST);

  const { loading, postData, refetch } = usePost({ id: id })

  const setReaction = (reaction: string) => {
    if (tokenPair?.token == null) {
      dispatch(setSysMessage('請先登入'))
      return
    }
    react({
      variables: {
        input: {
          username: getTokenValue(tokenPair?.token).username,
          postOID: postData.post._id,
          type: reaction.toUpperCase(),
          toUsername: postData.post.user.username
        },
      }
    }).catch(e => {
      dispatch(setSystemFailure(e))
    })
  }

  useEffect(() => {
    if (postData !== undefined) {
      setPost(postData.post)
    } else if (result !== undefined) {
      setPost(result)
    }
  }, [postData, result])

  useEffect(() => {
    document.querySelector('.scroll-animations .animated')?.classList.remove("animate__fadeInLeft");
  }, [])

  useEffect(() => {
    refetch && refetch()
  }, [location])

  useEffect(() => {
    // Check if element is scrolled into footer
    const isScrolledIntoFooter = () => {
      var docViewTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var docViewBottom = docViewTop + window.innerHeight

      let el: any = document.querySelector("div#reaction-bar");

      if (el == null)
        return false
      return docViewBottom > el.getBoundingClientRect().top + window.pageYOffset
    }

    // If element is scrolled into view, fade it in
    const handleScroll = () => {
      if (isScrolledIntoFooter() === true) {
        document.querySelector('.scroll-animations .animated')?.classList.add("animate__fadeOut");
        document.querySelector('.scroll-animations .animated')?.classList.remove("animate__fadeIn");
      } else {
        document.querySelector('.scroll-animations .animated')?.classList.add("animate__fadeIn");
        document.querySelector('.scroll-animations .animated')?.classList.remove("animate__fadeOut");
      }
    }

    window.addEventListener("scroll", (e: any) => {
      handleScroll();
    })

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  })

  const renderTooltip = (props: any, type: string) => {
    let usernames: any[] = post.reactions
      .filter((r: any) =>
        r.type === type.toUpperCase()
      )
      .map((x: any) => {
        return x.username
      })
    let text = ''
    if (type === 'pray')
      text = '記念'
    else
      text = '哈利路亞'

    let sentence = "{0}{1}表示 " + text
    let userClause = ""
    usernames.slice(0, 2).map((user: any, i: number) => {
      if (userClause.length > 0)
        userClause += ", "
      userClause += user
    })

    if (userClause.length > 0)
      sentence = sentence.replace('{0}', userClause)
    if (usernames.length - 2 > 0)
      sentence = sentence.replace('{1}', `和另外 ${usernames.length - 2} 人`)
    else
      sentence = sentence.replace('{1}', '')

    return <Tooltip {...props}> {usernames.length > 0 ? sentence : text}</Tooltip>
  };

  const isReacted = (type: string): boolean => {
    if (tokenPair?.token == null)
      return false
    return post.reactions.filter((r: any) =>
      r.username === getTokenValue(tokenPair?.token).username &&
      r.type === type.toUpperCase()
    ).length > 0
  }

  const reactionCount = (type: string): number => {
    return post.reactions.filter((r: any) =>
      r.type === type.toUpperCase()
    ).length
  }

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className="section">
        {loading && <Container style={{ marginTop: -20 }}>
          <div className="text-center">
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </Container>}
        {(!loading && post != null) && <Container style={{ paddingTop: 90, borderRadius: '.5rem', marginBottom: 100 }}>
          <Row className="text-left d-none d-lg-block scroll-animations" style={{ position: "sticky", top: '40vh' }}>
            <div style={{ position: "absolute", marginTop: 80 }} className="animated animate__animated animate__fast">
              <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'hallelujah')}>
                <div className="my-3" style={{ cursor: 'pointer' }} onClick={() => setReaction('hallelujah')}>
                  <div style={{ display: 'inline' }}>
                    <i className={`fas fa-hanukiah reaction ${isReacted('hallelujah') ? "reacted" : ""}`}></i>
                  </div>
                  <span style={{ fontSize: 24 }} className="m-1">{reactionCount('hallelujah')}</span>
                </div>
              </OverlayTrigger>
              <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'pray')}>
                <div className="my-3" style={{ cursor: 'pointer' }} onClick={() => setReaction('pray')}>
                  <div style={{ display: 'inline' }}>
                    <i className={`fas fa-praying-hands reaction ${isReacted('pray') ? "reacted" : ""}`}></i>
                  </div>
                  <span style={{ fontSize: 24 }} className="m-1">{reactionCount('pray')}</span>
                </div>
              </OverlayTrigger>
            </div>
          </Row>
          <Row className="text-left" style={{ alignItems: 'baseline' }}>
            <Col lg={{ offset: 4 }}><h3><strong>{post.title}</strong></h3></Col>
            <Col className="text-right pr-5" lg={12}><h5 style={{ color: 'gray' }}>{post.user.nameC}{post.user.gender === 'MALE' ? '弟兄' : '姊妹'} {moment(post.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').format('Y')}年{moment(post.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').format('M')}月{moment(post.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').format('D')}日</h5></Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="text-left sharing" lg="8" md="12" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}>
            </Col>
          </Row>
          <Row className="text-left mt-5" id="reaction-bar">
            <Col className="form-inline" lg={{ offset: 2 }}>
              <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'hallelujah')}>
                <div className="m-3" style={{ cursor: 'pointer' }} onClick={() => setReaction('hallelujah')}>
                  <div style={{ display: 'inline' }}>
                    <i className={`fas fa-hanukiah reaction ${isReacted('hallelujah') ? "reacted" : ""}`}></i>
                  </div>
                  <span style={{ fontSize: 24 }} className="m-1">{reactionCount('hallelujah')}</span>
                </div>
              </OverlayTrigger>
              <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'pray')}>
                <div className="m-3" style={{ cursor: 'pointer' }} onClick={() => setReaction('pray')}>
                  <div style={{ display: 'inline' }}>
                    <i className={`fas fa-praying-hands reaction ${isReacted('pray') ? "reacted" : ""}`}></i>
                  </div>
                  <span style={{ fontSize: 24 }} className="m-1">{reactionCount('pray')}</span>
                </div>
              </OverlayTrigger>
            </Col>
          </Row>
          <CommentSection id={id} type="SHARING"/>
        </Container>}
      </div>
    </>
  );
}

export default Sharing;
