import { Router } from 'express'
import {
  getTransactions,
  createTransaction,
  getTransaction
} from '../controllers/transaction.controller'
import { auth } from '../middlewares/auth'
import { authAdminSeller } from '../middlewares/authAdminSeller'

const router = Router()

router.get('/transactions', [auth, authAdminSeller], getTransactions)
router.get('/transactions/:id', [auth, authAdminSeller], getTransaction)
router.post('/transactions', [auth, authAdminSeller], createTransaction)

export default router
