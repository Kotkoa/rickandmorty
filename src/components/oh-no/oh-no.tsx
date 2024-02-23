import { useAtom } from 'jotai';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { genderFilterStore, paginationStore, searchNameStore } from 'src/store/characters.store';

import styles from './oh-no.module.scss';

export const Ohno: FC = () => {
  const navigate = useNavigate();
  const [, setInputValue] = useAtom(searchNameStore);
  const [, setGenderFilter] = useAtom(genderFilterStore);
  const [, setPage] = useAtom(paginationStore);

  const clearAllStates = () => {
    setInputValue('');
    setGenderFilter(null);
    setPage(null);
    navigate('/home');
  };

  return (
    <div className={styles.containerOhno}>
      <div className={styles.textUhoh}>Uh-oh!</div>
      <div className={styles.textLost}>¡Pareces perdido en tu viaje!</div>
      <button className={styles.removeFilter} onClick={clearAllStates}>
        Eliminar filtros
      </button>
    </div>
  );
};
