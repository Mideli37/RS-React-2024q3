import { type FormEvent, type JSX } from 'react';

type Props = {
  defaultSearchValue: string;
  setSearchValue: (data: string) => void;
};

export function SearchBar(props: Props): JSX.Element {
  const { setSearchValue, defaultSearchValue } = props;

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) {
      throw new Error('not html form element');
    }

    const data = new FormData(e.target);
    const searchValue = data.get('search')?.toString().trim();

    if (searchValue) {
      setSearchValue(searchValue);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-row p-1 justify-center gap-2 items-center border-b-2 z-20"
    >
      <div>
        <input
          className="input"
          type="search"
          name="search"
          defaultValue={defaultSearchValue}
          pattern="[\w'\-]*"
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
