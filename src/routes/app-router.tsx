import { App } from 'App';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { CharList } from '@/Components/char-list';
import { Ohno } from '@/Components/oh-no';
import { Welcome } from '@/Components/welcome';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/home',
    element: <App />,
    children: [
      { path: '', element: <CharList /> },
      {
        path: 'empty',
        element: <Ohno />,
      },
    ],
  },
  {
    path: '/favorite',
    element: <App />,
    children: [
      { path: '', element: <CharList /> },
      {
        path: 'empty',
        element: <Ohno />,
      },
    ],
  },
  {
    path: '*',
    element: <Ohno />,
  },
]);
