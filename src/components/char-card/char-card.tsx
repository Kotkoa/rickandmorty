import classNames from 'classnames';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { CharCardFieldsFragment } from '@/generated/graphql';
import { StarFavorite } from '@/icons/star-favorite';
import { favoriteCharacters } from '@/store/characters.store';

import styles from './char-card.module.scss';

type CharCardProps = {
  character: CharCardFieldsFragment;
};

export const CharCard: FC<CharCardProps> = ({ character }) => {
  const charId = character?.id ?? '';
  const navigate = useNavigate();
  const isFavoriteAtom = useMemo(
    () => selectAtom(favoriteCharacters, (favorites) => favorites.includes(charId)),
    [charId],
  );
  const isFavorite = useAtomValue(isFavoriteAtom);
  const setFavoriteList = useSetAtom(favoriteCharacters);

  const handleFavorites = () => {
    setFavoriteList((prev) => (prev.includes(charId) ? prev.filter((item) => item !== charId) : [...prev, charId]));
  };

  if (!character) return null;

  const handleOpenDetails = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('character', charId);
    navigate({ search: params.toString() });
  };

  return (
    <div className={styles.cardBorder}>
      <div className={styles.charImage}>
        <img alt={charId} src={character?.image ?? ''} width={140} />
        <button className={styles.starButton} key="setSelected" type="button" aria-label="Favorito" onClick={handleFavorites}>
          <StarFavorite className={classNames(styles.star, isFavorite && styles.starSelected)} />
        </button>
      </div>
      <button type="button" onClick={handleOpenDetails} className={styles.charDetails}>
        <div className={styles.rowLine}>
          <div className={classNames(styles.sphereStatus, character.status !== 'Alive' && styles.sphereStatusred)} />
          <div className={styles.textStatus}>
            {character.status} - {character?.species}
          </div>
        </div>
        <div className={classNames(styles.rowLine, styles.charName)}>{character?.name}</div>
        <div className={styles.rowLine}>
          <p className={styles.textLocation}>Última ubicación conocida:</p>
          {character?.location?.name}
        </div>
        <div className={styles.rowLine}>
          <p className={styles.textLocation}>Visto por primera vez en:</p>
          {character?.episode?.[0]?.name}
        </div>
      </button>
    </div>
  );
};
