let apiUrl = 'http://localhost:4000/api'
let wsUrl = 'ws://localhost:4000';

if (process.env.NODE_ENV !== "development") {
  apiUrl = 'https://api.argonaut.ninja/api';
  wsUrl = 'wss://api.argonaut.ninja';
}

export const API_URL = apiUrl;
export const WEBSOCKET_URL = wsUrl;
