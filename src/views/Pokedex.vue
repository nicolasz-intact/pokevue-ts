<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { usePokemonsStore } from "@/stores/pokemons";
import PokemonCard from "@/components/PokemonCard.vue";
import SearchModal from "@/components/modals/SearchModal.vue"

const pokemonsStore = usePokemonsStore()

const scrollComponent = ref(null);
const modal_search = ref(false);

if (!pokemonsStore.pokemons.length) {
  await pokemonsStore.fetchAll();
}

const pokemons = computed(() => {
  return pokemonsStore.pokemons;
});

const loadMorePokemons = async () => {
  await pokemonsStore.fetchAll();
};

const handleScroll = (e: any) => {
  const objetRect = scrollComponent.value
  if (
    objetRect.getBoundingClientRect().bottom <= window.innerHeight && !pokemonsStore.isLoading
  ) {
    loadMorePokemons()
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="container">
    <h1>Pokedex</h1>
    <div ref="scrollComponent" class="pokemons-list">
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
    <div class="loader" v-if="pokemonsStore.getIsLoadingState">
      <img class="pokesmall" alt="pokeball" src="../assets/pokeball_complete.svg" />
      <span>Loading more pokemons...</span>
    </div>
  </div>
  <Transition name="fade" appear>
    <SearchModal v-if="modal_search" @close-modal="modal_search = false"/>
  </Transition>
  <font-awesome-icon @click="modal_search = !modal_search" class="search_button" icon="fa-solid fa-sliders" />
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
    display: flex;
    flex-wrap: wrap;
    grid-gap: 1em;
    justify-content: center;
  }

  .loader {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 3em;
      animation: spin 4s linear infinite;
    }
  }
}

.search_button {
  cursor: pointer;
  position: fixed;
  bottom: 1em;
  right: 1em;
  width: 20px;
  height: 20px;
  z-index: 2;
  padding: 0.7em;
  background: #6c79db;
  border-radius: 40px;
  color: #fff;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
