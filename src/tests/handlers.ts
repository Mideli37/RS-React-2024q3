import { HttpResponse, delay, http } from 'msw';
import pokemonDetailsMock from './mocks/pokemon-details-mock.json';
import pokemonInfoMock from './mocks/pokemon-info-mock.json';

export const handlers = [
  http.get('https://api.pokemontcg.io/v2/cards/base3-3', async () => {
    await delay();
    HttpResponse.json(pokemonDetailsMock);
  }),
  http.get('https://api.pokemontcg.io/v2/cards', async ({ request }) => {
    const { searchParams } = new URL(request.url);
    await delay();
    if (searchParams.get('page') === '1' && searchParams.get('pageSize') === '10') {
      return HttpResponse.json(pokemonInfoMock);
    }
    return HttpResponse.json();
  }),
];
