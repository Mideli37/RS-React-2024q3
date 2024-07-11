import type { JSX } from 'react';

type PaginationProps = {
  curPage: number;
  totalCardCount: number;
  pageSize: number;
  setPage: (page: number) => void;
};

export function Pagination({ curPage, totalCardCount, pageSize, setPage }: PaginationProps): JSX.Element {
  const totalPageCount = Math.ceil(totalCardCount / pageSize);
  let displayedStart = curPage - 1;
  let displayedEnd = curPage + 1;
  const elements = [];

  if (curPage === 1) {
    displayedEnd += 2;
  } else if (curPage === 2) {
    displayedEnd += 1;
  }
  if (curPage === totalPageCount) {
    displayedStart -= 2;
  } else if (curPage === totalPageCount - 1) {
    displayedStart -= 1;
  }

  for (let i = 1; i <= totalPageCount; i += 1) {
    if (i > 2 && i < displayedStart) {
      elements.push(
        <li className="pagination-li">
          <button
            className="pagination-dots"
            type="button"
            onClick={() => {
              setPage(displayedStart - 1);
            }}
          >
            ...
          </button>
        </li>
      );
      i = displayedStart - 1;
    } else if (i < totalPageCount - 1 && i > displayedEnd) {
      elements.push(
        <li className="pagination-li">
          <button
            type="button"
            className="pagination-dots"
            onClick={() => {
              setPage(displayedEnd + 1);
            }}
          >
            ...
          </button>
        </li>
      );
      i = totalPageCount - 2;
    } else {
      const buttonClass = i === curPage ? 'pagination-numbers active' : 'pagination-numbers';
      elements.push(
        <li className="pagination-li">
          <button
            className={buttonClass}
            type="button"
            onClick={() => {
              setPage(i);
            }}
          >
            {i}
          </button>
        </li>
      );
    }
  }

  return (
    <ul className="flex flex-row">
      <li className="pagination-li">
        <button
          className="pagination-btn"
          type="button"
          onClick={() => {
            setPage(curPage - 1);
          }}
          disabled={curPage === 1}
        >
          prev
        </button>
      </li>
      {...elements}
      <li className="pagination-li">
        <button
          className="pagination-btn"
          type="button"
          onClick={() => {
            setPage(curPage + 1);
          }}
          disabled={curPage === totalPageCount}
        >
          next
        </button>
      </li>
    </ul>
  );
}
