<script setup lang="ts">
import MenuCard from "@/components/MenuCard.vue";
import SearchBar from "@/components/SearchBar.vue";
</script>

<template>
  <div class="container">
    <h1>
      What Pokemon <br />
      are you looking for ?
    </h1>
    <SearchBar />
    <MenuCard />
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: var(--background-color-white);
  border-radius: 0px 0px 30px 30px;
  padding-top: 7em;

  h1 {
    margin: 0em auto 1em auto;
    width: 90%;
    font-weight: bold;
  }
}
</style>
