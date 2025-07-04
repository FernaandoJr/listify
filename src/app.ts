import express from "express"
import session from "express-session"
import path from "path"

const app = express()
const PORT = 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "..", "public")))

// Debug middleware
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path}`)
	if (req.body && Object.keys(req.body).length > 0) {
		console.log('Request body:', req.body)
	}
	next()
})

// Sessões
app.use(
	session({
		secret: "lista-compra-secret",
		resave: false,
		saveUninitialized: false,
	})
)

// Rotas de API
import authRoutes from "./routes/auth"
import shoppingListRoutes from "./routes/shoppingList"
app.use("/api", authRoutes)
app.use("/api/shopping-lists", shoppingListRoutes)

// Rota para a página inicial
app.get("/", (req, res) => {
	if (req.session && (req.session as any).userId) {
		res.redirect("/shopping-lists.html")
	} else {
		res.redirect("/index.html")
	}
})

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`)
})
