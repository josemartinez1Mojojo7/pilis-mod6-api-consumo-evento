export interface BusinessEntry {
  id: number
  name: string
  balance: number
  location: number
  type: string
  idUser: number
  idTransaction: number
}

export type NewBusinessEntry = Omit<
  BusinessEntry,
  'id' | 'balance' | 'idTransaction'
>
