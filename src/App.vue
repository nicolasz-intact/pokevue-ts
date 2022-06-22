<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue'
import { usePokemonsStore } from "@/stores/pokemons"

const pokemonsStore = usePokemonsStore()
if(!pokemonsStore.pokemons.length) {
  pokemonsStore.fetchAll()
}

</script>

<template>
  <Header/>
  <div class="main">
    <RouterView />
  </div>
</template>

<style lang="scss">
@import "@/assets/base.scss";

.main {
  max-height: 100vh;
  background-color: var(---lightgrey);
}
</style>
