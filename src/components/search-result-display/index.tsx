import { useCallback, useEffect, useState, type JSX } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPokemonInfo } from '../../api/api';
import { type PokemonResponse } from '../../api/request.schema';
import { Loader } from '../loader';
import { Pagination } from '../pagination';
import { CardList } from './card-list';

type Props = {
  searchValue: string;
};

type ResponseObj = {
  response: PokemonResponse | null;
  isPending: boolean;
};

function isPositiveNumber(num: unknown): boolean {
  if (Number.isFinite(Number(num)) && Number(num) > 0) {
    return true;
  }
  return false;
}

export function SearchRequestDisplay({ searchValue }: Props): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromSearchParams = searchParams.get('page');
  const page = isPositiveNumber(pageFromSearchParams) && pageFromSearchParams ? +pageFromSearchParams : 1;
  const setPage = useCallback(
    (newPage: number): void => {
      setSearchParams(
        (prev) => new URLSearchParams({ ...Object.fromEntries(prev.entries()), page: newPage.toString() })
      );
    },
    [setSearchParams]
  );

  const pageSize = 10;

  const [queryResponse, setQueryResponse] = useState<ResponseObj>({ response: null, isPending: false });

  useEffect(() => {
    async function updateState(searchTerm?: string): Promise<void> {
      let params;
      if (!searchTerm) {
        params = { page: page.toString(), pageSize: pageSize.toString() };
      } else {
        params = { page: page.toString(), pageSize: pageSize.toString(), q: `name:${searchTerm}*` };
      }

      setQueryResponse((prevState) => ({ ...prevState, isPending: true }));
      const parsedData = await getPokemonInfo(params);
      setQueryResponse({ response: parsedData, isPending: false });
    }
    void updateState(searchValue);
  }, [page, pageSize, searchValue, setPage]);

  const { response, isPending } = queryResponse;

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="grow flex flex-col justify-center items-center bg-teal-50">
      {response && (
        <>
          {response.data.length !== 0 && (
            <Pagination
              curPage={page}
              totalCardCount={response.totalCount}
              pageSize={pageSize}
              setPage={setPage}
            />
          )}
          <CardList data={response.data} />
        </>
      )}
    </div>
  );
}
