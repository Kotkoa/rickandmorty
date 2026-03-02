import './styles/index.css';

import { ApolloProvider } from '@apollo/client/react';
import { Provider as JotaiProvider } from 'jotai';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { apolloClient } from './apolloClient/apollo-client';
import { router } from './routes/app-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider>
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </JotaiProvider>
  </StrictMode>,
);
