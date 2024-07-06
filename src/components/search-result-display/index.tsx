import { Component } from 'react';
import { type PokemonResponse, responseSchema } from './request.schema';
import { PokemonCard } from '../pokemon-card';
import { buildUrl } from '../../helpers/build-url';

type State = {
  response: PokemonResponse | null;
  isPending: boolean;
};

type Props = {
  searchValue: string;
};

export class SearchRequestDisplay extends Component<Props, State> {
  private page = 1;

  private pageSize = 10;

  constructor(props: Props) {
    super(props);
    this.state = {
      response: null,
      isPending: false,
    };
  }

  public componentDidMount(): void {
    const { searchValue } = this.props;
    void this.updateState(searchValue);
  }

  public componentDidUpdate(prevProps: Readonly<Props>): void {
    const { searchValue } = this.props;
    if (prevProps.searchValue !== searchValue) {
      void this.updateState(searchValue);
    }
  }

  private async updateState(searchValue?: string): Promise<void> {
    let params;
    if (!searchValue) {
      params = { page: this.page.toString(), pageSize: this.pageSize.toString() };
    } else {
      params = { page: this.page.toString(), pageSize: this.pageSize.toString(), q: `name:${searchValue}*` };
    }
    this.setState((state) => ({ ...state, isPending: true }));
    const response = await fetch(buildUrl(params));
    const parsedData = responseSchema.cast(await response.json());
    this.setState({ response: parsedData, isPending: false });
  }

  public render(): JSX.Element {
    const { response, isPending } = this.state;
    if (isPending) {
      return (
        <div className="grow flex justify-center items-center bg-teal-50">
          <div className="loader" />
        </div>
      );
    }
    return (
      <div className="grow flex justify-center items-center bg-teal-50">
        {response?.data.length === 0 ? (
          <p>No cards were found</p>
        ) : (
          <ul className="flex flex-row flex-wrap gap-4 justify-center p-3">
            {response?.data.map((pokemon) => (
              <li key={pokemon.id}>
                <PokemonCard {...pokemon} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
