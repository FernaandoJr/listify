import { openDb } from "../database/database"

export interface User {
	id?: number
	name: string
	email: string
	password_hash: string
}

export async function createUser(user: User) {
	const db = await openDb()
	const sql =
		"INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)"
	const result = await db.run(sql, [
		user.name,
		user.email,
		user.password_hash,
	])
	await db.close()
	return result.lastID
}

export async function findUserByEmail(email: string) {
	const db = await openDb()
	const user = await db.get("SELECT * FROM users WHERE email = ?", [email])
	await db.close()
	return user
}
