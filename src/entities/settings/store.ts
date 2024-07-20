import type { ISetting } from './schema'
import { from, useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { db } from '@/shared/lib/db'

export const useSettingsStore = defineStore('settings', () => {
  const settingsRaw = useObservable(from(liveQuery(() => db.settings.toArray()))) // TODO: посмотреть, возможно сразу можно получить как надо, а не массивом

  const settings = computed(() => {
    const value = new Map<ISetting['key'], ISetting['value']>()

    if (!settingsRaw.value) return value
    if (!settingsRaw.value.length) return value

    for (const curr of settingsRaw.value) {
      value.set(curr.key, curr.value)
    }

    return value
  })

  return {
    settings,
  }
})
