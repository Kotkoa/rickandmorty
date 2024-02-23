import { createBrowserRouter } from 'react-router-dom';
import { CharList } from 'src/components/char-list';
import { Ohno } from 'src/components/oh-no';
import { Welcome } from 'src/components/welcome';
import { Root } from 'src/root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/home',
    element: <Root />,
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
    element: <Root />,
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
