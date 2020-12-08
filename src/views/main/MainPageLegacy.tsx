import React from "react";
import PropTypes from 'prop-types';

// core components
import MainNavbar from "components/Navbars/MainNavbar";
import DefaultFooter from "components/Footers/DefaultFooter";
import Apply from 'views/activity/Apply'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import InfiniteScroll from 'views/common/InfiniteScroll'
// import SearchBooks from "views/books/SearchBooks";
import Worship from "views/worship/Worship";
import Sharing from "views/articles/Sharing";
import { getMenuHierarchy } from "utils/utils";
import UNIVERSALS from "Universals";
import SearchBooks from "views/book/SearchBooks";

type MainPageProps = {
  page: string,
}

function MainPageLegacy(props: MainPageProps) {

  let menus = getMenuHierarchy(props.page, null, null, null);

  React.useEffect(() => {
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("sidebar-collapse");
    };
  });

  React.useEffect(() => {
    document.title = UNIVERSALS.TITLE_MAP[props.page].title
  }, [props.page])

  return (
    <>
      <MainNavbar page={props.page} />
      <div className="wrapper">
        <div className="main" style={props.page === 'preacher-message' ? { top: 135, background: 'lightyellow' } : { top: 135 }}>
          <div>
            <Breadcrumb as="nav" style={{ fontSize: '1.2rem' }}>
              {menus && menus.map((value: any, index: number) => {
                if (value.link != null)
                  return <BreadcrumbItem key={index} href={value.link}>{value.title}</BreadcrumbItem>
                else
                  return <BreadcrumbItem key={index} active as="span">{value.title}</BreadcrumbItem>
              })}
            </Breadcrumb>
          </div>
          {props.page === 'apply-activity' && <Apply />}
          {/* {props.page === 'test' && <InfiniteScroll />} */}
          {props.page == 'library' && <SearchBooks />}
          {props.page === 'worship' && <Worship />}
          {props.page === 'sharing' && <Sharing />}
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

MainPageLegacy.propTypes = {
  page: PropTypes.string.isRequired,
};

export default MainPageLegacy;
