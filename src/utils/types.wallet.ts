export interface WalletEntry {
  id: number
  balance: number
  idUser: number
}
export type NewWalletEntry = Omit<WalletEntry, 'id'>
