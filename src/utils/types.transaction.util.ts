import { NewTransactionEntry } from './types.transaction'

export const toNewTransactionEntry = (object: any): NewTransactionEntry => {
  return {
    date: parseDate(object.date),
    amount: parseAmount(object.amount),
    idBusiness: parseBusiness(object.idBusiness),
    idWallet: parseWallet(object.idWallet)
  }
}

const parseDate = (dateReq: any): string => {
  if (!dateReq || !isDate(dateReq)) {
    throw new Error('Incorrect or missing date: ' + dateReq)
  }
  return dateReq
}
const parseAmount = (amountReq: any): number => {
  if (!amountReq || !isNumber(amountReq)) {
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

const isNumber = (number: any): boolean => {
  return typeof number === 'number'
}
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}