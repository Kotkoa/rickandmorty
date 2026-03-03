import { useSuspenseQuery } from '@apollo/client/react';
import { useAtomValue } from 'jotai';
import { type FC, useState } from 'react';

import { CharactersByIdsDocument } from '@/generated/graphql';
import { totalCharactersCount } from '@/store/characters.store';
import { generateUniqueRandomIds } from '@/utils/get-random-collection';

import { CharCard } from '../char-card/char-card';
import styles from './personajes-interesantes.module.scss';

export const PersonajesInteresantes: FC = () => {
  const total = useAtomValue(totalCharactersCount);
  const [interestList] = useState(() => generateUniqueRandomIds(3, total));

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
