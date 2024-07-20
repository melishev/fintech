<script setup lang="ts">
defineProps<{
  code: string
  name: string
}>()
</script>

<template>
  <div>
    <p class="text-base font-medium uppercase leading-[normal] text-neutral-900">
      {{ code }}
    </p>
    <p class="text-xs leading-[normal] text-neutral-500">{{ name }}</p>
  </div>
</template>
