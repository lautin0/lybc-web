import { Role } from 'generated/graphql';
import React from 'react'
import { useSelector } from 'react-redux';
import { StaticContext } from 'react-router';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { RootState } from 'reducers';
import { getTokenValue } from 'utils/utils';
import AdminPanel2 from 'views/admin/revamp/AdminPanel2';
import ErrorPage from 'views/error/Error';

type PrivateRouteProps = {
  path: string,
  role?: Array<Role>,
  renderFn?: (props: RouteComponentProps<any, StaticContext>) => JSX.Element,
}

function PrivateRoute(props: PrivateRouteProps) {

  const { path, role, renderFn } = props

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
        <Route path={`${url}/`} render={(props: any) => <AdminPanel2 {...props} />} exact />
        <Route path={`${url}/worships`} render={(props: any) => <AdminPanel2 {...props} func="worships" />} />
        <Route path={`${url}/worship/new`} render={(props: any) => <AdminPanel2 {...props} func="new-worship" />} />
        <Route path={`${url}/worship/:id`} render={(props: any) => <AdminPanel2 {...props} func="edit-worship" />} />
        <Route path={`${url}/users`} render={(props: any) => <AdminPanel2 {...props} func="users" />} />
        <Route path={`${url}/user/new`} render={(props: any) => <AdminPanel2 {...props} func="new-user" />} />
        <Route path={`${url}/user/:username`} render={(props: any) => <AdminPanel2 {...props} func="user" />} />
        <Route path={`${url}/other`} render={(props: any) => <AdminPanel2 {...props} func="other" />} />
        <Route path={`${url}/page-management`} render={(props: any) => <AdminPanel2 {...props} func="page-management" />} />
        <Route path={`${url}/post/new`} render={(props: any) => <AdminPanel2 {...props} func="new-post" />} />
        <Route path={`${url}/namecards`} render={(props: any) => <AdminPanel2 {...props} func="namecards" />} />
        <Route path={`${url}/post/pending/:id`} render={(props: any) => <AdminPanel2 {...props} func="new-proxy-posts" />} />
        <Route path={`${url}/post/pending`} render={(props: any) => <AdminPanel2 {...props} func="pending-posts" />} />
        <Route path={`${url}/latests/new`} render={(props: any) => <AdminPanel2 {...props} func="new-latests" />} />
        {/* <Route path={`${url}/new-book`} render={(props: any) => <AdminPanel2 {...props} func="new-book" />} />
        <Route path={`${url}/books`} render={(props: any) => <AdminPanel2 {...props} func="books" />} /> */}
        <Route path="*">
          <ErrorPage error="404" />
        </Route>
      </Switch>}
      {path !== '/admin' && <Switch>
        <Route path={url} render={renderFn} />
      </Switch>}
    </>
  )}
  />
}

export default PrivateRoute;