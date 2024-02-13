import { useAtom } from 'jotai';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Details } from 'src/components/details';
import { Footer } from 'src/components/footer';
import { Header } from 'src/components/header';
import { selectedCharacterStore } from 'src/store/characters.store';

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
