import { useAtom } from 'jotai';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Details } from './components/details';
import { Footer } from './components/footer';
import { Header } from './components/header';
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
