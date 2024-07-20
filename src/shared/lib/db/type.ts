import type { IAsset } from '@/entities/assets'
import type { ICurrency } from '@/entities/currencies'
import type { ISetting } from '@/entities/settings'
import Dexie, { EntityTable } from 'dexie'

export type FinTechDexie = Dexie & {
  assets: EntityTable<IAsset, 'id'>
  currencies: EntityTable<ICurrency, 'id'>
  settings: EntityTable<ISetting, 'id'>
}
