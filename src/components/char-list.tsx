import { useAtom } from 'jotai';
import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useCharactersQuery } from '../generated/graphql';
import { paginationStore } from '../store/characters.store';
import { CharCard } from './char-card';
import styles from './char-list.module.scss';
import { Pagination } from './pagination';

export const CharList: FC = () => {
  const [pagePagination, setPagePagination] = useAtom(paginationStore);

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useCharactersQuery({
    variables: {
      page: pagePagination,
    },
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || pagePagination;

  useEffect(() => {
    if (page && page !== pagePagination) {
      setPagePagination(Number(page));
    }
  }, [page, setPagePagination]);

  const charactersList = charactersData?.characters?.results;

  if (charactersLoading) return <div className={styles.noDataContainer}>Loading...</div>;

  if (charactersError) return <div className={styles.noDataContainer}>Error loading characters list</div>;

  if (!charactersData?.characters?.results?.length) return <div className={styles.noDataContainer}>No Data...</div>;

  return (
    <div className={styles.charcardContainer}>
      {charactersList.map((character) => {
        if (!character) return null;

        return <CharCard character={character} key={character.id} />;
      })}
      <Pagination pagination={charactersData.characters.info} />
    </div>
  );
};
