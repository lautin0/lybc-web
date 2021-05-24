import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

// react-bootstrap components
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { css } from "styles/styles";
import { gql } from "@apollo/client";
import { FavouritePostsDocument, Post, PostFilter, PostsConnection, PostsDocument, PostType, useAddFavouritePostMutation, usePostsQuery, useRemoveFavouritePostMutation } from "generated/graphql";
import moment from 'moment'
import UNIVERSALS from "Universals";
import { useDispatch } from "react-redux";
import { setSysMessage, setSystemFailure } from "actions";
import { FormattedDate, useIntl } from "react-intl";
import { useStore } from "store";
import FavouritePostList from "components/FavouritePosts/FavouritePostList";
import { getClient } from "utils/auth.client";
import { getTitleDisplay } from "utils/utils";
import AuthContext from "context/AuthContext";

// core components

const trimSubtitle = (txt: string) => {
  if (txt.length <= 50) {
    return txt
  } else {
    return txt.substring(0, 50) + '...'
  }
}

function SharingList() {
  const lastScrollTop = useRef(0);

  const setOpen = useStore(state => state.setOpen)
  const setTitle = useStore(state => state.setTitle)

  const intl = useIntl()

  const dispatch = useDispatch()

  const { tokenPair } = useContext(AuthContext)

  const location = useLocation()

  const history = useHistory();

  const [ posts, setPosts ] = useState<Array<Post>>([])

  const cacheData = useMemo(() => {
    if (posts != null)
      return getClient().readQuery<{ posts: PostsConnection }>({ query: PostsDocument })
    return null
  }, [posts])

  const postFilter: PostFilter = useMemo(() => ({
    AND: [{ parentIDNotNull: false }],
    type: PostType.Sharing
  }),[])
  const { loading, data: postData, refetch, fetchMore, called } = usePostsQuery({
    variables: { first: 4, postFilter: postFilter }, notifyOnNetworkStatusChange: true
  })

  const postDataRef = useRef(postData);

  const [addFavPost, { loading: addFavLoading }] = useAddFavouritePostMutation({
    refetchQueries: [
      { query: FavouritePostsDocument }
    ],
    update: (cache, res) => {
      cache.writeFragment({
        id: `Post:${res.data?.addFavouritePost}`,
        fragment: gql`
            fragment currPost on Post {
              isFavourited
            }
          `,
        data: {
          isFavourited: true
        }
      })
    }
  })

  const [removeFavPost, { loading: removeFavLoading }] = useRemoveFavouritePostMutation({
    refetchQueries: [
      { query: FavouritePostsDocument }
    ],
    update: (cache, res) => {
      cache.writeFragment({
        id: `Post:${res.data?.removeFavouritePost}`,
        fragment: gql`
            fragment currPost on Post {
              isFavourited
            }
          `,
        data: {
          isFavourited: false
        }
      })
    }
  })

  const navigate = (id: string) => {
    history.push('/sharing/' + id)
  }

  useEffect(() => {
    if (postData !== undefined) {
      setPosts([...postData.posts.edges?.map(x => x.node!)!] as Array<Post>)
      postDataRef.current = postData
    }
  }, [postData])

  const handleFavPost = useCallback((isFavourited: boolean, id: string) => {
    if (loading || addFavLoading || removeFavLoading)
      return
    if (isFavourited) {
      removeFavPost({
        variables: {
          input: {
            postID: id
          },
        }
      }).catch(e => {
        dispatch(setSystemFailure(e))
      })
    } else {
      addFavPost({
        variables: {
          input: {
            postID: id
          },
        }
      }).catch(e => {
        dispatch(setSystemFailure(e))
      })
    }
  }, [removeFavPost, addFavPost, dispatch, loading, addFavLoading, removeFavLoading])

  const handleClick = useCallback(() => {
    if (!tokenPair?.token) {
      dispatch(setSysMessage('app.sys.require-login'))
      return
    }

    setOpen(true)
    setTitle("app.modal.header.new-sharing-record")
  }, [tokenPair, dispatch, setOpen, setTitle])

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    postData && refetch({
      first: cacheData?.posts.edges?.length
    });
  }, [location, refetch, postData, cacheData])

  const handleScroll = useCallback((e: Event) => {
    if (!fetchMore)
      return
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st <= lastScrollTop.current) {
      lastScrollTop.current = st <= 0 ? 0 : st;
      return
    }
    lastScrollTop.current = st <= 0 ? 0 : st;

    let lastEl: any = document.querySelector("div.sharing-list > div:last-child");
    let footerEl: any = document.querySelector("footer.footer");
    if (!lastEl) {
      return
    }
    let lastElOffset = lastEl.offsetTop + lastEl.clientHeight;
    let pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset - footerEl.clientHeight > lastElOffset && postDataRef.current?.posts.pageInfo.hasNextPage) {
      (postData != null && called) && fetchMore({
        variables: {
          after: postDataRef.current.posts.pageInfo.endCursor
        }
      })
    }
  }, [postData, fetchMore, postDataRef, called])

  useEffect(() => {
    if (postData === undefined)
      return
    window.addEventListener("scroll", handleScroll)

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, postData, called])

  return (
    <>
      <div
        className="section"
      >
        <Container>
          <div className="button-container">
            <Button className="btn-round" color="info" size="lg" onClick={handleClick}>
              {intl.formatMessage({ id: "app.buttons.sharing" })}
            </Button>
          </div>
          {/* <h5 className="description">
            {intl.formatMessage({ id: "app.sharing.subtitle" })}
          </h5>
          <hr></hr> */}
          <Row className="mt-5">
            {!posts && <Col md={12} lg={8} className="clearfix"></Col>}
            {posts && <Col className="sharing-list" md={12} lg={8}>
              {posts.map((p: Post) => {
                return <div key={p._id} className="my-5">
                  <div className={css.blog}>
                    <div className={css.blogText}>
                      <div className={css.blogOP} onClick={() => { navigate(p._id) }}>
                        {p.user.nameC}{getTitleDisplay(p)}
                      </div>
                      <div className={css.blogHeader} onClick={() => { navigate(p._id) }}>
                        <b>{p.title}</b>
                      </div>
                      <label className={css.blogQuote} onClick={() => { navigate(p._id) }}>
                        {p.subtitle && trimSubtitle(p.subtitle)}
                      </label>
                      <div className="d-flex justify-content-between">
                        <p className={css.blogFooter}>
                          {<FormattedDate
                            value={moment(p.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').toDate()}
                            year="numeric"
                            month="short"
                            day="numeric"
                          />}
                        </p>
                        {tokenPair?.token != null && <i
                          onClick={() => handleFavPost(p.isFavourited, p._id)}
                          className={`${p.isFavourited ? "fas" : "far"} fa-bookmark pt-1`}
                          style={{ cursor: 'pointer' }}
                        ></i>}
                      </div>
                    </div>
                    <div className={css.blogImg} onClick={() => { navigate(p._id) }}>
                      {p.imageURI != null && <img alt="blog preview" src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${p.imageURI}`}></img>}
                    </div>
                    <div className={css.blogImgMobile} onClick={() => { navigate(p._id) }}>
                      {p.imageURI != null && <img alt="blog preview" src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${p.imageURI}`}></img>}
                    </div>
                  </div>
                </div>
              })}
            </Col>}
            <Col className="d-none d-lg-block" lg={4}>
              {tokenPair?.token != null && <FavouritePostList />}
            </Col>
          </Row>
          <Container className="text-center" style={{ height: 100 }}>
            {loading && <label>
              <Spinner animation="grow" />
            </label>}
          </Container>
        </Container>
      </div>
    </>
  );
}

export default SharingList;
