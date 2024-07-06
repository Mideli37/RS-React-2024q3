export function buildUrl(params?: Record<string, string>): string {
  return `https://api.pokemontcg.io/v2/cards?${new URLSearchParams(params).toString()}`;
}
