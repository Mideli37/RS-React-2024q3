import { Component } from 'react';
import { SearchBar } from './components/search-bar';
import { SearchRequestDisplay } from './components/search-result-display';
import { ErrorButton } from './components/error-button';

type State = {
  searchValue: string;
};

const lsPrefix = 'pokemonMideli37';

export class MainPage extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem(`${lsPrefix}searchValue`) ?? '',
    };
  }

  public render(): JSX.Element {
    const { searchValue: value } = this.state;
    return (
      <div className="min-h-dvh flex flex-col">
        <ErrorButton />
        <SearchBar
          defaultSearchValue={value}
          setSearchValue={(data) => {
            this.setState({ searchValue: data });
            localStorage.setItem(`${lsPrefix}searchValue`, data);
          }}
        />
        <SearchRequestDisplay searchValue={value} />
      </div>
    );
  }
}
