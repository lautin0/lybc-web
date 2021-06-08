import AuthContext from 'context/AuthContext';
import { Role } from 'generated/graphql';
import React, { ReactElement, useContext } from 'react';
import { StaticContext } from 'react-router';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { getTokenValue } from 'utils/utils';
import AdminIndex from 'views/admin/AdminIndex';
import AdminPanel from 'views/admin/AdminPanel';
import NameCardEdit from 'views/admin/NameCardEdit';
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
import NotificationManage from 'views/super/NotificationManage';

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
        <Route path={`${url}/`} exact><AdminPanel><RouteGuard roles={[Role.Admin, Role.Super, Role.Worker]} ><AdminIndex /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/worships`}><AdminPanel><RouteGuard roles={[Role.Admin, Role.Super]} ><WorshipManage /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/worship/new`}><AdminPanel><RouteGuard roles={[Role.Admin, Role.Super]} ><WorshipCreate /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/worship/:id`}><AdminPanel><RouteGuard roles={[Role.Admin, Role.Super]} ><WorshipEdit /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/users`}><AdminPanel><RouteGuard roles={[Role.Admin, Role.Super]} ><UserManage /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/user/new`}><AdminPanel><RouteGuard roles={[Role.Admin, Role.Super]} ><UserCreate /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/user/:username`}><AdminPanel><RouteGuard roles={[Role.Admin, Role.Super]} ><UserEdit /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/page-management`}><AdminPanel><RouteGuard roles={[Role.Admin, Role.Super]} ><PageManage /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/post/new`}><AdminPanel><RouteGuard roles={[Role.Admin, Role.Super]} ><PostCreate /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/other`}><AdminPanel><RouteGuard roles={[Role.Worker, Role.Admin, Role.Super]} ><OtherFunc /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/namecards/contact/:oid`}><AdminPanel><RouteGuard roles={[Role.Worker, Role.Admin, Role.Super]} ><NameCardEdit /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/namecards`}><AdminPanel><RouteGuard roles={[Role.Worker, Role.Admin, Role.Super]} ><NameCardManage /></RouteGuard></AdminPanel></Route>        
        <Route path={`${url}/post/pending/:oid`}><AdminPanel><RouteGuard roles={[Role.Worker, Role.Admin, Role.Super]} ><PendingPostApproval /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/post/pending`}><AdminPanel><RouteGuard roles={[Role.Worker, Role.Admin, Role.Super]} ><PendingPostManage /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/news/new`}><AdminPanel><RouteGuard roles={[Role.Worker, Role.Admin, Role.Super]} ><NewsCreate /></RouteGuard></AdminPanel></Route>
        <Route path={`${url}/notifications`}><AdminPanel><RouteGuard roles={[Role.Super]} ><NotificationManage /></RouteGuard></AdminPanel></Route>
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