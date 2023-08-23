import { Router } from 'express'
import {
  getWallets,
  createWallet,
  getWallet,
  updateWallet,
  deleteWallet,
  getWalletByUser,
  updateWalletCode,
  getWalletByCode
} from '../controllers/wallet.controller'
import { auth } from '../middlewares/auth'
import { authAdmin } from '../middlewares/authAdmin'
import { authAdminClient } from '../middlewares/authAdminClient'
import { authAdminSeller } from '../middlewares/authAdminSeller'

const router = Router()

router.get('/wallets', [auth, authAdmin], getWallets)
router.get('/wallets/:idUser', [auth, authAdmin], getWallet)
router.post('/wallets', [auth, authAdmin], createWallet)
router.put('/wallets/:id', [auth, authAdmin], updateWallet)
router.delete('/wallets/:id', [auth, authAdmin], deleteWallet)

router.get('/wallets/user/:id', [auth, authAdminClient], getWalletByUser)
router.put('/wallets/code/:id', [auth, authAdminClient], updateWalletCode)
router.get('/wallets/code/:code', [auth, authAdminSeller], getWalletByCode)

export default router
