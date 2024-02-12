import classNames from 'classnames';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// import { useCharactersQuery } from '../generated/graphql';
import { StarFavorite } from '../icons/star-favorite';
import styles from './charcard.module.scss';
import { Pagination } from './Pagination.js';

export const Charcard: FC = () => {
  // const {
  //   data: charactersData,
  //   loading: charactersLoading,
  //   error: charactersError,
  // } = useCharactersQuery({
  //   variables: {
  //     page: 0,
  //   },
  // });

  // if (charactersError) {
  //   console.warn('Error loading characters list', charactersError);
  // }

  // const select = useSelector((state) => state.account.select)
  // const location = useLocation()

  // useEffect(() => {
  //   if (location.pathname === '/home') {
  //     dispatch(getChar(location.search))
  //   }
  //   if (location.pathname === '/favorite/' + select) {
  //     dispatch(getSele(select))
  //   }
  // }, [dispatch, location.search, location.pathname, select])

  const ifSelected = true;

  const charactersList = []; //charactersData?.characters?.results;

  if (!charactersList) {
    return <div className={styles.noDataContainer}>No Data...</div>;
  }

  // if (charactersLoading) {
  //   return <div className={styles.noDataContainer}>Loading...</div>;
  // }

  return (
    <div className={styles.charcardContainer}>
      {charactersList.map((char) => {
        if (!char) return null;

        return (
          <div className={styles.cardBorder} key={char.name}>
            <div className={styles.charImage}>
              <img className={styles.charImg} alt={char.id ?? ''} src={char.image ?? ''} />
              <button
                className={styles.starButton}
                key="setSelected"
                type="button"
                onClick={() => {
                  // dispatch(setSelected(char.id))
                }}>
                <div className={styles.star}>
                  <StarFavorite className={classNames(styles.star, `${ifSelected ?? '#828282'}`)} />
                </div>
              </button>
            </div>
            <Link to="/model">
              <button
                className={styles.charDetails}
                type="button"
                onClick={() => {
                  // dispatch(setDetails(char.id))
                }}>
                <div className={styles.charStatus}>
                  <div className={char.status === 'Alive' ? 'sphereStatus' : 'sphereStatusred'}></div>
                  <div className={styles.textStatus}>
                    {char.status} - {char.species}
                  </div>
                </div>
                <div className={styles.charName}>{char.name}</div>
                <div className={styles.lastLocation}>
                  <div className={styles.textLocation}>Last known location:</div>
                  {char.location?.name}
                </div>
                <div className={styles.charFirstseen}>
                  <div className={styles.textLocation}>First seen in:</div>
                  {char.episode[0]?.name}
                </div>
              </button>
            </Link>
          </div>
        );
      })}
      <Pagination />
    </div>
  );
};
