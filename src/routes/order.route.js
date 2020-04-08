import { Router } from 'express'
import OrderController from '../controller/order.controller'
const router = Router()

router.get("/", OrderController.getAll)
router.get("/:id", OrderController.getById)
router.post("/", OrderController.create)
router.put("/:id", OrderController.update)

export default router