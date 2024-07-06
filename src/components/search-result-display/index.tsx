import { Component } from 'react';
import { type PokemonResponse, responseSchema } from './request.schema';
import { PokemonCard } from '../pokemon-card';
import { buildUrl } from '../../helpers/build-url';

type State = {
  response: PokemonResponse | null;
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
    const response = await fetch(buildUrl(params));
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
