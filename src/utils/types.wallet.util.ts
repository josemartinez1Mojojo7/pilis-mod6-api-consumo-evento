import { NewWalletEntry } from './types.wallet'
import { Wallet } from '../entities/Wallet'

export const toNewWalletEntry = (object: any): NewWalletEntry => {
  return {
    idUser: parseIdUser(object.idUser)
  }
}
export const toUpdateWalletEntry = (object: any) => {
  const wallet = new Wallet()
  if (object.balance || object.balance === 0)
    wallet.balance = parseBalance(object.balance)
  return wallet
}

const parseBalance = (balanceReq: any): number => {
  if (balanceReq == null || !isNumber(balanceReq) || balanceReq < 0) {
    throw new Error('Incorrect or missing balance: ' + balanceReq)
  }
  return balanceReq
}
const parseIdUser = (userReq: any): number => {
  if (!userReq || !isNumber(userReq)) {
    throw new Error('Incorrect or missing user: ' + userReq)
  }
  return userReq
}

const isNumber = (number: any): boolean => {
  return typeof number === 'number'
}
