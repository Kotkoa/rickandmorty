import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { App } from '../App';
import { Charcard } from '../components/charcard';
import { Ohno } from '../components/oh-no';
import { Welcome } from '../components/welcome';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/home',
    element: <App />,
    children: [
      { path: '/home/', element: <Charcard /> },
      {
        path: 'model',
        element: <Charcard />,
      },
      {
        path: 'favorite',
        element: <Charcard />,
      },
      {
        path: '*',
        element: <Ohno />,
      },
    ],
  },
  {
    path: '*',
    element: <Ohno />,
  },
]);
