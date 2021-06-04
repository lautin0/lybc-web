import CommentSection from "components/Comments/CommentSection";
import DOMPurify from "dompurify";
import { Post, PostDocument, ReactionType, useReactMutation } from "generated/graphql";
import usePost from "hooks/usePost";
import moment from "moment";
import { useCallback, useContext, useEffect, useState } from "react";
import { Container, Row, OverlayTrigger, Col } from "react-bootstrap";

import { useLocation, useParams } from "react-router-dom";
import UNIVERSALS from "Universals";
import { getTitleDisplay, getTokenValue, renderTooltip } from "utils/utils";

import defaultAvatar from "assets/img/default-avatar.png";
import { FormattedDate, useIntl } from "react-intl";
import AuthContext from "context/AuthContext";
import { RootStore } from "store";
import shallow from 'zustand/shallow'

function Sharing() {

  const intl = useIntl()

  const { tokenPair } = useContext(AuthContext)

  const { id } = useParams<any>();

  const [setSysMessage, setSysFailure] = RootStore.useModalStore(state => [state.setSysMessage, state.setSysFailure], shallow)

  const location = useLocation()

  const [post, setPost] = useState<Post>()

  const [react] = useReactMutation({
    refetchQueries: [
      { query: PostDocument, variables: { oid: id } }
    ]
  })

  const { loading, postData, refetch } = usePost({ id: id })

  const setReaction = (reaction: ReactionType) => {
    if (!tokenPair?.token) {
      setSysMessage('app.sys.require-login')
      return
    } else if (getTokenValue(tokenPair?.token)?.role.toUpperCase() === 'PUBLIC') {
      setSysMessage('app.sys.public-account-cannot-react')
      return
    }
    react({
      variables: {
        input: {
          username: getTokenValue(tokenPair?.token).username,
          postOID: postData?.post?._id,
          type: reaction,
          toUsername: postData?.post?.user.username
        },
      }
    }).catch(setSysFailure)
  }

  useEffect(() => {
    if (postData !== undefined) {
      setPost(postData.post as Post)
    }
  }, [postData])

  useEffect(() => {
    document.querySelector('.scroll-animations .animated')?.classList.remove("animate__fadeInLeft");
  }, [])

  useEffect(() => {
    refetch && refetch()
  }, [location, refetch])

  useEffect(() => {
    // Check if element is scrolled into footer
    const isScrolledIntoFooter = () => {
      var docViewTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var docViewBottom = docViewTop + window.innerHeight

      let el: any = document.querySelector("div#reaction-bar");

      if (!el)
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

    window.addEventListener("scroll", () => {
      handleScroll();
    })

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  })

  const isReacted = useCallback((type: string): boolean => {
    if (!tokenPair?.token || !post)
      return false
    return post.reactions.filter((r: any) =>
      r.username === getTokenValue(tokenPair?.token).username &&
      r.type === type.toUpperCase()
    ).length > 0
  }, [post, tokenPair])

  const reactionCount = useCallback((type: string): number => {
    if (post != null) {
      return post.reactions.filter((r: any) =>
        r.type === type.toUpperCase()
      ).length
    }
    return 0
  }, [post])

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className="section">
        {loading && <Container style={{ marginTop: -20, marginBottom: 60 }}>
          <div className="text-center">
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </Container>}
        {(!loading && post != null) && <>
          <Container>
            <Row className="d-block d-md-none text-left" style={{ alignItems: 'baseline' }}>
              <Col><h2><strong>{post.title}</strong></h2></Col>
            </Row>
            <Row className="d-none d-md-block text-center" style={{ alignItems: 'baseline' }}>
              <Col><h2><strong>{post.title}</strong></h2></Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col className="text-left sharing my-3 d-flex" lg="8" md="12" >
                <div className="profile-page mr-3">
                  <div className="photo-container" style={{ width: 50, height: 50 }}>
                    {postData?.post?.user.profilePicURI && <img alt="..." src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + postData?.post.user.profilePicURI}></img>}
                    {!postData?.post?.user.profilePicURI && <img alt="..." src={defaultAvatar}></img>}
                  </div>
                </div>
                <div className="my-auto" style={{ color: 'gray' }}>
                  <div><b>{post.user.nameC}{getTitleDisplay(post)}</b></div>
                  <div><i>{<FormattedDate
                    value={moment(post.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').toDate()}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />}</i></div>
                </div>
              </Col>
            </Row>
          </Container>
          {post.imageURI != null && <>
            <div className="justify-content-center d-none d-lg-flex mb-5" style={{ marginLeft: 200, marginRight: 200 }}>
              <img alt="blog cover" src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${post.imageURI}`}></img>
            </div>
            <div className="justify-content-center d-none d-md-flex d-lg-none mb-5" style={{ marginLeft: '7rem', marginRight: '7rem' }}>
              <img alt="blog cover" src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${post.imageURI}`}></img>
            </div>
            <div className="d-md-none mb-5">
              <img alt="blog cover" src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${post.imageURI}`}></img>
            </div>
          </>}
          <Container style={{ marginBottom: 100 }}>
            <Row className="text-left d-none d-lg-block scroll-animations" style={{ position: "sticky", top: '40vh' }}>
              <div style={{ position: "absolute", marginTop: 80 }} className="animated animate__animated animate__fast">
                <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'hallelujah', getTokenValue(tokenPair?.token)?.username, post.reactions, intl.locale)}>
                  <div className="my-3" onClick={() => setReaction(ReactionType.Hallelujah)}>
                    <div style={{ display: 'inline', cursor: 'pointer' }}>
                      <i className={`fas fa-hanukiah reaction ${isReacted('hallelujah') ? "reacted" : ""}`}></i>
                    </div>
                    <span style={{ fontSize: 24 }} className="m-1">{reactionCount('hallelujah')}</span>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'pray', getTokenValue(tokenPair?.token)?.username, post.reactions, intl.locale)}>
                  <div className="my-3" onClick={() => setReaction(ReactionType.Pray)}>
                    <div style={{ display: 'inline', cursor: 'pointer' }}>
                      <i className={`fas fa-praying-hands reaction ${isReacted('pray') ? "reacted" : ""}`}></i>
                    </div>
                    <span style={{ fontSize: 24 }} className="m-1">{reactionCount('pray')}</span>
                  </div>
                </OverlayTrigger>
              </div>
            </Row>
            <Row className="justify-content-md-center">
              <Col className="text-left sharing" lg="8" md="12" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }) }}>
              </Col>
            </Row>
            <Row className="text-left mt-5" id="reaction-bar">
              <Col className="form-inline" lg={{ offset: 2 }}>
                <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'hallelujah', getTokenValue(tokenPair?.token)?.username, post.reactions, intl.locale)}>
                  <div className="m-3" onClick={() => setReaction(ReactionType.Hallelujah)}>
                    <div style={{ display: 'inline', cursor: 'pointer' }}>
                      <i className={`fas fa-hanukiah reaction ${isReacted('hallelujah') ? "reacted" : ""}`}></i>
                    </div>
                    <span style={{ fontSize: 24 }} className="m-1">{reactionCount('hallelujah')}</span>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'pray', getTokenValue(tokenPair?.token)?.username, post.reactions, intl.locale)}>
                  <div className="m-3" onClick={() => setReaction(ReactionType.Pray)}>
                    <div style={{ display: 'inline', cursor: 'pointer' }}>
                      <i className={`fas fa-praying-hands reaction ${isReacted('pray') ? "reacted" : ""}`}></i>
                    </div>
                    <span style={{ fontSize: 24 }} className="m-1">{reactionCount('pray')}</span>
                  </div>
                </OverlayTrigger>
              </Col>
            </Row>
            <CommentSection id={id} type="SHARING" />
          </Container></>}
      </div>
    </>
  );
}

export default Sharing;
