import { type ChangeEvent, type FC, useCallback, useRef, useState } from 'react';

import { useClickOutside } from '@/hooks/use-click-outside';
import { useFilterSearchParams } from '@/hooks/use-filter-search-params';
import { Filtros } from '@/icons/filtros';
import { CharacterFiltersE, StatusFilterE } from '@/types/common.types';

import styles from './header.module.scss';

const listStatusFilters = [StatusFilterE.All, StatusFilterE.Alive, StatusFilterE.Dead, StatusFilterE.Unknown];

export const FilterDropdown: FC = () => {
  const { getParam, setParam, deleteParam } = useFilterSearchParams();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const status = getParam(CharacterFiltersE.Status);
  const origin = getParam(CharacterFiltersE.Origin) === 'known';
  const isFilterActive = status || origin;

  const closeDropdown = useCallback(() => setIsDropdownVisible(false), []);
  useClickOutside(dropdownRef, closeDropdown);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (listStatusFilters.some((filter) => filter === value)) {
      setParam(CharacterFiltersE.Status, value);
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setParam(CharacterFiltersE.Origin, 'known');
    } else {
      deleteParam(CharacterFiltersE.Origin);
    }
  };

  return (
    <>
      <div ref={dropdownRef} style={{ display: 'contents' }}>
        <button
          className={styles.toggleFilter}
          aria-label="Filtros"
          onClick={() => setIsDropdownVisible((prev) => !prev)}>
          <Filtros className={styles.filtros} />
        </button>
        {isDropdownVisible && (
          <div className={styles.dropDown}>
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
                <label htmlFor={`status-${statusValue}`}>{statusValue || 'Todos'}</label>
              </div>
            ))}
            <div>
              <input type="checkbox" id="origin" name="origin" checked={origin} onChange={handleCheckboxChange} />
              <label htmlFor="origin">Origen conocido</label>
            </div>
          </div>
        )}
      </div>
      {isFilterActive && (
        <div className={styles.enabledFiltros}>
          Filtros aplicados: {status && <p>Estado</p>}
          {status && origin && <p>, </p>}
          {origin && <p>Origen</p>}
        </div>
      )}
    </>
  );
};
