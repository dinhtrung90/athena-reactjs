import React from 'react';
import { Redirect } from 'react-router-dom';
import { SecureRoute, useOktaAuth } from '@okta/okta-react';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authState } = useOktaAuth();

  // if (authState.isPending) return null;

  const renderRedirect = (props) => {
    if (authState.isAuthenticated) {
      return <Component {...props} />;
    }
    return (
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
