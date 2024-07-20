import type { FinTechDexie } from './type'

export async function initMockData(db: FinTechDexie) {
  // Assets
  try {
    await db.assets.bulkAdd([
      {
        id: 1,
        name: 'Revolut',
        currency: 'EUR',
        amount: 1000,
      },
      {
        id: 2,
        name: 'Tinkoff',
        amount: 200000,
        currency: 'RUB',
      },
      {
        id: 3,
        name: 'Wise',
        amount: 200,
        currency: 'USD',
      },
      {
        id: 4,
        name: 'Bank of Georgia',
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

  // Currencies
  try {
    await db.currencies.bulkAdd([
      {
        code: 'BAM',
        type: 'fiat',
        name: 'Bosnia-Herzegovina Convertible Mark',
      },
      {
        code: 'GEL',
        type: 'fiat',
        name: 'Georgian Lari',
      },
      {
        code: 'RUB',
        type: 'fiat',
        name: 'Russian Ruble',
      },
      {
        code: 'USD',
        type: 'fiat',
        name: 'United States Dollar',
      },
      {
        code: 'EUR',
        type: 'fiat',
        name: 'Euro',
      },
    ])
  } catch (error) {
    console.log(error)
  }

  // ExchangeRates
  try {
    const codes = ['EUR', 'RUB']
    const requests = codes.map((code) =>
      fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${code.toLocaleLowerCase()}.json`,
      ),
    )
    const responses = await Promise.all(requests)

    const items: any[] = []

    for (const code of codes) {
      const idx = codes.findIndex((c) => c === code)
      const data = await responses[idx].json()
      const ratesRaw = data[code.toLocaleLowerCase()]

      let rates = {}
      for await (const code of Object.keys(ratesRaw)) {
        rates = { ...rates, [code.toLocaleUpperCase()]: ratesRaw[code] }
      }

      items.push({
        code,
        rates,
      })
    }

    await db.exchangeRates.bulkAdd(items)
  } catch (error) {
    console.log(error)
  }

  // Settings
  try {
    await db.settings.add({
      key: 'primaryCurrency',
      value: 'EUR',
    })
  } catch (error) {
    console.log(error)
  }
}
