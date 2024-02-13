import type { FC } from 'react';

import { CharCard } from '@/Components/char-card';
import styles from '@/Components/personajes-interesantes.module.scss';

import { useCharactersByIdsQuery } from '../generated/graphql';
import { generateUniqueRandomIds } from '../utils/get-random-collection';

const interestList = generateUniqueRandomIds(3);

export const PersonajesInteresantes: FC = () => {
  const {
    data: interestData,
    loading: interestLoading,
    error: interestError,
  } = useCharactersByIdsQuery({
    variables: {
      ids: interestList,
    },
  });

  if (interestLoading) return <div className={styles.noDataContainer}>Loading...</div>;

  if (interestError) return <div className={styles.noDataContainer}>Error loading characters list</div>;

  if (!interestData) return <div className={styles.noDataContainer}>No Data...</div>;

  return (
    <div className={styles.personajes}>
      <div className={styles.textStyle}>Personajes interesantes</div>
      <div className={styles.personageTabs}>
        {interestData?.charactersByIds?.map((character) => {
          return <CharCard character={character} key={character?.id} />;
        })}
      </div>
    </div>
  );
};
