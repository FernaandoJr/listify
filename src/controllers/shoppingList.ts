import { Request, Response } from "express"
import {
	createShoppingList,
	getShoppingListsByUserId,
	getShoppingListById,
	deleteShoppingList,
	addItemToList,
	getItemsByListId,
	updateItemPurchased,
	deleteItem,
} from "../models/shoppingList"

export async function getShoppingLists(req: Request, res: Response) {
	const userId = Number((req.session as any).userId)
	const lists = await getShoppingListsByUserId(userId)
	res.render("shoppingLists", { lists })
}

export async function createList(req: Request, res: Response) {
	const { name } = req.body
	const userId = Number((req.session as any).userId)

	await createShoppingList({ name, user_id: userId })
	res.redirect("/shopping-lists")
}

export async function getListDetails(req: Request, res: Response) {
	const listId = parseInt(req.params.id)
	const list = await getShoppingListById(listId)
	const items = await getItemsByListId(listId)

	if (!list || list.user_id !== Number((req.session as any).userId)) {
		return res.redirect("/shopping-lists")
	}

	res.render("listDetails", { list, items })
}

export async function addItem(req: Request, res: Response) {
	const { description, quantity } = req.body
	const listId = parseInt(req.params.id)

	const list = await getShoppingListById(listId)
	if (!list || list.user_id !== Number((req.session as any).userId)) {
		return res.redirect("/shopping-lists")
	}

	await addItemToList({
		description,
		quantity: parseInt(quantity) || 1,
		purchased: false,
		shopping_list_id: listId,
	})

	res.redirect(`/shopping-lists/${listId}`)
}

export async function toggleItemPurchased(req: Request, res: Response) {
	const itemId = parseInt(req.params.itemId)
	const { purchased } = req.body

	await updateItemPurchased(itemId, purchased === "true")
	res.redirect(`/shopping-lists/${req.params.id}`)
}

export async function removeItem(req: Request, res: Response) {
	const itemId = parseInt(req.params.itemId)

	await deleteItem(itemId)
	res.redirect(`/shopping-lists/${req.params.id}`)
}

export async function removeList(req: Request, res: Response) {
	const listId = parseInt(req.params.id)
	const list = await getShoppingListById(listId)

	if (!list || list.user_id !== Number((req.session as any).userId)) {
		return res.redirect("/shopping-lists")
	}

	await deleteShoppingList(listId)
	res.redirect("/shopping-lists")
}
