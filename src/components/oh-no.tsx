import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './oh-no.module.scss';

export const Ohno: FC = () => {
  return (
    <div className={styles.containerOhno}>
      <div className={styles.textUhoh}>Uh-oh!</div>
      <div className={styles.textLost}>¡Pareces perdido en tu viaje!</div>
      <button className={styles.removeFilter}>
        <Link to="/home">Eliminar filtros</Link>
      </button>
    </div>
  );
};
