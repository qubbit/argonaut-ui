import api from '../api';
import { SubmissionError } from 'redux-form';

// Normalizes errors like below to show them on the form
// The following is what we received from ecto validation error
// {"errors":{"password":["should be at least 5 character(s)", "error2"]}}
// This is transformed into
// {"password": "should be at least 5 character(s) error2"}
function normalizeFormSubmissionError(obj) {
  const errors = {};

  for (const key in obj.errors) {
    if (obj.errors.hasOwnProperty(key)) {
      errors[key] = obj.errors[key].join(' ');
    }
  }

  return errors;
}

export function fetchUserProfile(params) {
  return dispatch =>
    api.fetch('/profile', params).then(response => {
      dispatch({ type: 'FETCH_USER_PROFILE_SUCCESS', response });
    });
}

export function updateUserProfile(data, router) {
  return dispatch =>
    api
      .patch(`/profile`, data)
      .then(response => {
        dispatch({ type: 'UPDATE_USER_PROFILE_SUCCESS', response });
        dispatch({
          type: 'SHOW_ALERT_SUCCESS',
          message: 'Profile updated!',
          timeout: 3000
        });
      })
      .catch(error => {
        const submissionErrors = {
          ...normalizeFormSubmissionError(error),
          _error:
            'Could not update profile because of errors. Please correct the errors above and resubmit the form.'
        };
        throw new SubmissionError(submissionErrors);
      });
}

export function vacationMode(userId) {
  return dispatch =>
    api.post(`/users/${userId}/vacation`, {}).then(response => {
      dispatch({ type: 'USER_VACATION_MODE_SUCCESS', response });
      dispatch({
        type: 'SHOW_ALERT_SUCCESS',
        timeout: 5000,
        message: 'All your reservations have been cleared 😇'
      });
    });
}
