import classNames from 'classnames';
// import { useAtom } from 'jotai';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Filtros } from '../image/icons/filtros';
import { Search } from '../image/icons/search';
import { StarFavorite } from '../image/icons/star-favorite';
// import { favoriteCharacters } from '../store/characters.store';
import { FilterButtonsE } from '../types/common.types';
import styles from './header.module.scss';

const listButton = [
  FilterButtonsE.All,
  FilterButtonsE.Unknown,
  FilterButtonsE.Female,
  FilterButtonsE.Male,
  FilterButtonsE.Genderless,
];

const listGetUrls = ['', '?gender=unknown', '?gender=female', '?gender=male', '?gender=genderless'];

export const Header: FC = () => {
  // const [selectedCharacters, setSelectedCharacters] = useAtom(favoriteCharacters);

  // const dispatch = useDispatch();
  // const history = useHistory();
  // let { path } = useRouteMatch()

  // const base = useSelector((store) => store.account.button);
  // const select = useSelector((state) => state.account.select);

  // const doAfter = (vol) => {
  //   history.push(`/home?name=${vol}`);
  // };

  return (
    <div>
      <div className={styles.header_background}>
        <div className={styles.header_overlay}>
          <Link to="/home">
            <img src="/src/image/rick-and-morty.png" alt="rick and morty" width={347} height={122} />
          </Link>
          <div className={styles.search_block}>
            <input
              type="text"
              className={styles.search_input}
              placeholder="Buscar personaje..."
              // onChange={(e) => (e.key === 'Enter' ? doAfter(e.target.value) : null)}
            />
            <Search className={styles.search_icon} />
            <Filtros className={styles.filtros} />
          </div>
        </div>
      </div>
      <div className={styles.navigate}>
        {listButton.map((it, id) => {
          const base = FilterButtonsE.All;
          return (
            <Link to={`/home${listGetUrls[id]}`} key={it}>
              <button
                className={`${base === it ? styles.buttnHover : styles.buttn}`}
                type="button"
                onClick={() => {
                  // dispatch(setBase(it));
                }}>
                {it}
              </button>
            </Link>
          );
        })}
      </div>
      <div className={styles.favoriteButtonback}>
        <div className={styles.favoriteButton}>
          <div className={styles.favoText}>Mostrar favoritos:</div>
          <Link to="/favorite">
            <button
              key="favorite"
              className={styles.favoritOff}
              type="button"
              onClick={() => {
                // if (select.length >= 1) {
                //   history.push(`/favorite/${select}`);
                //   // dispatch(getSele(select))
                //   dispatch(setBase('Favorite'));
                // }
              }}>
              <div className={styles.round}>
                <StarFavorite
                  className={classNames(
                    styles.starFav,
                    // { [styles.starSelected]: selectedCharacters.includes }
                  )}
                />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
