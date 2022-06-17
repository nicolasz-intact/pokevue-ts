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
    actions: {
        async fetchAll() {
            axios.get<PokemonsListResponse>('/pokemon', {
                baseURL: 'https://pokeapi.co/api/v2',
            }).then(response => {
                const listpokemons = response.data.results;
                listpokemons.forEach(pokemon => {
                    axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(
                        res => {
                            res.data.sprite = `{https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png}`
                            this.pokemons.push(res.data)                        
                        }
                    )
                }) 
            })
        }
    }
})
