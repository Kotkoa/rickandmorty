import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { RouteErrorBoundary, RouteErrorFallback } from '@/components/route-error-boundary';
import { Root } from '@/root';

const Welcome = lazy(() => import('src/components/welcome/welcome').then((m) => ({ default: m.Welcome })));
const CharList = lazy(() => import('src/components/char-list/char-list').then((m) => ({ default: m.CharList })));
const Ohno = lazy(() => import('src/components/oh-no/oh-no').then((m) => ({ default: m.Ohno })));

const mainChildren = [
  { index: true, element: <CharList />, errorElement: <RouteErrorFallback /> },
  { path: 'empty', element: <Ohno /> },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Welcome />
      </Suspense>
    ),
  },
  {
    path: '/home',
    element: <Root />,
    errorElement: <RouteErrorBoundary />,
    children: mainChildren,
  },
  {
    path: '/favorite',
    element: <Root />,
    errorElement: <RouteErrorBoundary />,
    children: mainChildren,
  },
  {
    path: '*',
    element: <Root />,
    children: [{ path: '*', element: <Ohno /> }],
  },
]);
