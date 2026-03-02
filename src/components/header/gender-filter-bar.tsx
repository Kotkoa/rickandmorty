import classNames from 'classnames';
import { useAtom } from 'jotai';
import type { FC } from 'react';
import { genderFilterStore } from 'src/store/characters.store';
import { CharacterFiltersE, FilterButtonsE, GenderFilterE } from 'src/types/common.types';

import { useFilterSearchParams } from '../../hooks/use-filter-search-params';
import styles from './header.module.scss';

const listButton = [
  FilterButtonsE.All,
  FilterButtonsE.Unknown,
  FilterButtonsE.Female,
  FilterButtonsE.Male,
  FilterButtonsE.Genderless,
];

const mapFilterButtons: Record<FilterButtonsE, GenderFilterE> = {
  [FilterButtonsE.All]: GenderFilterE.All,
  [FilterButtonsE.Unknown]: GenderFilterE.Unknown,
  [FilterButtonsE.Female]: GenderFilterE.Female,
  [FilterButtonsE.Genderless]: GenderFilterE.Genderless,
  [FilterButtonsE.Male]: GenderFilterE.Male,
};

export const GenderFilterBar: FC = () => {
  const [genderFilter, setGenderFilter] = useAtom(genderFilterStore);
  const { setParam } = useFilterSearchParams();

  return (
    <div className={styles.navigate}>
      {listButton.map((button) => (
        <button
          key={button}
          className={classNames(styles.buttn, { [styles.buttnHover]: genderFilter === button })}
          type="button"
          onClick={() => {
            setGenderFilter(button);
            setParam(CharacterFiltersE.Gender, mapFilterButtons[button]);
          }}>
          {button}
        </button>
      ))}
    </div>
  );
};
