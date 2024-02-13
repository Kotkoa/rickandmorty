import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './oh-no.module.scss';

export const Ohno: FC = () => {
  const navigate = useNavigate(); //TODO: add clearing of all filtr stores
  return (
    <div className={styles.containerOhno}>
      <div className={styles.textUhoh}>Uh-oh!</div>
      <div className={styles.textLost}>¡Pareces perdido en tu viaje!</div>
      <button className={styles.removeFilter} onClick={() => navigate('/home')}>
        Eliminar filtros
      </button>
    </div>
  );
};
