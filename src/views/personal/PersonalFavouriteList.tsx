import { FavouritePost, FavouritePostsDocument, useFavouritePostsQuery, useRemoveFavouritePostMutation } from 'generated/graphql';
import moment from 'moment';
import { useCallback, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FormattedDate } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { RootStore } from 'store';
import { css } from 'styles/styles';
import UNIVERSALS from 'Universals';
import { getTitleDisplay } from 'utils/utils';


const trimSubtitle = (txt: string) => {
  if (txt.length <= 50) {
    return txt
  } else {
    return txt.substring(0, 50) + '...'
  }
}

function PersonalFavouriteList() {

  const location = useLocation()
  const history = useHistory()

  const { setSysFailure } = RootStore.useModalStore()

  const { loading, data: favPostData, refetch } = useFavouritePostsQuery({ notifyOnNetworkStatusChange: true })

  const [removeFavPost, { loading: removeFavLoading }] = useRemoveFavouritePostMutation({
    refetchQueries: [
      { query: FavouritePostsDocument }
    ]
  })

  const handleRemoveFavPost = useCallback((id: string) => {
    if (loading || removeFavLoading)
      return
    removeFavPost({
      variables: {
        input: {
          postID: id
        },
      }
    }).catch(setSysFailure)
  }, [removeFavPost, loading, removeFavLoading])

  useEffect(() => {
    favPostData && refetch();
  }, [location, refetch, favPostData])

  const navigate = (id: string) => {
    history.push('/sharing/' + id)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <Container className="mt-5">
    <Row className="text-left">
      <h3>喜愛列表</h3>
    </Row>
    {(loading || !favPostData) && <div className="mt-5 text-center w-100">
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>}
    {(!loading && favPostData?.favouritePosts.length === 0) && <div style={{ fontSize: 22 }} className="text-center"><i>---暫無文章---</i></div>}
    <Col md={12} lg={8}>
      {(!loading && favPostData != null && favPostData?.favouritePosts?.length > 0) && favPostData?.favouritePosts.map((e, i) => {
        let p = e as FavouritePost
        return <div key={p._id} className="my-3">
          <hr></hr>
          <div className={css.blog}>
            <div className={css.blogText}>
              <div className={css.blogOP} onClick={() => { navigate(p.post?._id) }}>
                {p.post?.user.nameC}{getTitleDisplay(p.post?.user)}{" "}{<label style={{ color: 'gray' }} className="ml-1"><FormattedDate
                  value={moment(p.post?.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').toDate()}
                  year="numeric"
                  month="short"
                  day="numeric"
                /></label>}
              </div>
              <div style={{ fontSize: 18 }} className={css.blogHeader} onClick={() => { navigate(p.post?._id) }}>
                <b>{p.post?.title}</b>
              </div>
              <label style={{ fontSize: 14, marginTop: 0 }} className={css.blogQuote} onClick={() => { navigate(p.post?._id) }}>
                {p.post?.subtitle && trimSubtitle(p.post?.subtitle)}
              </label>
              <div>
                <Button
                  onClick={() => handleRemoveFavPost(p.post?._id)}
                  style={{ height: 20, paddingTop: 0, paddingBottom: 0, background: 'lightgray' }}
                >
                  <i
                    className="fas fa-times-circle pt-1"
                    style={{ cursor: 'pointer', fontSize: 12 }}
                  ></i>
                  移除
                </Button>
              </div>
            </div>
            <div className={css.blogImg} onClick={() => { navigate(p.post?._id) }}>
              {p.post?.imageURI != null && <img style={{ height: 100, width: 100 }} src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${p.post?.imageURI}`}></img>}
            </div>
            <div className={css.blogImgMobile} onClick={() => { navigate(p.post?._id) }}>
              {p.post?.imageURI != null && <img src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${p.post?.imageURI}`}></img>}
            </div>
          </div>
        </div>
      })}
    </Col>
  </Container>
}
export default PersonalFavouriteList