import type { FC } from 'react';

import { Header } from '@/components/header';

import { RouteErrorFallback } from './route-error-fallback';

export const RouteErrorBoundary: FC = () => (
  <>
    <Header />
    <RouteErrorFallback showStatus />
  </>
);
