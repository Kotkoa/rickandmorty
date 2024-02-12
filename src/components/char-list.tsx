import { useAtom } from 'jotai';
import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useCharactersByIdsQuery, useCharactersQuery } from '../generated/graphql';
import { favoriteCharacters, paginationStore } from '../store/characters.store';
import { CharCard } from './char-card';
import styles from './char-list.module.scss';
import { Ohno } from './oh-no';
import { Pagination } from './pagination';

export const CharList: FC = () => {
  const [pagePagination, setPagePagination] = useAtom(paginationStore);
  const [favoritIds] = useAtom(favoriteCharacters);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useCharactersQuery({
    variables: {
      page: pagePagination,
    },
  });

  const isPageFavorite = location.pathname === '/favorite';

  const {
    data: interestData,
    loading: interestLoading,
    error: interestError,
  } = useCharactersByIdsQuery({
    variables: {
      ids: favoritIds,
    },
    skip: !isPageFavorite || !favoritIds.length,
  });

  const page = searchParams.get('page') || pagePagination;

  useEffect(() => {
    if (page && page !== pagePagination) {
      setPagePagination(Number(page));
    }
  }, [page, setPagePagination]);

  const charactersList = isPageFavorite ? interestData?.charactersByIds : charactersData?.characters?.results;

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

  if (!charactersList) {
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
      {!isPageFavorite && <Pagination pagination={charactersData.characters.info} />}
    </div>
  );
};
