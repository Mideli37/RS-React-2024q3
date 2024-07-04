import { Component } from 'react';
import { SearchBar } from './components/search-bar';

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
  /*   private async fetchData(): Promise<void> {
    fetch('https://api.pokemontcg.io/v2/cards?q=!name:charizard')
      .then((res) => res.json())
      .then((data) => this.setState(data));
  } */

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
      </div>
    );
  }
}
