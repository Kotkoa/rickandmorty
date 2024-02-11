import React, { FC } from 'react';

import styles from './oh-no.module.scss';

export const Ohno: FC = () => {
  return (
    <div className={styles.containerOhno}>
      <div className={styles.textUhoh}>Uh-oh!</div>
      <div className={styles.textLost}>¡Pareces perdido en tu viaje!</div>
      <div className={styles.removeFilter}>Eliminar filtros</div>
    </div>
  );
};
