import type { FC } from 'react';

import { Info } from '@/icons/info';

import styles from './details.module.scss';

export const InfoTab: FC<{ label: string; value?: string | null }> = ({ label, value }) => (
  <div className={styles.infoTab}>
    <div className={styles.titleInfo}>
      <div className={styles.infoSvg}>
        <Info />
      </div>
      <div className={styles.infoTabText}>{label}</div>
    </div>
    <div className={styles.infoTabTextDetails}>{value}</div>
  </div>
);
