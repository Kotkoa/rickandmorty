import { type FC, useTransition } from 'react';

import type { CharactersQuery } from '@/generated/graphql';
import { useFilterSearchParams } from '@/hooks/use-filter-search-params';
import { CharacterFiltersE } from '@/types/common.types';

import styles from './pagination.module.scss';

type PaginationProps = {
  pagination: NonNullable<NonNullable<CharactersQuery['characters']>['info']>;
};

export const Pagination: FC<PaginationProps> = ({ pagination }) => {
  const { setParam } = useFilterSearchParams();
  const [isPending, startTransition] = useTransition();

  const totalPages = pagination.pages ?? 1;
  const activePage = pagination.next ? pagination.next - 1 : totalPages;

  const handlePageChange = (page: number) => {
    startTransition(() => {
      setParam(CharacterFiltersE.Page, page.toString());
    });
  };

  return (
    <nav className={styles.pagination} aria-label="Paginación" style={isPending ? { opacity: 0.6 } : undefined}>
      <button
        className={styles.button}
        type="button"
        disabled={!pagination.prev}
        onClick={() => pagination.prev && handlePageChange(pagination.prev)}>
        Anterior
      </button>
      <span className={styles.pageInfo}>
        Página {activePage} de {totalPages}
      </span>
      <button
        className={styles.button}
        type="button"
        disabled={!pagination.next}
        onClick={() => pagination.next && handlePageChange(pagination.next)}>
        Siguiente
      </button>
    </nav>
  );
};
