import { Request, Response } from 'express'
import { Wallet } from '../entities/Wallet'
import { User } from '../entities/User'

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
  const { balance, idUser } = req.body
  try {
    const user = await User.findOneBy({ id: parseInt(idUser) })
    if (user != null) {
      const wallet = new Wallet()
      wallet.balance = balance
      wallet.user = user

      await wallet.save()
      return res.status(201).json(wallet)
    } else {
      return res.status(404).json({ messagge: 'User Not Exist' })
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const updateWallet = async (req: Request, res: Response) => {
  const { id } = req.params
  const { balance, idUser } = req.body
  try {
    const wallet = await Wallet.findOneBy({ id: parseInt(id) })
    if (wallet == null)
      return res.status(404).json({ messagge: 'Wallet Not Found' })
    const auxwallet = new Wallet()
    auxwallet.balance = balance
    if (idUser) {
      const user = await User.findOneBy({ id: parseInt(idUser) })
      if (user != null) {
        auxwallet.user = user
        await Wallet.update({ id: parseInt(id) }, auxwallet)
        return res.sendStatus(204)
      } else {
        return res.status(404).json({ messagge: 'User Not Exist' })
      }
    }
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
