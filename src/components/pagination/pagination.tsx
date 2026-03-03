import type { FC } from 'react';

import type { CharactersQuery } from '@/generated/graphql';
import { useFilterSearchParams } from '@/hooks/use-filter-search-params';
import { CharacterFiltersE } from '@/types/common.types';

import styles from './pagination.module.scss';

type PaginationI = {
  pagination: NonNullable<NonNullable<CharactersQuery['characters']>['info']>;
};

export const Pagination: FC<PaginationI> = ({ pagination }) => {
  const { setParam } = useFilterSearchParams();

  if (!pagination) return null;

  const totalPages = pagination.pages;

  const getActivePageNumber = () => {
    if (!pagination.prev) {
      return 1;
    }
    if (!pagination.next && pagination.pages) {
      return totalPages;
    }
    return pagination.next ? pagination.next - 1 : 1;
  };
  const activePageNumber = getActivePageNumber();

  const handlePageChange = (page: number) => {
    setParam(CharacterFiltersE.Page, page.toString());
  };

  return (
    <div className={styles.pagination}>
      <button
        key="prevPage"
        type="button"
        aria-label="Página anterior"
        disabled={!pagination.prev}
        onClick={() => pagination.prev && handlePageChange(pagination.prev)}>
        Anterior
      </button>
      <div>
        Página {activePageNumber} de {totalPages}
      </div>
      <button
        key="nextPage"
        type="button"
        aria-label="Página siguiente"
        disabled={!pagination.next}
        onClick={() => pagination.next && handlePageChange(pagination.next)}>
        Siguiente
      </button>
    </div>
  );
};
