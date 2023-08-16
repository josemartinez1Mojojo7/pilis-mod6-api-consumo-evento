import { Router } from 'express'
import {
  signIn,
  signUp,
  refresh
} from '../controllers/authentication.controller'

const router = Router()
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/token', refresh)

export default router
