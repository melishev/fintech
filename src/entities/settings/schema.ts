interface SettingFSFileHandler {
  key: 'FSFileHandler'
  value: FileSystemFileHandle
}

interface SettingPrimaryCurrency {
  key: 'primaryCurrency'
  value: string
}

export type ISetting = {
  id: string
} & (SettingFSFileHandler | SettingPrimaryCurrency)
