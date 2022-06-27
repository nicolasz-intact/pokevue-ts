<template>
  <span class="badge">
    {{ type }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  type: string;
}>();
</script>

<style scoped lang="scss">
.badge {
  background-color: #fff6;
  border-radius: 38px;
  padding: 6px 4px;
  font-size: 8px;
  color: var(--color-text);
  font-weight: 400;
  width: fit-content;
  min-width: 34px;
  text-align: center;
}
</style>
