import type { ChangeEvent, FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFilterSearchParams } from '@/hooks/use-filter-search-params';
import { Search } from '@/icons/search';
import { CharacterFiltersE } from '@/types/common.types';
import { debounce } from '@/utils/debounce';

import styles from './header.module.scss';

export const SearchInput: FC = () => {
  const navigate = useNavigate();
  const { getParam } = useFilterSearchParams();
  const nameFromUrl = getParam(CharacterFiltersE.Name) ?? '';

  const [inputValue, setInputValue] = useState(nameFromUrl);
  const [prevName, setPrevName] = useState(nameFromUrl);

  if (nameFromUrl !== prevName) {
    setPrevName(nameFromUrl);
    setInputValue(nameFromUrl);
  }

  const debouncedNavigate = useMemo(
    () =>
      debounce((searchValue: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set(CharacterFiltersE.Name, searchValue);
        navigate(`/home?${params.toString()}`);
      }, 500),
    [navigate],
  );

  useEffect(() => {
    return () => debouncedNavigate.cancel();
  }, [debouncedNavigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      debouncedNavigate(value);
    } else {
      debouncedNavigate.cancel();
      const params = new URLSearchParams(window.location.search);
      params.delete(CharacterFiltersE.Name);
      navigate(`/home?${params.toString()}`);
    }
  };

  return (
    <>
      <input
        type="text"
        className={styles.search_input}
        placeholder="Buscar personaje..."
        aria-label="Search character"
        value={inputValue}
        onChange={handleChange}
      />
      <Search className={styles.search_icon} />
    </>
  );
};
