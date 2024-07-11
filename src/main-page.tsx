import { useState, type JSX } from 'react';
import { ErrorButton } from './components/error-button';
import { SearchBar } from './components/search-bar';
import { SearchRequestDisplay } from './components/search-result-display';

const lsPrefix = 'pokemonMideli37';

export function MainPage(): JSX.Element {
  const [searchValue, setSearchValue] = useState(localStorage.getItem(`${lsPrefix}searchValue`) ?? '');

  return (
    <div className="min-h-dvh flex flex-col">
      <ErrorButton />
      <SearchBar
        defaultSearchValue={searchValue}
        setSearchValue={(data) => {
          setSearchValue(data);
          localStorage.setItem(`${lsPrefix}searchValue`, data);
        }}
      />
      <SearchRequestDisplay searchValue={searchValue} />
    </div>
  );
}
