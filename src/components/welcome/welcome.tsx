import type { FC } from 'react';
import { Link } from 'react-router-dom';

import horizontal from '@/assets/horizontal.png';
import rickAndMorty from '@/assets/rick-and-morty.png';

import styles from './welcome.module.scss';

export const Welcome: FC = () => (
  <main className={styles.background}>
    <img src={horizontal} alt="Suazo" />
    <img src={rickAndMorty} alt="Rick and Morty" width={664} height={233} />
    <h1>Bienvenido a Rick and Morty</h1>
    <p>
      En esta prueba, evaluaremos su capacidad para construir la aplicación mediante el análisis de código y la
      reproducción del siguiente diseño.
    </p>
    <Link to="/home?page=1">Continuar</Link>
  </main>
);
