<script setup lang="ts">
import MenuCard from '@/components/MenuCard.vue'
</script>

<template>
  <div class="container">
    <main>
      <h1>What Pokemon <br> are you looking for ?</h1>
      <MenuCard />
    </main>
  </div>

</template>

<style lang="scss">
.container {
  background-color: var(--background-lightgrey);

  main {
    background-color: var(--background-color-white);
    border-radius: 0px 0px 30px 30px;
  }

  h1 {
    margin: 0em auto 1em auto;
    padding-top: 4em;
    width: 90%;
    font-weight: bold;
  }
}
</style>
