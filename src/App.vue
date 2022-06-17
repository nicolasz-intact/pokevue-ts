<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <img src="@/assets/pokeicon.svg" />
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.scss";

.main {
  max-height: 100vh;

  
}
img {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
  }
</style>
