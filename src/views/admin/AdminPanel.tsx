import React from 'react'
import { Button } from 'react-bootstrap';
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

// const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

type AdminPanelProps = {
  func: string
}

function AdminPanel(props: AdminPanelProps) {

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const history = useHistory()

  const location = useLocation()

  const { id } = useParams<any>()

  return (
    <>
      <div>
        <nav className="navbar fixed-top navbar-light justify-content-between top-bar" style={{ borderBottom: '.01rem lightgray solid', zIndex: 1040 }}>
          <a className="navbar-brand" style={{ color: 'gray', fontWeight: 'bold', fontSize: 24 }}>管理控制台</a>
          <div className="form-inline">
            {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
            {/* <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button> */}
            <Link
              to="/index"
              className="mx-3"
              style={{ color: 'orange' }}
            >
              回主頁
            </Link>
            <Button
              className="nav-link"
              // color="success"
              href="#pablo"
              id="profile"
              as={Link}
              to="/profile-page"
            // onClick={() => setCollapseOpen(!collapseOpen)}
            >
              <i className="fas fa-user" style={{ fontSize: 14 }}></i>
              <p>{getTokenValue(tokenPair?.token)?.username}</p>
            </Button>
          </div>
        </nav>
        <main>
          <nav className="navbar fixed-top navbar-light d-flex flex-column left-panel">
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
                || props.func === 'page-management')
                && <AdminHeader func={props.func} />}
              {props.func == null && <div style={{ marginLeft: 25, marginTop: 120 }}>
                <h2 style={{ color: 'gray' }}><em>選擇想使用的功能 ⚙️</em></h2>
              </div>}
              <div className="content-panel">
                {props.func === 'new-worship' && <WorshipCreate />}
                {props.func === 'edit-worship' && <WorshipEdit worshipId={id} />}
                {props.func === 'worships' && <WorshipManage />}
                {props.func === 'members' && <MemberManage />}
                {props.func === 'other' && <OtherFunc />}
                {props.func === 'page-management' && <PageManage />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

AdminPanel.propTypes = {
  func: PropTypes.string
};

export default AdminPanel;