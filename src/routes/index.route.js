import { Router } from 'express'
const router = Router()

import CategoryRoute from './category.route'

router.use("/categories", CategoryRoute)

export default router