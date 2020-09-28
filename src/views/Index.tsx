import React, { useEffect } from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import IndexHeader from "components/Headers/IndexHeader";
import DarkFooter from "components/Footers/DarkFooter";

// sections for this page
import IndexBanner from "./index-sections/IndexBanner";
import Theme from "./index-sections/Theme";
import NewComerForm from "./index-sections/NewComerForm";
import ChurchResources from "./index-sections/ChurchResources";
import InfoModal from "components/Modals/InfoModal";
import Images from "./index-sections/Images";

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

  useEffect(() => {
    document.title = "綠楊浸信會 LYBC"
  },[])

  return (
    <>
      <InfoModal />
      <IndexNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          {/* <Images /> */}
          <IndexBanner />
          <Theme />
          <ChurchResources />
          <NewComerForm />
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
