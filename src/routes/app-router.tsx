import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { App } from '../App';
import { CharList } from '../components/char-list';
import { Details } from '../components/details';
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
      { path: '/home/', element: <CharList /> },
      {
        path: 'model',
        element: (
          <>
            <Details />
            <CharList />
          </>
        ),
      },
      {
        path: 'favorite',
        element: <CharList />,
      },
      // {
      //   path: '*',
      //   element: <Ohno />,
      // },
    ],
  },
  {
    path: '*',
    element: <Ohno />,
  },
]);
