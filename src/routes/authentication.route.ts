import { Router } from 'express'
import {
  signIn,
  signUp,
  refresh
} from '../controllers/authentication.controller'
import { auth } from '../middlewares/passport'

const router = Router()
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/token', auth, refresh)

export default router
