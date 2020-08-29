
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
import MainPageLegacy from 'views/main/MainPageLegacy'
import CommonModal from "components/Modals/CommonModal";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";
import ErrorPage from "views/error/Error";
import MainPage from "views/main/MainPage";
import 'moment/locale/zh-hk';
import AdminPanel from "views/admin/AdminPanel";

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
        <Route path="/admin_" render={(props: any) => <AdminPanel {...props} />} />
        <Route path="/journal" render={(props: any) => <MainPage {...props} page="journal" deemed />} />
        <Route path="/apply-activity" render={props => <MainPageLegacy {...props} page="apply-activity" />} />
        <Route path="/about-us" render={(props: any) => <MainPage {...props} page="about-us" deemed />} />
        <Route path="/contact-us" render={(props: any) => <MainPage {...props} page="contact-us" deemed />} /> 
        <Route path="/doctrine" render={(props: any) => <MainPage {...props} page="doctrine" deemed />} />
        <Route path="/sunday-service-info" render={(props: any) => <MainPage {...props} page="sunday-service-info" deemed/>} />
        <Route path="/test" render={props => <MainPageLegacy {...props} page="test" />} />
        <Route path="/login-page" render={(props: any) => <LoginPage {...props} />} />
        <Route path="/worship/:id?" render={props => <MainPageLegacy {...props} page="worship" />} />
        <Route path="/worship-list" render={(props: any) => <MainPage {...props} page="worship-list"/>} />
        <Route path="/preacher-message" render={(props: any) => <MainPage {...props} page="preacher-message" />} />
        <Route path="/sharing-list" render={(props: any) => <MainPage {...props} page="sharing-list" deemed/>} />
        <Route path="/sharing/:id" render={props => <MainPageLegacy {...props} page="sharing" />} />
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
