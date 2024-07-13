import { useCallback, useEffect, useState, type JSX } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPokemonInfo } from '../../api/api';
import { Pagination } from '../pagination';
import { PokemonCard } from '../pokemon-card';
import { type PokemonResponse } from '../../api/request.schema';
import { Loader } from '../loader';

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

  const [state, setState] = useState<ResponseObj>({ response: null, isPending: false });

  useEffect(() => {
    async function updateState(searchTerm?: string): Promise<void> {
      let params;
      if (!searchTerm) {
        params = { page: page.toString(), pageSize: pageSize.toString() };
      } else {
        params = { page: page.toString(), pageSize: pageSize.toString(), q: `name:${searchTerm}*` };
      }

      setState((prevState) => ({ ...prevState, isPending: true }));
      const parsedData = await getPokemonInfo(params);
      if (parsedData.data.length !== 0) {
        setState({ response: parsedData, isPending: false });
      } else {
        setPage(Math.ceil(parsedData.totalCount / pageSize));
      }
    }
    void updateState(searchValue);
  }, [page, pageSize, searchValue, setPage]);

  const { response, isPending } = state;

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="grow flex flex-col justify-center items-center bg-teal-50">
      {response?.data.length === 0 ? (
        <p>No cards were found</p>
      ) : (
        <>
          <Pagination
            curPage={page}
            totalCardCount={response?.totalCount ?? 0}
            pageSize={pageSize}
            setPage={setPage}
          />
          <ul className="flex flex-row flex-wrap max-w-screen-2xl gap-4 justify-center p-3">
            {response?.data.map((pokemon) => (
              <li
                key={pokemon.id}
                className="z-20"
              >
                <PokemonCard {...pokemon} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
