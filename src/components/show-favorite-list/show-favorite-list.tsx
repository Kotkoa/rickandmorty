import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { favoriteCharacters } from 'src/store/characters.store';

import { StarFavorite } from '../../icons/star-favorite';
import styles from './show-favorite-list.module.scss';

export const ShowFavoriteList: FC = () => {
  const favoritesList = useAtomValue(favoriteCharacters);
  const navigate = useNavigate();

  return (
    <div className={styles.favoriteButtonback}>
      <div className={styles.favoriteButton}>
        <div className={styles.favoText}>Mostrar favoritos:</div>
        <button
          key="favorite"
          className={styles.favoritOff}
          type="button"
          onClick={() => {
            if (!favoritesList.length) return;
            navigate('/favorite');
          }}>
          <div className={styles.round}>
            <StarFavorite className={classNames(styles.starFav, favoritesList.length && styles.starSelected)} />
          </div>
        </button>
      </div>
    </div>
  );
};
