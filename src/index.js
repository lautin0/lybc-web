/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory as createHistory } from 'history'

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "views/Index.js";
import LoginPage from "views/examples/LoginPage.js";
import MainPage from 'views/main/MainPage.js'

const history = createHistory({ basename: process.env.PUBLIC_URL });

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Switch>
        <Route path="/index" render={props => <Index {...props} />} />
        <Route
          path="/download"
          render={props => <MainPage {...props} page="download" />}
        />
        <Route
          path="/apply-activity"
          render={props => <MainPage {...props} page="apply-activity" />}
        />
        <Route
          path="/about-us"
          render={props => <MainPage {...props} page="about-us" />}
        />
        <Route
          path="/contact-us"
          render={props => <MainPage {...props} page="contact-us" />}
        />
        <Route
          path="/sunday-service-info"
          render={props => <MainPage {...props} page="sunday-service-info" />}
        />
        <Route path="/login-page" render={props => <LoginPage {...props} />} />
        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>
    </Switch>
  </Router>,
  document.getElementById("root")
);
