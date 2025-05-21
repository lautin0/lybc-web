import React, { useContext, useEffect } from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import IndexHeader from "components/Headers/IndexHeader";
import DarkFooter from "components/Footers/DarkFooter";

// sections for this page
import NameCardForm from "./index-sections/NameCardForm";
import ChurchResources from "./index-sections/ChurchResources";
import InfoModal from "components/Modals/InfoModal";
import { useLocation } from "react-router-dom";
import { isTokenExpired } from "utils/utils";
import { RefreshTokenInput, useRefreshTokenMutation } from "generated/graphql";
import CarouselSection from "./index-sections/Carousel";
import { useIntl } from "react-intl";
import useLanguage from "hooks/useLanguage";
import ArticleComponent from "./index-sections/ArticleComponent";
import SlideSection from "./index-sections/SlideSection";
import ImageRotateSection from "./index-sections/ImageRotateSection";
import AuthContext from "context/AuthContext";
import UNIVERSALS from "Universals";

function Index() {

  const { tokenPair, refreshSignInComplete, signOut } = useContext(AuthContext)

  const [refreshSignIn] = useRefreshTokenMutation()

  const [locale] = useLanguage()

  const intl = useIntl()

  const location = useLocation()

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  useEffect(() => {
    document.title = intl.formatMessage({ id: "app.title" })
  }, [locale, intl])

  useEffect(() => {
    if (tokenPair?.token && isTokenExpired(tokenPair.token)) {
      const payload: RefreshTokenInput = { token: tokenPair.refreshToken }
      refreshSignIn({
        variables: { input: payload }
      }).then(refreshSignInComplete)
        .catch(err => {
          signOut && signOut()
          window.location.reload()
        })
    }
  }, [location, refreshSignIn, tokenPair, signOut, refreshSignInComplete])

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, [location])

  return (
    <>
      {UNIVERSALS.NOTIFICATION.MESSAGE && <InfoModal />}
      <IndexNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          {/* <Images /> */}
          <CarouselSection />
          <SlideSection />
          <ImageRotateSection />
          <ChurchResources />
          {/* <IndexBanner /> */}
          {/* <Theme /> */}
          <ArticleComponent />
          {/* <TimelineSection /> */}
          <NameCardForm />
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
