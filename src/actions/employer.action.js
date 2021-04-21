import { employerService } from 'src/services/employer.service';
import { employerConstants } from '../constants/index';
import { history } from '../helpers/history';

const creatEmployer = (employer) => {
  return (dispatch) => {
    dispatch(request(employer));
    employerService.createEmployer(employer).then(
      (employer) => {
        dispatch(success());
        history.push('/employer/' + employer.id);
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
};

const failure = (errorMessage) => {
  return {
    type: employerConstants.CREATE_EMPLOYER_FAILURE,
    payload: errorMessage,
  };
};

const success = (employer) => {
  return { type: employerConstants.CREATE_EMPLOYER_SUCCESS, payload: employer };
};

const request = (employer) => {
  return { type: employerConstants.CREATE_EMPLOYER_REQUEST, payload: employer };
};

export const employerActions = {
  creatEmployer,
};
