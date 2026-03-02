import { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import { Filtros } from 'src/icons/filtros';
import { CharacterFiltersE, StatusFilterE } from 'src/types/common.types';

import { useClickOutside } from '../../hooks/use-click-outside';
import { useFilterSearchParams } from '../../hooks/use-filter-search-params';
import styles from './header.module.scss';

const listStatusFilters = [StatusFilterE.All, StatusFilterE.Alive, StatusFilterE.Dead, StatusFilterE.Unknown];

export const FilterDropdown: FC = () => {
  const { getParam, setParam } = useFilterSearchParams();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [origin, setOrigin] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const status = getParam(CharacterFiltersE.Status);
  const isFilterActive = status || origin;

  const closeDropdown = useCallback(() => setIsDropdownVisible(false), []);
  useClickOutside(dropdownRef, closeDropdown);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (Object.values(listStatusFilters).includes(value as StatusFilterE)) {
      setParam(CharacterFiltersE.Status, value);
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrigin(event.target.checked);
  };

  return (
    <>
      <button className={styles.toggleFilter} onClick={() => setIsDropdownVisible((prev) => !prev)}>
        <Filtros className={styles.filtros} />
      </button>
      {isDropdownVisible && (
        <div className={styles.dropDown} ref={dropdownRef}>
          {listStatusFilters.map((statusValue) => (
            <div key={statusValue}>
              <input
                type="radio"
                id={`status-${statusValue}`}
                name={CharacterFiltersE.Status}
                value={statusValue}
                checked={status === statusValue}
                onChange={handleRadioChange}
              />
              <label htmlFor={`status-${statusValue}`}>{statusValue || 'All'}</label>
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
    </>
  );
};
