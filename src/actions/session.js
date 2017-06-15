import { reset } from 'redux-form';
import { Socket } from 'phoenix';
import api from '../api';
import { fetchUserTeams } from './teams';
import { API_URL} from '../config';

const WEBSOCKET_URL = API_URL.replace(/^http/, 'ws').replace('/api', '');

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

export function login(data, router) {
  return (dispatch) => api.post('/sessions', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('login'));
      router.transitionTo('/');
    })
    .catch((e) => {
      // TODO: perhaps message should be e.message instead
      dispatch({ type: 'SHOW_ALERT_FAILURE', message: 'Invalid email or password' });
      console.error(e);
    });
}

export function signup(data, router) {
  return (dispatch) => api.post('/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('signup'));
      router.transitionTo('/');
    })
    .catch((error) => {
      dispatch({ type: 'SIGNUP_FAILURE', error });
    });
}

export function forgotPassword(data, router) {
  return (dispatch) => api.post('/forgot_password', data)
    .then((response) => {
      router.transitionTo('/');
      dispatch({ type: 'SHOW_ALERT_SUCCESS', message: response.message });
    })
    .catch((error) => {
      dispatch({ type: 'SHOW_ALERT_FAILURE', message: error.message });
      dispatch({ type: 'FORGOT_PASSWORD_FAILURE', error });
    });
}

export function logout(router) {
  return (dispatch) => api.delete('/sessions')
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      dispatch({ type: 'LOGOUT' });
      router.transitionTo('/login');
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
