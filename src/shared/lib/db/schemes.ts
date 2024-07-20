export interface IAssetSchema {
  id: number
  name: string
  currency: 'EUR' | 'RUB' | 'USD' | 'GEL' | 'BAM'
  amount: number
}

export interface ICurrencySchema {
  id: string
  base: string
  quote: string
  type: string
  rate: number
  timestamp: number
}

interface SettingFSFileHandler {
  key: 'FSFileHandler'
  value: FileSystemFileHandle
}

interface SettingPrimaryCurrency {
  key: 'primaryCurrency'
  value: string
}

export type ISettingSchema = SettingFSFileHandler | SettingPrimaryCurrency
