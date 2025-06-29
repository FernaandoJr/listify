import { Router } from "express"
import {
	getShoppingLists,
	createList,
	getListDetails,
	addItem,
	toggleItemPurchased,
	removeItem,
	removeList,
} from "../controllers/shoppingList"
import { ensureAuthenticated } from "../middleware/auth"
import {
	validateShoppingList,
	validateShoppingItem,
	handleValidationErrors,
} from "../middleware/validation"

const router = Router()

router.use(ensureAuthenticated)

router.get("/", getShoppingLists)
router.post("/", validateShoppingList, handleValidationErrors, createList)
router.get("/:id", getListDetails)
router.post("/:id/items", validateShoppingItem, handleValidationErrors, addItem)
router.post("/:id/items/:itemId/toggle", toggleItemPurchased)
router.post("/:id/items/:itemId/delete", removeItem)
router.post("/:id/delete", removeList)

export default router
