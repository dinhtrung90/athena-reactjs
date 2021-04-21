import axios from 'axios';
import { APP_TOKEN } from 'src/constants/constants';
import { SERVER_API_URL } from './config';
import { toast } from 'react-toastify';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const addErrorAlert = (message, key, data) => {
  toast.error(message);
};

const setupAxiosInterceptors = (onUnauthenticated) => {
  const onRequestSuccess = (config) => {
    const token = localStorage.get(APP_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => response;

  const onResponseError = (err) => {
    const response = err.response;
    const data = response.data;
    const status = err.status || (response ? response.status : 0);
    switch (status) {
      // connection refused, server not reachable
      case 0:
        addErrorAlert('Server not reachable', 'error.server.not.reachable');
        break;
      case 400: {
        const headers = Object.entries(response.headers);
        let errorHeader = null;
        let entityKey = null;
        headers.forEach(([k, v]) => {
          if (k.toLowerCase().endsWith('app-error')) {
            errorHeader = v;
          } else if (k.toLowerCase().endsWith('app-params')) {
            entityKey = v;
          }
        });
        if (errorHeader) {
          const entityName = entityKey;
          addErrorAlert(errorHeader, errorHeader, { entityName });
        } else if (data !== '' && data.fieldErrors) {
          const fieldErrors = data.fieldErrors;
          for (var i = 0; i < fieldErrors.length; i++) {
            const fieldError = fieldErrors[i];
            if (
              ['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(
                fieldError.message
              )
            ) {
              fieldError.message = 'Size';
            }
            // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
            const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
            const fieldName = `${fieldError.objectName}.${convertedField}`;
            addErrorAlert(
              `Error on field "${fieldName}"`,
              `error.${fieldError.message}`,
              { fieldName }
            );
          }
        } else if (data !== '' && data.message) {
          addErrorAlert(data.message, data.message, data.params);
        } else {
          addErrorAlert(data);
        }
        break;
      }
      case 404:
        addErrorAlert('Not found', 'error.url.not.found');
        break;

      case 403:
      case 401:
        addErrorAlert(
          'UserName Or Password not correct.',
          'error.not.authorize'
        );
        onUnauthenticated();
        break;
      default:
        if (data !== '' && data.message) {
          addErrorAlert(data.message);
        } else {
          addErrorAlert(data);
        }
    }
    return Promise.reject(err);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
