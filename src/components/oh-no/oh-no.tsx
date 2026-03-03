import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './oh-no.module.scss';

export const OhNo: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isFavoritePage = pathname.startsWith('/favorite');
  const isEmptyRoute = pathname.endsWith('/empty');

  const getSubtitle = () => {
    if (!isEmptyRoute) return '¡Pareces perdido en tu viaje!';
    if (isFavoritePage) return '¡No tienes personajes favoritos!';
    return '¡No se encontraron resultados!';
  };

  const subtitle = getSubtitle();

  const buttonText = isEmptyRoute && !isFavoritePage ? 'Eliminar filtros' : 'Ir al inicio';

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Uh-oh!</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <button className={styles.button} type="button" onClick={() => navigate('/home?page=1')}>
        {buttonText}
      </button>
    </section>
  );
};
