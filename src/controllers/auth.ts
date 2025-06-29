import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { createUser, findUserByEmail } from "../models/user"

export async function getRegister(req: Request, res: Response) {
	res.render("register", { error: null })
}

export async function postRegister(req: Request, res: Response) {
	const { name, email, password } = req.body
	const password_hash = await bcrypt.hash(password, 10)

	const existingUser = await findUserByEmail(email)
	if (existingUser) {
		return res.render("register", { error: "E-mail já está cadastrado" })
	}

	await createUser({ name, email, password_hash })
	res.redirect("/login")
}

export async function getLogin(req: Request, res: Response) {
	res.render("login", { error: null })
}

export async function postLogin(req: Request, res: Response) {
	const { email, password } = req.body

	const user = await findUserByEmail(email)
	if (!user) {
		return res.render("login", { error: "E-mail ou senha inválidos" })
	}

	const validPassword = await bcrypt.compare(password, user.password_hash)
	if (!validPassword) {
		return res.render("login", { error: "E-mail ou senha inválidos" })
	}

	req.session.regenerate((err) => {
		if (err) {
			return res.render("login", {
				error: "Falha no login. Tente novamente.",
			})
		}

		Object.assign(req.session, { userId: user.id })
		req.session.save((err) => {
			if (err) {
				return res.render("login", {
					error: "Falha no login. Tente novamente.",
				})
			}
			res.redirect("/shopping-lists")
		})
	})
}

export function logout(req: Request, res: Response) {
	req.session.destroy(() => {
		res.redirect("/login")
	})
}
