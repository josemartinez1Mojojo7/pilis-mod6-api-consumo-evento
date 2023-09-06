export enum Role {
  Client = 'client',
  Seller = 'seller'
}

export interface UserEntry {
  id: number
  fullname: string
  dni: number
  email: string
  password: string
  role: Role
}

export type NewUserEntry = Omit<UserEntry, 'id'>

export type NonSensitiveInfoUserEntry = Pick<
  UserEntry,
  'id' | 'fullname' | 'dni' | 'email' | 'role'
>
