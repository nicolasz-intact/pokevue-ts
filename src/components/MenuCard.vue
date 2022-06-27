<template>
  <div class="list-card">
    <template v-for="item in menuitems" :key="item.title">
      <MenuCardItem
        :cardTitle="item.title"
        :cardBackground="item.backgroundcolor"
        :isCardShadow="true"
        :cardLink="item.link"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MenuCardItem from "@/components/MenuCardItem.vue";

interface MenuItems {
  title: string;
  backgroundcolor: string;
  link?: string;
}

const menuitems = ref([
  {
    title: "Pokedex",
    backgroundcolor: "#48D0B0",
    link: "/pokedex",
  } as MenuItems,
  { title: "Moves", backgroundcolor: "#FB6C6C" } as MenuItems,
  { title: "Abilities", backgroundcolor: "#429BED" } as MenuItems,
  { title: "Items", backgroundcolor: "#F6C747" } as MenuItems,
  { title: "Locations", backgroundcolor: "#7C538C" } as MenuItems,
  { title: "Type Charts", backgroundcolor: "#B1736C" } as MenuItems,
]);
</script>

<style scoped lang="scss">
.list-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  align-items: center;
  padding: 1em;
}
</style>
