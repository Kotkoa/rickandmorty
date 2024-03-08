import { useAtom } from 'jotai';
import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Info } from '../../generated/graphql';
import { paginationStore } from '../../store/characters.store';
import styles from './pagination.module.scss';

type PaginationI = {
  pagination: Info;
};

export const Pagination: FC<PaginationI> = ({ pagination }) => {
  const [, setPage] = useAtom(paginationStore);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

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
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    searchParams.set('page', page.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
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
