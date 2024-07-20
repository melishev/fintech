import type { FinTechDexie } from './type'

export async function initMockData(db: FinTechDexie) {
  try {
    await db.settings.add({
      key: 'primaryCurrency',
      value: 'EUR',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    await db.currencies.bulkAdd([
      {
        id: 'BAM_EUR',
        base: 'BAM',
        quote: 'EUR',
        type: 'fiat',
        rate: 0.511275,
        timestamp: Date.now(),
      },
      {
        id: 'GEL_EUR',
        base: 'GEL',
        quote: 'EUR',
        type: 'fiat',
        rate: 0.33,
        timestamp: Date.now(),
      },
      {
        id: 'RUB_EUR',
        base: 'RUB',
        quote: 'EUR',
        type: 'fiat',
        rate: 0.01,
        timestamp: Date.now(),
      },
      {
        id: 'USD_EUR',
        base: 'USD',
        quote: 'EUR',
        type: 'fiat',
        rate: 0.92,
        timestamp: Date.now(),
      },
      {
        id: 'EUR_EUR',
        base: 'EUR',
        quote: 'EUR',
        type: 'fiat',
        rate: 1,
        timestamp: Date.now(),
      },
    ])
  } catch (error) {
    console.log(error)
  }

  try {
    await db.assets.bulkAdd([
      {
        id: 1,
        name: 'Cash',
        currency: 'EUR',
        amount: 1000,
      },
      {
        id: 2,
        name: 'Cash',
        amount: 200000,
        currency: 'RUB',
      },
      {
        id: 3,
        name: 'Cash',
        amount: 200,
        currency: 'USD',
      },
      {
        id: 4,
        name: 'Cash',
        amount: 26,
        currency: 'GEL',
      },
      {
        id: 5,
        name: 'Cash',
        amount: 52,
        currency: 'BAM',
      },
    ])
  } catch (error) {
    console.log(error)
  }
}
