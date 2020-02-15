import React from "react";
import { useSelector, useDispatch } from 'react-redux'

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
import ChurchResources from "./index-sections/ChurchResources.js";

import CommonModal from '../components/Modals/CommonModal'

import { resetSysError, resetSysMessage } from '../actions'

function Index() {
  const message = useSelector(state => state.system.message);
  const error = useSelector(state => state.system.error);
  const dispatch = useDispatch();

  const isPending = useSelector(state => (
    state.newComer.isPending
  ))

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
      <div className="text-center loading-overlay" style={{ display: isPending > 0 ? 'block' : 'none' }}>
        <div className="spinner-border" style={{ marginTop: '50vh' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <CommonModal
        error={error}
        message={message}
        show={error != null || message != null}
        onHide={() => {
          error && dispatch(resetSysError());
          message && dispatch(resetSysMessage());
        }}
      />
      <IndexNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          <IndexBanner />
          <Theme />
          <ChurchResources />
          {/* <SundayServiceInfo />
          <ContactUs /> */}
          <NewComerForm />
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
