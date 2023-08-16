import { Router } from 'express'
import {
  getWallets,
  createWallet,
  getWallet,
  updateWallet,
  deleteWallet
} from '../controllers/wallet.controller'
import { auth, authAdmin } from '../middlewares/passport'

const router = Router()

router.get('/wallets', [auth, authAdmin], getWallets)
router.get('/wallets/:id', [auth, authAdmin], getWallet)
router.post('/wallets', [auth, authAdmin], createWallet)
router.put('/wallets/:id', [auth, authAdmin], updateWallet)
router.delete('/wallets/:id', [auth, authAdmin], deleteWallet)

export default router
