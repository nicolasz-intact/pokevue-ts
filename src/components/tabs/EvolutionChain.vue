<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PokemonEvolutionChain } from '@/models/pokemon-evolution';
import { usePokemonsStore } from "@/stores/pokemons"

const pokemonsStore = usePokemonsStore()
const props = defineProps<{
    chain: PokemonEvolutionChain
}>()

const hasChildren = computed(() => {
    const { evolves_to } = props.chain.evolves_to[0]
    return props.chain.evolves_to[0] && evolves_to.length > 0
})
</script>

<template>
    <div class="chain">
        <div class="from">
            <img class="pokeball" src="@/assets/pokesmall.svg/" />
            <img class="pokemon" :src="pokemonsStore.getSpriteByName(chain.species.name)" />
            <span class="name">{{ chain.species.name }}</span>
        </div>
        <div class="method">
            <span class="arrow">
                <img src="@/assets/icons/arrow.svg" />
            </span>
            <span>Level {{ chain.evolves_to[0].evolution_details[0].min_level }}</span>
        </div>
        <div class="to">
            <img class="pokemon" :src="pokemonsStore.getSpriteByName(props.chain.evolves_to[0].species.name)" />
            <span class="name">{{ chain.evolves_to[0].species.name }}</span>
            <img class="pokeball" src="@/assets/pokesmall.svg/" />
        </div>
    </div>
    <template v-if="hasChildren">
        <EvolutionChain :chain="props.chain.evolves_to[0]" />
    </template>
</template>

<style lang="scss" scoped>
.chain {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .from, .to {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
    }

    .method {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 8px;
        font-size: 12px;
        padding: 0 8px;
        text-align: center;

        .arrow {
            width: 20px;
            height: 20px;
        }
    }

    .pokeball {
        position: absolute;
        top: 0;
        left: 0;
        width: 83px;
    }

    .pokemon {
        width: 83px;
        height: 83px;
    }

    .name {
        font-size: 14px;
        margin-top: 8px;
    }
}
</style>