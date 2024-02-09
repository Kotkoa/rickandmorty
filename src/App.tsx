import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from './components/footer';
import { Header } from './components/header';

export const App: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
