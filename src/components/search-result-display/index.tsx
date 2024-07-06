import { Component } from 'react';
import { type PokemonResponse, responseSchema } from './request.schema';
import { PokemonCard } from '../pokemon-card';

function buildUrl(params: Record<string, string>): string {
  return `https://api.pokemontcg.io/v2/cards?${new URLSearchParams(params).toString()}`;
}
type State = {
  response: PokemonResponse | null;
};

type Props = {
  searchValue: string;
};
export class SearchRequestDisplay extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      response: null,
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

  private async updateState(searchValue: string): Promise<void> {
    const response = await fetch(buildUrl({ q: `name:${searchValue}`, page: '1', pageSize: '10' }));
    const parsedData = responseSchema.cast(await response.json());
    this.setState({ response: parsedData });
  }

  public render(): JSX.Element {
    const { response } = this.state;
    if (response?.data.length === 0) {
      return (
        <div>
          <p>No cards were found</p>
        </div>
      );
    }
    return (
      <ul>
        {response?.data.map((pokemon) => (
          <li key={pokemon.id}>
            <PokemonCard {...pokemon} />
          </li>
        ))}
      </ul>
    );
  }
}
