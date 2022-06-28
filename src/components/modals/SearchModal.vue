<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="modal" @click.stop>
            <SearchBar @submit="searchPokemon" />
            <p v-if="error">
                There is no pokemon with name {{ error }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import { usePokemonsStore } from "@/stores/pokemons";

const router = useRouter();
const pokemonsStore = usePokemonsStore()
const error = ref()
function searchPokemon(name: string) {
    error.value = ''
    const search_result = pokemonsStore.getByName(name)
    if (search_result) {
        router.push(`/pokemon/${search_result}`)
    } else {
        error.value = name
    }
}

</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
    border-radius: 25px 25px 0px 0px;

    .modal {
        text-align: center;
        background-color: white;
        height: 8em;
        width: 100%;
        position: absolute;
        bottom: 0;
        justify-content: center;
        display: flex;
        flex-direction: column;

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

        p {
            color: red;
        }
    }
}



.close {
    margin: 10% 0 0 16px;
    cursor: pointer;
}

.close-img {
    width: 25px;
}

.check {
    width: 150px;
}
</style>
