export interface IAssetSchema {
  id: number
  name: string
  currency: string
  amount: number
}

export interface ICurrencySchema {
  code: string
  name: string
  type: 'fiat' | 'crypto'
}

export interface IExchangeRateSchema {
  code: string
  rates: {
    [i: string]: number
  }
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
