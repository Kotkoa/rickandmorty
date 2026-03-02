import { skipToken } from '@apollo/client/react';
import { useAtom } from 'jotai';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFilterSearchParams } from 'src/hooks/use-filter-search-params';
import { favoriteCharacters, paginationStore } from 'src/store/characters.store';
import { CharacterFiltersE } from 'src/types/common.types';

import { useCharactersByIdsSuspenseQuery, useCharactersSuspenseQuery } from '../../generated/graphql';
import { CharCard } from '../char-card';
import { Ohno } from '../oh-no/oh-no';
import { Pagination } from '../pagination/pagination';
import styles from './char-list.module.scss';

export const CharList: FC = () => {
  const [pagePagination, setPagePagination] = useAtom(paginationStore);
  const [favoritIds] = useAtom(favoriteCharacters);

  const { getParam } = useFilterSearchParams();
  const location = useLocation();

  const name = getParam(CharacterFiltersE.Name);
  const gender = getParam(CharacterFiltersE.Gender);
  const status = getParam(CharacterFiltersE.Status);

  const isPageHome = location.pathname === '/home';

  const { data: charactersData } = useCharactersSuspenseQuery(
    isPageHome
      ? {
          variables: {
            page: pagePagination,
            filter: { name, gender, status },
          },
        }
      : skipToken,
  );

  const { data: interestData } = useCharactersByIdsSuspenseQuery(
    !isPageHome && favoritIds.length
      ? { variables: { ids: favoritIds } }
      : skipToken,
  );

  const page = getParam(CharacterFiltersE.Page) || pagePagination;

  useEffect(() => {
    if (page && page !== pagePagination) {
      setPagePagination(Number(page));
    }
  }, [page, setPagePagination]);

  const charactersList = isPageHome ? charactersData?.characters?.results : interestData?.charactersByIds;

  if (!charactersList?.length) {
    return (
      <div className={styles.noDataContainer}>
        <Ohno />
      </div>
    );
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
