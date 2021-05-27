import AuthContext from 'context/AuthContext';
import { Role } from 'generated/graphql';
import React, { useContext } from 'react';
import { StaticContext } from 'react-router';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { getTokenValue } from 'utils/utils';
import AdminIndex from 'views/admin/AdminIndex';
import AdminPanel from 'views/admin/AdminPanel';
import NameCardManage from 'views/admin/NameCardManage';
import NewsCreate from 'views/admin/NewsCreate';
import OtherFunc from 'views/admin/OtherFunc';
import PageManage from 'views/admin/PageManage';
import PendingPostApproval from 'views/admin/PendingPostApproval';
import PendingPostManage from 'views/admin/PendingPostManage';
import PostCreate from 'views/admin/PostCreate';
import UserCreate from 'views/admin/UserCreate';
import UserEdit from 'views/admin/UserEdit';
import UserManage from 'views/admin/UserManage';
import WorshipCreate from 'views/admin/WorshipCreate';
import WorshipEdit from 'views/admin/WorshipEdit';
import WorshipManage from 'views/admin/WorshipManage';
import ErrorPage from 'views/error/ErrorPage';

type PrivateRouteProps = {
  path: string,
  role?: Array<Role>,
  renderFn?: (props: RouteComponentProps<any, StaticContext>) => JSX.Element,
}

function PrivateRoute(props: PrivateRouteProps) {

  const { path, role, renderFn } = props

  const { tokenPair } = useContext(AuthContext)

  let authObj = getTokenValue(tokenPair?.token)

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
    return <ErrorPage error="403" />
  }
  return <Route path={path} render={({ match: { url } }) => (
    <>
      {path === '/admin' && <Switch>
        <Route path={`${url}/`} render={(props: any) => <AdminPanel {...props}><AdminIndex /></AdminPanel>} exact />
        <Route path={`${url}/worships`} render={(props: any) => <AdminPanel {...props}><WorshipManage /></AdminPanel>} />
        <Route path={`${url}/worship/new`} render={(props: any) => <AdminPanel {...props}><WorshipCreate /></AdminPanel>} />
        <Route path={`${url}/worship/:id`} render={(props: any) => <AdminPanel {...props}><WorshipEdit /></AdminPanel>} />
        <Route path={`${url}/users`} render={(props: any) => <AdminPanel {...props}><UserManage /></AdminPanel>} />
        <Route path={`${url}/user/new`} render={(props: any) => <AdminPanel {...props}><UserCreate /></AdminPanel>} />
        <Route path={`${url}/user/:username`} render={(props: any) => <AdminPanel {...props}><UserEdit /></AdminPanel>} />
        <Route path={`${url}/other`} render={(props: any) => <AdminPanel {...props}><OtherFunc /></AdminPanel>} />
        <Route path={`${url}/page-management`} render={(props: any) => <AdminPanel {...props}><PageManage /></AdminPanel>} />
        <Route path={`${url}/post/new`} render={(props: any) => <AdminPanel {...props}><PostCreate /></AdminPanel>} />
        <Route path={`${url}/namecards`} render={(props: any) => <AdminPanel {...props}><NameCardManage /></AdminPanel>} />
        <Route path={`${url}/post/pending/:oid`} render={(props: any) => <AdminPanel {...props}><PendingPostApproval /></AdminPanel>} />
        <Route path={`${url}/post/pending`} render={(props: any) => <AdminPanel {...props}><PendingPostManage /></AdminPanel>} />
        <Route path={`${url}/news/new`} render={(props: any) => <AdminPanel {...props}><NewsCreate /></AdminPanel>} />
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