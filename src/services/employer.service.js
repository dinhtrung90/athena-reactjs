import axios from 'axios';
import { SERVICE_DOMAIN } from 'src/constants/constants';

const createEmployer = (employer) => {
  return axios.post(SERVICE_DOMAIN + '/api/employees', employer);
};

export const employerService = {
  createEmployer,
};
