import { Router } from "express"
import {
	getShoppingLists,
	createList,
	getListDetails,
	getListItems,
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
router.get("/:id/items", getListItems)
router.post("/:id/items", validateShoppingItem, handleValidationErrors, addItem)
router.put("/:id/items/:itemId/toggle", toggleItemPurchased)
router.delete("/:id/items/:itemId", removeItem)
router.delete("/:id", removeList)

export default router
