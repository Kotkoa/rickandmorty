import { useAtom } from 'jotai';
import { type FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Details } from 'src/components/details';
import { ErrorBoundary } from 'src/components/error-boundary/error-boundary';
import { Header } from 'src/components/header';

import { selectedCharacterStore } from './store/characters.store';

export const Root: FC = () => {
  const [selectedCharacter] = useAtom(selectedCharacterStore);

  return (
    <>
      <Header />
      <ErrorBoundary fallback={<div>Error loading data</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      {selectedCharacter && (
        <Suspense fallback={<div>Loading details...</div>}>
          <Details />
        </Suspense>
      )}
    </>
  );
};
