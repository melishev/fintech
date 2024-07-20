import type { IAssetSchema, ICurrencySchema, IExchangeRateSchema, ISettingSchema } from './schemes'
import Dexie, { EntityTable } from 'dexie'

export type FinTechDexie = Dexie & {
  assets: EntityTable<IAssetSchema, 'id'>
  currencies: EntityTable<ICurrencySchema, 'code'>
  exchangeRates: EntityTable<IExchangeRateSchema, 'code'>
  settings: EntityTable<ISettingSchema, 'key'>
}
