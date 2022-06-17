<template>
    <div class="card" :class="cardBackground">
        <div v-if="isShadow" class="card--ellipse"></div>
        <p class="card--title">{{ cardTitle }}</p>
        <img class="pokesmall" alt="pokeball" src="../assets/pokesmall.svg"/>
        <div v-if="isShadow" :class="{ cardShadow: isShadow }">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    cardTitle: string;
    cardBackground: string;
    isCardShadow: boolean
}>();

const isShadow = ref(props.isCardShadow)
</script>

<style scoped lang="scss">
.card {
    display: flex;
    width: 155px;
    height: 63px;
    border-radius: 15px;
    align-items: center;
    overflow: hidden;

    &.blue {
        background-color: var(--background-color-blue);

        .cardShadow {
            background-color: #429BED;
        }
    }

    &.orange {
        background-color: var(--background-color-orange);

        .cardShadow {
            background-color: #FA6555;
        }
    }

    &.green {
        background-color: var(--background-color-green);
        .cardShadow {
            background-color: #2CDAB1;
        }
    }

    &.yellow {
        background-color: var(--background-color-yellow);

        .cardShadow {
            background-color: #F6C747;
        }
    }

    &.purple {
        background-color: var(--background-color-purple);

        .cardShadow {
            background-color: #9F5BBA;
        }
    }

    &.brown {
        background-color: var(--background-color-brown);
        .cardShadow {
            background-color: #CA8179;
        }
    }

    .card--title {
        color: var(--color-text);
        font-size: 14px;
        font-weight: bold;
        margin-left: 1em;
    }

    .cardShadow {
        position: absolute;
        bottom: -3px;
        height: 11px;
        width: 80%;
        border-radius: 14px;
        opacity: 100%;
        filter: blur(6px);
    }

    .card--ellipse {
        position: absolute;
        top: -60%;
        left: -25%;
        width: 62px;
        height: 62px;
        border-radius: 30px;
        opacity: 0.3;
        background-color: var(--color-text);
    }

    .pokesmall {
        position: absolute;
        right: -15px;
    }
}
</style>