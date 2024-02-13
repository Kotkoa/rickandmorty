import classNames from 'classnames';
import { useAtom } from 'jotai';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { StarFavorite } from '../icons/star-favorite';
import { favoriteCharacters, genderFilterStore, searchNameStore } from '../store/characters.store';
import styles from './show-favorite-list.module.scss';

export const ShowFavoriteList: FC = () => {
  const [favortesList] = useAtom(favoriteCharacters);
  const [, setInputValue] = useAtom(searchNameStore);
  const [, setGenderFilter] = useAtom(genderFilterStore);

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
            if (!favortesList.length) {
              return null;
            }
            setGenderFilter(null);
            setInputValue('');
            navigate('/favorite');
          }}>
          <div className={styles.round}>
            <StarFavorite className={classNames(styles.starFav, { [styles.starSelected]: favortesList.length })} />
          </div>
        </button>
      </div>
    </div>
  );
};
