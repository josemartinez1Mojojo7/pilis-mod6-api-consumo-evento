export interface WalletEntry {
  id: number
  code: number
  expAt: Date
  balance: number
  idUser: number
}
export type NewWalletEntry = Omit<
  WalletEntry,
  'id' | 'code' | 'expAt' | 'balance'
>
