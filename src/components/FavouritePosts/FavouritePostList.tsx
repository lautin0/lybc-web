import { FavouritePost, useFavouritePostsQuery } from 'generated/graphql';
import moment from 'moment';
import { useEffect } from 'react'
import { FormattedDate } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import UNIVERSALS from 'Universals'
import defaultAvatar from "assets/img/default-avatar.png";
import { getTitleDisplay } from 'utils/utils';

function FavouritePostList() {

  const location = useLocation()
  const history = useHistory()

  const { loading, data: favPostData, refetch } = useFavouritePostsQuery({ notifyOnNetworkStatusChange: true })

  useEffect(() => {
    favPostData && refetch();
  }, [location, refetch, favPostData])

  return <div className="p-3" style={{ position: 'sticky', top: '20vh', fontSize: 20, background: 'rgba(240,240,240,.7)', minHeight: '20vmin' }}>
    <div><i className="far fa-bookmark text-center ml-3 mb-1"></i><label className="ml-3" style={{ color: 'gray' }}>喜愛列表</label></div>
    {(!loading && favPostData?.favouritePosts.length === 0) && <div className="text-center"><i>---暫無文章---</i></div>}
    {(favPostData != null && favPostData?.favouritePosts?.length > 0) && favPostData?.favouritePosts.slice(0, 3).map((f, i) => {
      let x = f as FavouritePost
      return <div key={x._id} className="my-2 d-flex justify-content-between">
        <div>
          <div
            className="my-2"
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div className="profile-page mr-2">
              <div className="photo-container my-auto ml-3 mx-auto" style={{ width: 25, height: 25 }}>
                {(x.post?.user.profilePicURI == null) && <img style={{ marginTop: -8 }} alt="..." src={defaultAvatar}></img>}
                {(x.post?.user.profilePicURI != null) && <img style={{ marginTop: -8 }} alt="..." src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + x.post?.user.profilePicURI}></img>}
              </div>
            </div>
            <div style={{ fontSize: 13 }}>{x.post?.user.nameC + getTitleDisplay(x.post!)}</div>
          </div>
          <div
            onClick={e => { history.push('sharing/' + x.post?._id) }}
            className="mb-2"
            style={{ fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }}
          >{x.post?.title}</div>
          <div style={{ fontSize: 13 }}>{<FormattedDate
            value={moment(x.post?.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').toDate()}
            year="numeric"
            month="short"
            day="numeric"
          />}</div>
        </div>
      </div>
    })}
    {(favPostData != null && favPostData?.favouritePosts?.length > 0) && <div className="text-center">
      <a
        href="#"
        onClick={e => { 
          e.preventDefault(); 
          history.push('personal/favourite-posts') 
        }}
        style={{ fontSize: 13, cursor: 'pointer' }}
        className="w-100 text-primary"
      >查看全部喜愛文章</a>
    </div>}
    {(loading || !favPostData) && <div className="mt-5 text-center w-100">
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>}
  </div>
}

export default FavouritePostList;