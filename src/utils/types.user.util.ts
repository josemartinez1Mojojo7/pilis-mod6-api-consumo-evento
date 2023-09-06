import { NewUserEntry, Role } from './types.user'
import { User } from '../entities/User'

export const toNewUserEntry = (object: any): NewUserEntry => {
  return {
    fullname: parseFullname(object.fullname),
    dni: parseDni(object.dni),
    email: parseEmail(object.email),
    password: parsePassword(object.password),
    role: parseRole(object.role)
  }
}
export const toUpdateUserEntry = (object: any) => {
  const user = new User()
  if (object.fullname) user.fullname = parseFullname(object.fullname)
  if (object.dni) user.dni = parseDni(object.dni)
  if (object.email) user.email = parseEmail(object.email)
  if (object.password) user.password = parsePassword(object.password)
  if (object.role) user.role = parseRole(object.role)
  return user
}

const parseFullname = (fullnameReq: any): string => {
  if (!fullnameReq || !isString(fullnameReq)) {
    throw new Error('Incorrect or missing fullname: ' + fullnameReq)
  }
  return fullnameReq
}
const parseDni = (dniReq: any): number => {
  if (!dniReq || !isNumber(dniReq)) {
    throw new Error('Incorrect or missing dni: ' + dniReq)
  }
  return dniReq
}
const parseEmail = (emailReq: any): string => {
  if (!emailReq || !isString(emailReq)) {
    throw new Error('Incorrect or missing email: ' + emailReq)
  }
  return emailReq
}
const parsePassword = (passwordReq: any): string => {
  if (!passwordReq || !isString(passwordReq)) {
    throw new Error('Incorrect or missing password: ' + passwordReq)
  }
  return passwordReq
}
const parseRole = (roleReq: any): Role => {
  if (!roleReq || !isRole(roleReq)) {
    throw new Error('Incorrect or missing role: ' + roleReq)
  }
  return roleReq
}

const isString = (string: any): boolean => {
  return typeof string === 'string'
}
const isNumber = (number: any): boolean => {
  return typeof number === 'number'
}
const isRole = (param: any): boolean => {
  return Object.values(Role).includes(param)
}
