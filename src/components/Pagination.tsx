import { useAtom } from 'jotai';
import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Info } from '../generated/graphql';
import { paginationStore } from '../store/characters.store';
import styles from './pagination.module.scss';

interface PaginationI {
  pagination: Info;
}

export const Pagination: FC<PaginationI> = ({ pagination }) => {
  const [, setPage] = useAtom(paginationStore);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  if (!pagination) return null;

  const activePage = () => {
    if (!pagination.prev) {
      return 1;
    } else if (!pagination.next && pagination.pages) {
      return pagination.pages;
    } else if (pagination.next) {
      return pagination.next - 1;
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        key="prevPage"
        type="button"
        disabled={!pagination.prev}
        onClick={() => {
          if (pagination.prev) {
            setPage(pagination.prev);
            searchParams.set('page', pagination.prev.toString());
            navigate(`${location.pathname}?${searchParams.toString()}`);
          }
        }}>
        prev
      </button>
      <div>
        Page {activePage} of {pagination.pages}
      </div>
      <button
        key="nextPage"
        type="button"
        disabled={!pagination.next}
        onClick={() => {
          if (pagination.next) {
            setPage(pagination.next);
            searchParams.set('page', pagination.next.toString());
            navigate(`${location.pathname}?${searchParams.toString()}`);
          }
        }}>
        next
      </button>
    </div>
  );
};
