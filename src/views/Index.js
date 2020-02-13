import React, { useRef } from "react";
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import _ from 'lodash'

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

function Index() {

  const newComerErrSelector = state => state && state.newComer.error
  const cartErrSelector = state => state && state.cart.checkoutStatus.error

  const errSelector = createSelector(
    newComerErrSelector,
    cartErrSelector,
    (res1, res2) => {
      let resArray = [];
      resArray.push(res1)
      resArray.push(res2)
      return resArray.filter(x => x != null).pop();
    }
  )

  const errorDef = useSelector(errSelector);

  const isPending = useSelector(state => (
    state.newComer.isPending
  ))

  const [ error, setError ] = React.useState(null);

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

  const prevError = useRef(error)
  React.useEffect(() => {
    if (!_.isEqual(error, prevError.current)) {
      //INPUT HAS CHANGED
      setError(error)
    } else if (!_.isEqual(error, errorDef)) {
      //REDUX STATE HAS CHANGED
      setError(errorDef)
    }
    prevError.current = error
  }, [error, errorDef]) 

  return (
    <>
      <div className="text-center loading-overlay" style={{ display: isPending > 0 ? 'block' : 'none' }}>
        <div className="spinner-border" style={{ marginTop: '50vh' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <CommonModal
        error={error}
        show={error != null}
        onHide={() => {setError(null);}}
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
