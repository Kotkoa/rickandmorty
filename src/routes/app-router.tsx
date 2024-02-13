import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from 'src/App';
import { CharList } from 'src/components/char-list';
import { Ohno } from 'src/components/oh-no';
import { Welcome } from 'src/components/welcome';

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
