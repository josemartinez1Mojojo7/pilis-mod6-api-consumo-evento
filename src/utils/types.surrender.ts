export interface SurrenderEntry {
  id: number
  startAt: string
  endAt: string
  amount: number
  idBusiness: number
}

export type NewSurrenderEntry = Omit<SurrenderEntry, 'id'>
