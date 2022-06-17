import axios from 'axios'

export interface Pokemon {
    name: string,
    url: string,
    types: string[],
    order: number
}

export interface PokemonsList {
    pokemons: Pokemon[]
}

const callAPI = async <R>(path: string): Promise<R> => {
    const res = await ({
        url: `https://pokeapi.co/api/v2/${path}`
    })
    return res.data
}

export const api = {
    getPokemons() {
        return callAPI('pokemon')
    }
}

export async function getPokemons() {
    try {
        const { data, status } = await axios.get<PokemonsList>(
            'https://pokeapi.co/api/v2/pokemon',
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )
        console.log(data)
        return data
    } catch (error) {

    }
}
