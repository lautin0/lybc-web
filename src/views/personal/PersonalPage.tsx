import React, { useEffect, useState } from 'react'
import { RootState } from 'reducers';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PersonalNavbar from 'components/Navbars/PersonalNavbar';
import PersonalEdit from './PersonalEdit';
import { useIntl } from 'react-intl';
import useLanguage from 'hooks/useLanguage';

type PersonalPageProps = {
  func: string
}

function PersonalPage(props: PersonalPageProps) {

  const [locale] = useLanguage()
  
  const intl = useIntl()

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
    document.title = intl.formatMessage({ id: "app.personal" })
  }, [locale])

  return (
    <>
      <PersonalNavbar />
      <main>
        <nav className="navbar fixed-top navbar-light flex-column left-panel d-none d-lg-flex">
          <ul className="navbar-nav mt-3">
            <li className="nav-item">
              <a
                className="nav-link"
                style={location.pathname.includes('info') ? { backgroundColor: 'lightgray' } : {}}
                onClick={(e: any) => {
                  e.preventDefault()
                  history.push('/personal/info')
                }}
                href="#"
              ><i className="fa fa-user mr-2"></i>帳戶管理</a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={location.pathname.includes('sharing') ? { backgroundColor: 'lightgray' } : {}}
                onClick={(e: any) => {
                  e.preventDefault()
                  history.push('/personal/sharing')
                }}
                href="#"
              ><i className="fas fa-file-alt mr-2"></i>檢視文章狀態</a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={location.pathname.includes('other') ? { backgroundColor: 'lightgray' } : {}}
                onClick={(e: any) => {
                  e.preventDefault()
                  history.push('/personal/other')
                }}
                href="#"
              ><i className="fa fa-cog mr-2"></i>其他功能</a>
            </li>
          </ul>
        </nav>
        <div className="right-panel">
          <div style={{ margin: '0px 48px 24px' }}>
            <div className="content-panel">
              {props.func === 'info' && <PersonalEdit />}
              {/* {props.func === 'books' && <BooksManage />} */}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

PersonalPage.propTypes = {
  func: PropTypes.string
};

export default PersonalPage;