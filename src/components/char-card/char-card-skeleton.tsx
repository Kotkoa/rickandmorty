import classNames from 'classnames';
import type { FC } from 'react';

import styles from './char-card-skeleton.module.scss';

export const CharCardSkeleton: FC = () => (
  <div className={styles.skeleton}>
    <div className={styles.image} />
    <div className={styles.details}>
      <div className={classNames(styles.line, styles.lineShort)} />
      <div className={classNames(styles.line, styles.lineName)} />
      <div className={classNames(styles.line, styles.lineLong)} />
      <div className={classNames(styles.line, styles.lineMedium)} />
    </div>
  </div>
);
