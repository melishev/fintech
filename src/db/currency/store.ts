import { useDBStore } from '..'
import { ICurrencySchema } from './schema'

export const useDBCurrencyStore = defineStore('db/currency', () => {
  const dbStore = useDBStore()
  const { instance } = storeToRefs(dbStore)

  /** Getter on IndexedDB */
  const currencies = computedAsync<{ [x in ICurrencySchema['id']]: ICurrencySchema }>(() => {
    return new Promise((resolve) => {
      if (!instance.value) return

      const data: { [x in ICurrencySchema['id']]: ICurrencySchema } = {}

      const trans = instance.value.transaction(['currencies'], 'readonly')
      trans.oncomplete = () => {
        resolve(data)
      }

      const store = trans.objectStore('currencies')

      store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result
        if (cursor) {
          const { key, value } = cursor
          data[key] = value
          cursor.continue()
        }
      }
    })
  })

  return {
    currencies,
  }
})
