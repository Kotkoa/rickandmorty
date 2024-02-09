import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { App } from '../App';
import { Charcard } from '../components/Charcard';
import { Ohno } from '../components/Ohno';
import { Welcome } from '../components/welcome';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/home',
    element: <App />,
  },
  // {
  //   path: '/model',
  //   element: (
  //     <>
  //       <Details />
  //       <Charcard />
  //     </>
  //   ),
  // },
  {
    path: '/favorite',
    element: <Charcard />,
  },
  {
    path: '/empty',
    element: <Ohno />,
  },
]);
