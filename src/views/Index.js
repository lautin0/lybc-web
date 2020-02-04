import React from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";

// sections for this page
import ContactUs from "./index-sections/ContactUs.js";
import SundayServiceInfo from "./index-sections/SundayServiceInfo.js";
import IndexBanner from "./index-sections/IndexBanner.js";
import Theme from "./index-sections/Theme.js";
import NewComerForm from "./index-sections/NewComerForm.js";

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
          <IndexBanner />
          <Theme />
          <SundayServiceInfo />
          <ContactUs />
          <NewComerForm />
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
