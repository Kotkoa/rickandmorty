import { useAtom } from 'jotai';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Details } from '@/Components/details';
import { Footer } from '@/Components/footer';
import { Header } from '@/Components/header';

import { selectedCharacterStore } from './store/characters.store';

export const App: FC = () => {
  const [selectedCharacter] = useAtom(selectedCharacterStore);

  return (
    <>
      <Header />
      <Outlet />
      {selectedCharacter && <Details />}
      <Footer />
    </>
  );
};
