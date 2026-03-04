import type { FC } from 'react';
import { Link } from 'react-router-dom';

import horizontal from '@/assets/horizontal.webp';
import rickAndMorty from '@/assets/rick-and-morty.webp';

import styles from './welcome.module.scss';

export const Welcome: FC = () => (
  <main className={styles.background}>
    <img src={horizontal} alt="Suazo" width={135} height={50} decoding="async" />
    <img src={rickAndMorty} alt="Rick and Morty" width={664} height={233} loading="lazy" decoding="async" />
    <h1>Bienvenido a Rick and Morty</h1>
    <p>
      En esta prueba, evaluaremos su capacidad para construir la aplicación mediante el análisis de código y la
      reproducción del siguiente diseño.
    </p>
    <Link to="/home?page=1">Continuar</Link>
  </main>
);
