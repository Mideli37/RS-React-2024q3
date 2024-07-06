import { Component } from 'react';
import { type Pokemon } from '../search-result-display/request.schema';

export class PokemonCard extends Component<Pokemon> {
  public render(): JSX.Element {
    const {
      name,
      flavorText,
      images: { small: image },
    } = this.props;
    return (
      <div>
        <p>{name}</p>
        <img
          alt={name}
          src={image}
        />
        <p>{flavorText ?? 'no additional text'}</p>
      </div>
    );
  }
}
