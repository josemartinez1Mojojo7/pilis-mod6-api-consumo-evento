import { Request, Response } from 'express'
import { Wallet } from '../entities/Wallet'
import { User } from '../entities/User'
import {
  toNewWalletEntry,
  toUpdateWalletEntry
} from '../utils/types.wallet.util'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

export const getWallets = async (req: Request, res: Response) => {
  try {
    const wallets = await Wallet.find({
      relations: { user: true, transaction: true }
    })
    return res.status(200).json(wallets)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const getWallet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const wallet = await Wallet.findOne({
      where: { id: parseInt(id) },
      relations: ['user', 'transaction']
    })
    if (wallet == null)
      return res.status(404).json({ messagge: 'Wallet Not Found' })
    return res.status(200).json(wallet)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const createWallet = async (req: Request, res: Response) => {
  try {
    const typeWallet = toNewWalletEntry(req.body)
    const user = await User.findOneBy({ id: typeWallet.idUser })
    if (user == null)
      return res.status(404).json({ messagge: 'User Not Exist' })
    if (user.role === 'client') {
      const wallet = new Wallet()
      wallet.code = crypto.randomBytes(2).readUInt16BE() % 10000
      wallet.expAt = new Date()
      wallet.balance = typeWallet.balance
      wallet.user = user
      await wallet.save()
      return res.status(201).json(wallet)
    } else {
      return res.status(404).json({ messagge: 'User is Not Client ' })
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const updateWallet = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const typeWallet = toUpdateWalletEntry(req.body)
    const wallet = await Wallet.findOneBy({ id: parseInt(id) })
    if (wallet == null)
      return res.status(404).json({ messagge: 'Wallet Not Found' })
    const auxwallet = new Wallet()
    auxwallet.balance = wallet.balance + typeWallet.balance
    await Wallet.update({ id: parseInt(id) }, auxwallet)
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const deleteWallet = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const resutl = await Wallet.delete({ id: parseInt(id) })
    if (resutl.affected === 0)
      return res.status(404).json({ messagge: 'Wallet Not Found' })
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}

export const updateWalletCode = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const wallet = await Wallet.findOneBy({ id: parseInt(id) })
    if (wallet == null)
      return res.status(404).json({ messagge: 'Wallet Not Found' })
    const auxwallet = new Wallet()
    auxwallet.code = generarCode(process.env.CODE_DIGITS_NUNBER)
    auxwallet.expAt = generarFechaExp(process.env.CODE_EXPIRE_TIME)
    await Wallet.update({ id: parseInt(id) }, auxwallet)
    return res.status(200).json({ code: auxwallet.code })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const getWalletValidateCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body
    const wallet = await Wallet.findOne({
      where: { code: parseInt(code) },
      relations: ['user']
    })
    if (wallet == null)
      return res.status(404).json({ messagge: 'Wallet Not Found' })
    const fechaActual = new Date()
    fechaActual.setHours(fechaActual.getHours() - 3)
    if (wallet.expAt < fechaActual)
      return res.status(404).json({ messagge: 'Code Expired' })
    return res.status(200).json({ validate: true, wallet })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const generarCode = (cant: any) => {
  let min = '1'
  let max = '9'
  for (let index = 1; index < cant; index++) {
    min = min + '0'
    max = max + '9'
  }
  const numeroAleatorio = crypto.randomInt(parseInt(min), parseInt(max))
  return numeroAleatorio
}
const generarFechaExp = (minute: any) => {
  const fechaActual = new Date()
  fechaActual.setHours(fechaActual.getHours() - 3)
  fechaActual.setMinutes(fechaActual.getMinutes() + parseInt(minute))
  return fechaActual
}
