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
      <form
        onSubmit={this.submitHandler}
        className="flex flex-row p-1 justify-center gap-2 items-center border-b-2"
      >
        <div>
          <input
            className="input"
            type="search"
            name="search"
            defaultValue={defaultSearchValue}
          />
        </div>
        <button
          type="submit"
          className="button"
        >
          Search
        </button>
      </form>
    );
  }
}
