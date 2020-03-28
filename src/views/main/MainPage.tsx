import React, { Props } from "react";
import PropTypes from 'prop-types';

// core components
import MainNavbar from "components/Navbars/MainNavbar";
import DefaultFooter from "components/Footers/DefaultFooter";
import Download from "views/download/Download";
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
      <MainNavbar page={props.page}/>
      <div className="wrapper">
        <div className="main" style={{top: 143}}>     
          <div>
            <Breadcrumb as="nav">
              {menus && menus.map((value: any, index: number) => {
                if(value.link != null)
                  return <BreadcrumbItem key={index} href={value.link}>{value.title}</BreadcrumbItem>
                else
                  return <BreadcrumbItem key={index} active as="span">{value.title}</BreadcrumbItem>
              })}
            </Breadcrumb>
          </div>   
          {props.page == 'about-us' && <AboutUs />}
          {props.page == 'download' && <Download />}
          {props.page == 'apply-activity' && <Apply />}
          {props.page == 'contact-us' && <ContactUs />}
          {props.page == 'doctrine' && <Doctrine />}
          {props.page == 'sunday-service-info' && <SundayServiceInfo />}
          {props.page == 'test' && <InfiniteScroll />}
          {/* {props.page == 'search' && <SearchBooks />} */}
          {props.page == 'worship' && <Worship />}
          {props.page == 'worship-list' && <WorshipList />}
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
