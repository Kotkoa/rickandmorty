import type { FC } from 'react';
import { Link } from 'react-router-dom';

import rickAndMorty from '@/assets/rick-and-morty.png';

import { FilterDropdown } from './filter-dropdown';
import styles from './header.module.scss';
import { SearchInput } from './search-input';

export const Header: FC = () => (
  <header className={styles.header_background}>
    <Link to="/home">
      <img src={rickAndMorty} alt="rick and morty" width={347} height={122} />
    </Link>
    <div className={styles.search_block}>
      <SearchInput />
      <FilterDropdown />
    </div>
  </header>
);
