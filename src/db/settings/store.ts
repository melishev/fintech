import { useDBStore } from '..'
import { ISettingsSchema } from './schema'

export const useDBSettingsStore = defineStore('db/settings', () => {
  const dbStore = useDBStore()
  const { instance } = storeToRefs(dbStore)

  /** Getter on IndexedDB */
  const settings = computedAsync<ISettingsSchema>(() => {
    return new Promise((resolve) => {
      if (!instance.value) return

      const data: ISettingsSchema = {}

      const trans = instance.value.transaction(['settings'], 'readonly')
      trans.oncomplete = () => {
        resolve(data)
      }

      const store = trans.objectStore('settings')

      store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result
        if (cursor) {
          const { key, value } = cursor.value
          data[key as keyof ISettingsSchema] = value
          cursor.continue()
        }
      }
    })
  })

  return {
    settings,
  }
})
