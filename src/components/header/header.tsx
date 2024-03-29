import classNames from 'classnames';
import { useAtom } from 'jotai';
import { debounce } from 'lodash';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Filtros } from 'src/icons/filtros';
import { Search } from 'src/icons/search';
import { genderFilterStore, searchNameStore } from 'src/store/characters.store';
import { CharacterFiltersE, FilterButtonsE, GenderFilterE, StatusFilterE } from 'src/types/common.types';

import rickAndMorty from '../../assets/rick-and-morty.png';
import { ShowFavoriteList } from '../show-favorite-list';
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

const listStatusFilters = [StatusFilterE.All, StatusFilterE.Alive, StatusFilterE.Dead, StatusFilterE.Unknown];

export const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get(CharacterFiltersE.Name);

  const [inputValue, setInputValue] = useAtom(searchNameStore);

  const [genderFilter, setGenderFilter] = useAtom(genderFilterStore);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [origin, setOrigin] = useState(false);

  const status = searchParams.get(CharacterFiltersE.Status);

  const isFilterActive = status || origin;

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === 'origin') {
      setOrigin(checked);
    }
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (Object.values(listStatusFilters).includes(value as StatusFilterE)) {
      searchParams.set(CharacterFiltersE.Status, value);
      navigate(`/home?${searchParams.toString()}`);
    }
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const debouncedNavigate = debounce((searchValue: string) => {
    searchParams.set(CharacterFiltersE.Name, searchValue.toString());
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
      searchParams.delete(CharacterFiltersE.Name);
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
            <button className={styles.toggleFilter} onClick={toggleDropdown}>
              <Filtros className={styles.filtros} />
            </button>
            {isDropdownVisible && (
              <div className={styles.dropDown} ref={dropdownRef}>
                {/* <div>
                  <input
                    type="checkbox"
                    id={CharacterFiltersE.Status}
                    name={CharacterFiltersE.Status}
                    checked={Boolean(status)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={CharacterFiltersE.Status}>Filter status</label>
                </div> */}
                {Object.values(listStatusFilters).map((status) => (
                  <div key={status}>
                    <input
                      type="radio"
                      id={`status-${status}`}
                      name={CharacterFiltersE.Status}
                      value={status}
                      checked={searchParams.get(CharacterFiltersE.Status) === status}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor={`status-${status}`}>{status || 'All'}</label>
                  </div>
                ))}
                <div>
                  <input type="checkbox" id="origin" name="origin" checked={origin} onChange={handleCheckboxChange} />
                  <label htmlFor="origin">Filter origin</label>
                </div>
              </div>
            )}
            {isFilterActive && (
              <div className={styles.enabledFiltros}>
                Filtro aplicados: {status && <p>Status</p>}
                {status && origin && <p>, </p>}
                {origin && <p>Origin</p>}
              </div>
            )}
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
                searchParams.set(CharacterFiltersE.Gender, gender);
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
