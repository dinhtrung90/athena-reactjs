import { AUTH_TOKEN_KEY } from '../../constants/constants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import axios from 'axios';

export const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  username: '',
  password: '',
  submitted: false,
  account: null,
};

export const ACTION_TYPES = {
  LOGIN_REQUEST: 'authentication/LOGIN',
  LOGIN_SUCCESS: 'authentication/SUCCESS',
  GET_SESSION: 'authentication/GET_SESSION',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  LOGIN_FAILURE: 'authentication/LOGIN_FAILURE',
  UPDATE_FIELD_AUTH: 'authentication/UPDATE_FIELD_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE',
};

export const displayAuthError = (message) => ({
  type: ACTION_TYPES.ERROR_MESSAGE,
  message,
});

export const clearAuthToken = () => {
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
    Storage.local.remove(AUTH_TOKEN_KEY);
  }
  if (Storage.session.get(AUTH_TOKEN_KEY)) {
    Storage.session.remove(AUTH_TOKEN_KEY);
  }
};

export const clearAuthentication = (messageKey) => (dispatch, getState) => {
  clearAuthToken();
  dispatch(displayAuthError(messageKey));
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH,
  });
};

export const login = (username, password, rememberMe = false) => {
  return (dispatch) => {
    dispatch(request({ username }));
    dispatch(showLoading());

    axios
      .post('api/authenticate', { username, password, rememberMe })
      .then((res) => {
        if (res && res.data) {
          const jwt = res.data.id_token;
          Storage.session.set(AUTH_TOKEN_KEY, jwt);
        }
        return axios.get('api/account');
      })
      .then((res) => {
        Storage.local.set('profile', res.data);
        dispatch(success(res.data));
        dispatch(showLoading());
      })
      .catch((error) => {
        dispatch(failure(error.errorMessage));
        dispatch(hideLoading());
      });
  };
};

const failure = (errorMessage) => {
  return { type: ACTION_TYPES.LOGIN_FAILURE, payload: errorMessage };
};

const success = (user) => {
  return { type: ACTION_TYPES.LOGIN_SUCCESS, payload: user };
};

const request = (username) => {
  return { type: ACTION_TYPES.LOGIN_REQUEST, payload: username };
};

export const logout = () => {
  clearAuthToken();
  return (dispatch) => {
    dispatch({ type: ACTION_TYPES.LOGOUT });
  };
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ACTION_TYPES.LOGIN_SUCCESS:
      const isAuthenticated = action.payload && action.payload.activated;

      return {
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true,
        isAuthenticated: isAuthenticated,
        account: action.payload,
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...initialState,
        errorMessage: action.payload,
        loginError: true,
      };

    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        loading: false,
        loginError: false,
        loginSuccess: false,
        isAuthenticated: false,
        account: null,
      };

    default:
      return state;
  }
};

export const authenticationActions = {
  logout,
  login,
  clearAuthentication,
};
