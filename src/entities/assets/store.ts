import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { db } from '@/shared/lib/db'
import { from } from 'rxjs'
import { useSettingsStore } from '@/entities/settings'
import { useCurrenciesStore } from '@/entities/currencies'

export const useAssetsStore = defineStore('assets', () => {
  const storeSettings = useSettingsStore()
  const { settings } = storeToRefs(storeSettings)

  const storeCurrency = useCurrenciesStore()
  const { currencies } = storeToRefs(storeCurrency)

  const assetsRaw = useObservable(from(liveQuery(() => db.assets.toArray())))

  const assets = computed(() => {
    if (!assetsRaw.value) return []

    return assetsRaw.value.map((asset) => ({
      ...asset,
      amountInPrimaryCurrency:
        asset.amount * currencies.value.get(asset.currency + '_' + settings.value.get('primaryCurrency')).rate,
    }))
  })

  return {
    assets,
  }
})
