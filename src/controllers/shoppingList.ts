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
	res.json({ success: true, lists })
}

export async function createList(req: Request, res: Response) {
	const { name } = req.body
	const userId = Number((req.session as any).userId)

	const listId = await createShoppingList({ name, user_id: userId })
	res.json({ success: true, message: "Lista criada com sucesso", listId })
}

export async function getListDetails(req: Request, res: Response) {
	const listId = parseInt(req.params.id)
	const list = await getShoppingListById(listId)

	if (!list || list.user_id !== Number((req.session as any).userId)) {
		return res.status(404).json({ success: false, message: "Lista não encontrada" })
	}

	res.json({ success: true, list })
}

export async function getListItems(req: Request, res: Response) {
	const listId = parseInt(req.params.id)
	const list = await getShoppingListById(listId)

	if (!list || list.user_id !== Number((req.session as any).userId)) {
		return res.status(404).json({ success: false, message: "Lista não encontrada" })
	}

	const items = await getItemsByListId(listId)
	res.json({ success: true, items })
}

export async function addItem(req: Request, res: Response) {
	const { description, quantity } = req.body
	const listId = parseInt(req.params.id)

	const list = await getShoppingListById(listId)
	if (!list || list.user_id !== Number((req.session as any).userId)) {
		return res.status(404).json({ success: false, message: "Lista não encontrada" })
	}

	const itemId = await addItemToList({
		description,
		quantity: parseInt(quantity) || 1,
		purchased: false,
		shopping_list_id: listId,
	})

	res.json({ success: true, message: "Item adicionado com sucesso", itemId })
}

export async function toggleItemPurchased(req: Request, res: Response) {
	const itemId = parseInt(req.params.itemId)
	const { purchased } = req.body

	await updateItemPurchased(itemId, purchased)
	res.json({ success: true, message: "Item atualizado com sucesso" })
}

export async function removeItem(req: Request, res: Response) {
	const itemId = parseInt(req.params.itemId)

	await deleteItem(itemId)
	res.json({ success: true, message: "Item removido com sucesso" })
}

export async function removeList(req: Request, res: Response) {
	const listId = parseInt(req.params.id)
	const list = await getShoppingListById(listId)

	if (!list || list.user_id !== Number((req.session as any).userId)) {
		return res.status(404).json({ success: false, message: "Lista não encontrada" })
	}

	await deleteShoppingList(listId)
	res.json({ success: true, message: "Lista removida com sucesso" })
}
