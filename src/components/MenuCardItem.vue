<template>
  <div
    class="card-container"
    :class="[cardBackground, { cardcursor: cardLink }]"
    :style="{ height: cardHeight + 'px', backgroundColor: cardBackground }"
    @click="changePage"
  >
    <div class="card">
      <div v-if="isShadow" class="card--ellipse"></div>
      <div class="card--hint">
        <slot name="pokemonnumber"></slot>
      </div>
      <div class="card--content">
        <h2 class="card--title">{{ cardTitle }}</h2>
        <slot name="pokemonbadge"></slot>
      </div>
      <img
        class="pokesmall"
        :class="[{ pokesmallcomplex: cardType }]"
        alt="pokeball"
        src="../assets/pokesmall.svg"
      />
      <img v-if="cardImg" class="pokesprite" alt="img-pokemon" :src="cardImg" />
    </div>
    <div v-if="isShadow" :class="{ cardShadow: isShadow }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps<{
  cardType?: string;
  cardTitle: string;
  cardBackground: string;
  cardLink?: string;
  isCardShadow?: boolean;
  cardHeight?: number;
  cardImg?: string;
}>();

const isShadow = ref(props.isCardShadow);
const cardHeight = props.cardHeight ? ref(props.cardHeight) : 63;

function changePage() {
  if (props.cardLink) {
    router.push(props.cardLink);
  }
}
</script>

<style scoped lang="scss">
.card-container {
  width: 155px;
  height: 63px;
  border-radius: 15px;
  cursor: pointer;

  &.blue {
    background-color: var(--background-color-blue);

    .cardShadow {
      background: linear-gradient(transparent, #429bed);
    }
  }

  &.red {
    background-color: var(--background-color-orange);

    .cardShadow {
      background: linear-gradient(transparent, #fa6555);
    }
  }

  &.green {
    background-color: var(--background-color-green);

    .cardShadow {
      background: linear-gradient(transparent, #2cdab1);
    }
  }

  &.yellow {
    background-color: var(--background-color-yellow);

    .cardShadow {
      background: linear-gradient(transparent, #f6c747);
    }
  }

  &.purple {
    background-color: var(--background-color-purple);

    .cardShadow {
      background: linear-gradient(transparent, #9f5bba);
    }
  }

  &.brown {
    background-color: var(--background-color-brown);

    .cardShadow {
      background: linear-gradient(transparent, #ca8179);
    }
  }

  &.white {
    background-color: #f4fbfb;
  }

  .card {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    overflow: hidden;

    .card--title {
      color: var(--color-text);
      font-size: 14px;
      font-weight: bold;
      margin-left: 1em;
      margin-bottom: 1em;
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

    .pokesmallcomplex {
      position: absolute;
      right: -2px;
      bottom: -16px;
      z-index: 1;
    }

    .pokesprite {
      position: absolute;
      bottom: 0;
      right: 10px;
      max-width: 65px;
      z-index: 1;
    }

    .card--hint {
      color: var(--color-text);
      position: absolute;
      top: 0;
      right: 1em;
      opacity: 0.15;
      font-weight: 700;
    }

    .cardcursor {
      cursor: pointer;
    }
  }

  .cardShadow {
    position: absolute;
    bottom: -0.3em;
    right: 1em;
    height: 11px;
    width: 80%;
    border-radius: 14px;
    filter: blur(6px);
  }
}
</style>
