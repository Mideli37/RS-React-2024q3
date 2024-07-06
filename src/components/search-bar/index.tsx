import { type FormEvent, Component } from 'react';

type Props = {
  defaultSearchValue: string;
  setSearchValue: (data: string) => void;
};

export class SearchBar extends Component<Props> {
  private submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) {
      throw new Error('not html form element');
    }
    const data = new FormData(e.target);
    const searchValue = data.get('search')?.toString();
    const { setSearchValue } = this.props;
    if (searchValue) {
      setSearchValue(searchValue.trim());
    }
  };

  public render(): JSX.Element {
    const { defaultSearchValue } = this.props;
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <input
            type="search"
            name="search"
            defaultValue={defaultSearchValue}
          />
        </div>
        <button type="submit">Search</button>
      </form>
    );
  }
}
