import { mockData } from './mock'

export const useDBStore = defineStore('db', () => {
  const name = 'fintechdb'
  const version = 1

  const instance = ref<IDBDatabase>()

  async function getDB() {
    return new Promise((resolve, reject) => {
      if (instance.value) return resolve(instance.value)

      console.log('OPENING DB', instance.value)

      const request = indexedDB.open(name, version)

      request.onerror = (e) => {
        console.log('Error opening db', e)
        reject('Error')
      }

      request.onsuccess = (e) => {
        instance.value = e.target.result
        resolve(instance.value)
      }

      request.onupgradeneeded = (e) => {
        console.log('onupgradeneeded')
        mockData(e)
      }
    })
  }

  getDB()

  return {
    instance,
  }
})
