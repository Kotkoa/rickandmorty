import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { StarFavorite } from '@/icons/star-favorite';
import { favoriteCharacters } from '@/store/characters.store';

import styles from './show-favorites.module.scss';

export const ShowFavorites: FC = () => {
  const favoritesList = useAtomValue(favoriteCharacters);
  const navigate = useNavigate();
  const hasFavorites = favoritesList.length > 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.label}>Mostrar favoritos:</span>
        <button
          className={styles.button}
          type="button"
          aria-label="View favorites"
          disabled={!hasFavorites}
          onClick={() => navigate('/favorite')}>
          <StarFavorite className={classNames(styles.star, hasFavorites && styles.starActive)} />
        </button>
      </div>
    </div>
  );
};
