
import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "views/Index";
import LoginPage from "views/login/LoginPage";
import MainPageLegacy from 'views/main/MainPageLegacy'
import ErrorPage from "views/error/Error";
import MainPage from "views/main/MainPage";
import 'moment/locale/zh-hk';
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import PrivateRoute from "components/Route/PrivateRoute";
import { getClient } from "utils/auth.client";
import { Role } from "generated/graphql";
import PersonalRoute from "components/Route/PersonalRoute";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import en from './assets/i18n/en.json';
import zh from './assets/i18n/zh.json';
import { IntlProvider } from "react-intl";
import { getKeyValue } from "utils/utils";
import { LocaleContext } from "context/LocaleContext";
import useLanguage from "hooks/useLanguage";
import LoadingOverlay from "components/Loading/LoadingOverlay";
import CommonModal from "components/Modals/CommonModal";
import DecisionModal from "components/Modals/DecisionModal";
import PasswordResetModal from "components/Modals/PasswordResetModal";
import SharingModal from "components/Modals/SharingModal";
import LayoutContext from "context/LayoutContext";
import useLayout from "hooks/useLayout";
import AdminPanel2 from "views/admin/revamp/AdminPanel2";
import PersonalPage2 from "views/personal/revamp/PersonalPage2";
import MuiSharingModal from "components/Modals/revamp/MuiSharingModal";

// const history = createHistory({ basename: process.env.PUBLIC_URL });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const messages = {
  'en': en,
  'zh': zh
}

function App() {

  const [locale, setLocale, persistLocale] = useLanguage()
  const [mobileOpen, setMobileOpen, darkMode, setDarkMode] = useLayout()

  return <ApolloProvider client={getClient()}>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <LocaleContext.Provider value={[locale, setLocale, persistLocale]}>
          <LayoutContext.Provider value={{ mobileOpen, setMobileOpen, darkMode, setDarkMode }} >
            <IntlProvider locale={locale} messages={getKeyValue(messages, locale)}>              
              <CommonModal />
              <DecisionModal />
              <PasswordResetModal />
              <LoadingOverlay />
              <SharingModal />
              <Switch>
                <Route path="/index" render={(props: any) => <Index {...props} />} />
                <PrivateRoute path="/admin" role={[Role.Admin]} />
                <Route path="/journal" render={(props: any) => <MainPage {...props} page="journal" />} />
                <PrivateRoute path="/library" renderFn={props => <MainPageLegacy {...props} page="library" />} />
                <PersonalRoute path="/personal" />
                {/* <Route path="/library" render={props => <MainPageLegacy {...props} page="library" />} /> */}
                <Route path="/apply-activity" render={props => <MainPageLegacy {...props} page="apply-activity" />} />
                {/* <Route path="/about-us" render={(props: any) => <MainPage {...props} page="about-us" />} /> */}
                <Route path="/careers" render={(props: any) => <MainPageLegacy {...props} page="careers" />} />
                <Route path="/contact-us" render={(props: any) => <MainPage {...props} page="contact-us" />} />
                <Route path="/doctrine" render={(props: any) => <MainPage {...props} page="doctrine" />} />
                <Route path="/sunday-service-info" render={(props: any) => <MainPage {...props} page="sunday-service-info" />} />
                <Route path="/test" render={props => <MainPageLegacy {...props} page="test" />} />
                <Route path="/login-page" render={(props: any) => <LoginPage {...props} />} />
                <Route path="/worship-list" render={(props: any) => <MainPage {...props} page="worship-list" />} />
                <Route path="/worship/:id" render={props => <MainPageLegacy {...props} page="worship" />} />
                {/* <PrivateRoute path="/worship-list" />
        <PrivateRoute path="/worship/:id" /> */}
                <Route path="/preacher-message" render={(props: any) => <MainPage {...props} page="preacher-message" />} />
                <Route path="/sharing-list" render={(props: any) => <MainPage {...props} page="sharing-list" />} />
                <Route path="/sharing/:id" render={props => <MainPageLegacy {...props} page="sharing" />} />
                <Route path="/news/" render={props => <MainPageLegacy {...props} page="news" />} />
                <Route path="/news2/" render={props => <MainPageLegacy {...props} page="news2" />} />
                <Route path="/news-list/" render={props => <MainPage {...props} page="news-list" />} />
                <Redirect from="/sharing/" to="/sharing-list" />
                <Route exact path="/"><Index /></Route>
                <Route path="*">
                  <ErrorPage error="404" />
                </Route>
                {/* <Redirect to="/index" />
      <Redirect from="/" to="/index" /> */}
              </Switch>
            </IntlProvider>
          </LayoutContext.Provider>
        </LocaleContext.Provider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
}

ReactDOM.render(<App />, document.getElementById("root"));
