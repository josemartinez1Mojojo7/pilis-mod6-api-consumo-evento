import { Router } from 'express'
import {
  getTransactions,
  createTransaction,
  getTransaction,
  getTransactionsByWallet
} from '../controllers/transaction.controller'
import { auth } from '../middlewares/auth'
import { authAdminSeller } from '../middlewares/authAdminSeller'
import { authAdminClient } from '../middlewares/authAdminClient'
import { authAll } from '../middlewares/authAll'

const router = Router()

router.get('/transactions', [auth, authAll], getTransactions)
router.get('/transactions/:id', [auth, authAll], getTransaction)
router.post('/transactions', [auth, authAdminSeller], createTransaction)
router.get('/transactions/wallet/:id', [auth, authAdminClient], getTransactionsByWallet)

export default router
