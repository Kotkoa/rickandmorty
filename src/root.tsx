import { type FC, lazy, Suspense } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { Header } from '@/components/header';

const Details = lazy(() => import('@/components/details/details').then((m) => ({ default: m.Details })));

export const Root: FC = () => {
  const [searchParams] = useSearchParams();
  const characterId = searchParams.get('character');

  return (
    <>
      <Header />
      <Suspense fallback={<div>Cargando...</div>}>
        <Outlet />
      </Suspense>
      {characterId && (
        <Suspense fallback={<div>Cargando detalles...</div>}>
          <Details characterId={characterId} />
        </Suspense>
      )}
    </>
  );
};
