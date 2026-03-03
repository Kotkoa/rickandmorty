import classNames from 'classnames';
import type { FC } from 'react';

import { useFilterSearchParams } from '@/hooks/use-filter-search-params';
import { CharacterFiltersE, FilterButtonsE } from '@/types/common.types';

import styles from './gender-tabs.module.scss';

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

export const GenderTabs: FC = () => {
  const { getParam, setParam, deleteParam } = useFilterSearchParams();
  const gender = getParam(CharacterFiltersE.Gender);
  const activeButton = gender
    ? (genderButtons.find((b) => b.toLowerCase() === gender) ?? FilterButtonsE.All)
    : FilterButtonsE.All;

  return (
    <nav className={styles.tabList} role="tablist" aria-label="Filter by gender">
      {genderButtons.map((button) => (
        <button
          key={button}
          role="tab"
          aria-selected={activeButton === button}
          className={classNames(styles.tab, activeButton === button && styles.tabActive)}
          type="button"
          onClick={() => {
            if (button === FilterButtonsE.All) {
              deleteParam(CharacterFiltersE.Gender);
            } else {
              setParam(CharacterFiltersE.Gender, button.toLowerCase());
            }
          }}>
          {genderLabels[button]}
        </button>
      ))}
    </nav>
  );
};
