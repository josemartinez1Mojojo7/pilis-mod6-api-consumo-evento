import { Request, Response } from 'express'
import { Transaction } from '../entities/Transaction'
import { Wallet } from '../entities/Wallet'
import { Business } from '../entities/Business'
import { toNewTransactionEntry } from '../utils/types.transaction.util'

const parseReqParam = (ReqParam: any): number => {
  return parseInt(ReqParam)
}

export const getTransactions = async (req: Request, res: Response) => {
  let transactions
  try {
    transactions = await Transaction.find({
      relations: ['business', 'wallet']
    })
    if (req.query.wallet) {
      const idWallet = parseReqParam(req.query.wallet)
      transactions = await Transaction.find({
        relations: ['business', 'business.user', 'wallet'],
        where: {
          wallet: {
            id: idWallet
          }
        }
      })
    }
    if (req.query.business) {
      const idBusiness = parseReqParam(req.query.business)
      transactions = await Transaction.find({
        relations: ['business', 'wallet', 'wallet.user'],
        where: {
          business: {
            id: idBusiness
          }
        }
      })
    }
    return res.status(200).json(transactions)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const transactions = await Transaction.findOne({
      where: { id: parseInt(id) },
      relations: ['business', 'wallet']
    })
    if (!transactions)
      return res.status(404).json({ message: 'Transactions Not Found' })
    return res.status(200).json(transactions)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getTransactionsByWallet = async (req: Request, res: Response) => {
  try {
    const idWallet = parseReqParam(req.params.id)
    const transactions = await Transaction.find({
      relations: ['business', 'wallet'],
      where: {
        wallet: {
          id: idWallet
        }
      }
    })
    return res.status(200).json(transactions)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
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
      if (wallet.balance < typeTransaction.amount) {
        return res
          .status(409)
          .json({ message: 'You do not have enough balance' })
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
        .json({ message: 'Business Not Exist or Wallet Not Exist' })
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
