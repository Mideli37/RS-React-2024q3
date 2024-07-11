import { type JSX } from 'react';
import { type Pokemon } from '../search-result-display/request.schema';

export function PokemonCard(pokemonInfo: Pokemon): JSX.Element {
  const {
    name,
    flavorText,
    images: { small: image },
  } = pokemonInfo;

  return (
    <div className="flex flex-col gap-2 p-2 rounded-md  max-w-60 h-full items-center shadow-lg hover:shadow-2xl duration-200 cursor-pointer text-center bg-white">
      <p className="font-bold text-lg text-teal-800">{name}</p>
      <div>
        <img
          className="w-full"
          alt={name}
          src={image}
        />
      </div>
      <p>{flavorText ?? 'no additional text'}</p>
    </div>
  );
}
