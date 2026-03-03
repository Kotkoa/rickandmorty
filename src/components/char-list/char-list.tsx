import { skipToken, useSuspenseQuery } from '@apollo/client/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { type FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { CharactersByIdsDocument, CharactersDocument } from '@/generated/graphql';
import { useFilterSearchParams } from '@/hooks/use-filter-search-params';
import { favoriteCharacters, totalCharactersCount } from '@/store/characters.store';
import { CharacterFiltersE } from '@/types/common.types';

import { CharCard } from '../char-card';
import { Pagination } from '../pagination/pagination';
import styles from './char-list.module.scss';

type CharListProps = {
  mode: 'home' | 'favorite';
};

export const CharList: FC<CharListProps> = ({ mode }) => {
  const favoritIds = useAtomValue(favoriteCharacters);
  const setTotalCount = useSetAtom(totalCharactersCount);
  const { getParam } = useFilterSearchParams();
  const location = useLocation();

  const name = getParam(CharacterFiltersE.Name);
  const gender = getParam(CharacterFiltersE.Gender);
  const status = getParam(CharacterFiltersE.Status);
  const page = Number(getParam(CharacterFiltersE.Page)) || 1;
  const originFilter = getParam(CharacterFiltersE.Origin) === 'known';

  const isPageHome = mode === 'home';

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

  const count = charactersData?.characters?.info?.count;
  useEffect(() => {
    if (count) setTotalCount(count);
  }, [count, setTotalCount]);

  const rawList = isPageHome ? charactersData?.characters?.results : interestData?.charactersByIds;
  const charactersList = originFilter
    ? rawList?.filter((c) => c?.origin?.name && c.origin.name.toLowerCase() !== 'unknown')
    : rawList;
  const isEmpty = !charactersList?.length;

  if (isEmpty) {
    const basePath = isPageHome ? '/home' : '/favorite';
    return <Navigate to={`${basePath}/empty${location.search}`} replace />;
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
