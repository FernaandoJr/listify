import { openDb } from "../database/database"

export interface ShoppingList {
	id?: number
	name: string
	user_id: number
}

export interface ShoppingListItem {
	id?: number
	description: string
	quantity: number
	purchased: boolean
	shopping_list_id: number
}

export async function createShoppingList(list: ShoppingList) {
	const db = await openDb()
	const sql = "INSERT INTO shopping_lists (name, user_id) VALUES (?, ?)"
	const result = await db.run(sql, [list.name, list.user_id])
	await db.close()
	return result.lastID
}

export async function getShoppingListsByUserId(userId: number) {
	const db = await openDb()
	const lists = await db.all(
		"SELECT * FROM shopping_lists WHERE user_id = ?",
		[userId]
	)
	await db.close()
	return lists
}

export async function getShoppingListById(id: number) {
	const db = await openDb()
	const list = await db.get("SELECT * FROM shopping_lists WHERE id = ?", [id])
	await db.close()
	return list
}

export async function deleteShoppingList(id: number) {
	const db = await openDb()
	await db.run("DELETE FROM shopping_list_items WHERE shopping_list_id = ?", [
		id,
	])
	await db.run("DELETE FROM shopping_lists WHERE id = ?", [id])
	await db.close()
}

export async function addItemToList(item: ShoppingListItem) {
	const db = await openDb()
	const sql =
		"INSERT INTO shopping_list_items (description, quantity, purchased, shopping_list_id) VALUES (?, ?, ?, ?)"
	const result = await db.run(sql, [
		item.description,
		item.quantity,
		item.purchased,
		item.shopping_list_id,
	])
	await db.close()
	return result.lastID
}

export async function getItemsByListId(listId: number) {
	const db = await openDb()
	const items = await db.all(
		"SELECT * FROM shopping_list_items WHERE shopping_list_id = ?",
		[listId]
	)
	await db.close()
	return items
}

export async function updateItemPurchased(id: number, purchased: boolean) {
	const db = await openDb()
	await db.run("UPDATE shopping_list_items SET purchased = ? WHERE id = ?", [
		purchased,
		id,
	])
	await db.close()
}

export async function deleteItem(id: number) {
	const db = await openDb()
	await db.run("DELETE FROM shopping_list_items WHERE id = ?", [id])
	await db.close()
}
