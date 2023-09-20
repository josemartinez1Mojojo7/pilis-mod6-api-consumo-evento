import { Router } from 'express'
import {
  createSurrender,
  getSurrender
} from '../controllers/surrender.controller'
import { auth } from '../middlewares/auth'
import { authAdmin } from '../middlewares/authAdmin'
import { authAdminSeller } from '../middlewares/authAdminSeller'

const router = Router()

router.get('/surrender', [auth, authAdminSeller], getSurrender)
router.post('/surrender', [auth, authAdmin], createSurrender)

export default router
