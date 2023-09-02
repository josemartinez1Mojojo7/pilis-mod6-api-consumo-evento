import { Router } from 'express'
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller'
import { auth } from '../middlewares/auth'
import { authAdmin } from '../middlewares/authAdmin'
import { authAll } from '../middlewares/authAll'

const router = Router()

router.get('/users', [auth, authAdmin], getUsers)
router.get('/users/:id', [auth, authAll], getUser)
router.post('/users', [auth, authAdmin], createUser)
router.put('/users/:id', [auth, authAdmin], updateUser)
router.delete('/users/:id', [auth, authAdmin], deleteUser)

export default router
