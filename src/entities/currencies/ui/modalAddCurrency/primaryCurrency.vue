<script setup lang="ts">
import { Search, Check, ChevronsUpDown } from 'lucide-vue-next'

import { cn } from '@/shared/lib/shadcn-utils'
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'
import Currency from './currency.vue'
import { useSettingsStore } from '@/entities/settings'
import { db } from '@/shared/lib/db'

const storeSettings = useSettingsStore()
const { settings } = storeToRefs(storeSettings)

const primaryCurrency = computed(() => settings.value.get('primaryCurrency'))

const open = ref(false)
const inputSearchValue = ref('')

const currentCurrency = computed(() => currencies.value.find((currency) => currency.code === primaryCurrency.value))

const currencies = computedAsync<{ code: string; name: string }[]>(async () => {
  const response = await fetch('/mocks/currencies.json')
  return await response.json()
}, [])

const filteredCurrencies = computed(() =>
  currencies.value.filter((currency) =>
    currency.code.toLocaleUpperCase().includes(inputSearchValue.value.toUpperCase()),
  ),
)

const { list, containerProps, wrapperProps } = useVirtualList(filteredCurrencies, {
  itemHeight: 45,
})

function handleClickItem(code: string) {
  db.settings.update('primaryCurrency', { value: code })

  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button variant="outline" role="combobox" :aria-expanded="open" class="h-[51px] w-full justify-between">
        <p class="text-sm font-medium text-neutral-900">Primary Currency</p>
        <div class="flex items-center space-x-2">
          <Currency
            v-if="currentCurrency"
            class="text-right"
            :code="currentCurrency?.code"
            :name="currentCurrency?.name"
          />
          <p v-else class="text-sm text-neutral-500">Select currency...</p>
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
      </Button>
    </PopoverTrigger>

    <PopoverContent style="width: var(--radix-popover-trigger-width)" class="overflow-hidden p-0">
      <div class="relative w-full">
        <Input
          v-model="inputSearchValue"
          type="text"
          placeholder="Search currency..."
          class="h-9 rounded-none border-x-0 border-b border-t-0 pl-9 !ring-0"
        />
        <span class="absolute inset-y-0 start-0 flex items-center justify-center px-3">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>

      <div v-bind="containerProps" class="max-h-[300px]">
        <div v-if="list.length" v-bind="wrapperProps">
          <div
            v-for="currency in list"
            :key="currency.data.code"
            class="flex cursor-pointer items-center justify-between px-2 py-1.5 hover:bg-neutral-100"
            @click="handleClickItem(currency.data.code)"
          >
            <Currency :code="currency.data.code" :name="currency.data.name" />
            <Check
              :class="cn('ml-auto h-4 w-4', primaryCurrency === currency.data.code ? 'opacity-100' : 'opacity-0')"
            />
          </div>
        </div>
        <p v-else class="py-6 text-center text-sm">No currency found</p>
      </div>
    </PopoverContent>
  </Popover>
</template>
