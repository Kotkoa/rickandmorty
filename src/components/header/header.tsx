import classNames from 'classnames';
import { useAtom } from 'jotai';
import { debounce } from 'lodash';
import { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Filtros } from '../../icons/filtros';
import { Search } from '../../icons/search';
import rickAndMorty from '../../image/rick-and-morty.png';
import { genderFilterStore, searchNameStore } from '../../store/characters.store';
import { FilterButtonsE, GenderFilterE } from '../../types/common.types';
import { ShowFavoriteList } from '../show-favorite-list/show-favorite-list';
import styles from './header.module.scss';

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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');

  const [inputValue, setInputValue] = useAtom(searchNameStore);

  const [genderFilter, setGenderFilter] = useAtom(genderFilterStore);

  const debouncedNavigate = debounce((searchValue: string) => {
    searchParams.set('name', searchValue.toString());
    navigate(`/home?${searchParams.toString()}`);
  }, 500);

  useEffect(() => {
    if (inputValue) {
      debouncedNavigate(inputValue);
    }

    return () => debouncedNavigate.cancel();
  }, [inputValue, debouncedNavigate]);

  useEffect(() => {
    if (!inputValue && name !== inputValue) {
      searchParams.delete('name');
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
    return;
  }, [inputValue]);

  return (
    <div>
      <div className={styles.header_background}>
        <div className={styles.header_overlay}>
          <Link to="/home">
            <img src={rickAndMorty} alt="rick and morty" width={347} height={122} />
          </Link>
          <div className={styles.search_block}>
            <input
              type="text"
              className={styles.search_input}
              placeholder="Buscar personaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
                searchParams.set('gender', gender);
                navigate(`/home?${searchParams.toString()}`);
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
