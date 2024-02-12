import { useAtom } from 'jotai';
import React, { FC } from 'react';

import { Info } from '../generated/graphql';
import { paginationStore } from '../store/characters.store';
import styles from './pagination.module.scss';

interface PaginationI {
  pagination: Info;
}

export const Pagination: FC<PaginationI> = ({ pagination }) => {
  const [, setPage] = useAtom(paginationStore);
  if (!pagination) return null;

  let activePage: number;

  if (!pagination.prev) {
    activePage = 1;
  } else if (!pagination.next) {
    activePage = pagination.pages;
  } else {
    activePage = pagination.next - 1;
  }

  return (
    <div className={styles.pagination}>
      <button
        key="prevPage"
        type="button"
        disabled={!pagination.prev}
        onClick={() => {
          if (pagination.prev) {
            // navigate(`${path}${prevPage}`)
            setPage(pagination.prev);
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
            // navigate(`${url}${nextPage}`)
            setPage(pagination.next);
          }
        }}>
        next
      </button>
    </div>
  );
};
