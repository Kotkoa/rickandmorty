import type { FC } from 'react';

import { CharCardSkeleton } from '../char-card/char-card-skeleton';
import styles from './char-list.module.scss';

const SKELETON_COUNT = 20;

export const CharListSkeleton: FC = () => (
  <div className={styles.charcardContainer}>
    <div className={styles.cardsGrid}>
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <CharCardSkeleton key={i} />
      ))}
    </div>
  </div>
);
