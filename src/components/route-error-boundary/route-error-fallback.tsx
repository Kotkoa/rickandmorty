import type { FC } from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import styles from './route-error-boundary.module.scss';

type RouteErrorFallbackProps = {
  showStatus?: boolean;
};

export const RouteErrorFallback: FC<RouteErrorFallbackProps> = ({ showStatus }) => {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = 'Error';
  let message = 'Algo salió mal al cargar los datos.';

  if (isRouteErrorResponse(error)) {
    if (showStatus) title = `Error ${error.status}`;
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <button className={styles.button} type="button" onClick={() => navigate('/home?page=1')}>
          Ir al inicio
        </button>
        <button className={styles.buttonOutline} type="button" onClick={() => navigate(0)}>
          Intentar de nuevo
        </button>
      </div>
    </section>
  );
};
