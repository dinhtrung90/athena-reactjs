import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { oktaAuthConfig, oktaSignInConfig } from './config/config';
import PrivateRoute from './components/private-route';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheLayout = React.lazy(() => import('./containers/TheLayout'));

const Login = React.lazy(() => import('./views/pages/login/Login'));


const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };
  
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <React.Suspense fallback={loading}>
        <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Switch>
        <PrivateRoute path='/' name="Home" component={TheLayout} />
        <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
        <Route path='/login/callback' component={LoginCallback} />
      </Switch>
    </Security>
    </React.Suspense>
    
  );
};
export default AppWithRouterAccess;