import type { JSX } from 'react';
import type { PokemonResponse } from '../../api/request.schema';
import { PokemonCard } from '../pokemon-card';

export function CardList({ data }: { data: PokemonResponse['data'] }): JSX.Element {
  return data.length === 0 ? (
    <p>No cards were found</p>
  ) : (
    <ul className="flex flex-row flex-wrap max-w-screen-2xl gap-4 justify-center p-3">
      {data.map((pokemon) => (
        <li
          key={pokemon.id}
          className="z-20"
        >
          <PokemonCard {...pokemon} />
        </li>
      ))}
    </ul>
  );
}
