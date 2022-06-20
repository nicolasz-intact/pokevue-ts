<template>
    <div class="list-card">
        <template v-for="item in menuitems" :key="item.title">
            <MenuCardItem :cardTitle="item.title" :cardBackground="item.backgroundcolor" :isCardShadow="true" :cardLink="item.link" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MenuCardItem from '@/components/MenuCardItem.vue'

interface MenuItems {
    title: string,
    backgroundcolor: string,
    link?: string
}

const menuitems = ref([
    { title: "Pokedex", backgroundcolor: "green", link: "/pokedex" } as MenuItems,
    { title: "Moves", backgroundcolor: "red" } as MenuItems,
    { title: "Abilities", backgroundcolor: "blue" } as MenuItems,
    { title: "Items", backgroundcolor: "yellow" } as MenuItems,
    { title: "Locations", backgroundcolor: "purple" } as MenuItems,
    { title: "Type Charts", backgroundcolor: "brown" } as MenuItems
])
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