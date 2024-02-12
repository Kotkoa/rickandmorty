import classNames from 'classnames';
import { useAtom } from 'jotai';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Filtros } from '../icons/filtros';
import { Search } from '../icons/search';
import { genderFilterStore } from '../store/characters.store';
import { FilterButtonsE, GenderFilterE } from '../types/common.types';
import styles from './header.module.scss';
import { ShowFavoriteList } from './show-favorite-list';

const listButton = [
  FilterButtonsE.All,
  FilterButtonsE.Unknown,
  FilterButtonsE.Female,
  FilterButtonsE.Male,
  FilterButtonsE.Genderless,
];

const mapFilterButtons = (filter: FilterButtonsE): GenderFilterE => {
  const mapFilter: Record<FilterButtonsE, GenderFilterE> = {
    [FilterButtonsE.All]: GenderFilterE.All,
    [FilterButtonsE.Unknown]: GenderFilterE.Unknown,
    [FilterButtonsE.Female]: GenderFilterE.Female,
    [FilterButtonsE.Genderless]: GenderFilterE.Genderless,
    [FilterButtonsE.Male]: GenderFilterE.Male,
  };

  return mapFilter[filter];
};

export const Header: FC = () => {
  const navigate = useNavigate();
  const [genderFilter, setGenderFilter] = useAtom(genderFilterStore);

  // let { path } = useRouteMatch()

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
        {listButton.map((button) => {
          return (
            <button
              key={button}
              className={classNames(styles.buttn, { [styles.buttnHover]: genderFilter === button })}
              type="button"
              onClick={() => {
                const gender = mapFilterButtons(button);
                setGenderFilter(button);
                navigate(`/home?gender=${gender}`);
              }}>
              {button}
            </button>
          );
        })}
      </div>
      <ShowFavoriteList />
    </div>
  );
};
