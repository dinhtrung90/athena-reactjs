export const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
};

export const OKTA_DOMAIN = process.env.REACT_APP_OKTA_ORG_URL || '';

export const CLIEND_ID = process.env.REACT_APP_OKTA_CLIENT_ID || '';