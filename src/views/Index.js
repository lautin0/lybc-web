import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";

// sections for this page
import Images from "./index-sections/Images.js";
import BasicElements from "./index-sections/BasicElements.js";
import Navbars from "./index-sections/Navbars.js";
import Tabs from "./index-sections/Tabs.js";
import Pagination from "./index-sections/Pagination.js";
import Notifications from "./index-sections/Notifications.js";
import Typography from "./index-sections/Typography.js";
import Javascript from "./index-sections/Javascript.js";
import Carousel from "./index-sections/Carousel.js";
import NucleoIcons from "./index-sections/NucleoIcons.js";
import CompleteExamples from "./index-sections/CompleteExamples.js";
import SignUp from "./index-sections/SignUp.js";
import Examples from "./index-sections/Examples.js";
import AboutUs from "./index-sections/AboutUs.js";
import ContactUs from "./index-sections/ContactUs.js";
import SundayServiceInfo from "./index-sections/SundayServiceInfo.js";
import Journal from "./index-sections/Journal.js";
import ChurchResources from "./index-sections/ChurchResources.js";
import MainSection from "./common/MainSection.js";
import IndexBanner from "./index-sections/IndexBanner.js";

function Index() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          {/* <Images /> */}
          {/* <BasicElements /> */}
          {/* <Navbars /> */}
          {/* <Tabs /> */}
          {/* <Pagination /> */}
          {/* <Notifications /> */}
          {/* <Typography /> */}
          {/* <Javascript /> */}
          <IndexBanner />
          <Carousel />
          <MainSection />
          {/* <Journal /> */}
          {/* <NucleoIcons />
          <CompleteExamples />
          <SignUp />*/}
          {/* <Examples />  */}
          {/* <Download /> */}
          <SundayServiceInfo />
          <ContactUs />
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
