<script lang="ts" setup>
import { ref, reactive } from 'vue'
import PokemonAboutTab from './PokemonAboutTab.vue';
import PokemonStatsTab from './PokemonStatsTab.vue';
import PokemonEvolutionTab from './PokemonEvolutionTab.vue';
import type { Pokemon } from '@/models/pokemons'

const props = defineProps<{
    pokemon: Pokemon;
}>();

const activeTab = ref('about')

interface Tab {
    text: string
    name: string
}

const tabs = reactive([
    { text: 'About', name: 'about' } as Tab,
    { text: 'Base Stats', name: 'stats' } as Tab,
    { text: 'Evolution', name: 'evolution' } as Tab,
    { text: 'Moves', name: "moves" } as Tab
])

function changeTab(tabname: string) {
    activeTab.value = tabname
}

function getPokemonDescription() {
    return props.pokemon.flavors_text[0].flavor_text
}
</script>

<template>
    <div class="tabs">
        <div class="tabs-list">
            <div class="tab-header" v-for="tab in tabs" :class="{ active: tab.name == activeTab }"
                @click="changeTab(tab.name)">
                {{ tab.text }}
            </div>
        </div>
        <PokemonAboutTab v-if="activeTab == 'about'" :gender="pokemon.gender_rate" :height="pokemon.height"
            :weight="pokemon.weight" :description="getPokemonDescription()" :egg_groups="pokemon.egg_goups" />
        <PokemonStatsTab v-if="activeTab == 'stats'" :stats="pokemon.stats" />
        <Suspense>
            <PokemonEvolutionTab v-if="activeTab == 'evolution'" :evolution_chain_id="pokemon.evolution_chains_id" />
        </Suspense>
    </div>
</template>

<style scoped lang="scss">
.tabs {
    background-color: var(--background-color-white);
    padding: 46px 20px 20px;
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    top: -80px;
    margin-bottom: -80px;

    .tabs-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px solid #F4F5F4;

        .tab-header {
            padding-bottom: 1em;
            cursor: pointer;

            &.active {
                border-bottom: 2px solid #6C79DB;
            }
        }
    }
}
</style>
