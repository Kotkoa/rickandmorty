import { useSuspenseQuery } from '@apollo/client/react';
import type { FC } from 'react';

import { CharactersByIdsDocument } from '@/generated/graphql';

import { CharCard } from '../char-card/char-card';
import styles from './personajes-interesantes.module.scss';

type PersonajesInteresantesProps = {
  ids: string[];
};

export const PersonajesInteresantes: FC<PersonajesInteresantesProps> = ({ ids }) => {
  const { data: interestData } = useSuspenseQuery(CharactersByIdsDocument, {
    variables: {
      ids,
    },
  });

  return (
    <section>
      <h3 className={styles.textStyle}>Personajes interesantes</h3>
      <div className={styles.personageTabs}>
        {interestData?.charactersByIds?.map((character) => {
          if (!character) return null;
          return <CharCard character={character} key={character.id} />;
        })}
      </div>
    </section>
  );
};
