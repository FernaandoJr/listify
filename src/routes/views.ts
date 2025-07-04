import { Router } from "express"
import { ViewsController } from "../controllers/views"

const router = Router()

// Rotas das páginas
router.get("/", ViewsController.index)
router.get("/login", ViewsController.login)
router.get("/register", ViewsController.register)
router.get("/shopping-lists", ViewsController.shoppingLists)
router.get("/list-details", ViewsController.listDetails)

export default router
