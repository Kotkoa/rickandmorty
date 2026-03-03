import { type FC, lazy, Suspense } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { Footer } from '@/components/footer';
import { GenderTabs } from '@/components/gender-tabs';
import { Header } from '@/components/header';
import { ShowFavorites } from '@/components/show-favorites';

const Details = lazy(() => import('@/components/details/details').then((m) => ({ default: m.Details })));

export const Root: FC = () => {
  const [searchParams] = useSearchParams();
  const characterId = searchParams.get('character');

  return (
    <>
      <Header />
      <GenderTabs />
      <ShowFavorites />
      <Suspense fallback={<div>Cargando...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
      {characterId && (
        <Suspense fallback={<div>Cargando detalles...</div>}>
          <Details characterId={characterId} />
        </Suspense>
      )}
    </>
  );
};
