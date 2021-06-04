import CommentSection from "components/Comments/CommentSection";
import AuthContext from "context/AuthContext";
import { ReactionType, usePostQuery, useReactMutation } from "generated/graphql";
import moment from "moment";
import { useContext, useEffect, useState } from "react";

// react-bootstrap components
import { Container, Row, Col, OverlayTrigger } from "react-bootstrap";
import { FormattedDate, useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { useLegacyModalStore } from "store";
import { getTokenValue, renderTooltip } from "utils/utils";
// core components

function PreacherMessage() {

  const intl = useIntl()

  const { tokenPair } = useContext(AuthContext)

  const location = useLocation()

  const { setSysMessage, setSystemFailure } = useLegacyModalStore()

  const [post, setPost] = useState<any>()

  const [react, { data: resultPost }] = useReactMutation()
  const { loading, data, refetch } = usePostQuery({ variables: { oid: "5f850dc4e52fde7c2930c34b" }, notifyOnNetworkStatusChange: true })

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
          postOID: data?.post?._id,
          type: reaction
        },
      }
    }).catch(e => {
      setSystemFailure(e)
    })
  }


  useEffect(() => {
    if (data !== undefined) {
      setPost(data.post)
    } else if (resultPost !== undefined) {
      setPost(resultPost)
    }
  }, [data, resultPost])

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

    window.addEventListener("scroll", (e: any) => {
      handleScroll();
    })

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  })

  const isReacted = (type: string): boolean => {
    if (!tokenPair?.token)
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
        {loading && <Container style={{ marginTop: -20, marginBottom: 60 }}>
          <div className="text-center">
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </Container>}
        {(!loading && post != null) && <Container>
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
          <Row className="text-left" style={{ alignItems: 'baseline' }}>
            <Col lg={{ span: 4, offset: 4 }}><h3><strong>{post.title}</strong></h3></Col>
            <Col lg={4}><h5 style={{ color: 'gray' }}>{<FormattedDate
              value={moment(post.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').toDate()}
              year="numeric"
              month="short"
              day="numeric"
            />}</h5></Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="text-left" lg="8" md="12" dangerouslySetInnerHTML={{ __html: post.content }}>
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
          <CommentSection id="5f850dc4e52fde7c2930c34b" type="PREACHER" />
        </Container>}
      </div>
    </>
  );
}

export default PreacherMessage;
