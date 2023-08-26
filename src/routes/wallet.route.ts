import { Router } from 'express'
import {
  getWallets,
  createWallet,
  getWallet,
  updateWallet,
  deleteWallet,
  updateWalletCode,
  getWalletValidateCode
} from '../controllers/wallet.controller'
import { auth } from '../middlewares/auth'
import { authAdmin } from '../middlewares/authAdmin'
import { authAdminClient } from '../middlewares/authAdminClient'
import { authAdminSeller } from '../middlewares/authAdminSeller'

const router = Router()

router.get('/wallets', [auth, authAdmin], getWallets)
router.get('/wallets/:id', [auth, authAdmin], getWallet)
router.post('/wallets', [auth, authAdmin], createWallet)
router.put('/wallets/:id', [auth, authAdmin], updateWallet)
router.delete('/wallets/:id', [auth, authAdmin], deleteWallet)

router.put('/wallets/code/:id', [auth, authAdminClient], updateWalletCode)
router.post(
  '/wallets/validate_code',
  [auth, authAdminSeller],
  getWalletValidateCode
)

export default router
