import AuthContext from 'context/AuthContext';
import { Role } from 'generated/graphql';
import React, { useContext } from 'react';
import { StaticContext } from 'react-router';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { getTokenValue } from 'utils/utils';
import ErrorPage from 'views/error/ErrorPage';
import NotificationPage from 'views/personal/NotificationPage';
import PersonalMain from 'views/personal/PersonalMain';
import PersonalOther from 'views/personal/PersonalOther';
import PersonalPage from 'views/personal/PersonalPage';
import PersonalSetting from 'views/personal/PersonalSetting';
import PersonalSharingEdit from 'views/personal/PersonalSharingEdit';
import PersonalSharingStat from 'views/personal/PersonalSharingStat';
import PersonalSharingSubmit from 'views/personal/PersonalSharingSubmit';

type PrivateRouteProps = {
  path: string,
  role?: Array<Role>,
  renderFn?: (props: RouteComponentProps<any, StaticContext>) => JSX.Element,
}

function PersonalRoute(props: PrivateRouteProps) {

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
      {path === '/personal' && <Switch>
        <Route path={`${url}/sharing`} render={(props: any) => <PersonalPage {...props}><PersonalSharingSubmit /></PersonalPage>} />
        <Route path={`${url}/sharing-edit/:oid`} render={(props: any) => <PersonalPage {...props}><PersonalSharingEdit /></PersonalPage>} />
        <Route path={`${url}/sharing-status/:oid`} render={(props: any) => <PersonalPage {...props}><PersonalSharingStat /></PersonalPage>} />
        <Route path={`${url}/other`} render={(props: any) => <PersonalPage {...props}><PersonalOther /></PersonalPage>} />
        <Route path={`${url}/notifications`} render={(props: any) => <PersonalPage {...props}><NotificationPage /></PersonalPage>} />
        <Route path={`${url}/center/sharing`} render={(props: any) => <PersonalPage {...props}><PersonalMain tabIdx={1} /></PersonalPage>} />
        <Route path={`${url}/center`} render={(props: any) => <PersonalPage {...props}><PersonalMain /></PersonalPage>} />        
        <Route path={`${url}/settings`} render={(props: any) => <PersonalPage {...props}><PersonalSetting /></PersonalPage>} />
        <Redirect from={`${url}/`} to={`${url}/center`} />
        <Route path="*">
          <ErrorPage error="404" />
        </Route>
      </Switch>}
      {path !== '/personal' && <Switch>
        <Route path={url} render={renderFn} />
      </Switch>}
    </>
  )}
  />
}

export default PersonalRoute;