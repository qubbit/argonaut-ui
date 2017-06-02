import api from '../api';
import Push from 'push.js';
import store from '../store';

export function fetchTeamTable(teamId) {
  return (dispatch) => {
    dispatch({type: 'FETCH_TEAM_RESERVATIONS_REQUEST' });
    return api.fetch(`/teams/${teamId}/table`, {})
    .then((response) => {
      dispatch({ type: 'FETCH_TEAM_RESERVATIONS_SUCCESS', response });
    })
    .catch(() => {
      dispatch({ type: 'FETCH_TEAM_RESERVATIONS_FAILURE' });
    });
  }
}

function notifyUser(message, actorId, excludeCurrentUser = true) {
  const currentUserId = store.getState().session.currentUser.id;

  if(excludeCurrentUser) {
    if(actorId == currentUserId) return;
  }

  Push.create("Argonaut", {
    body: message,
    icon: '/images/android-chrome-192x192.png',
    timeout: 5000,
    onClick: function () {
      window.focus();
      this.close();
    }
  });
}

export function connectToChannel(socket, teamId) {
  return (dispatch) => {
    if (!socket) { return false; }

    const channel = socket.channel(`teams:${teamId}`);
    channel.on('reservation_created', (message) => {
      const notification = `${message.user.username} reserved ${message.environment.name}:${message.application.name}`;
      notifyUser(notification, message.user.id);
      dispatch({ type: 'RESERVATION_CREATED', message });
    });

    channel.on('reservation_deleted', (message) => {
      let reservation = store.getState().team.reservations.find(x => x.id == message.reservation_id);
      const notification = `${reservation.environment.name}:${reservation.application.name} is available!`;
      notifyUser(notification, reservation.user.id);
      dispatch({ type: 'RESERVATION_DELETED', message });
    });

    channel.join().receive('ok', (response) => {
      dispatch({ type: 'TEAM_CONNECTED_TO_CHANNEL', response, channel });
    });

    return false;
  };
}

export function leaveChannel(channel) {
  return (dispatch) => {
    if (channel) {
      channel.leave();
    }
    dispatch({ type: 'USER_LEFT_TEAM' });
  };
}

export function deleteReservation(channel, data) {
  return (dispatch) => new Promise((resolve, reject) => {
    channel.push('delete_reservation', data)
      .receive('error', () => reject());
  });
}

export function createReservation(channel, data) {
  return (dispatch) => new Promise((resolve, reject) => {
    channel.push('new_reservation', data)
      .receive('error', () => reject());
  });
}

export function updateTeam(teamId, data) {
  return (dispatch) => api.patch(`/teams/${teamId}`, data)
    .then((response) => {
      dispatch({ type: 'UPDATE_TEAM_SUCCESS', response });
    });
}

// fetch all applications for all teams
export function fetchApplications(params) {
  return (dispatch) => api.fetch('/applications', params)
    .then((response) => {
      dispatch({ type: 'FETCH_APPLICATIONS_SUCCESS', response });
    });
}

export function fetchTeamApplications(teamId) {
  return (dispatch) => api.fetch(`/teams/${teamId}/applications`)
    .then((response) => {
      dispatch({ type: 'FETCH_TEAM_APPLICATIONS_SUCCESS', response });
    });
}

export function updateEnvironment(environment) {
  return (dispatch) => api.patch(`/teams/${environment.team_id}/environments/${environment.id}`, environment)
    .then((response) => {
      dispatch({ type: 'UPDATE_ENVIRONMENT_SUCCESS', response });
    })
    .catch((error) => {
      dispatch({ type: 'UPDATE_ENVIRONMENT_FAILURE', error });
    });
}

export function setEditingEnvironment(environment) {
  return (dispatch) => dispatch({ type: 'SET_EDITING_ENVIRONMENT', environment });
}

export function updateApplication(application) {
  return (dispatch) => api.patch(`/teams/${application.team_id}/applications/${application.id}`, application)
    .then((response) => {
      dispatch({ type: 'UPDATE_APPLICATION_SUCCESS', response });
    })
    .catch((error) => {
      dispatch({ type: 'UPDATE_APPLICATION_FAILURE', error });
    });
}

export function setEditingApplication(application) {
  return (dispatch) => dispatch({ type: 'SET_EDITING_APPLICATION', application });
}

export function loadApplication(applicationId) {
  return (dispatch) => api.fetch(`/applications/${applicationId}`, {})
    .then((response) => {
      dispatch({ type: 'FETCH_APPLICATION_SUCCESS', response });
    })
    .catch((error) => {
      dispatch({ type: 'FETCH_APPLICATION_FAILURE', error });
    });
}

export function createTeamApplication(teamId, data) {
  return (dispatch) => api.post(`/teams/${teamId}/applications`, data)
    .then((response) => {
      dispatch({ type: 'CREATE_TEAM_APPLICATION_SUCCESS', response });
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_TEAM_APPLICATION_FAILURE', error });
    });
}

// fetch all environments for all teams
export function fetchEnvironments(params) {
  return (dispatch) => api.fetch('/environments', params)
    .then((response) => {
      dispatch({ type: 'FETCH_ENVIRONMENTS_SUCCESS', response });
    });
}

export function fetchTeamEnvironments(teamId) {
  return (dispatch) => api.fetch(`/teams/${teamId}/environments`)
    .then((response) => {
      dispatch({ type: 'FETCH_TEAM_ENVIRONMENTS_SUCCESS', response });
    });
}

export function createTeamEnvironment(teamId, data) {
  return (dispatch) => api.post(`/teams/${teamId}/environments`, data)
    .then((response) => {
      dispatch({ type: 'CREATE_TEAM_ENVIRONMENT_SUCCESS', response });
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_TEAM_ENVIRONMENT_FAILURE', error });
    });
}

export function deleteTeamApplication(teamId, applicationId) {
  return (dispatch) => api.delete(`/teams/${teamId}/applications/${applicationId}`)
    .then((response) => {
      if(response.success) dispatch({ type: 'DELETE_TEAM_APPLICATION_SUCCESS', response });
    });
}

export function deleteTeamEnvironment(teamId, environmentId) {
  return (dispatch) => api.delete(`/teams/${teamId}/environments/${environmentId}`)
    .then((response) => {
      if(response.success) dispatch({ type: 'DELETE_TEAM_ENVIRONMENT_SUCCESS', response });
    });
}

