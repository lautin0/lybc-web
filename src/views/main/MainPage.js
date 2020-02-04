import React from "react";
import PropTypes from 'prop-types';

// core components
import MainNavbar from "components/Navbars/MainNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import Download from "views/download/Download";
import AboutUs from "views/about/AboutUs";
import Apply from 'views/activity/Apply'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { getMenuHierarchy } from "Universals";
import ContactUs from "views/about/ContactUs";
import SundayServiceInfo from "views/about/SundayServiceInfo";

function MainPage(props) {

  let menus = getMenuHierarchy(props.page, null, null);

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
            <Breadcrumb tag="nav">
              {menus && menus.map((value, index) => {
                if(value.link != null)
                  return <BreadcrumbItem key={index} tag="a" href={value.link}>{value.title}</BreadcrumbItem>
                else
                  return <BreadcrumbItem key={index} active tag="span">{value.title}</BreadcrumbItem>
              })}
            </Breadcrumb>
          </div>   
          {props.page == 'about-us' && <AboutUs />}
          {props.page == 'download' && <Download />}
          {props.page == 'apply-activity' && <Apply />}
          {props.page == 'contact-us' && <ContactUs />}
          {props.page == 'sunday-service-info' && <SundayServiceInfo />}
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
