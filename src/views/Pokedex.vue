<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'

import { onMounted, computed } from "vue"
import { usePokemonsStore } from "@/stores/pokemons"

const pokemonsStore = usePokemonsStore()

const pokemons = computed(() => {
  return pokemonsStore.pokemons
})

onMounted(() => {
  (!pokemonsStore.pokemons) ? pokemonsStore.getPokemons() : pokemonsStore.fetchAll()
})
</script>

<template>
  <div class="container">
    <main>
      <h1>Pokedex</h1>
      <div class="pokemons-list">
        <template v-for="pokemon in pokemons" :key="pokemon.id">
          <PokemonCard :pokemon="pokemon" />
        </template>
      </div>
    </main>
  </div>

</template>

<style lang="scss">
.container {
  background-color: var(--background-lightgrey);

  main {
    background-color: var(--background-color-white);
    border-radius: 0px 0px 30px 30px;

    h1 {
      margin: 0em auto 1em auto;
      padding-top: 4em;
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
}
</style>
