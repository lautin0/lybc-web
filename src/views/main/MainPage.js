import React from "react";
import PropTypes from 'prop-types';

// core components
import MainNavbar from "components/Navbars/MainNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import Download from "views/download/Download";
import AboutUs from "views/index-sections/AboutUs";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { getMenuHierarchy } from "Universals";

function MainPage(props) {

  let menus = getMenuHierarchy(props.page, null, null);
  console.log(menus)

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
        <div className="main" style={{top: '20vh'}}>     
          <div>
            <Breadcrumb tag="nav" listTag="div">
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
