const CURR_NAMESPACE = 'currencies'
const ASSETS_NAMESPACE = 'assets'
const SETTINGS_NAMESPACE = 'settings'

export function mockData(event: IDBVersionChangeEvent) {
  const { result: db } = event.target as IDBOpenDBRequest

  if (!db.objectStoreNames.contains(SETTINGS_NAMESPACE)) {
    const objectStore = db.createObjectStore(SETTINGS_NAMESPACE, { keyPath: 'key' })

    objectStore.add({
      key: 'primaryCurrency',
      value: 'EUR',
    })
  }

  if (!db.objectStoreNames.contains(ASSETS_NAMESPACE)) {
    const objectStore = db.createObjectStore(ASSETS_NAMESPACE, { keyPath: 'id' })

    objectStore.add({
      id: 1,
      name: 'Cash',
      currency: 'EUR',
      amount: 1000,
    })

    objectStore.add({
      id: 2,
      name: 'Cash',
      amount: 200000,
      currency: 'RUB',
    })

    objectStore.add({
      id: 3,
      name: 'Cash',
      amount: 200,
      currency: 'USD',
    })

    objectStore.add({
      id: 4,
      name: 'Cash',
      amount: 26,
      currency: 'GEL',
    })

    objectStore.add({
      id: 5,
      name: 'Cash',
      amount: 52,
      currency: 'BAM',
    })
  }

  if (!db.objectStoreNames.contains(CURR_NAMESPACE)) {
    const objectStore = db.createObjectStore(CURR_NAMESPACE, { keyPath: 'id' })
    objectStore.createIndex('base', 'base', { unique: true })
    objectStore.createIndex('quote', 'quote', { unique: false })

    objectStore.add({
      id: 'EUR_EUR',
      base: 'EUR',
      quote: 'EUR',
      type: 'fiat',
      rate: 1,
      timestamp: Date.now(),
    })

    objectStore.add({
      id: 'USD_EUR',
      base: 'USD',
      quote: 'EUR',
      type: 'fiat',
      rate: 0.92,
      timestamp: Date.now(),
    })

    objectStore.add({
      id: 'RUB_EUR',
      base: 'RUB',
      quote: 'EUR',
      type: 'fiat',
      rate: 0.01,
      timestamp: Date.now(),
    })

    objectStore.add({
      id: 'GEL_EUR',
      base: 'GEL',
      quote: 'EUR',
      type: 'fiat',
      rate: 0.33,
      timestamp: Date.now(),
    })

    objectStore.add({
      id: 'BAM_EUR',
      base: 'BAM',
      quote: 'EUR',
      type: 'fiat',
      rate: 0.511275,
      timestamp: Date.now(),
    })
  }
}
