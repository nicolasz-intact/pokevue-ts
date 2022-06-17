export interface Pokemon {
    id: number,
    name: string,
    url: string,
    types: PokemonType[],
    height: number,
    weight: number,
    description: string,
    stats: PokemonStat[],
    abilities: PokemonAbility[],
    moves: PokemonMove[],
    gender_rate: number,
    sprite: string,
    sprites: PokemonSprites
}

export interface PokemonBasicRessource {
    url: string,
    name: string
}

export interface PokemonsList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface PokemonType {
    slot: number,
    types: PokemonBasicRessource[]
}

export interface PokemonStat {
    base_stat: number,
    effort: number,
    stat: PokemonBasicRessource[]
}

export interface PokemonAbility {
    slot: number,
    is_hidden: boolean,
    ability: PokemonBasicRessource
}

export interface PokemonMove {
    move: PokemonBasicRessource;
}

export interface PokemonSprites {
    front_default: string | null;
    front_shiny: string | null;
    front_female: string | null;
    front_shiny_female: string | null;
    back_default: string | null;
    back_shiny: string | null;
    back_female: string | null;
    back_shiny_female: string | null;
  }