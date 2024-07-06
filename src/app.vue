<script setup lang="ts">
import { ArrowLeftRight, Wallet, BarChart2 } from 'lucide-vue-next'
import { Button } from '@/components/ui'

const navigation = [
  {
    icon: ArrowLeftRight,
    label: 'Transactions',
    path: '/',
  },
  {
    icon: Wallet,
    label: 'Assets',
    path: '/assets',
  },
  {
    icon: BarChart2,
    label: 'Analytics',
    path: '/analytics',
  },
]
</script>

<template>
  <div class="flex h-screen flex-col items-center gap-3 border-r bg-neutral-100 pt-3 shadow-sm">
    <Button
      v-for="item in navigation"
      :key="item.path"
      as-child
      variant="ghost"
      size="icon"
      :class="['w-full text-neutral-600', $route.path === item.path && '!text-blue-500']"
    >
      <RouterLink :to="item.path">
        <component :is="item.icon" :size="20" />
      </RouterLink>
    </Button>
  </div>

  <RouterView />
</template>
