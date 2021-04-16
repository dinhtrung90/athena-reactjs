import { Redirect, Route } from 'react-router';
import { APP_TOKEN } from '../constants/constants';
export const PrivateRoute = ({ component: Component, ...rest }) => {
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem(APP_TOKEN) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
};
