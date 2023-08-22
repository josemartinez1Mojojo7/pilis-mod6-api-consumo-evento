import { Request, Response } from 'express'
import { Transaction } from '../entities/Transaction'
import { Wallet } from '../entities/Wallet'
import { Business } from '../entities/Business'
import { toNewTransactionEntry } from '../utils/types.transaction.util'

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({
      relations: { business: true, wallet: true }
    })
    return res.status(200).json(transactions)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const transactions = await Transaction.findOne({
      where: { id: parseInt(id) },
      relations: ['business', 'account']
    })
    if (!transactions)
      return res.status(404).json({ messagge: 'Transactions Not Found' })
    return res.status(200).json(transactions)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const typeTransaction = toNewTransactionEntry(req.body)
    const business = await Business.findOneBy({
      id: typeTransaction.idBusiness
    })
    const wallet = await Wallet.findOneBy({ id: typeTransaction.idWallet })
    if (business && wallet) {
      const transaction = new Transaction()
      transaction.date = new Date(typeTransaction.date)
      if (wallet.balance < typeTransaction.amount) {
        return res
          .status(409)
          .json({ messagge: 'You do not have enough balance' })
      }
      transaction.amount = typeTransaction.amount
      transaction.type = business.type
      transaction.business = business
      transaction.wallet = wallet

      wallet.balance -= typeTransaction.amount
      await Wallet.update({ id: typeTransaction.idWallet }, wallet)

      business.balance += typeTransaction.amount
      await Business.update({ id: typeTransaction.idBusiness }, business)

      await transaction.save()
      return res.status(201).json(transaction)
    } else {
      return res
        .status(404)
        .json({ messagge: 'Business Not Exist or Wallet Not Exist' })
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
