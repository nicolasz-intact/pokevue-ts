import { defineStore } from 'pinia'
import type { PokemonEvolution } from '@/models/pokemon-evolution'

export interface PokemonChainEvolutionState {
    pokemonsEvolution: PokemonEvolution[],
}

export const usePokemonsEvolutionStore = defineStore('pokemons-evolution', {
    state: (): PokemonChainEvolutionState => ({
        pokemonsEvolution: [] as PokemonEvolution[]
    }),
    getters: {
        getEvolutionChainById: (state) => {
            return (idChain: string) => state.pokemonsEvolution.find(chain => chain.id == idChain)
        },
    },
    actions: {
        async fetchPokemonEvol(url_chain_id: string) {
            const evolutions_chain: PokemonEvolution = await (
                await fetch(`https://pokeapi.co/api/v2/evolution-chain/${url_chain_id}`)
            ).json()
            this.pokemonsEvolution.push(evolutions_chain)
        }
    }
})
