import { Role } from 'generated/graphql';
import React from 'react'
import { useSelector } from 'react-redux';
import { StaticContext } from 'react-router';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { RootState } from 'reducers';
import { getTokenValue } from 'utils/utils';
import ErrorPage from 'views/error/Error';
import PersonalPage2 from 'views/personal/revamp/PersonalPage2';

type PrivateRouteProps = {
  path: string,
  role?: Array<Role>,
  renderFn?: (props: RouteComponentProps<any, StaticContext>) => JSX.Element,
}

function PersonalRoute(props: PrivateRouteProps) {

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
      {path === '/personal' && <Switch>
        {/* <Route path={`${url}/`} render={(props: any) => <PersonalPage2 {...props} />} exact /> */}
        <Route path={`${url}/info`} render={(props: any) => <PersonalPage2 {...props} func="info" />} />
        <Route path={`${url}/sharing`} render={(props: any) => <PersonalPage2 {...props} func="sharing" />} />
        <Route path={`${url}/other`} render={(props: any) => <PersonalPage2 {...props} func="other" />} />
        <Route path={`${url}/notifications`} render={(props: any) => <PersonalPage2 {...props} func="notifications" />} />
        <Route path={`${url}/favourite-posts`} render={(props: any) => <PersonalPage2 {...props} func="favourite-posts" />} />
        <Route path={`${url}/center`} render={(props: any) => <PersonalPage2 {...props} />} />
        <Route path={`${url}/settings`} render={(props: any) => <PersonalPage2 {...props} func="settings" />} />
        <Redirect from={`${url}/`} to={`${url}/center`}/>
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