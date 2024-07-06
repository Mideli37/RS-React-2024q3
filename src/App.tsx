import { Component } from 'react';
import { SearchBar } from './components/search-bar';
import { SearchRequestDisplay } from './components/search-result-display';

type State = {
  searchValue: string;
};
export class App extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem('searchValue') ?? '',
    };
  }

  public render(): JSX.Element {
    const { searchValue: value } = this.state;
    return (
      <div>
        <SearchBar
          defaultSearchValue={value}
          setSearchValue={(data) => {
            this.setState({ searchValue: data });
            localStorage.setItem('searchValue', data);
          }}
        />
        <SearchRequestDisplay searchValue={value} />
      </div>
    );
  }
}
