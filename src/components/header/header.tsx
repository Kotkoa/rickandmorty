import type { FC } from 'react';
import { Link } from 'react-router-dom';

import rickAndMorty from '@/assets/rick-and-morty.png';

import { ShowFavoriteList } from '../show-favorite-list';
import { FilterDropdown } from './filter-dropdown';
import { GenderFilterBar } from './gender-filter-bar';
import styles from './header.module.scss';
import { SearchInput } from './search-input';

export const Header: FC = () => (
  <div>
    <div className={styles.header_background}>
      <div className={styles.header_overlay}>
        <Link to="/home">
          <img src={rickAndMorty} alt="rick and morty" width={347} height={122} />
        </Link>
        <div className={styles.search_block}>
          <SearchInput />
          <FilterDropdown />
        </div>
      </div>
    </div>
    <GenderFilterBar />
    <ShowFavoriteList />
  </div>
);
