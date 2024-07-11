import { useState, type JSX } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ErrorButton } from '../components/error-button';
import { SearchBar } from '../components/search-bar';
import { SearchRequestDisplay } from '../components/search-result-display';

const lsPrefix = 'pokemonMideli37';

export function MainPage(): JSX.Element {
  const [searchValue, setSearchValue] = useState(localStorage.getItem(`${lsPrefix}searchValue`) ?? '');
  const [, setSearchParams] = useSearchParams();
  return (
    <div className="min-h-dvh flex flex-col">
      <ErrorButton />
      <SearchBar
        defaultSearchValue={searchValue}
        setSearchValue={(data) => {
          setSearchValue(data);
          setSearchParams((prev) => new URLSearchParams({ ...Object.fromEntries(prev.entries()), page: '1' }));
          localStorage.setItem(`${lsPrefix}searchValue`, data);
        }}
      />
      <SearchRequestDisplay searchValue={searchValue} />
    </div>
  );
}
