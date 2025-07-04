import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { createUser, findUserByEmail } from "../models/user"

export async function getRegister(req: Request, res: Response) {
	res.json({ success: true })
}

export async function postRegister(req: Request, res: Response) {
	const { name, email, password } = req.body
	const password_hash = await bcrypt.hash(password, 10)

	const existingUser = await findUserByEmail(email)
	if (existingUser) {
		return res.status(400).json({ success: false, message: "E-mail já está cadastrado" })
	}

	await createUser({ name, email, password_hash })
	res.json({ success: true, message: "Usuário criado com sucesso" })
}

export async function getLogin(req: Request, res: Response) {
	res.json({ success: true })
}

export async function postLogin(req: Request, res: Response) {
	const { email, password } = req.body

	const user = await findUserByEmail(email)
	if (!user) {
		return res.status(400).json({ success: false, message: "E-mail ou senha inválidos" })
	}

	const validPassword = await bcrypt.compare(password, user.password_hash)
	if (!validPassword) {
		return res.status(400).json({ success: false, message: "E-mail ou senha inválidos" })
	}

	req.session.regenerate((err) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: "Falha no login. Tente novamente.",
			})
		}

		Object.assign(req.session, { userId: user.id })
		req.session.save((err) => {
			if (err) {
				return res.status(500).json({
					success: false,
					message: "Falha no login. Tente novamente.",
				})
			}
			res.json({ success: true, message: "Login realizado com sucesso" })
		})
	})
}

export function logout(req: Request, res: Response) {
	req.session.destroy(() => {
		res.json({ success: true, message: "Logout realizado com sucesso" })
	})
}

export function getProfile(req: Request, res: Response) {
	if (req.session && (req.session as any).userId) {
		res.json({ success: true, authenticated: true })
	} else {
		res.status(401).json({ success: false, authenticated: false })
	}
}
