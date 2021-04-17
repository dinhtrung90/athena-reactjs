import React from 'react';
import { Redirect } from 'react-router-dom';
import { SecureRoute, useOktaAuth } from '@okta/okta-react';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { oktaAuth, authState } = useOktaAuth();

  if (authState.isPending) return null;

  const renderRedirect = (props) => {
    return oktaAuth.isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  };

  if (!Component)
    throw new Error(
      `A component needs to be specified for private route for path}`
    );
    return <SecureRoute {...rest} render={renderRedirect} />;
};
export default PrivateRoute;
