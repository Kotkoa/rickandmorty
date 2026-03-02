import { useAtom } from 'jotai';
import debounce from 'lodash/debounce';
import type { FC } from 'react';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'src/icons/search';
import { searchNameStore } from 'src/store/characters.store';
import { CharacterFiltersE } from 'src/types/common.types';

import styles from './header.module.scss';

export const SearchInput: FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useAtom(searchNameStore);

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
    if (inputValue) {
      debouncedNavigate(inputValue);
    }
    return () => debouncedNavigate.cancel();
  }, [inputValue, debouncedNavigate]);

  useEffect(() => {
    if (!inputValue) {
      const params = new URLSearchParams(window.location.search);
      const name = params.get(CharacterFiltersE.Name);
      if (name) {
        params.delete(CharacterFiltersE.Name);
        navigate(`${window.location.pathname}?${params.toString()}`);
      }
    }
  }, [inputValue, navigate]);

  return (
    <>
      <input
        type="text"
        className={styles.search_input}
        placeholder="Buscar personaje..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Search className={styles.search_icon} />
    </>
  );
};
