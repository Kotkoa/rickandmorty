import classNames from 'classnames';
import { useAtom } from 'jotai';
import type { FC } from 'react';

import { useCharacterQuery } from '../../generated/graphql';
import { Close } from '../../icons/closet';
import { Info } from '../../icons/info';
import { StarFavorite } from '../../icons/star-favorite';
import { favoriteCharacters, selectedCharacterStore } from '../../store/characters.store';
import { PersonajesInteresantes } from '../personajes-interesantes/personajes-interesantes';
import styles from './details.module.scss';

const InfoTab: FC<{ label: string; value?: string | null }> = ({ label, value }) => (
  <div className={styles.infoTab}>
    <div className={styles.titleInfo}>
      <div className={styles.ifoSvg}>
        <Info />
      </div>
      <div className={styles.infoTabText}>{label}</div>
    </div>
    <div className={styles.infoTabTextDetails}>{value}</div>
  </div>
);

export const Details: FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useAtom(selectedCharacterStore);

  const handleClose = () => setSelectedCharacter('');

  const [favoritesList] = useAtom(favoriteCharacters);

  const {
    data: characterData,
    loading: characterLoading,
    error: characterError,
  } = useCharacterQuery({
    variables: {
      id: selectedCharacter,
    },
    skip: !selectedCharacter,
  });

  const character = characterData?.character;

  if (characterLoading) return <div className={styles.noDataContainer}>Loading...</div>;

  if (characterError) return <div className={styles.noDataContainer}>Error loading characters list</div>;

  if (!characterData?.character) return <div className={styles.noDataContainer}>No Data...</div>;

  return (
    <div className={styles.detailsLayer}>
      <div className={styles.containerDetails}>
        <div className={styles.bgImg}>
          <button className={styles.closet} type="button" onClick={handleClose}>
            <Close />
          </button>
          <div className={styles.infoBasic}>
            <div className={styles.infoImg}>
              <img className={styles.charIm} alt="character" src={`${character?.image}`} />
            </div>
            <div className={styles.infoStar}>
              <StarFavorite
                className={classNames(styles.starFav, {
                  [styles.starSelected]: favoritesList.includes(selectedCharacter),
                })}
              />
            </div>
            <div className={styles.infoText}>
              <div className={styles.status}>{character?.status?.toUpperCase()}</div>
              <div className={styles.name}>{character?.name}</div>
              <div className={styles.status}>{character?.species?.toUpperCase()}</div>
            </div>
          </div>
        </div>

        <div className={styles.informacion}>
          <div className={styles.textStyle}>Información</div>
          <div className={styles.tabs}>
            <InfoTab label="Gender:" value={character?.gender} />
            <InfoTab label="Origin:" value={character?.origin?.name} />
            <InfoTab label="Type:" value={character?.type} />
          </div>
        </div>
        <div className={styles.borderLine} />
        <div className={styles.episodes}>
          <div className={styles.textStyle}>Episodios</div>
          <div className={styles.episodeTabs}>
            {character?.episode.slice(0, 8).map((episode) => {
              return (
                <div className={styles.infEpisoTab} key={episode?.id}>
                  <div className={styles.epiInfo}>
                    <div className={styles.epiName}>{episode?.name}</div>
                    <div className={styles.episode}>{episode?.episode}</div>
                    <div className={styles.epiDate}>{episode?.air_date}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.borderLine}></div>
        </div>
        <PersonajesInteresantes />
        <div className={styles.compartir}>
          <button type="button" onClick={handleClose}>
            Compartir personaje
          </button>
        </div>
      </div>
    </div>
  );
};
