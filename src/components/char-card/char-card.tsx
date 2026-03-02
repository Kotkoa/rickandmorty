import classNames from 'classnames';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { FC, useMemo } from 'react';
import { Characters, CharactersByIdsQuery } from 'src/generated/graphql';
import { StarFavorite } from 'src/icons/star-favorite';
import { ArrayElementT } from 'src/types/array-element';

import { favoriteCharacters, selectedCharacterStore } from '../../store/characters.store';
import styles from './char-card.module.scss';

type CharCardProps = {
  character: ArrayElementT<Characters['results']> | ArrayElementT<CharactersByIdsQuery['charactersByIds']>;
};

export const CharCard: FC<CharCardProps> = ({ character }) => {
  const charId = character?.id ?? '';
  const isFavoriteAtom = useMemo(
    () => selectAtom(favoriteCharacters, (favorites) => favorites.includes(charId)),
    [charId],
  );
  const isFavorite = useAtomValue(isFavoriteAtom);
  const setFavoriteList = useSetAtom(favoriteCharacters);
  const setSelectedCharacter = useSetAtom(selectedCharacterStore);

  const handleFavorites = () => {
    setFavoriteList((prev) => (prev.includes(charId) ? prev.filter((item) => item !== charId) : [...prev, charId]));
  };

  if (!character) return null;

  return (
    <div className={styles.cardBorder}>
      <div className={styles.charImage}>
        <img alt={charId} src={character?.image ?? ''} width={140} />
        <button className={styles.starButton} key="setSelected" type="button" onClick={handleFavorites}>
          <StarFavorite className={classNames(styles.star, { [styles.starSelected]: isFavorite })} />
        </button>
      </div>
      <button type="button" onClick={() => setSelectedCharacter(character.id ?? '')} className={styles.charDetails}>
        <div className={styles.rowLine}>
          <div
            className={classNames(styles.sphereStatus, {
              [styles.sphereStatusred]: character.status !== 'Alive',
            })}
          />
          <div className={styles.textStatus}>
            {character.status} - {character?.species}
          </div>
        </div>
        <div className={classNames(styles.rowLine, styles.charName)}>{character?.name}</div>
        <div className={styles.rowLine}>
          <p className={styles.textLocation}>Last known location:</p>
          {character?.location?.name}
        </div>
        <div className={styles.rowLine}>
          <p className={styles.textLocation}>First seen in:</p>
          {character?.episode[0]?.name}
        </div>
      </button>
    </div>
  );
};
