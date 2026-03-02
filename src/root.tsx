import { useAtom } from 'jotai';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Details } from 'src/components/details';
import { Header } from 'src/components/header';

import { selectedCharacterStore } from './store/characters.store';

export const Root: FC = () => {
  const [selectedCharacter] = useAtom(selectedCharacterStore);

  return (
    <>
      <Header />
      <Outlet />
      {selectedCharacter && <Details />}
    </>
  );
};
