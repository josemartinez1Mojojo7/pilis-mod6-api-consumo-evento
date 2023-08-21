import { Router } from 'express'
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller'
import { auth, authAdmin } from '../middlewares/passport'

const router = Router()

router.get('/users', [auth, authAdmin], getUsers)
router.get('/users/:id', [auth, authAdmin], getUser)
router.post('/users', [auth, authAdmin], createUser)
router.put('/users/:id', [auth, authAdmin], updateUser)
router.delete('/users/:id', [auth, authAdmin], deleteUser)

export default router
