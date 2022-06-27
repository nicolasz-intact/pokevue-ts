<script setup lang="ts">
import { watch, reactive } from 'vue'
import { usePokemonsEvolutionStore } from '@/stores/pokemon-evolution'
import type { PokemonEvolution, PokemonEvolutionChain } from '@/models/pokemon-evolution';
import EvolutionChain from '@/components/tabs/EvolutionChain.vue'

const pokemonEvolutionStore = usePokemonsEvolutionStore()

const props = defineProps<{
    evolution_chain_id: string
}>()

watch(
    () => props.evolution_chain_id,
    async () => {
        await hydrateEvolutionChain()
    }
);

const evolution_chain = reactive({
    chain: {} as PokemonEvolution
});

await hydrateEvolutionChain()

async function hydrateEvolutionChain() {
    if (!pokemonEvolutionStore.getEvolutionChainById(props.evolution_chain_id)) {
        await pokemonEvolutionStore.fetchPokemonEvol(props.evolution_chain_id)
        evolution_chain.chain = pokemonEvolutionStore.getEvolutionChainById(props.evolution_chain_id)
    } else {
        evolution_chain.chain = pokemonEvolutionStore.getEvolutionChainById(props.evolution_chain_id)
    }
}
</script>

<template>
    <div class="evolutions">
        <h3>Evolution Chain</h3>
        <EvolutionChain :chain="evolution_chain.chain.chain" />
    </div>
</template>

<style scoped lang="scss">
.evolutions {
    display: flex;
    flex-direction: column;
    row-gap: 2em;
}
</style>