import { skipToken, useSuspenseQuery } from '@apollo/client/react';
import { useAtom } from 'jotai';
import { type FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CharactersByIdsDocument, CharactersDocument } from 'src/generated/graphql';
import { useFilterSearchParams } from 'src/hooks/use-filter-search-params';
import { favoriteCharacters } from 'src/store/characters.store';
import { CharacterFiltersE } from 'src/types/common.types';

import { CharCard } from '../char-card';
import { Pagination } from '../pagination/pagination';
import styles from './char-list.module.scss';

export const CharList: FC = () => {
  const [favoritIds] = useAtom(favoriteCharacters);
  const { getParam } = useFilterSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const name = getParam(CharacterFiltersE.Name);
  const gender = getParam(CharacterFiltersE.Gender);
  const status = getParam(CharacterFiltersE.Status);
  const page = Number(getParam(CharacterFiltersE.Page)) || 1;

  const isPageHome = location.pathname === '/home';

  const { data: charactersData } = useSuspenseQuery(
    CharactersDocument,
    isPageHome
      ? {
          variables: {
            page,
            filter: { name, gender, status },
          },
        }
      : skipToken,
  );

  const { data: interestData } = useSuspenseQuery(
    CharactersByIdsDocument,
    !isPageHome && favoritIds.length ? { variables: { ids: favoritIds } } : skipToken,
  );

  const charactersList = isPageHome ? charactersData?.characters?.results : interestData?.charactersByIds;
  const isEmpty = !charactersList?.length;

  useEffect(() => {
    if (isEmpty) {
      const basePath = isPageHome ? '/home' : '/favorite';
      navigate(`${basePath}/empty${location.search}`, { replace: true });
    }
  }, [isEmpty, isPageHome, navigate, location.search]);

  if (isEmpty) {
    return null;
  }

  return (
    <div className={styles.charcardContainer}>
      {charactersList.map((character) => {
        if (!character) return null;

        return <CharCard character={character} key={character.id} />;
      })}
      {isPageHome && charactersData?.characters?.info && <Pagination pagination={charactersData?.characters?.info} />}
    </div>
  );
};
