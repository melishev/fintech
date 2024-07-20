import type { IAssetSchema, ICurrencySchema, ISettingSchema } from './schemes'
import Dexie, { EntityTable } from 'dexie'

export type FinTechDexie = Dexie & {
  assets: EntityTable<IAssetSchema, 'id'>
  currencies: EntityTable<ICurrencySchema, 'id'>
  settings: EntityTable<ISettingSchema, 'id'>
}
