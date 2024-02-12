import './styles/index.css';

import { ApolloProvider } from '@apollo/client';
import { Provider as JotaiProvider } from 'jotai';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';

import { apolloClient } from './apolloClient/apollo-client';
import { router } from './routes/app-router';

ReactDOM.render(
  <StrictMode>
    <JotaiProvider>
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </JotaiProvider>
  </StrictMode>,
  document.getElementById('root'),
);
