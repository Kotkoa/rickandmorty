import classNames from 'classnames';
import type { FC } from 'react';

import { useFilterSearchParams } from '@/hooks/use-filter-search-params';
import { CharacterFiltersE, FilterButtonsE } from '@/types/common.types';

import styles from './header.module.scss';

const genderButtons = [
  FilterButtonsE.All,
  FilterButtonsE.Unknown,
  FilterButtonsE.Female,
  FilterButtonsE.Male,
  FilterButtonsE.Genderless,
];

const genderLabels: Record<FilterButtonsE, string> = {
  [FilterButtonsE.All]: 'All',
  [FilterButtonsE.Unknown]: 'Unknown',
  [FilterButtonsE.Female]: 'Female',
  [FilterButtonsE.Male]: 'Male',
  [FilterButtonsE.Genderless]: 'Genderless',
};

export const GenderFilterBar: FC = () => {
  const { getParam, setParam } = useFilterSearchParams();
  const gender = getParam(CharacterFiltersE.Gender);
  const activeButton = gender
    ? (genderButtons.find((b) => b.toLowerCase() === gender) ?? FilterButtonsE.All)
    : FilterButtonsE.All;

  return (
    <div className={styles.navigate}>
      {genderButtons.map((button) => (
        <button
          key={button}
          className={classNames(styles.buttn, activeButton === button && styles.buttnHover)}
          type="button"
          onClick={() => {
            setParam(CharacterFiltersE.Gender, button === FilterButtonsE.All ? '' : button.toLowerCase());
          }}>
          {genderLabels[button]}
        </button>
      ))}
    </div>
  );
};
