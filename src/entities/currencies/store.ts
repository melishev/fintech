import type { ICurrency, IExchangeRate } from './types'
import { from, useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { db } from '@/shared/lib/db'
import { useSettingsStore } from '../settings'

export const useCurrenciesStore = defineStore('currencies', () => {
  const storeSettings = useSettingsStore()
  const { settings } = storeToRefs(storeSettings)

  const currenciesRaw = useObservable(from(liveQuery(() => db.currencies.toArray()))) // TODO: посмотреть, возможно сразу можно получить как надо, а не массивом
  const exchangeRatesRaw = useObservable(from(liveQuery(() => db.exchangeRates.toArray())))

  const currencies = computed(() => {
    const value = new Map<ICurrency['code'], ICurrency>()

    if (!currenciesRaw.value) return value
    if (!currenciesRaw.value.length) return value

    for (const curr of currenciesRaw.value) {
      value.set(curr.code, curr)
    }

    return value
  })

  const exchangeRates = computed(() => {
    const value = new Map<IExchangeRate['code'], IExchangeRate>()

    if (!exchangeRatesRaw.value) return value
    if (!exchangeRatesRaw.value.length) return value

    for (const curr of exchangeRatesRaw.value) {
      value.set(curr.code, curr)
    }

    return value
  })

  const primaryExchangeRate = computed(() => exchangeRates.value.get(settings.value.get('primaryCurrency')))

  return {
    currencies,
    exchangeRates,
    primaryExchangeRate,
  }
})
