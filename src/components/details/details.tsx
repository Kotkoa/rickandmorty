import { skipToken, useSuspenseQuery } from '@apollo/client/react';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import type { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CharacterDocument } from '@/generated/graphql';
import { Close } from '@/icons/close';
import { Info } from '@/icons/info';
import { StarFavorite } from '@/icons/star-favorite';
import { favoriteCharacters } from '@/store/characters.store';

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

type DetailsProps = {
  characterId: string;
};

export const Details: FC<DetailsProps> = ({ characterId }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('character');
    setSearchParams(newParams);
  };

  const favoritesList = useAtomValue(favoriteCharacters);

  const { data: characterData } = useSuspenseQuery(
    CharacterDocument,
    characterId ? { variables: { id: characterId } } : skipToken,
  );

  const character = characterData?.character;

  if (!character) return <div className={styles.noDataContainer}>Sin datos...</div>;

  return (
    <div className={styles.detailsLayer}>
      <div className={styles.containerDetails}>
        <div className={styles.bgImg}>
          <button className={styles.closeBtn} type="button" aria-label="Cerrar" onClick={handleClose}>
            <Close />
          </button>
          <div className={styles.infoBasic}>
            <div className={styles.infoImg}>
              <img className={styles.charIm} alt="character" src={`${character?.image}`} />
            </div>
            <div className={styles.infoStar}>
              <StarFavorite
                className={classNames(styles.starFav, favoritesList.includes(characterId) && styles.starSelected)}
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
            <InfoTab label="Género:" value={character?.gender} />
            <InfoTab label="Origen:" value={character?.origin?.name} />
            <InfoTab label="Tipo:" value={character?.type} />
          </div>
        </div>
        <div className={styles.borderLine} />
        <div className={styles.episodes}>
          <div className={styles.textStyle}>Episodios</div>
          <div className={styles.episodeTabs}>
            {character?.episode?.slice(0, 8).map((episode) => {
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
          <button
            type="button"
            onClick={async () => {
              const url = window.location.href;
              const text = `${character?.name} - Rick and Morty`;
              if (navigator.share) {
                await navigator.share({ title: text, url });
              } else {
                await navigator.clipboard.writeText(url);
              }
            }}>
            Compartir personaje
          </button>
        </div>
      </div>
    </div>
  );
};
