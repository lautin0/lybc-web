import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RootState } from 'reducers';
import { getTokenValue } from 'utils/utils';
import AdminPanel from 'views/admin/AdminPanel';
import ErrorPage from 'views/error/Error';
import MainPage from 'views/main/MainPage';
import MainPageLegacy from 'views/main/MainPageLegacy';

function PrivateRoute({ path, role }: any) {

  const token = useSelector((state: RootState) => state.auth.tokenPair);

  let authObj = getTokenValue(token?.token)

  const isAuthenticated = () => {
    return authObj != null
  }

  const isAuthorized = () => {
    return role === undefined || (role as Array<string>).some(x => x.toString().toUpperCase() === authObj.role.toUpperCase())
  }

  if (!isAuthenticated()) {
    return <Redirect to="/login-page" />;
  }
  if (!isAuthorized()) {
    return <ErrorPage error="401" />
  }
  return <Route path={path} render={({ match: { url } }) => (
    <>
      {path === '/admin' && <Switch>
        <Route path={`${url}/`} render={(props: any) => <AdminPanel {...props} />} exact />
        <Route path={`${url}/worships`} render={(props: any) => <AdminPanel {...props} func="worships" />} />
        <Route path={`${url}/worship/new`} render={(props: any) => <AdminPanel {...props} func="new-worship" />} />
        <Route path={`${url}/worship/:id`} render={(props: any) => <AdminPanel {...props} func="edit-worship" />} />
        <Route path={`${url}/members`} render={(props: any) => <AdminPanel {...props} func="members" />} />
        <Route path={`${url}/other`} render={(props: any) => <AdminPanel {...props} func="other" />} />
        <Route path={`${url}/page-management`} render={(props: any) => <AdminPanel {...props} func="page-management" />} />
        <Route path="*">
          <ErrorPage error="404" />
        </Route>
      </Switch>}
      {path === '/worship-list' && <Switch>
        <Route path="/worship-list" render={(props: any) => <MainPage {...props} page="worship-list" />} />
        <Route path="*">
          <ErrorPage error="404" />
        </Route>
      </Switch>}
      {path === '/worship/:id' && <Switch>
        <Route path="/worship/:id" render={props => <MainPageLegacy {...props} page="worship" />} />
        <Redirect from="/worship/" to="/worship-list" />
        <Route path="*">
          <ErrorPage error="404" />
        </Route>
      </Switch>}
    </>
  )}
  />
}

export default PrivateRoute;