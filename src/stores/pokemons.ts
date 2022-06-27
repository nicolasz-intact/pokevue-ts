import { defineStore } from "pinia";
import type { Pokemon } from "@/models/pokemons";

export interface PokemonsListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface PokemonsState {
    pokemons: Pokemon[];
    isLoading: boolean;
    next_call: string | null;
}

export const usePokemonsStore = defineStore("pokemons", {
    state: (): PokemonsState => ({
        pokemons: [] as Pokemon[],
        isLoading: false,
        next_call: null,
    }),
    getters: {
        getPokemonById: (state) => {
            return (pokemonId: number) =>
                state.pokemons.find((pokemon) => pokemon.id == pokemonId);
        },
        getPokemonId: (state) => {
            return (pokemonId: number) => {
                if (pokemonId < 10) {
                    return "00" + pokemonId;
                } else if (pokemonId < 100) {
                    return "0" + pokemonId;
                } else {
                    return pokemonId;
                }
            };
        },
        getPokemonTypes: (state) => {
            return (pokemon: Pokemon) => {
                const ptypes: string[] = [];
                pokemon.types.forEach((types) => ptypes.push(types.type.name));
                return ptypes;
            };
        },
        getSpriteByName: (state) => {
            return (name: string) => {
                const pokemon = state.pokemons.find((pokemon) => pokemon.name == name);
                return pokemon?.sprite;
            };
        },
        getIsLoadingState: (state) => {
            return state.isLoading;
        },
    },
    actions: {
        async fetchAll() {
            this.isLoading = true;
            const pokemons: PokemonsListResponse = await (!this.next_call
                ? await fetch("https://pokeapi.co/api/v2/pokemon")
                : await fetch(this.next_call)
            ).json();
            this.next_call = pokemons.next ? pokemons.next : null;
            const pokemons_array = [] as Pokemon[]
            await Promise.all(
                pokemons.results.map(async (pokemon) => {
                    const pokemon_description: Pokemon = await (
                        await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                    ).json();
                    const pokemon_species: any = await (
                        await fetch(
                            `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`
                        )
                    ).json();
                    pokemon_description.color = pokemon_species.color.name;
                    pokemon_description.sprite = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/${pokemon_description.id}.png?raw=true`;
                    pokemon_description.egg_goups = pokemon_species.egg_groups;
                    pokemon_description.flavors_text =
                        pokemon_species.flavor_text_entries;
                    pokemon_description.gender_rate = pokemon_species.gender_rate;
                    pokemon_description.evolution_chains_id =
                        pokemon_species.evolution_chain.url
                            .replace(/\/$/, "")
                            .split("/")
                            .pop();

                    pokemons_array.push(pokemon_description);
                })
            );
            pokemons_array.sort((a, b) => a.id - b.id)
            this.pokemons = [...this.pokemons, ...pokemons_array]
            this.isLoading = false;
        },
    },
});
