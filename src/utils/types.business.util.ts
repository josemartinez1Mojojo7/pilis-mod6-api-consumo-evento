import { NewBusinessEntry } from './types.business'
import { Business } from '../entities/Business'

export const toNewBusinessEntry = (object: any): NewBusinessEntry => {
  return {
    name: parseName(object.name),
    location: parseLocation(object.location),
    type: parseType(object.type),
    idUser: parseUser(object.idUser)
  }
}

export const toUpdateBusinessEntry = (object: any) => {
  const business = new Business()
  if (object.name) business.name = parseName(object.name)
  if (object.balance) business.balance = parseBalance(object.balance)
  if (object.location) business.location = parseLocation(object.location)
  if (object.type) business.type = parseType(object.type)
  return business
}

const parseName = (nameReq: any): string => {
  if (!nameReq || !isString(nameReq)) {
    throw new Error('Incorrect or missing name: ' + nameReq)
  }
  return nameReq
}

const parseBalance = (balanceReq: any): number => {
  if (!balanceReq || !isNumber(balanceReq)) {
    throw new Error('Incorrect or missing balance: ' + balanceReq)
  }
  return balanceReq
}

const parseLocation = (locationReq: any): number => {
  if (!locationReq || !isNumber(locationReq)) {
    throw new Error('Incorrect or missing location: ' + locationReq)
  }
  return locationReq
}

const parseType = (typeReq: any): string => {
  if (!typeReq || !isString(typeReq)) {
    throw new Error('Incorrect or missing type: ' + typeReq)
  }
  return typeReq
}
const parseUser = (userReq: any): number => {
  if (!userReq || !isNumber(userReq)) {
    throw new Error('Incorrect or missing user: ' + userReq)
  }
  return userReq
}

const isString = (string: any): boolean => {
  return typeof string === 'string'
}
const isNumber = (number: any): boolean => {
  return typeof number === 'number'
}
