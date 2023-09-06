import { Router } from 'express'
import {
  getBusiness,
  getBusinesses,
  updateBusiness,
  createBusiness,
  deleteBusiness
} from '../controllers/business.controller'

import { auth } from '../middlewares/auth'
import { authAdmin } from '../middlewares/authAdmin'

const router = Router()

router.get('/business', [auth, authAdmin], getBusinesses)
router.get('/business/:id', [auth, authAdmin], getBusiness)
router.post('/business', [auth, authAdmin], createBusiness)
router.put('/business/:id', [auth, authAdmin], updateBusiness)
router.delete('/business/:id', [auth, authAdmin], deleteBusiness)

export default router
