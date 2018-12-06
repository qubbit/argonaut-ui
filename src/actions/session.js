import { reset } from 'redux-form';
import { Socket } from 'phoenix';
import api from '../api';
import { fetchUserTeams } from './teams';
import { WEBSOCKET_URL} from '../config';

function connectToSocket(dispatch) {
  const token = JSON.parse(localStorage.getItem('token'));
  const socket = new Socket(`${WEBSOCKET_URL}/socket`, {
    params: { guardian_token: token },
  });
  socket.connect();
  dispatch({ type: 'SOCKET_CONNECTED', socket });
}

function setCurrentUser(dispatch, response) {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  localStorage.setItem('currentUser', JSON.stringify(response.data));
  dispatch({ type: 'AUTHENTICATION_SUCCESS', response });
  dispatch(fetchUserTeams(response.data.id));
  connectToSocket(dispatch);
}

export function userSettings() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

export function login(data, history) {
  return (dispatch) => api.post('/anonymous/sessions', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('login'));
      history.push('/');
    })
    .catch((e) => {
      // TODO: perhaps message should be e.message instead
      dispatch({ type: 'SHOW_ALERT_FAILURE', message: 'Invalid email or password' });
      console.error(e);
    });
}

export function signup(data, history) {
  return (dispatch) => api.post('/anonymous/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('signup'));
      history.push('/');
    })
    .catch((error) => {
      dispatch({ type: 'SIGNUP_FAILURE', error });
    });
}

export function forgotPassword(data, history) {
  return (dispatch) => api.post('/anonymous/forgot_password', data)
    .then((response) => {
      history.push('/');
      dispatch({ type: 'SHOW_ALERT_SUCCESS', message: response.message });
    })
    .catch((error) => {
      dispatch({ type: 'SHOW_ALERT_FAILURE', message: error.message });
      dispatch({ type: 'FORGOT_PASSWORD_FAILURE', error });
    });
}

export function resetPassword(data, history) {
  return (dispatch) => api.post('/anonymous/reset_password', data)
    .then((response) => {
      history.push('/');
      dispatch({ type: 'SHOW_ALERT_SUCCESS', message: response.message });
    })
    .catch((error) => {
      dispatch({ type: 'SHOW_ALERT_FAILURE', message: error.message });
      dispatch({ type: 'RESET_PASSWORD_FAILURE', error });
    });
}

export function logout(history) {
  return (dispatch) => api.delete('/sessions')
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      dispatch({ type: 'LOGOUT' });
      // debugger;
      history.push('/login');
    });
}

export function authenticate() {
  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATION_REQUEST' });
    return api.post('/sessions/refresh')
      .then((response) => {
        setCurrentUser(dispatch, response);
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        window.location = '/login';
      });
  };
}

export const unauthenticate = () => ({ type: 'AUTHENTICATION_FAILURE' });
