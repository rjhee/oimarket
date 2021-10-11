import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './app';
import './styles/base/reset.css';
import '@fortawesome/fontawesome-free/js/all.js';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/react">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
