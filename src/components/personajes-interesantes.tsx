import React, { FC } from 'react';

import { useCharactersByIdsQuery } from '../generated/graphql';
import { generateUniqueRandomIds } from '../utils/get-random-collection';
import { CharCard } from './char-card';
import styles from './personajes-interesantes.module.scss';

export const PersonajesInteresantes: FC = () => {
  const interestList = generateUniqueRandomIds(3);

  const {
    data: interestData,
    loading: interestLoading,
    error: interestError,
  } = useCharactersByIdsQuery({
    variables: {
      ids: interestList,
    },
    skip: !interestList.length,
  });

  if (interestLoading) return <div className={styles.noDataContainer}>Loading...</div>;

  if (interestError) return <div className={styles.noDataContainer}>Error loading characters list</div>;

  if (!interestData.charactersByIds) return <div className={styles.noDataContainer}>No Data...</div>;

  return (
    <div className={styles.personajes}>
      <div className={styles.textStyle}>Personajes interesantes</div>
      <div className={styles.personageTabs}>
        {interestData.charactersByIds.map((character) => {
          return <CharCard character={character} key={character.id} />;
        })}
      </div>
    </div>
  );
};
