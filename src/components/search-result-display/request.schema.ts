import * as yup from 'yup';

const pokemonSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  flavorText: yup.string(),
  images: yup.object({
    small: yup.string().required(),
  }),
});

export type Pokemon = yup.InferType<typeof pokemonSchema>;

export const responseSchema = yup.object({
  data: yup.array(pokemonSchema).required(),
  page: yup.number().required(),
  pageSize: yup.number().required(),
  totalCount: yup.number().required(),
});

export type PokemonResponse = yup.InferType<typeof responseSchema>;
