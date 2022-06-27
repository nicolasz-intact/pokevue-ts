<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePokemonsStore } from "@/stores/pokemons";
import PokemonTabs from "@/components/tabs/PokemonTabs.vue";
import { POKEMON_TYPE_COLORS } from "@/constants/index";

const router = useRouter();
const route = useRoute();
const pokemonsStore = usePokemonsStore();

if (!pokemonsStore.pokemons.length) {
  await pokemonsStore.fetchAll();
}

const pokemonId = ref();
pokemonId.value = router.currentRoute.value.params.id;

const pokemon = ref(pokemonsStore.getPokemonById(parseInt(pokemonId.value)));
const pokemon_previous = ref(
  pokemonsStore.getPokemonById(parseInt(pokemonId.value) - 1)
);
const pokemon_next = ref(
  pokemonsStore.getPokemonById(parseInt(pokemonId.value) + 1)
);

function changePokemonPage(id: string) {
  router.push(`/pokemon/${id}`);
}

watch(
  () => route.params.id,
  (newId) => {
    pokemon.value = pokemonsStore.getPokemonById(parseInt(newId));
    pokemon_previous.value = pokemonsStore.getPokemonById(parseInt(newId) - 1);
    pokemon_next.value = pokemonsStore.getPokemonById(parseInt(newId) + 1);
  }
);
if (!pokemon.value) {
  router.push("/pokedex");
}
</script>

<template>
  <div
    class="container"
    v-if="pokemon"
    :style="{
      backgroundColor: POKEMON_TYPE_COLORS[pokemon?.types[0].type.name],
    }"
  >
    <div class="rectangle"></div>
    <div class="dotted"><img src="@/assets/icons/dotted.svg/" /></div>
    <div class="pokemon-details">
      <div class="pokemon-general">
        <h1 class="capitalize">
          {{ pokemon.name }}
          <span>#{{ pokemonsStore.getPokemonId(pokemon.id) }}</span>
        </h1>
        <div class="badges-list">
          <template v-for="type in pokemonsStore.getPokemonTypes(pokemon)">
            <span class="badge">
              {{ type }}
            </span>
          </template>
        </div>
        <div class="cover">
          <a
            v-if="pokemon_previous"
            @click="changePokemonPage(pokemon_previous.id)"
          >
            <img class="previous-pokemon" :src="pokemon_previous.sprite" />
          </a>
          <img class="current-pokemon" :src="pokemon.sprite" />
          <a v-if="pokemon_next" @click="changePokemonPage(pokemon_next.id)">
            <img class="next-pokemon" :src="pokemon_next.sprite" />
          </a>
        </div>
      </div>
      <PokemonTabs :pokemon="pokemon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: 7em;
  overflow: hidden;

  .dotted {
    position: absolute;
    left: 247px;
    top: 4px;
    opacity: 0.3;
  }

  .rectangle {
    position: absolute;
    width: 130.92px;
    height: 143.92px;
    left: -3em;
    top: -1.5em;
    background: linear-gradient(
      84.85deg,
      #48d0b0 36.15%,
      rgba(72, 208, 176, 0) 124.91%
    );
    mix-blend-mode: screen;
    opacity: 0.3;
    border-radius: 24px;
    transform: rotate(75deg);
  }

  .pokemon-general {
    padding: 2em;

    h1 {
      width: 90%;
      font-weight: bold;
      color: var(--background-color-white);

      span {
        float: right;
        font-size: 18px;
      }
    }

    .badges-list {
      display: flex;
      align-items: center;
      column-gap: 12px;

      .badge {
        color: var(--background-color-white);
        background-color: #fff6;
        border-radius: 38px;
        font-size: 14px;
        padding: 10px 20px;
        font-weight: 400;
        width: fit-content;
        min-width: 34px;
        text-align: center;
      }
    }

    .cover {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      position: relative;
      border-radius: 20px;

      .current-pokemon {
        max-width: 234px;
        z-index: 3;
      }

      .previous-pokemon {
        position: absolute;
        max-width: 80px;
        z-index: 2;
        -webkit-filter: grayscale(1) contrast(100) brightness(0);
        filter: grayscale(1) contrast(100) brightness(0);
        mix-blend-mode: multiply;
        opacity: 0.1;
        left: -5em;
      }

      .next-pokemon {
        position: absolute;
        max-width: 80px;
        z-index: 2;
        -webkit-filter: grayscale(1) contrast(100) brightness(0);
        filter: grayscale(1) contrast(100) brightness(0);
        mix-blend-mode: multiply;
        opacity: 0.1;
      }
    }
  }
}

.blue {
  background-color: var(--background-color-blue);
}

.red {
  background-color: var(--background-color-orange);
}

.green {
  background-color: var(--background-color-green);
}

.yellow {
  background-color: var(--background-color-yellow);
}

.purple {
  background-color: var(--background-color-purple);
}

.brown {
  background-color: var(--background-color-brown);
}

.white {
  background-color: #f4fbfb;
}
</style>
