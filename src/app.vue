<script setup lang="ts">
import { Button } from '@/components/ui'

import { useDBAssetStore } from './db/asset/store'
import { useDBCurrencyStore } from './db/currency/store'
import { useDBSettingsStore } from './db/settings/store'

const dbAssetStore = useDBAssetStore()
const { assets, assets2 } = storeToRefs(dbAssetStore)

const dbCurrencyStore = useDBCurrencyStore()
const { currencies } = storeToRefs(dbCurrencyStore)

const dbSettingsStore = useDBSettingsStore()
const { settings } = storeToRefs(dbSettingsStore)

const navigation = [
  {
    label: 'Transactions',
    path: '/',
  },
  {
    label: 'Assets',
    path: '/assets',
  },
  {
    label: 'Analytics',
    path: '/analytics',
  },
]
</script>

<template>
  <div>
    <Button
      v-for="item in navigation"
      :key="item.path"
      as-child
      variant="ghost"
      :class="['w-full justify-start text-left', $route.path === `${item.path}.html` && 'bg-muted hover:bg-muted']"
    >
      <RouterLink :to="item.path">{{ item.label }}</RouterLink>
    </Button>
  </div>

  <RouterView />
</template>
