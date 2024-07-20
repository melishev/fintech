<script setup lang="ts">
import { useAssetsStore } from '@/entities/assets'
import { useSettingsStore } from '@/entities/settings'

const storeAssets = useAssetsStore()
const { assets } = storeToRefs(storeAssets)

const storeSettings = useSettingsStore()
const { settings } = storeToRefs(storeSettings)

function filterAmount(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency, currencyDisplay: 'symbol' }).format(amount)
}
</script>

<template>
  <div>1</div>

  <div class="h-screen divide-y border-x bg-neutral-100 p-3 shadow-sm">
    <div v-for="asset in assets" :key="asset.id" class="flex items-center justify-between p-1">
      <p class="text-xs font-medium text-neutral-950">{{ asset.name }}</p>
      <div class="text-right">
        <p class="text-sm font-semibold tabular-nums text-neutral-950">
          {{ filterAmount(asset.amountInPrimaryCurrency, settings.get('primaryCurrency')) }}
        </p>
        <p
          v-if="asset.currency !== settings.get('primaryCurrency')"
          class="text-xs font-semibold tabular-nums text-neutral-600"
        >
          {{ filterAmount(asset.amount, asset.currency) }}
        </p>
      </div>
    </div>
  </div>

  <div>3</div>
</template>
