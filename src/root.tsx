import { type FC, lazy, Suspense } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { CharListSkeleton } from '@/components/char-list/char-list-skeleton';
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
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
        <Suspense fallback={<CharListSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      {characterId && (
        <Suspense fallback={<div>Cargando detalles...</div>}>
          <Details characterId={characterId} />
        </Suspense>
      )}
    </>
  );
};
