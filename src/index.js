import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import store from './store';
import App from './containers/App';
import './styles/bootstrap.css';
import './styles/fontawesome-all.css';
import './styles/index.css';

// const theme = {
//   primary: '#007bff'
// };

const theme = {
  primary: '#6f3bff'
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
