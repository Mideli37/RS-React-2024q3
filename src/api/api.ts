import type { PokemonByIdResponse, PokemonResponse } from './request.schema';
import { pokemonByIdSchema, responseSchema } from './request.schema';

const baseUrl = 'https://api.pokemontcg.io/v2/cards';

function buildUrl(params: Record<string, string>): string {
  return `${baseUrl}?${new URLSearchParams(params).toString()}`;
}

export async function getPokemonInfo(params: Record<string, string>): Promise<PokemonResponse> {
  const response = await fetch(buildUrl(params));
  const parsedData = responseSchema.cast(await response.json());
  return parsedData;
}

export async function getPokemonById(id: string): Promise<PokemonByIdResponse> {
  const response = await fetch(`${baseUrl}/${id}`);
  const parsedData = pokemonByIdSchema.cast(await response.json());
  return parsedData;
}
