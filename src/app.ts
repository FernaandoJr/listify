import express from "express"
import session from "express-session"
import path from "path"

const app = express()
const PORT = 3000

// View engine setup (para usar templates EJS)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', 'src', 'views'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/assets', express.static(path.join(__dirname, "..", "public", "assets")))

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

// Rotas
import authRoutes from "./routes/auth"
import shoppingListRoutes from "./routes/shoppingList"
import viewsRoutes from "./routes/views"

// Rotas de API
app.use("/api", authRoutes)
app.use("/api/shopping-lists", shoppingListRoutes)

// Rotas das páginas
app.use("/", viewsRoutes)

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`)
})
