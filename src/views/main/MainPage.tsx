import React from "react";
import PropTypes from 'prop-types';

// core components
import MainNavbar from "components/Navbars/MainNavbar";
import DefaultFooter from "components/Footers/DefaultFooter";
import Journal from "views/articles/Journal";
import AboutUs from "views/about/AboutUs";
import Apply from 'views/activity/Apply'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { getMenuHierarchy } from "Universals";
import ContactUs from "views/about/ContactUs";
import SundayServiceInfo from "views/about/SundayServiceInfo";
import InfiniteScroll from 'views/common/InfiniteScroll'
// import SearchBooks from "views/books/SearchBooks";
import Worship from "views/worship/Worship";
import WorshipList from "views/worship/WorshipList";
import Doctrine from "views/about/Doctrine";
import PreacherMessage from "views/articles/PreacherMessage";
import SharingList from "views/articles/SharingList";
import Sharing from "views/articles/Sharing";

type MainPageProps = {
  page: string,
}

function MainPage(props: MainPageProps) {

  let menus = getMenuHierarchy(props.page, null, null, null);

  React.useEffect(() => {
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <MainNavbar page={props.page} />
      <div className="wrapper">
        <div className="main" style={props.page == 'preacher-message' ? { top: 114, background: 'lightyellow' } : { top: 114 }}>
          <div>
            <Breadcrumb as="nav">
              {menus && menus.map((value: any, index: number) => {
                if (value.link != null)
                  return <BreadcrumbItem key={index} href={value.link}>{value.title}</BreadcrumbItem>
                else
                  return <BreadcrumbItem key={index} active as="span">{value.title}</BreadcrumbItem>
              })}
            </Breadcrumb>
          </div>
          {props.page == 'about-us' && <AboutUs />}
          {props.page == 'journal' && <Journal />}
          {props.page == 'apply-activity' && <Apply />}
          {props.page == 'contact-us' && <ContactUs />}
          {props.page == 'doctrine' && <Doctrine />}
          {props.page == 'sunday-service-info' && <SundayServiceInfo />}
          {props.page == 'test' && <InfiniteScroll />}
          {/* {props.page == 'search' && <SearchBooks />} */}
          {props.page == 'worship' && <Worship />}
          {props.page == 'worship-list' && <WorshipList />}
          {props.page == 'preacher-message' && <PreacherMessage />}
          {props.page == 'sharing-list' && <SharingList />}
          {props.page == 'sharing' && <Sharing />}
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

MainPage.propTypes = {
  page: PropTypes.string.isRequired,
};

export default MainPage;
