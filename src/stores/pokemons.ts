import { defineStore } from "pinia"
import axios from 'axios'
import type { Pokemon } from '@/models/pokemons'

export interface PokemonsListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface PokemonsState {
    pokemons: Pokemon[]
}

export const usePokemonsStore = defineStore('pokemons', {
    state: (): PokemonsState => ({
        pokemons: [] as Pokemon[],
    }),
    getters: {
        getPokemons(): Pokemon[] {
            return this.pokemons
        },
        getPokemonId: (state) => {
            return (pokemonId: number) => {
                if(pokemonId < 10) {
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
            axios.get<PokemonsListResponse>('/pokemon', {
                baseURL: 'https://pokeapi.co/api/v2',
            }).then(response => {
                const listpokemons = response.data.results;
                let promises: any = []
                let pokemonscolor: any = []
                listpokemons.forEach(pokemon => {
                    promises.push(
                        axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(
                            res => {
                                res.data.sprite = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/${res.data.id}.png?raw=true`
                                this.pokemons.push(res.data)                        
                            }
                        )
                    )
                    promises.push(
                        axios.get<any>(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`).then(
                            res => {
                                pokemonscolor.push({name: pokemon.name, color: res.data.color.name})                       
                            }
                        )
                    )
                    Promise.all(promises).then(() => {
                        this.pokemons = this.pokemons.sort(( a, b) => a.id - b.id )
                        this.pokemons.forEach(pokemon => {
                            const pokemonToUpdate = pokemonscolor.find(poke => pokemon.name == poke.name)
                            pokemon.color = pokemonToUpdate.color
                        })
                    })
                })
            })
        }
    }
})
