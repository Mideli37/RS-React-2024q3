import * as yup from 'yup';

const abilitySchema = yup.object({
  name: yup.string().required(),
  text: yup.string().required(),
  type: yup.string().required(),
});

const attackSchema = yup.object({
  name: yup.string().required(),
  damage: yup.string().required(),
  text: yup.string().required(),
});

const pokemonSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  flavorText: yup.string(),
  images: yup.object({
    small: yup.string().required(),
  }),
  abilities: yup.array(abilitySchema),
  attacks: yup.array(attackSchema),
  hp: yup.string(),
  types: yup.array(yup.string()),
});

export type Pokemon = yup.InferType<typeof pokemonSchema>;

export const responseSchema = yup.object({
  data: yup.array(pokemonSchema).required(),
  page: yup.number().required(),
  pageSize: yup.number().required(),
  totalCount: yup.number().required(),
});

export type PokemonResponse = yup.InferType<typeof responseSchema>;

export const pokemonByIdSchema = yup.object({
  data: pokemonSchema.required(),
});

export type PokemonByIdResponse = yup.InferType<typeof pokemonByIdSchema>;
