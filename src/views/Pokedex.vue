<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'

import { computed } from "vue"
import { useRouter } from 'vue-router'

import { usePokemonsStore } from "@/stores/pokemons"

const router = useRouter()
const pokemonsStore = usePokemonsStore()

const pokemons = computed(() => {
  return pokemonsStore.pokemons
})

</script>

<template>
  <div class="container">
    <h1>Pokedex</h1>
    <div class="pokemons-list">
      <template v-for="pokemon in pokemons" :key="pokemon.id">
        <PokemonCard :pokemon="pokemon" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: var(--background-color-white);
  padding-top: 7em;


  h1 {
    margin: 0em auto 1em auto;
    width: 90%;
    font-weight: bold;
  }

  .pokemons-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    align-items: center;
    padding: 1em;
  }
}
</style>
