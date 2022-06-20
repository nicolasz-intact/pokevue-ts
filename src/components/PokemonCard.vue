<template>
    <MenuCardItem :cardTitle="pokemon.name" :cardBackground="pokemon.color" :cardHeight="110" :cardType="'pokemon'" :cardImg="pokemon.sprite">
        <template #pokemonnumber>
            #{{ pokemonsStore.getPokemonId(pokemon.id) }}
        </template>
        <template #pokemonbadge>
            <div class="badges-list">
                <template v-for="type in getPokemonTypes">
                    <PokemonTypeBadge :type="type" />
                </template>
            </div>
        </template>
    </MenuCardItem>
</template>

<script setup lang="ts">
import MenuCardItem from '@/components/MenuCardItem.vue'
import PokemonTypeBadge from '@/components/PokemonTypeBadge.vue'

import { computed } from "vue"
import { usePokemonsStore } from "@/stores/pokemons"
import type { Pokemon } from "@/models/pokemons"

const pokemonsStore = usePokemonsStore()

const getPokemonTypes = computed(() => {
    let ptypes: string[] = []
    props.pokemon.types.forEach(types => ptypes.push(types.type.name))
    return ptypes
})

const props = defineProps<{
    pokemon: Pokemon;
}>();

</script>

<style scoped lang="scss">
.badges-list {
    margin-left: 1em;
    display: flex;
    flex-direction: column;
    row-gap: 4px;
}
</style>