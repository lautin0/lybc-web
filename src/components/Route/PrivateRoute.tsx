import AuthContext from 'context/AuthContext';
import { Role } from 'generated/graphql';
import React, { ReactElement, useContext } from 'react';
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

  const { path, renderFn } = props

  const { tokenPair } = useContext(AuthContext)

  let authObj = getTokenValue(tokenPair?.token)

  const RouteGuard = (props: { children: ReactElement, roles: Role[] }) => {
    let role = authObj.role as Role
    if (props.roles.includes(role)) {
      return props.children
    } else {
      return <Redirect to="/unauthorized"></Redirect>
    }
  }

  const isAuthenticated = () => {
    return authObj != null
  }

  if (!isAuthenticated()) {
    return <Redirect to="/login-page" />;
  }

  return <Route path={path} render={({ match: { url } }) => (
    <>
      {path === '/admin' && <Switch>
        <Route path={`${url}/`} exact><AdminPanel><RouteGuard roles={[Role.Admin, Role.Worker]} ><AdminIndex /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/worships`}><AdminPanel><RouteGuard roles={[Role.Admin]} ><WorshipManage /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/worship/new`}><AdminPanel><RouteGuard roles={[Role.Admin]} ><WorshipCreate /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/worship/:id`}><AdminPanel><RouteGuard roles={[Role.Admin]} ><WorshipEdit /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/users`}><AdminPanel><RouteGuard roles={[Role.Admin]} ><UserManage /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/user/new`}><AdminPanel><RouteGuard roles={[Role.Admin]} ><UserCreate /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/user/:username`}><AdminPanel><RouteGuard roles={[Role.Admin]} ><UserEdit /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/page-management`}><AdminPanel><RouteGuard roles={[Role.Admin]} ><PageManage /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/post/new`}><AdminPanel><RouteGuard roles={[Role.Admin]} ><PostCreate /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/other`}><AdminPanel><RouteGuard roles={[Role.Worker, Role.Admin]} ><OtherFunc /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/namecards`}><AdminPanel><RouteGuard roles={[Role.Worker, Role.Admin]} ><NameCardManage /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/post/pending/:oid`}><AdminPanel><RouteGuard roles={[Role.Worker, Role.Admin]} ><PendingPostApproval /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/post/pending`}><AdminPanel><RouteGuard roles={[Role.Worker, Role.Admin]} ><PendingPostManage /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/news/new`}><AdminPanel><RouteGuard roles={[Role.Worker, Role.Admin]} ><NewsCreate /></RouteGuard></AdminPanel></Route>
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