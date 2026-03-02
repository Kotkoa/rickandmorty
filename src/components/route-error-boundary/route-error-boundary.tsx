import type { FC } from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import { Header } from '@/components/header';

import styles from './route-error-boundary.module.scss';

export const RouteErrorBoundary: FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = 'Error';
  let message = 'Algo salió mal al cargar los datos.';

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{message}</div>
        <div className={styles.actions}>
          <button className={styles.button} onClick={() => navigate('/home?page=1')}>
            Ir al inicio
          </button>
          <button className={styles.buttonOutline} onClick={() => navigate(0)}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    </>
  );
};
