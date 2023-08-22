import { Router } from 'express'
import {
  getTransactions,
  createTransaction,
  getTransaction
} from '../controllers/transaction.controller'
import { auth, authAdminSeller } from '../middlewares/passport'

const router = Router()

router.get('/transactions', [auth, authAdminSeller], getTransactions)
router.get('/transactions/:id', [auth, authAdminSeller], getTransaction)
router.post('/transactions', [auth, authAdminSeller], createTransaction)

export default router
