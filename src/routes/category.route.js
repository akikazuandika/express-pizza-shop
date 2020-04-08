import { Router } from 'express'
import CategoryController from '../controller/category.controller'
const router = Router()

router.get("/", CategoryController.getAll)
router.get("/:id", CategoryController.getById)
router.post("/", CategoryController.create)
router.put("/:id", CategoryController.update)
router.delete("/:id", CategoryController.delete)

export default router