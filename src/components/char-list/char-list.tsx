import { useAtom } from 'jotai';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { favoriteCharacters, paginationStore } from 'src/store/characters.store';

import { useCharactersByIdsQuery, useCharactersQuery } from '../../generated/graphql';
import { CharCard } from '../char-card';
import { Ohno } from '../oh-no/oh-no';
import { Pagination } from '../pagination/pagination';
import styles from './char-list.module.scss';

export const CharList: FC = () => {
  const [pagePagination, setPagePagination] = useAtom(paginationStore);
  const [favoritIds] = useAtom(favoriteCharacters);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const name = searchParams.get('name');
  const gender = searchParams.get('gender');

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useCharactersQuery({
    variables: {
      page: pagePagination,
      filter: {
        name: name,
        gender: gender,
      },
    },
  });

  const isPageHome = location.pathname === '/home';

  const {
    data: interestData,
    loading: interestLoading,
    error: interestError,
  } = useCharactersByIdsQuery({
    variables: {
      ids: favoritIds,
    },
    skip: !isPageHome || !favoritIds.length,
  });

  const page = searchParams.get('page') || pagePagination;

  useEffect(() => {
    if (page && page !== pagePagination) {
      setPagePagination(Number(page));
    }
  }, [page, setPagePagination]);

  const charactersList = isPageHome ? charactersData?.characters?.results : interestData?.charactersByIds;

  if (charactersLoading || interestLoading) {
    return <div className={styles.noDataContainer}>Loading...</div>;
  }

  if (charactersError || interestError) {
    return (
      <div className={styles.noDataContainer}>
        Error loading characters list, {JSON.stringify(charactersError || interestError)}
      </div>
    );
  }

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
