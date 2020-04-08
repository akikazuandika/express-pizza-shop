import { Router } from 'express'
const router = Router()

import ProductRoute from './product.route'
import CategoryRoute from './category.route'

router.use("/products", ProductRoute)
router.use("/categories", CategoryRoute)

export default router