var apiUrl = 'http://localhost:4000/api'

if (process.env.NODE_ENV !== "development") {
  apiUrl = 'https://theargonaut-api.herokuapp.com/api';
}

export const API_URL = apiUrl;
