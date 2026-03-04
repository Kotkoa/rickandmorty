import { skipToken, useSuspenseQuery } from '@apollo/client/react';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { type FC, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CharacterDocument } from '@/generated/graphql';
import { Close } from '@/icons/close';
import { StarFavorite } from '@/icons/star-favorite';
import { favoriteCharacters, totalCharactersCount } from '@/store/characters.store';
import { generateUniqueRandomIds } from '@/utils/get-random-collection';

import { PersonajesInteresantes } from '../personajes-interesantes/personajes-interesantes';
import styles from './details.module.scss';
import { InfoTab } from './info-tab';

const MAX_EPISODES = 8;

type DetailsProps = {
  characterId: string;
};

export const Details: FC<DetailsProps> = ({ characterId }) => {
  const navigate = useNavigate();
  const total = useAtomValue(totalCharactersCount);
  const [interestIds] = useState(() => generateUniqueRandomIds(2, total));
  const [shareText, setShareText] = useState('Compartir personaje');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('character');
    navigate({ search: params.toString() });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `${character?.name} - Rick and Morty`;
    try {
      if (navigator.share) {
        await navigator.share({ title: text, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareText('Enlace copiado');
        setTimeout(() => setShareText('Compartir personaje'), 2000);
      }
    } catch {
      /* User cancelled share dialog */
    }
  };

  const favoritesList = useAtomValue(favoriteCharacters);

  const { data: characterData } = useSuspenseQuery(
    CharacterDocument,
    characterId ? { variables: { id: characterId } } : skipToken,
  );

  const character = characterData?.character;

  if (!character) return <div className={styles.noDataContainer}>Sin datos...</div>;

  return (
    <div
      className={styles.detailsLayer}
      role="dialog"
      aria-modal="true"
      aria-label={character.name ?? undefined}
      onClick={handleClose}>
      <div className={styles.containerDetails} onClick={(e) => e.stopPropagation()}>
        <div className={styles.bgImg}>
          <button className={styles.closeBtn} type="button" aria-label="Cerrar" onClick={handleClose}>
            <Close />
          </button>
          <div className={styles.infoBasic}>
            <img className={styles.charIm} alt={character.name ?? 'Character'} src={character.image ?? ''} width={155} height={155} loading="lazy" decoding="async" />
            <div className={styles.infoStar}>
              <StarFavorite
                className={classNames(styles.starFav, favoritesList.includes(characterId) && styles.starSelected)}
              />
            </div>
            <div className={styles.infoText}>
              <span className={styles.status}>{character.status?.toUpperCase()}</span>
              <h2 className={styles.name}>{character.name}</h2>
              <span className={styles.status}>{character.species?.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <section className={styles.informacion}>
          <h3 className={styles.textStyle}>Información</h3>
          <div className={styles.tabs}>
            <InfoTab label="Gender:" value={character.gender} />
            <InfoTab label="Origen:" value={character.origin?.name} />
            <InfoTab label="Type:" value={character.type || 'Unknown'} />
          </div>
        </section>
        <hr className={styles.borderLine} />
        <section className={styles.episodes}>
          <h3 className={styles.textStyle}>Episodios</h3>
          <div className={styles.episodeTabs}>
            {character.episode?.slice(0, MAX_EPISODES).map((episode) => (
              <div className={styles.infEpisoTab} key={episode?.id}>
                <div className={styles.epiName}>{episode?.name}</div>
                <div className={styles.episode}>{episode?.episode}</div>
                <div className={styles.epiDate}>{episode?.air_date}</div>
              </div>
            ))}
          </div>
          <hr className={styles.borderLine} />
        </section>
        <Suspense>
          <PersonajesInteresantes ids={interestIds} />
        </Suspense>
        <button className={styles.shareBtn} type="button" onClick={handleShare}>
          {shareText}
        </button>
      </div>
    </div>
  );
};
