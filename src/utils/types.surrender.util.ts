import { NewSurrenderEntry } from './types.surrender'

export const toNewSurrenderEntry = (object: any): NewSurrenderEntry => {
  return {
    startAt: parseDateAt(object.startAt),
    endAt: parseDateAt(object.endAt),
    amount: parseAmount(object.amount),
    idBusiness: parseBusiness(object.idBusiness)
  }
}

const parseDateAt = (dateReq: any): string => {
  if (!isString(dateReq) || !isDate(dateReq)) {
    throw new Error('Incorrect or missing startAt: ' + dateReq)
  }
  return dateReq
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

const isString = (string: any): boolean => {
  return typeof string === 'string'
}
const isNumber = (number: any): boolean => {
  return typeof number === 'number'
}
const isDate = (string: any): boolean => {
  return Boolean(Date.parse(string))
}
