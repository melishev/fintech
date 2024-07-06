<script setup lang="ts">
import { useDBAssetStore } from './db/asset/store'
import { useDBCurrencyStore } from './db/currency/store'
import { useDBSettingsStore } from './db/settings/store'
import Exporter from './exporter.vue'

const dbAssetStore = useDBAssetStore()
const { assets, assets2 } = storeToRefs(dbAssetStore)

const dbCurrencyStore = useDBCurrencyStore()
const { currencies } = storeToRefs(dbCurrencyStore)

const dbSettingsStore = useDBSettingsStore()
const { settings } = storeToRefs(dbSettingsStore)
</script>

<template>
  <p>Total amount</p>
  <!-- {{ totalAmount }} -->

  <br />
  <br />

  <p>Assets</p>
  <ul>
    <li v-for="asset in assets2" :key="asset.id">
      {{ asset.name }} - {{ asset.amount }} {{ asset.currency }} - {{ asset.amountInPrimaryCurrency }}
      {{ settings.primaryCurrency }}
    </li>
  </ul>

  <br />
  <br />

  <Exporter />
</template>

<style lang="css">
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
