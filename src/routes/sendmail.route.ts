import { Router } from 'express'
import { createEmail } from '../controllers/sendmail.controller'
import { auth } from '../middlewares/auth'
import { authAdminSeller } from '../middlewares/authAdminSeller'

const router = Router()

router.post('/sendmail', [auth, authAdminSeller], createEmail)

export default router
