import type { FC } from 'react';
import { CharacterFiltersE } from '@/types/common.types';

import type { CharactersQuery } from '@/generated/graphql';
import { useFilterSearchParams } from '@/hooks/use-filter-search-params';
import styles from './pagination.module.scss';

type PaginationI = {
  pagination: NonNullable<NonNullable<CharactersQuery['characters']>['info']>;
};

export const Pagination: FC<PaginationI> = ({ pagination }) => {
  const { setParam } = useFilterSearchParams();

  if (!pagination) return null;

  const totalPages = pagination.pages;

  const activePageNumber = () => {
    if (!pagination.prev) {
      return 1;
    } else if (!pagination.next && pagination.pages) {
      return totalPages;
    } else if (pagination.next) {
      return pagination.next - 1;
    }
    return 1;
  };

  const handlePageChange = (page: number) => {
    setParam(CharacterFiltersE.Page, page.toString());
  };

  return (
    <div className={styles.pagination}>
      <button
        key="prevPage"
        type="button"
        disabled={!pagination.prev}
        onClick={() => pagination.prev && handlePageChange(pagination.prev)}>
        prev
      </button>
      <div>
        Page {activePageNumber()} of {totalPages}
      </div>
      <button
        key="nextPage"
        type="button"
        disabled={!pagination.next}
        onClick={() => pagination.next && handlePageChange(pagination.next)}>
        next
      </button>
    </div>
  );
};
