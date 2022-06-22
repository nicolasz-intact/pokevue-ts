import { defineStore } from "pinia"
import type { Pokemon } from '@/models/pokemons'

export interface PokemonsListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface PokemonsState {
    pokemons: Pokemon[],
}

export const usePokemonsStore = defineStore('pokemons', {
    state: (): PokemonsState => ({
        pokemons: [] as Pokemon[],
    }),
    getters: {
        getPokemonId: (state) => {
            return (pokemonId: number) => {
                if (pokemonId < 10) {
                    return '00' + pokemonId
                } else if (pokemonId < 100) {
                    return '0' + pokemonId
                } else {
                    return pokemonId
                }
            }
        },
        getPokemonTypes: (state) => {
            return (pokemonId: number) => {
                console.log(pokemonId)
                const pokemon: Pokemon = state.pokemons.find(pokemon => pokemon.id == pokemonId)
                let pokemontypes: any = []
                pokemon.types.forEach(types => {
                    types.types.forEach(type => pokemontypes.push(type.name))
                })
                return pokemontypes
            }
        }
    },
    actions: {
        async fetchAll() {
            const pokemons: PokemonsListResponse = await (
                await fetch('https://pokeapi.co/api/v2/pokemon')
            ).json()
            await Promise.all(
                pokemons.results.map(async (pokemon) => {
                    const pokemon_description: Pokemon = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)).json()
                    const pokemon_color: any = await (await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)).json()
                    pokemon_description.color = pokemon_color.color.name
                    pokemon_description.sprite = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/${pokemon_description.id}.png?raw=true`
                    this.pokemons.push(pokemon_description)
                })
            )
            this.pokemons = this.pokemons.sort((a, b) => a.id - b.id)
        }
    }
})
