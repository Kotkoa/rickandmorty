import { useAtom } from 'jotai';
import React, { FC } from 'react';

import { useCharactersQuery } from '../generated/graphql';
import { paginationStore } from '../store/characters.store';
import { CharCard } from './char-card';
import styles from './char-list.module.scss';
import { Pagination } from './pagination';

export const CharList: FC = () => {
  const [page] = useAtom(paginationStore);

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useCharactersQuery({
    variables: {
      page,
    },
  });

  // const navigate = useNavigate()

  // const info = useSelector((store) => store.account.pages)

  // const nextPage = info.next
  //   ? info.next.split('https://rickandmortyapi.com/api/character')[1]
  //   : ''
  // const prevPage = info.prev
  //   ? info.prev.split('https://rickandmortyapi.com/api/character')[1]
  //   : ''

  // const location = useLocation()

  // useEffect(() => {
  //   if (location.pathname === '/home') {
  //     dispatch(getChar(location.search))
  //   }
  //   if (location.pathname === '/favorite/' + select) {
  //     dispatch(getSele(select))
  //   }
  // }, [dispatch, location.search, location.pathname, select])

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
