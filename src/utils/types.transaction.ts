export interface TransactionEntry {
  id: number
  date: string
  amount: number
  type: string
  idBusiness: number
  idWallet: number
}

export type NewTransactionEntry = Omit<TransactionEntry, 'id' | 'type'>
