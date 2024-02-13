import type { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './welcome.module.scss';

export const Welcome: FC = () => {
  return (
    <div className={styles.background_layer}>
      <div className={styles.background}>
        <div className={styles.overlay_layer}>
          <img src="src/image/Horizontal.png" alt="suazo" />
          <img src="/src/image/rick-and-morty.png" alt="rick and morty" width={664} height={233} />
          <h1>Bienvenido a Rick and Morty</h1>
          <p>
            En esta prueba, evaluaremos su capacidad para construir la aplicación mediante el análisis de código y la
            reproducción del siguiente diseño.
          </p>
          <Link to="/home?page=1">Continuar</Link>
        </div>
      </div>
    </div>
  );
};
