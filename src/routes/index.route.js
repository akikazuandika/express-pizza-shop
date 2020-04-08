import { Router } from 'express'
const router = Router()

import ProductRoute from './product.route'
import CategoryRoute from './category.route'
import OrderRoute from './order.route'

router.use("/products", ProductRoute)
router.use("/categories", CategoryRoute)
router.use("/orders", OrderRoute)

export default router