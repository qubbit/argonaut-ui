import { sortBy } from 'lodash';

const initialState = {
  channel: null,
  currentTeam: {},
  reservations: [],
  applications: [],
  environments: [],
  loadingReservations: false,
  editingApplication: {},
  editingEnvironment: {},
  pagination: {
    total_pages: 0,
    total_entries: 0,
    page_size: 0,
    page_number: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_EDITING_APPLICATION':
      return {
        ...state,
        editingApplication: action.application
      };
    case 'SET_EDITING_ENVIRONMENT':
      return {
        ...state,
        editingEnvironment: action.environment
      };
    case 'FETCH_APPLICATION_SUCCESS':
      return {
        ...state,
        applications: []
      };
    case 'UPDATE_APPLICATION_SUCCESS':
      const appList = state.applications.filter(a => a.id != action.response.id);

      return {
        ...state,
        editingApplication: {},
        applications: sortBy([ ...appList, action.response ], a => a.name)
      };
    case 'UPDATE_ENVIRONMENT_SUCCESS':
      const envList = state.environments.filter(e => e.id != action.response.id);

      return {
        ...state,
        editingEnvironment: {},
        environments: sortBy([ ...envList, action.response ], e => e.name)
      };
    case 'FETCH_TEAM_RESERVATIONS_SUCCESS':
      return {
        ...state,
        reservations: action.response.reservations,
        applications: action.response.applications,
        environments: action.response.environments,
        loadingReservations: false
      };
    case 'FETCH_TEAM_RESERVATIONS_REQUEST':
      return {
        ...state,
        loadingReservations: true
      };
    case 'FETCH_TEAM_RESERVATIONS_FAILURE':
      return {
        ...state,
        loadingReservations: false,
      };
    case 'TEAM_CONNECTED_TO_CHANNEL':
      return {
        ...state,
        channel: action.channel,
        currentTeam: action.response.team
      };
    case 'USER_LEFT_TEAM':
      return initialState;
    case 'RESERVATION_CREATED':
      return {
        ...state,
        reservations: [
          ...state.reservations,
          action.message,
        ],
      };
    case 'RESERVATION_DELETED':
      const reservation_id = action.message.reservation_id;
      const filteredReservations = state.reservations.filter(r => r.id != reservation_id);
      return {
        ...state,
        reservations: [
          ...filteredReservations
        ]
      };
    case 'UPDATE_TEAM_SUCCESS':
      return {
        ...state,
        currentTeam: action.response.data,
      };
    case 'FETCH_TEAM_APPLICATIONS_SUCCESS':
      return {
        ...state,
        applications: action.response.data
      };
    case 'FETCH_APPLICATIONS_SUCCESS':
      return {
        ...state,
        all: action.response.data,
        pagination: action.response.pagination
      };
    case 'CREATE_TEAM_APPLICATION_SUCCESS':
      return {
        ...state,
        applications: [
          action.response,
          ...state.applications
        ],
        newApplicationErrors: []
      };
    case 'DELETE_TEAM_APPLICATION_SUCCESS':
      if (action.response.success == false) return state;

      const application_id = action.response.application_id;
      const filteredApplications = state.applications.filter(t => t.id != application_id);

      return {
        ...state,
        applications: [
          ...filteredApplications
        ]
      };
    case 'CREATE_TEAM_APPLICATION_FAILURE':
      return {
        ...state,
        newApplicationErrors: action.error.errors
      };
    case 'FETCH_TEAM_ENVIRONMENTS_SUCCESS':
      return {
        ...state,
        environments: action.response.data
      };
    case 'FETCH_ENVIRONMENTS_SUCCESS':
      return {
        ...state,
        all: action.response.data,
        pagination: action.response.pagination
      };
    case 'CREATE_TEAM_ENVIRONMENT_SUCCESS':
      return {
        ...state,
        environments: [
          action.response,
          ...state.environments
        ],
        newEnvironmentErrors: []
      };
    case 'DELETE_TEAM_ENVIRONMENT_SUCCESS':
      if (action.response.success == false) return state;

      const environment_id = action.response.environment_id;
      const filteredEnvironments = state.environments.filter(t => t.id != environment_id);

      return {
        ...state,
        environments: [
          ...filteredEnvironments
        ]
      };
    case 'CREATE_TEAM_ENVIRONMENT_FAILURE':
      return {
        ...state,
        newEnvironmentErrors: action.error.errors
      };
    default:
      return state;
  }
}
