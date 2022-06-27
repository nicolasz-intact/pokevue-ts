<script lang="ts" setup>
import type { PokemonBasicRessource } from "@/models/pokemons";

const props = defineProps<{
  description: string;
  height: number;
  weight: number;
  gender: number;
  egg_groups: PokemonBasicRessource[];
}>();

function convertHeight() {
  const height_centimeters = props.height * 10;
  return height_centimeters + " cm";
}

function convertWeight() {
  const weight_kilo = props.weight / 10;
  return weight_kilo + " kg";
}

function genderRate(gender?: string) {
  let rate: number = props.gender;
  if (gender == "male") {
    rate = 8 - props.gender;
  }
  const gender_rate = ((8 - rate) / 8) * 100;
  return gender_rate + " %";
}
</script>

<template>
  <p class="description">
    {{ description }}
  </p>
  <div class="dimensions">
    <div class="height">
      <span class="label">Height</span>
      <span class="value">{{ convertHeight() }}</span>
    </div>
    <div class="weight">
      <span class="label">Weight</span>
      <span class="value">{{ convertWeight() }}</span>
    </div>
  </div>
  <div class="breeding">
    <h4>Breeding</h4>
    <div class="breeding-table">
      <div class="col">
        <div class="cell title">Gender</div>
        <div class="cell title">Egg Groups</div>
        <div class="cell title">Egg Cycle</div>
      </div>
      <div class="col">
        <div class="cell">
          <img alt="male" src="@/assets/icons/male.svg" />
          {{ genderRate("male") }}
          <img alt="female" src="@/assets/icons/female.svg" />
          {{ genderRate() }}
        </div>
        <div class="cell">
          <span v-for="egg in egg_groups">
            {{ egg.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.description {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
}

.dimensions {
  display: flex;
  justify-content: space-between;
  max-width: 200px;
  padding: 20px 16px;
  background: #ffffff;
  box-shadow: 0 8px 23px #0000001f;
  border-radius: 12px;
  margin: 30px auto;

  .height,
  .weight {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    .label {
      font-weight: 700;
      font-size: 14px;
      line-height: 28px;
      color: #303943;
      opacity: 0.4;
    }

    .value {
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
    }
  }
}

.breeding-table {
  display: flex;
  column-gap: 14px;
  font-size: 14px;

  .col {
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    .title {
      color: #303943;
      opacity: 0.6;
    }
  }
}
</style>
