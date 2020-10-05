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
import { useLocation } from "react-router";
import { signInSuccess, signOut } from "actions";
import { RefreshTokenInput, REFRESH_TOKEN } from "graphqls/graphql";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import { isTokenExpired } from "utils/utils";
import { useMutation } from "@apollo/client";

function Index() {

  const dispatch = useDispatch()

  const location = useLocation()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const [refreshToken, { data, loading: refreshTokenLoading, error: refreshTokenError }] = useMutation(REFRESH_TOKEN);


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
  }, [])

  useEffect(() => {
    if (data !== undefined)
      dispatch(signInSuccess(data.refreshToken))
  }, [data])

  useEffect(() => {
    if (tokenPair?.token && isTokenExpired(tokenPair.token)) {
      const payload: RefreshTokenInput = { token: tokenPair.refreshToken }
      refreshToken({ variables: { input: payload } })
        .catch(err => {
          // dispatch(signInFailure(err))
          dispatch(signOut())
        })
    }
  }, [location])

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
