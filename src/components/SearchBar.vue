<template>
  <div class="searchbar">
    <input type="text" :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const placeholder = ref("Search Pokemon, Move, Ability etc");
</script>

<style scoped lang="scss">
.searchbar {
  padding: 1em;

  input {
    width: 100%;
    border-radius: 30px;
    height: 45px;
    margin: auto;
    border: none;
    background: url(/src/assets/icons/search.svg) no-repeat 1em,
      var(--background-lightgrey);
    padding-left: 3em;
  }
}
</style>
