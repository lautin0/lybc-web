import React from "react";
import PropTypes from 'prop-types';

// react-bootstrap components
import IndexNavbar from "components/Navbars/IndexNavbar";
import DefaultFooter from "components/Footers/DefaultFooter";
import MainPageHeader from "components/Headers/MainPageHeader";
import PreacherMessage from "views/articles/PreacherMessage";
import AboutUs from "views/about/AboutUs";
import Journal from "views/articles/Journal";
import ContactUs from "views/about/ContactUs";
import Doctrine from "views/about/Doctrine";
import SundayServiceInfo from "views/about/SundayServiceInfo";
import WorshipList from "views/worship/WorshipList";
import SharingList from "views/articles/SharingList";

type MainPageProps = {

  // page id
  page: string,

  // demmed theme
  deemed: boolean

}

function MainPage(props: MainPageProps) {

  React.useEffect(() => {
    props.deemed && document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      props.deemed && document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <MainPageHeader page={props.page}/>
        {props.page === 'about-us' && <AboutUs />}
        {props.page === 'journal' && <Journal />}
        {props.page === 'contact-us' && <ContactUs />}
        {props.page === 'doctrine' && <Doctrine />}
        {props.page === 'sunday-service-info' && <SundayServiceInfo />}
        {props.page === 'worship-list' && <WorshipList />}
        {props.page === 'preacher-message' && <PreacherMessage />}
        {props.page === 'sharing-list' && <SharingList />}
        <DefaultFooter />
      </div>
    </>
  );
}

MainPage.propTypes = {
  page: PropTypes.string.isRequired,
  deemed: PropTypes.bool
};

export default MainPage;
