<script setup lang="ts">
import { Chart } from '@antv/g2'
import { useDBSettingsStore } from './db/settings/store'

const dbSettingsStore = useDBSettingsStore()
const { settings } = storeToRefs(dbSettingsStore)

onMounted(() => {
  const chart = new Chart({
    margin: 0,
    container: 'chart',
  })

  chart.options({
    type: 'view',
    autoFit: true,
    // tooltip: false,
    interaction: {
      tooltip: false,
    },
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/stocks.json',
      transform: [{ type: 'filter', callback: (d) => d.symbol === 'GOOG' }],
    },
    children: [
      {
        type: 'area',
        encode: {
          x: (d) => new Date(d.date),
          y: (d) => d.price,
        },
        // style: { fill: 'linear-gradient(-90deg, rgba(0, 0, 0, 0) 0%, rgba(99, 202, 86, 0.5) 100%)' },
        style: { fill: 'linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(99, 202, 86, 0.5) 100%)' },
      },
      {
        type: 'line',
        encode: {
          x: (d) => new Date(d.date),
          y: (d) => d.price,
        },
        style: { stroke: 'hsl(113, 52%, 56%)', lineWidth: 2 },
      },
    ],
    axis: {
      x: { tickCount: 3, tickFilter: (s) => s.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) },
      y: { tickCount: 3, position: 'right' },
    },
    // theme: {
    //   type: 'classicDark',
    // },
  })

  chart.render()
})

function filterAmount(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency, currencyDisplay: 'symbol' }).format(amount)
}

const data = [
  {
    label: 'Highest',
    amount: 200.47,
  },
  {
    label: 'Lowest',
    amount: 200.47,
  },
  {
    label: 'Amplitude',
    amount: 0,
  },
  {
    label: 'Average',
    amount: 200,
  },
]
</script>

<template>
  <div class="rounded-md border bg-neutral-200/20 p-2">
    <p class="text-[10px] font-medium text-neutral-500">Transactions Explorer</p>
    <span class="font-bold tabular-nums text-neutral-950">200,47 €</span>

    <div id="chart" class="h-[200px] w-full" />

    <div class="grid grid-cols-2 gap-y-1">
      <div v-for="d in data" :key="d.label" class="flex flex-col">
        <p class="text-[10px] font-medium text-neutral-500">{{ d.label }}</p>
        <span class="text-xs font-semibold tabular-nums text-neutral-950">{{ filterAmount(d.amount, 'EUR') }}</span>
      </div>
    </div>
  </div>
</template>
