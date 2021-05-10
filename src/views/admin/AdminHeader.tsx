import React from 'react'
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'

type AdminHeaderProps = {
  func: string
}

function AdminHeader(props: AdminHeaderProps) {

  const history = useHistory()

  const handleClick = (e: string) => {
    history.push('/admin/' + e)
  }

  const colorFromFunc = () => {
    switch (props.func) {
      case 'worships':
      case 'books':
        return 'blue';
      case 'users':
        return 'teal';
      case 'page-management':
        return 'purple';
      case 'other':
        return 'orange';
      default:
        return 'teal';
    }
  }

  function quickItemGenerater(text: string, faClass: string, func?: string) {
    return <div
      className="m-3 text-center quick-item"
      style={{ width: 200, height: 150 }}
      onClick={() => { func && handleClick(func) }}
    >
      <div className="quick-item-overlay">
        <div className="quick-item-overlay-text">
          <div><i style={{ fontSize: 48 }} className={faClass}></i></div>
          <div>{text}</div>
        </div>
      </div>
    </div>
  }

  return (
    <header className={`banner-${colorFromFunc()}`}>
      <p className="category" style={{ color: 'white' }}>Welcome to admin panel!</p>
      <div className="form-inline row mb-3" style={{ marginTop: 40 }}>
        {(props.func == null || props.func === '') && <>
          {quickItemGenerater('新增崇拜', 'far fa-plus-square', 'worship/new')}
          {quickItemGenerater('管理崇拜', 'fa fa-th-list', 'worships')}
          {quickItemGenerater('新增文章', 'fas fa-file-alt', 'post/new')}
          {quickItemGenerater('新來賓名片', 'fas fa-id-card', 'namecards')}
          {/* {quickItemGenerater('圖書管理', 'fa fa-book', 'books')} */}
        </>}
        {props.func === 'worships' && <>
          {quickItemGenerater('新增崇拜', 'far fa-plus-square', 'worship/new')}
          {/* {quickItemGenerater('管理崇拜', 'fa fa-th-list', 'worships')} */}
        </>}
        {props.func === 'users' && <>
          {quickItemGenerater('會員管理', 'fa fa-user', 'users')}
          {quickItemGenerater('新來賓名片', 'fas fa-id-card', 'namecards')}
        </>}
        {props.func === 'page-management' && <>
          {quickItemGenerater('新增文章', 'fas fa-file-alt', 'post/new')}
          {quickItemGenerater('新增消息', 'fas fa-plus-circle', 'latests/new')}
          {quickItemGenerater('審閱文章', 'fas fa-glasses', 'post/pending')}
          {quickItemGenerater('頁面設定', 'fa fa-cog')}
        </>}
        {/* {props.func === 'books' && <>
          {quickItemGenerater('新增圖書', 'far fa-plus-square', 'new-book')}
        </>} */}
        {props.func === 'other' && <>
          {quickItemGenerater('系統設定', 'fa fa-wrench')}
        </>}
      </div>
    </header>
  )
}

AdminHeader.propTypes = {
  func: PropTypes.string
}

export default AdminHeader;