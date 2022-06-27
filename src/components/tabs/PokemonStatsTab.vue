<script lang="ts" setup>
import { watch, reactive } from "vue";
import type { PokemonStat } from "@/models/pokemons";

interface Stat {
  text: string;
  value: number;
  current_progress: number;
}

const props = defineProps<{
  stats: PokemonStat[];
}>();

watch(
  () => props.stats,
  () => {
    hydratePokeStats();
  }
);

const state = reactive({
  arr: [] as Stat[],
});
hydratePokeStats();

function hydratePokeStats() {
  state.arr = [];
  let totalStats = 0;
  props.stats.forEach((stat) => {
    state.arr.push({
      text: stat.stat.name,
      value: stat.base_stat,
      current_progress: stat.base_stat,
    });
    totalStats += stat.base_stat;
  });
  state.arr.push({
    text: "Total",
    value: totalStats,
    current_progress: (totalStats / 600) * 100,
  });
}
</script>

<template>
  <div class="stats-table">
    <div class="stat" v-for="stat in state.arr">
      <span class="name">{{ stat.text }}</span>
      <span class="value">{{ stat.value }}</span>
      <div class="progress">
        <div
          class="current-progress"
          :style="{ width: stat.current_progress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats-table {
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  font-size: 14px;

  .stat {
    display: flex;
    align-items: center;
    column-gap: 16px;

    .name {
      color: #303943;
      opacity: 0.6;
      flex-basis: 200px;
    }

    .progress {
      width: 100%;
      height: 2px;
      background: #f4f5f4;
      opacity: 0.9;
      border-radius: 110px;

      .current-progress {
        background: #4bc07a;
        height: 2px;
      }
    }
  }
}
</style>
