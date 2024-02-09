import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/app-router';

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root'),
);
