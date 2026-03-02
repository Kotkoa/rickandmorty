import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './oh-no.module.scss';

export const Ohno: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isFavoritePage = pathname.startsWith('/favorite');
  const isEmptyRoute = pathname.endsWith('/empty');

  const subtitle = !isEmptyRoute
    ? '¡Pareces perdido en tu viaje!'
    : isFavoritePage
      ? '¡No tienes personajes favoritos!'
      : '¡No se encontraron resultados!';

  const buttonText = isEmptyRoute && !isFavoritePage ? 'Eliminar filtros' : 'Ir al inicio';

  return (
    <div className={styles.containerOhno}>
      <div className={styles.textUhoh}>Uh-oh!</div>
      <div className={styles.textLost}>{subtitle}</div>
      <button className={styles.removeFilter} onClick={() => navigate('/home?page=1')}>
        {buttonText}
      </button>
    </div>
  );
};
