<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<template>
    <img  v-if="router.currentRoute.value.name !== 'PokemonDetails'" class="pokelogo" src="@/assets/pokeicon.svg" />
    <div v-if="router.currentRoute.value.name !== 'home'" class="back" @click="router.back()">
        <img alt="back-arrow" src="@/assets/icons/back.svg" />
    </div>
    <div v-if="router.currentRoute.value.name == 'PokemonDetails'" class="like">
        <font-awesome-icon icon="fa-solid fa-heart" />
    </div>
</template>

<style lang="scss" scoped>
.back {
  position: absolute;
  left: 2em;
  top: 5em;
  cursor: pointer;
  z-index: 999;
}

.like {
  position: absolute;
  right: 2em;
  top: 5em;
  cursor: pointer;
  z-index: 999;
}

.pokelogo {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
  }
</style>