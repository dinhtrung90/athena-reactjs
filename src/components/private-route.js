import { Redirect, Route } from 'react-router';
import { CAlert } from '@coreui/react';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({
  component: Component,
  hasAnyAuthorities,
  ...rest
}) => {
  const { isAuthenticated, account } = useSelector(
    (state) => state.authentication
  );

  console.log('debugging-->');

  const authorities = account ? account.authorities : [];

  const checkAuthorities = (props) => {
    return isAuthorized ? (
      <Component {...props} />
    ) : (
      <div>
        <CAlert color="info" closeButton>
          You are not authorized to access this page.
        </CAlert>
      </div>
    );
  };

  const isAuthorized = hasAnyAuthority(authorities, hasAnyAuthorities);

  const renderRedirect = (props) => {
    return isAuthenticated ? (
      checkAuthorities(props)
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

  return <Route {...rest} render={renderRedirect} />;
};

export const hasAnyAuthority = (authorities, hasAnyAuthorities) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some((auth) => authorities.includes(auth));
  }
  return false;
};
