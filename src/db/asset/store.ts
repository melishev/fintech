import { useDBStore } from '..'
import { useDBSettingsStore } from '../settings/store'
import { useDBCurrencyStore } from '../currency/store'
import { IAssetSchema } from './schema'

export const useDBAssetStore = defineStore('db/asset', () => {
  const dbStore = useDBStore()
  const { instance } = storeToRefs(dbStore)

  const dbSettingsStore = useDBSettingsStore()
  const { settings } = storeToRefs(dbSettingsStore)

  const dbCurrencyStore = useDBCurrencyStore()
  const { currencies } = storeToRefs(dbCurrencyStore)

  /** Getter on IndexedDB */
  const assets = computedAsync<IAssetSchema[]>(() => {
    return new Promise((resolve) => {
      if (!instance.value) return

      const value: IAssetSchema[] = []

      const trans = instance.value.transaction(['assets'], 'readonly')
      trans.oncomplete = () => {
        resolve(value)
      }

      const store = trans.objectStore('assets')

      store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result
        if (cursor) {
          value.push(cursor.value)
          cursor.continue()
        }
      }
    })
  }, [])

  const assets2 = computed(() => {
    return assets.value.map((asset) => ({
      ...asset,
      amountInPrimaryCurrency:
        asset.amount * currencies.value[asset.currency + '_' + settings.value.primaryCurrency].rate,
    }))
  })

  return {
    assets,
    assets2,
  }
})
