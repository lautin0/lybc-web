import React from "react";
import PropTypes from 'prop-types';

// core components
import MainNavbar from "components/Navbars/MainNavbar.js";
import MainPageHeader from "components/Headers/MainPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import Download from "views/download/Download";
import AboutUs from "views/index-sections/AboutUs";

function MainPage(props) {

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
        {/* <MainPageHeader /> */}
        <div className="main" style={{top: '20vh'}}>        
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
