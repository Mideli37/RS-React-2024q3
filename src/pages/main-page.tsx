import { type JSX } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { ErrorButton } from '../components/error-button';
import { SearchBar } from '../components/search-bar';
import { SearchRequestDisplay } from '../components/search-result-display';
import { useLocalStorage } from '../hooks/use-local-storage';

const lsPrefix = 'pokemonMideli37';

export function MainPage(): JSX.Element {
  const [searchValue, setSearchValue] = useLocalStorage({
    key: `${lsPrefix}searchValue`,
  });
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="min-h-dvh flex flex-row justify-center">
      <ErrorButton />
      <div className="flex flex-col h-dvh overflow-y-auto w-full">
        <SearchBar
          defaultSearchValue={searchValue}
          setSearchValue={(data) => {
            setSearchValue(data);
            setSearchParams((prev) => new URLSearchParams({ ...Object.fromEntries(prev.entries()), page: '1' }));
          }}
        />
        <SearchRequestDisplay searchValue={searchValue} />
      </div>
      <Outlet />
    </div>
  );
}
