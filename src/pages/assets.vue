<script setup lang="ts">
import { useDBAssetStore } from '@/db/asset/store'

const dbAssetStore = useDBAssetStore()
const { assets } = storeToRefs(dbAssetStore)

function filterAmount(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency, currencyDisplay: 'symbol' }).format(amount)
}
</script>

<template>
  <div>1</div>

  <div class="h-screen divide-y border-x bg-neutral-100 p-3 shadow-sm">
    <div v-for="asset in assets" :key="asset.id" class="flex items-center justify-between p-1">
      <p class="text-xs font-medium text-neutral-950">{{ asset.name }}</p>
      <p class="text-sm font-semibold tabular-nums text-neutral-950">
        {{ filterAmount(asset.amount, asset.currency) }}
      </p>
    </div>
  </div>

  <div>3</div>
</template>
