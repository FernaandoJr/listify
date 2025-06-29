import { openDb } from "./database"

async function init() {
	const db = await openDb()

	// Create users table
	await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );
  `)

	// Create shopping_lists table
	await db.exec(`
    CREATE TABLE IF NOT EXISTS shopping_lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `)

	// Create shopping_list_items table
	await db.exec(`
    CREATE TABLE IF NOT EXISTS shopping_list_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      purchased BOOLEAN NOT NULL DEFAULT 0,
      shopping_list_id INTEGER NOT NULL,
      FOREIGN KEY(shopping_list_id) REFERENCES shopping_lists(id)
    );
  `)

	console.log("Tables created successfully!")
	await db.close()
}

init()
