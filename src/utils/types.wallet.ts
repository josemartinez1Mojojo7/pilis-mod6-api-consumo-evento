export interface WalletEntry {
  id: number
  code: number
  balance: number
  idUser: number
}
export type NewWalletEntry = Omit<WalletEntry, 'id' | 'code'>
