<template>
    <div class="card-container">
        <div class="card" v-for="item in menuitems" :key="item.title">
            <MenuCardItem :cardTitle="item.title" :cardBackground="item.backgroundcolor" :isCardShadow="true" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MenuCardItem from '@/components/MenuCardItem.vue'

interface MenuItems {
    title: string,
    backgroundcolor: string,
}

const menuitems = ref([
    { title: "Pokedex", backgroundcolor: "green" } as MenuItems,
    { title: "Moves", backgroundcolor: "orange" } as MenuItems,
    { title: "Abilities", backgroundcolor: "blue" } as MenuItems,
    { title: "Items", backgroundcolor: "yellow" } as MenuItems,
    { title: "Locations", backgroundcolor: "purple" } as MenuItems,
    { title: "Type Charts", backgroundcolor: "brown" } as MenuItems
])
</script>

<style scoped lang="scss">
.card-container {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-gap: 1em;
    align-items: center;
    padding: 1em;
}
</style>