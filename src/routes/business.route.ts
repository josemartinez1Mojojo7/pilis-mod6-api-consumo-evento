import { Router } from 'express'
import {
  getBusiness,
  getBusinesses,
  updateBusiness,
  createBusiness,
  deleteBusiness
} from '../controllers/business.controller'

import { auth, authAdmin } from '../middlewares/passport'
import { validateRole } from '../middlewares/role.business'

const router = Router()

router.get('/business', [auth, authAdmin], getBusinesses)
router.get('/business/:id', auth, getBusiness)
router.post('/business', [auth, authAdmin, validateRole], createBusiness)
router.put('/business/:id', [auth, authAdmin], updateBusiness)
router.delete('/business/:id', [auth, authAdmin], deleteBusiness)

export default router
