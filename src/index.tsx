
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory as createHistory } from 'history'
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
import MainPage from 'views/main/MainPage'
import CommonModal from "components/Modals/CommonModal";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";
import ErrorPage from "views/error/Error";
import ProfilePage from "views/examples/ProfilePage";
import LandingPage from "views/examples/LandingPage";
import WorshipListEnhance from "views/worship/WorshipListEnhance";
import PreacherMessage from "views/articles/PreacherMessage";
import SharingListEnhance from "views/articles/SharingListEnhance";
import JournalEnhance from "views/articles/JournalEnhance";
import AboutUsEnhance from "views/about/AboutUsEnhance";
import DoctrineEnhance from "views/about/DoctrineEnhance";
import ContactUsEnhance from "views/about/ContactUsEnhance";
import SundayServiceInfoEnhance from "views/about/SundayServiceInfoEnhance";

const history = createHistory({ basename: process.env.PUBLIC_URL });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <CommonModal />
    <LoadingOverlay />
    <Router history={history}>
      <Switch>
        <Route path="/index" render={(props: any) => <Index {...props} />} />
        {/* <Route path="/profile" render={(props: any) => <ProfilePage {...props} />} />
        <Route path="/landing" render={(props: any) => <LandingPage {...props} />} /> */}
        {/* <Route path="/journal" render={props => <MainPage {...props} page="journal" />} /> */}
        <Route path="/journal" render={(props: any) => <JournalEnhance {...props} />} />
        <Route path="/apply-activity" render={props => <MainPage {...props} page="apply-activity" />} />
        {/* <Route path="/about-us" render={props => <MainPage {...props} page="about-us" />} /> */}
        <Route path="/about-us" render={(props: any) => <AboutUsEnhance {...props} />} />
        {/* <Route path="/contact-us" render={props => <MainPage {...props} page="contact-us" />} /> */}
        <Route path="/contact-us" render={(props: any) => <ContactUsEnhance {...props} />} /> 
        {/* <Route path="/doctrine" render={props => <MainPage {...props} page="doctrine" />} /> */}
        <Route path="/doctrine" render={(props: any) => <DoctrineEnhance {...props} />} />
        {/* <Route path="/sunday-service-info" render={props => <MainPage {...props} page="sunday-service-info" />} /> */}
        <Route path="/sunday-service-info" render={(props: any) => <SundayServiceInfoEnhance {...props} />} />
        <Route path="/test" render={props => <MainPage {...props} page="test" />} />
        <Route path="/login-page" render={(props: any) => <LoginPage {...props} />} />
        {/* <Route path="/search" render={props => <MainPage {...props} page="search"/>} /> */}
        <Route path="/worship/:id?" render={props => <MainPage {...props} page="worship" />} />
        {/* <Route path="/worship-list" render={props => <MainPage {...props} page="worship-list" />} /> */}
        <Route path="/worship-list" render={(props: any) => <WorshipListEnhance {...props}/>} />
        {/* <Route path="/preacher-message" render={props => <MainPage {...props} page="preacher-message" />} /> */}
        <Route path="/preacher-message" render={(props: any) => <PreacherMessage {...props} />} />
        {/* <Route path="/sharing-list" render={props => <MainPage {...props} page="sharing-list" />} /> */}
        <Route path="/sharing-list" render={(props: any) => <SharingListEnhance {...props} />} />
        <Route path="/sharing/:id" render={props => <MainPage {...props} page="sharing" />} />
        <Route exact path="/"><Index /></Route>
        <Route path="*">
          <ErrorPage error="404" />
        </Route>
        {/* <Redirect to="/index" />
        <Redirect from="/" to="/index" /> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
