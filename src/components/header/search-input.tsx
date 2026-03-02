import { useAtom } from 'jotai';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'src/icons/search';
import { searchNameStore } from 'src/store/characters.store';
import { CharacterFiltersE } from 'src/types/common.types';
import { debounce } from 'src/utils/debounce';

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
      navigate(`${window.location.pathname}?${params.toString()}`);
    }
  };

  return (
    <>
      <input
        type="text"
        className={styles.search_input}
        placeholder="Buscar personaje..."
        value={inputValue}
        onChange={handleChange}
      />
      <Search className={styles.search_icon} />
    </>
  );
};
