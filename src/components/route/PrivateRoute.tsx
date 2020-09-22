import { toUpper } from 'lodash';
import React, { Component } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from 'reducers';
import { getTokenValue } from 'Universals';
import ErrorPage from 'views/error/Error';

function PrivateRoute({ component: Component, path, role }: any) {

  const token = useSelector((state: RootState) => state.auth.jwt);

  let authObj = getTokenValue(token)

  const isAuthenticated = () => {
    return authObj != null
  }

  const isAuthorized = () => {
    return role === undefined || toUpper(authObj.role) === toUpper(role)
  }

  if (!isAuthenticated()) {
    return <Redirect to="/login-page" />;
  }
  if (!isAuthorized()) {
    return <ErrorPage error="401" />
  }
  return <Route component={Component} path={path} />;
}

export default PrivateRoute;