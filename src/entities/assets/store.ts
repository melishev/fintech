import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { db } from '@/shared/lib/db'
import { from } from 'rxjs'
import { useCurrenciesStore } from '@/entities/currencies'

export const useAssetsStore = defineStore('assets', () => {
  const storeCurrency = useCurrenciesStore()
  const { primaryExchangeRate } = storeToRefs(storeCurrency)

  const assetsRaw = useObservable(from(liveQuery(() => db.assets.toArray())))

  const assets = computed(() => {
    if (!assetsRaw.value) return []
    if (!primaryExchangeRate.value) return []

    return assetsRaw.value.map((asset) => ({
      ...asset,
      amountInPrimaryCurrency: asset.amount / primaryExchangeRate.value.rates[asset.currency],
    }))
  })

  return {
    assets,
  }
})
