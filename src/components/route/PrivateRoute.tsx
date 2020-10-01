import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RootState } from 'reducers';
import { getTokenValue } from 'utils/utils';
import AdminPanel from 'views/admin/AdminPanel';
import WorshipCreate from 'views/admin/WorshipCreate';
import WorshipManage from 'views/admin/WorshipManage';
import ErrorPage from 'views/error/Error';

function PrivateRoute({path, role }: any) {

  const token = useSelector((state: RootState) => state.auth.tokenPair);

  let authObj = getTokenValue(token?.token)

  const isAuthenticated = () => {
    return authObj != null
  }

  const isAuthorized = () => {
    return role === undefined || authObj.role.toUpperCase() === role.toString().toUpperCase()
  }

  if (!isAuthenticated()) {
    return <Redirect to="/login-page" />;
  }
  if (!isAuthorized()) {
    return <ErrorPage error="401" />
  }
  return <Route path={path} render={({ match: { url } }) => (
    <>
      <Switch>
        <Route path={`${url}/`} render={(props: any) => <AdminPanel {...props} />} exact />
        <Route path={`${url}/worships`} render={(props: any) => <AdminPanel {...props} func="worships" />}  />
        <Route path={`${url}/new-worship`} render={(props: any) => <AdminPanel {...props} func="new-worship" />}  />
        <Route path={`${url}/members`} render={(props: any) => <AdminPanel {...props} func="members" />}  />
        <Route path={`${url}/other`} render={(props: any) => <AdminPanel {...props} func="other" />}  />
        <Route path={`${url}/page-management`} render={(props: any) => <AdminPanel {...props} func="page-management" />}  />
        <Route path="*">
          <ErrorPage error="404" />
        </Route>
      </Switch>
    </>
  )}
  />
}

export default PrivateRoute;