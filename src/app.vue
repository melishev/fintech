<script setup lang="ts">
import { useDBAssetStore } from './db/asset/store'
import { useDBCurrencyStore } from './db/currency/store'
import { useDBSettingsStore } from './db/settings/store'

const dbAssetStore = useDBAssetStore()
const { assets, assets2 } = storeToRefs(dbAssetStore)

const dbCurrencyStore = useDBCurrencyStore()
const { currencies } = storeToRefs(dbCurrencyStore)

const dbSettingsStore = useDBSettingsStore()
const { settings } = storeToRefs(dbSettingsStore)
</script>

<template>
  <div>
    <RouterLink to="/">Transactions</RouterLink>
    <RouterLink to="/assets">Assets</RouterLink>
    <RouterLink to="/analytics">Analytics</RouterLink>
  </div>

  <RouterView />
</template>

<style lang="css">
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply antialiased;
  /* background: hsl(0, 0%, 16%); */
  background: hsl(0, 0%, 95%);
}

#app {
  display: grid;
  grid-template-columns: 400px 400px 1fr;
}
</style>
