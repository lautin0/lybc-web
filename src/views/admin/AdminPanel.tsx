import React, { useEffect, useState } from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap';
import { RootState } from 'reducers';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { getTokenValue } from 'utils/utils';
import WorshipCreate from './WorshipCreate';
import WorshipManage from './WorshipManage';
import AdminHeader from './AdminHeader'
import MemberManage from './MemberManage';
import OtherFunc from './OtherFunc';
import PageManage from './PageManage';
import WorshipEdit from './WorshipEdit';
import logo from "assets/img/lybc_logo.png";
import IndexNavbar from 'components/Navbars/IndexNavbar';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import BooksCreate from './BooksCreate';
import BooksManage from './BooksManage';
import PostCreate from './PostCreate';
import NameCardManage from './NameCardManage';
import PendingPostManage from './PendingPostManage';
import PendingPostEdit from './PendingPostEdit';

// const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

type AdminPanelProps = {
  func: string
}

function AdminPanel(props: AdminPanelProps) {

  const history = useHistory()

  const location = useLocation()

  useEffect(() => {
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("sidebar-collapse");
    };
  });

  useEffect(() => {
    document.title = "管理控制台"
  }, [])

  return (
    <>
      <AdminNavbar />
      <main>
        <nav className="navbar fixed-top navbar-light flex-column left-panel d-none d-lg-flex">
          <ul className="navbar-nav mt-3">
            <li className="nav-item">
              <a
                className="nav-link"
                style={location.pathname.includes('worship') ? { backgroundColor: 'lightgray' } : {}}
                onClick={(e: any) => {
                  e.preventDefault()
                  history.push('/admin/worships')
                }}
                href="#"
              ><i className="fa fa-th-list mr-2"></i>崇拜管理</a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={location.pathname.includes('page-management') ? { backgroundColor: 'lightgray' } : {}}
                onClick={(e: any) => {
                  e.preventDefault()
                  history.push('/admin/page-management')
                }}
                href="#"
              ><i className="fa fa-file mr-2"></i>頁面管理</a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={location.pathname.includes('member') ? { backgroundColor: 'lightgray' } : {}}
                onClick={(e: any) => {
                  e.preventDefault()
                  history.push('/admin/members')
                }}
                href="#"
              ><i className="fa fa-user mr-2"></i>會員管理</a>
            </li>
            {/* <li className="nav-item">
              <a
                className="nav-link"
                style={location.pathname.includes('books') ? { backgroundColor: 'lightgray' } : {}}
                onClick={(e: any) => {
                  e.preventDefault()
                  history.push('/admin/books')
                }}
                href="#"
              ><i className="fa fa-book mr-2"></i>圖書管理</a>
            </li> */}
            <li className="nav-item">
              <a
                className="nav-link"
                style={location.pathname.includes('other') ? { backgroundColor: 'lightgray' } : {}}
                onClick={(e: any) => {
                  e.preventDefault()
                  history.push('/admin/other')
                }}
                href="#"
              ><i className="fa fa-cog mr-2"></i>其他功能</a>
            </li>
          </ul>
        </nav>
        <div className="right-panel">
          <div style={{ margin: '0px 48px 24px' }}>
            {(props.func == null
              || props.func === 'worships'
              || props.func === 'other'
              || props.func === 'members'
              || props.func === 'page-management'
              || props.func === 'books')
              && <AdminHeader func={props.func} />}
            {props.func == null && <div style={{ marginLeft: 25, marginTop: 120 }}>
              <h2 style={{ color: 'gray' }}><em>選擇想使用的功能 <span role="img" aria-label="cog image">⚙️</span></em></h2>
            </div>}
            <div className="content-panel">
              {props.func === 'new-worship' && <WorshipCreate />}
              {props.func === 'edit-worship' && <WorshipEdit />}
              {props.func === 'worships' && <WorshipManage />}
              {props.func === 'members' && <MemberManage />}
              {props.func === 'other' && <OtherFunc />}
              {props.func === 'page-management' && <PageManage />}
              {props.func === 'new-post' && <PostCreate />}
              {props.func === 'namecards' && <NameCardManage />}
              {props.func === 'pending-posts' && <PendingPostManage />}
              {props.func === 'new-proxy-posts' && <PendingPostEdit />}              
              {/* {props.func === 'new-book' && <BooksCreate />}
              {props.func === 'books' && <BooksManage />} */}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

AdminPanel.propTypes = {
  func: PropTypes.string
};

export default AdminPanel;