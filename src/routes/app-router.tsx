import { type ComponentType, lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { RouteErrorBoundary, RouteErrorFallback } from '@/components/route-error-boundary';
import { Root } from '@/root';

const Welcome = lazy(() => import('@/components/welcome/welcome').then((m) => ({ default: m.Welcome })));

const CharList = lazy<ComponentType<{ mode: 'home' | 'favorite' }>>(() =>
  import('@/components/char-list/char-list').then((m) => ({ default: m.CharList })),
);

const OhNo = lazy(() => import('@/components/oh-no/oh-no').then((m) => ({ default: m.OhNo })));

const createRouteChildren = (mode: 'home' | 'favorite') => [
  { index: true, element: <CharList mode={mode} />, errorElement: <RouteErrorFallback /> },
  { path: 'empty', element: <OhNo /> },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <Welcome />
      </Suspense>
    ),
  },
  {
    path: '/home',
    element: <Root />,
    errorElement: <RouteErrorBoundary />,
    children: createRouteChildren('home'),
  },
  {
    path: '/favorite',
    element: <Root />,
    errorElement: <RouteErrorBoundary />,
    children: createRouteChildren('favorite'),
  },
  {
    path: '*',
    element: <Root />,
    children: [{ path: '*', element: <OhNo /> }],
  },
]);
