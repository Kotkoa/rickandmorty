import { createBrowserRouter } from 'react-router-dom';
import { CharList } from 'src/components/char-list';
import { Ohno } from 'src/components/oh-no';
import { Welcome } from 'src/components/welcome';
import { Root } from 'src/root';

const mainChildren = [
  { path: '', element: <CharList /> },
  { path: 'empty', element: <Ohno /> },
];

export const router = createBrowserRouter([
  { path: '/', element: <Welcome /> },
  { path: '/home', element: <Root />, children: mainChildren },
  { path: '/favorite', element: <Root />, children: mainChildren },
  { path: '*', element: <Ohno /> },
]);
