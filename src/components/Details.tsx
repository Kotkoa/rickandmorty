import classNames from 'classnames';
import { useAtom } from 'jotai';
import React, { FC } from 'react';

import { useCharacterQuery } from '../generated/graphql';
import { Close } from '../icons/closet';
import { Info } from '../icons/info';
import { StarFavorite } from '../icons/star-favorite';
import { favoriteCharacters, selectedCharacterStore } from '../store/characters.store';
import styles from './details.module.scss';
import { PersonajesInteresantes } from './personajes-interesantes';

export const Details: FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useAtom(selectedCharacterStore);

  const handleClose = () => setSelectedCharacter('');

  const [favortesList] = useAtom(favoriteCharacters);

  const {
    data: characterData,
    loading: characterLoading,
    error: characterError,
  } = useCharacterQuery({
    variables: {
      id: selectedCharacter,
    },
  });

  const persDetail = characterData?.character;

  if (characterLoading) return <div className={styles.noDataContainer}>Loading...</div>;

  if (characterError) return <div className={styles.noDataContainer}>Error loading characters list</div>;

  if (!characterData.character) return <div className={styles.noDataContainer}>No Data...</div>;

  return (
    <div className={styles.detailsLayer}>
      <div className={styles.containerDetails}>
        <div className={styles.bgImg}>
          <button className={styles.closet} type="button" onClick={handleClose}>
            <Close />
          </button>
          <div className={styles.infoBasic}>
            <div className={styles.infoImg}>
              <img className={styles.charIm} alt="character" src={`${persDetail.image}`} />
            </div>
            <div className={styles.infoStar}>
              <StarFavorite
                className={classNames(styles.starFav, {
                  [styles.starSelected]: favortesList.includes(selectedCharacter),
                })}
              />
            </div>
            <div className={styles.infoText}>
              <div className={styles.status}>{persDetail.status.toUpperCase()}</div>
              <div className={styles.name}>{persDetail.name}</div>
              <div className={styles.status}>{persDetail.species.toUpperCase()}</div>
            </div>
          </div>
        </div>

        <div className={styles.informacion}>
          <div className={styles.textStyle}>Información</div>
          <div className={styles.tabs}>
            <div className={styles.infoTab}>
              <div className={styles.titleInfo}>
                <div className={styles.ifoSvg}>
                  <Info />
                </div>
                <div className={styles.infoTabText}>Gender:</div>
              </div>
              <div className={styles.infoTabTextDetails}>{persDetail.gender}</div>
            </div>
            <div className={styles.infoTab} key="info-origin">
              <div className={styles.titleInfo}>
                <div className={styles.ifoSvg}>
                  <Info />
                </div>
                <div className={styles.infoTabText}>Origin:</div>
              </div>
              <div className={styles.infoTabTextDetails}>{JSON.stringify(persDetail.origin?.name)}</div>
            </div>
            <div className={styles.infoTab} key="info-type">
              <div className={styles.titleInfo}>
                <div className={styles.ifoSvg}>
                  <Info />
                </div>
                <div className={styles.infoTabText}>Type:</div>
              </div>
              <div className={styles.infoTabTextDetails}>{persDetail.type}</div>
            </div>
          </div>
        </div>
        <div className={styles.borderLine} />
        <div className={styles.episodes}>
          <div className={styles.textStyle}>Episodios</div>
          <div className={styles.episodeTabs}>
            {persDetail.episode.slice(0, 8).map((episode) => {
              return (
                <div className={styles.infEpisoTab} key={episode.id}>
                  <div className={styles.epiInfo}>
                    <div className={styles.epiName}>{episode.name}</div>
                    <div className={styles.episode}>{episode.episode}</div>
                    <div className={styles.epiDate}>{episode.air_date}</div>
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
