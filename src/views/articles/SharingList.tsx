import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { css } from "styles/styles";
import { ADD_FAV_POST, GET_FAVOURITE_POST, GET_POSTS, REMOVE_FAV_POST } from "graphqls/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { FavouritePost, Post, PostType, Role, UpdateFavouritePost } from "generated/graphql";
import moment from 'moment'
import UNIVERSALS from "Universals";
import { useDispatch, useSelector } from "react-redux";
import { setSysMessage, setSystemFailure } from "actions";
import { RootState } from "reducers";
import { FormattedDate, useIntl } from "react-intl";
import { useStore } from "store";
import FavouritePostList from "components/FavouritePosts/FavouritePostList";
import { getTokenValue } from "utils/utils";

// core components

function SharingList() {

  const setOpen = useStore(state => state.setOpen)
  const setTitle = useStore(state => state.setTitle)

  const intl = useIntl()

  const dispatch = useDispatch()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const location = useLocation()

  const history = useHistory();

  const [data, setData] = useState<Post[]>()

  const { loading, data: postData, refetch } = useQuery<{ posts: Post[] }>(GET_POSTS, { notifyOnNetworkStatusChange: true })
  const [addFavPost] = useMutation<
    { favPost: FavouritePost },
    { input: UpdateFavouritePost }
  >(ADD_FAV_POST, {
    refetchQueries: [
      { query: GET_POSTS },
      { query: GET_FAVOURITE_POST }
    ]
  });
  const [removeFavPost] = useMutation<
    { favPost: FavouritePost },
    { input: UpdateFavouritePost }
  >(REMOVE_FAV_POST, {
    refetchQueries: [
      { query: GET_POSTS },
      { query: GET_FAVOURITE_POST }
    ]
  });

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
    if (postData !== undefined) {
      let tmp: Post[] = [...postData.posts]
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
    }
  }, [postData])

  const handleFavPost = (isFavourited: boolean, id: string) => {
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
  }

  const trimSubtitle = (txt: string) => {
    if (txt.length <= 50) {
      return txt
    } else {
      return txt.substring(0, 50) + '...'
    }
  }

  const handleClick = () => {
    if (tokenPair?.token == null) {
      dispatch(setSysMessage('app.sys.require-login'))
      return
    }

    setOpen(true)
    setTitle("app.modal.header.new-sharing-record")
  }

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
          {(tokenPair?.token == null && (loading || !postData || !data)) && <Row className="mt-5 text-center">
            <div className="w-100">
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </Row>}
          <Row className="my-1">
            {(tokenPair?.token != null && (loading || !postData || !data)) && <Col className="mt-5 text-center" md={12} lg={8}>
              <div className="w-100">
                <div className="spinner-grow text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </Col>}
            {(!loading && data) && <Col md={12} lg={8}>
              {data.map((p: Post) => {
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
            <Col className="d-none d-md-block" lg={4}>
              {tokenPair?.token != null && <FavouritePostList />}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SharingList;
