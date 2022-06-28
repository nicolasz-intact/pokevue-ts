<template>
  <div class="searchbar">
    <input type="text" :placeholder="placeholder" @keyup.enter="handleEnter"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(['submit'])
const placeholder = ref("Search Pokemon, Move, Ability etc");

function handleEnter(event) {
  emit('submit', event.target.value.toLowerCase())
}
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
