import type { FinTechDexie } from './type'
import Dexie from 'dexie'
import { initMockData } from './mock'

const db = new Dexie('fintechdb') as FinTechDexie

db.version(1).stores({
  assets: '++id',
  currencies: '++id, &base',
  settings: '++id, &key',
})

initMockData(db)

export { db }
