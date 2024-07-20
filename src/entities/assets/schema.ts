export interface IAsset {
  id: number
  name: string
  currency: 'EUR' | 'RUB' | 'USD' | 'GEL' | 'BAM'
  amount: number
}
