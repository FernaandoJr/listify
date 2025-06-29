import express from "express"
import session from "express-session"
import path from "path"

const app = express()
const PORT = 3000

// Configurar EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "..", "public")))

// Sessões
app.use(
	session({
		secret: "lista-compra-secret",
		resave: false,
		saveUninitialized: false,
	})
)

// Rotas base (iremos criar depois)
import authRoutes from "./routes/auth"
import shoppingListRoutes from "./routes/shoppingList"
app.use("/", authRoutes)
app.use("/shopping-lists", shoppingListRoutes)

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`)
})
