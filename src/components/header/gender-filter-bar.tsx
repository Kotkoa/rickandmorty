import classNames from 'classnames';
import { useAtom } from 'jotai';
import type { FC } from 'react';
import { genderFilterStore } from 'src/store/characters.store';
import { CharacterFiltersE, FilterButtonsE } from 'src/types/common.types';

import { useFilterSearchParams } from '../../hooks/use-filter-search-params';
import styles from './header.module.scss';

const genderButtons = [
  FilterButtonsE.All,
  FilterButtonsE.Unknown,
  FilterButtonsE.Female,
  FilterButtonsE.Male,
  FilterButtonsE.Genderless,
];

export const GenderFilterBar: FC = () => {
  const [genderFilter, setGenderFilter] = useAtom(genderFilterStore);
  const { setParam } = useFilterSearchParams();

  return (
    <div className={styles.navigate}>
      {genderButtons.map((button) => (
        <button
          key={button}
          className={classNames(styles.buttn, genderFilter === button && styles.buttnHover)}
          type="button"
          onClick={() => {
            setGenderFilter(button);
            setParam(CharacterFiltersE.Gender, button === FilterButtonsE.All ? '' : button.toLowerCase());
          }}>
          {button}
        </button>
      ))}
    </div>
  );
};
