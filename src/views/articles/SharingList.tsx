import React, { useCallback, useEffect, useMemo } from "react";

// react-bootstrap components
import { Container, Row, Col, Button, Pagination } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { css } from "styles/styles";
import { ADD_FAV_POST, GET_FAVOURITE_POST, GET_POSTS, REMOVE_FAV_POST } from "graphqls/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Post, PostsConnection, PostType, UpdateFavouritePost } from "generated/graphql";
import moment from 'moment'
import UNIVERSALS from "Universals";
import { useDispatch, useSelector } from "react-redux";
import { setSysMessage, setSystemFailure } from "actions";
import { RootState } from "reducers";
import { FormattedDate, useIntl } from "react-intl";
import { useStore } from "store";
import FavouritePostList from "components/FavouritePosts/FavouritePostList";
import { getClient } from "utils/auth.client";
import { getTitleDisplay } from "utils/utils";
import usePagination from "hooks/usePagination";

// core components

const trimSubtitle = (txt: string) => {
  if (txt.length <= 50) {
    return txt
  } else {
    return txt.substring(0, 50) + '...'
  }
}

function SharingList() {

  const setOpen = useStore(state => state.setOpen)
  const setTitle = useStore(state => state.setTitle)

  const intl = useIntl()

  const dispatch = useDispatch()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const location = useLocation()

  const history = useHistory();

  const { pageItems, setData, items } = usePagination<Post>()

  const cacheData = useMemo(() => {
    if (pageItems != null)
      return getClient().readQuery<{ posts: PostsConnection }>({ query: GET_POSTS })
    return null
  }, [pageItems])

  const { loading, data: postData, refetch, fetchMore } = useQuery<
    { posts: PostsConnection },
    { first?: number, last?: number, after?: string, before?: string }
  >(GET_POSTS, { variables: { first: 2 }, notifyOnNetworkStatusChange: true })
  const [addFavPost, { loading: addFavLoading }] = useMutation<
    { addFavouritePost: string },
    { input: UpdateFavouritePost }
  >(ADD_FAV_POST, {
    refetchQueries: [
      { query: GET_FAVOURITE_POST }
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
  });
  const [removeFavPost, { loading: removeFavLoading }] = useMutation<
    { removeFavouritePost: string },
    { input: UpdateFavouritePost }
  >(REMOVE_FAV_POST, {
    refetchQueries: [
      { query: GET_FAVOURITE_POST }
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
  });

  const navigate = (id: string) => {
    history.push('/sharing/' + id)
  }

  useEffect(() => {
    if (postData !== undefined) {
      setData([...postData.posts.edges?.map(x => x.node!)!])
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
    if (tokenPair?.token == null) {
      dispatch(setSysMessage('app.sys.require-login'))
      return
    }

    setOpen(true)
    setTitle("app.modal.header.new-sharing-record")
  }, [tokenPair])

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    postData && refetch();
  }, [location, refetch, postData])

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
          <h5 className="description">
            {intl.formatMessage({ id: "app.sharing.subtitle" })}
          </h5>
          <hr></hr>
          {(tokenPair?.token == null && (!cacheData)) && <Row className="mt-5 text-center">
            <div className="w-100">
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </Row>}
          <Row className="my-1">
            {(tokenPair?.token != null && (!cacheData)) && <Col className="mt-5 text-center" md={12} lg={8}>
              <div className="w-100">
                <div className="spinner-grow text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </Col>}
            {pageItems && <Col md={12} lg={8}>
              {pageItems.map((p: Post) => {
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
                      {p.imageURI != null && <img src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${p.imageURI}`}></img>}
                    </div>
                    <div className={css.blogImgMobile} onClick={() => { navigate(p._id) }}>
                      {p.imageURI != null && <img src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${p.imageURI}`}></img>}
                    </div>
                  </div>
                </div>
              })}
            </Col>}
            <Col className="d-none d-lg-block" lg={4}>
              {tokenPair?.token != null && <FavouritePostList />}
            </Col>
          </Row>
          {/* <Row>
            <Pagination className="pagination-warning">
              {items}
            </Pagination>
          </Row> */}
          <Row>
            <Button variant="primary" onClick={() => {
              postData?.posts.pageInfo.hasNextPage && fetchMore({
                variables: {
                  after: postData?.posts.pageInfo.endCursor
                }
              })
            }
            }>More</Button>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SharingList;
