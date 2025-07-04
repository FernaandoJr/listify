import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { createUser, findUserByEmail } from "../models/user"

export async function getRegister(req: Request, res: Response) {
	res.json({ success: true })
}

export async function postRegister(req: Request, res: Response) {
	const { name, email, password } = req.body

	try {
		const existingUser = await findUserByEmail(email)
		if (existingUser) {
			return res.render("register", {
				error: "E-mail já está cadastrado",
				formData: { name, email },
			})
		}

		const password_hash = await bcrypt.hash(password, 10)
		await createUser({ name, email, password_hash })

		// Redirect para login com sucesso
		res.render("login", {
			error: null,
			success: "Conta criada com sucesso! Faça login para continuar.",
			formData: { email },
		})
	} catch (error) {
		res.render("register", {
			error: "Erro interno do servidor. Tente novamente.",
			formData: { name, email },
		})
	}
}

export async function getLogin(req: Request, res: Response) {
	res.json({ success: true })
}

export async function postLogin(req: Request, res: Response) {
	const { email, password } = req.body

	try {
		const user = await findUserByEmail(email)
		if (!user) {
			return res.render("login", {
				error: "E-mail ou senha inválidos",
				formData: { email },
			})
		}

		const isValidPassword = await bcrypt.compare(
			password,
			user.password_hash
		)
		if (!isValidPassword) {
			return res.render("login", {
				error: "E-mail ou senha inválidos",
				formData: { email },
			})
		}

		// Configurar sessão
		;(req.session as any).userId = user.id(req.session as any).userName =
			user.name

		// Redirecionar para listas
		res.redirect("/shopping-lists")
	} catch (error) {
		res.render("login", {
			error: "Erro interno do servidor. Tente novamente.",
			formData: { email },
		})
	}
}

export function logout(req: Request, res: Response) {
	req.session.destroy(() => {
		res.redirect("/")
	})
}

export function getProfile(req: Request, res: Response) {
	if (req.session && (req.session as any).userId) {
		res.json({ success: true, authenticated: true })
	} else {
		res.status(401).json({ success: false, authenticated: false })
	}
}
