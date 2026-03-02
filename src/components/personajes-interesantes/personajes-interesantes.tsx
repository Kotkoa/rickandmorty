import { useSuspenseQuery } from '@apollo/client/react';
import type { FC } from 'react';

import { CharactersByIdsDocument } from '../../generated/graphql';
import { generateUniqueRandomIds } from '../../utils/get-random-collection';
import { CharCard } from '../char-card/char-card';
import styles from './personajes-interesantes.module.scss';

const interestList = generateUniqueRandomIds(3);

export const PersonajesInteresantes: FC = () => {
  const { data: interestData } = useSuspenseQuery(CharactersByIdsDocument, {
    variables: {
      ids: interestList,
    },
  });

  return (
    <div className={styles.personajes}>
      <div className={styles.textStyle}>Personajes interesantes</div>
      <div className={styles.personageTabs}>
        {interestData?.charactersByIds?.map((character) => {
          if (!character) return null;
          return <CharCard character={character} key={character.id} />;
        })}
      </div>
    </div>
  );
};
