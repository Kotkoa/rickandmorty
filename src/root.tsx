import { useAtom } from 'jotai';
import { type FC, lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'src/components/header';

import { selectedCharacterStore } from './store/characters.store';

const Details = lazy(() =>
  import('src/components/details/details').then((m) => ({ default: m.Details })),
);

export const Root: FC = () => {
  const [selectedCharacter] = useAtom(selectedCharacterStore);

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      {selectedCharacter && (
        <Suspense fallback={<div>Loading details...</div>}>
          <Details />
        </Suspense>
      )}
    </>
  );
};
