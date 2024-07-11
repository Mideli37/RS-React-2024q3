import { useEffect, useState, type JSX } from 'react';
import { getPokemonInfo } from '../../api';
import { PokemonCard } from '../pokemon-card';
import { type PokemonResponse } from './request.schema';
import { Pagination } from '../pagination';

type Props = {
  searchValue: string;
};

type ResponseObj = {
  response: PokemonResponse | null;
  isPending: boolean;
};

export function SearchRequestDisplay({ searchValue }: Props): JSX.Element {
  const [page, setPage] = useState(1);

  /* const [pageSize, setPageSize] = useState(10); */

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
      setState({ response: parsedData, isPending: false });
    }
    void updateState(searchValue);
  }, [page, pageSize, searchValue]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const { response, isPending } = state;

  if (isPending) {
    return (
      <div className="grow flex justify-center items-center bg-teal-50">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="grow flex flex-col justify-center items-center bg-teal-50">
      {response?.data.length === 0 ? (
        <p>No cards were found</p>
      ) : (
        <>
          <Pagination
            curPage={page}
            totalCount={response?.totalCount ?? 0}
            pageSize={pageSize}
            setPage={setPage}
          />
          <ul className="flex flex-row flex-wrap max-w-screen-2xl gap-4 justify-center p-3">
            {response?.data.map((pokemon) => (
              <li key={pokemon.id}>
                <PokemonCard {...pokemon} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
