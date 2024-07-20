import type { ICurrency } from './types'
import { from, useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { db } from '@/shared/lib/db'

export const useCurrenciesStore = defineStore('currencies', () => {
  const currenciesRaw = useObservable(from(liveQuery(() => db.currencies.toArray()))) // TODO: посмотреть, возможно сразу можно получить как надо, а не массивом

  const currencies = computed(() => {
    const value = new Map<ICurrency['id'], ICurrency>()

    if (!currenciesRaw.value) return value
    if (!currenciesRaw.value.length) return value

    for (const curr of currenciesRaw.value) {
      value.set(curr.id, curr)
    }

    return value
  })

  return {
    currencies,
  }
})
