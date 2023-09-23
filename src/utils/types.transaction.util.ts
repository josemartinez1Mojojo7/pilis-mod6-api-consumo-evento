import { Transaction } from '../entities/Transaction'
import { NewTransactionEntry } from './types.transaction'

export const toNewTransactionEntry = (object: any): NewTransactionEntry => {
  return {
    amount: parseAmount(object.amount),
    idBusiness: parseBusiness(object.idBusiness),
    idWallet: parseWallet(object.idWallet)
  }
}
export const toUpdateTransactionEntry = (object: any) => {
  const transaction = new Transaction()
  if (object.status != null) transaction.status = parseStatus(object.status)
  return transaction
}

const parseAmount = (amountReq: any): number => {
  if (!amountReq || !isNumber(amountReq) || amountReq < 0) {
    throw new Error('Incorrect or missing amount: ' + amountReq)
  }
  return amountReq
}
const parseBusiness = (businessReq: any): number => {
  if (!businessReq || !isNumber(businessReq)) {
    throw new Error('Incorrect or missing business: ' + businessReq)
  }
  return businessReq
}
const parseWallet = (walletReq: any): number => {
  if (!walletReq || !isNumber(walletReq)) {
    throw new Error('Incorrect or missing wallet: ' + walletReq)
  }
  return walletReq
}
const parseStatus = (statusReq: any): boolean => {
  if (statusReq == null || !isBoolean(statusReq)) {
    throw new Error('Incorrect or missing status: ' + statusReq)
  }
  return statusReq
}

const isNumber = (number: any): boolean => {
  return typeof number === 'number'
}
const isBoolean = (boolean: any): boolean => {
  return typeof boolean === 'boolean'
}
