import type { PokemonBasicRessource } from "./pokemons";

export interface PokemonEvolution {
  id: string;
  chain: PokemonEvolutionChain;
}

export interface PokemonEvolutionChain {
  evolves_to: PokemonEvolutionChain[];
  species: PokemonBasicRessource;
  evolution_details: PokemonEvolutionDetails[];
}

export interface PokemonEvolutionDetails {
  trigger: PokemonBasicRessource;
  min_level: number;
}
