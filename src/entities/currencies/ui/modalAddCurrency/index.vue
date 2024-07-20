<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/shared/ui'
import { Settings } from 'lucide-vue-next'
import PrimaryCurrency from './primaryCurrency.vue'
import Currency from './currency.vue'
import { useCurrenciesStore } from '../../store'

const storeCurrencies = useCurrenciesStore()
const { currencies, primaryExchangeRate } = storeToRefs(storeCurrencies)
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" size="icon">
        <Settings :size="20" />
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Currency</DialogTitle>
        <DialogDescription>
          Here is information about your current currencies that you interact with in any way
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4">
        <PrimaryCurrency />

        <div class="rounded-sm bg-neutral-100 p-2 px-3">
          <p class="text-sm font-medium text-neutral-900">My Currencies</p>
          <ul>
            <li v-for="[key, currency] of currencies" :key="key" class="flex items-center justify-between py-2">
              <Currency :code="currency.code" :name="currency.name" />
              <p class="text-sm font-semibold tabular-nums text-neutral-950">{{ primaryExchangeRate?.rates[key] }}</p>
            </li>
          </ul>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
