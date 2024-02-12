import classNames from 'classnames';
import { useAtom } from 'jotai';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { StarFavorite } from '../icons/star-favorite';
import { favoriteCharacters } from '../store/characters.store';
import styles from './show-favorite-list.module.scss';

export const ShowFavoriteList: FC = () => {
  const [favortesList] = useAtom(favoriteCharacters);

  return (
    <div className={styles.favoriteButtonback}>
      <div className={styles.favoriteButton}>
        <div className={styles.favoText}>Mostrar favoritos:</div>
        <Link to="/favorite">
          <button
            key="favorite"
            className={styles.favoritOff}
            type="button"
            onClick={() => {
              if (!favortesList.length) {
                return null;
              }
              // history.push(`/favorite/${select}`);
            }}>
            <div className={styles.round}>
              <StarFavorite className={classNames(styles.starFav, { [styles.starSelected]: favortesList.length })} />
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};
