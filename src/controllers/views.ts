import { Request, Response } from "express"

export class ViewsController {
	// Página inicial
	static index(req: Request, res: Response) {
		const user = (req.session as any)?.userId
			? { name: (req.session as any).userName }
			: null

		if (user) {
			res.render("index", {
				title: "Listify - Bem-vindo!",
				user: user,
			})
		} else {
			res.render("index", {
				title: "Listify - Smart Shopping Lists",
				user: null,
			})
		}
	}

	// Página de login
	static login(req: Request, res: Response) {
		if (req.session && (req.session as any).userId) {
			res.redirect("/shopping-lists")
		} else {
			res.render("login", {
				error: null,
				formData: {},
			})
		}
	}

	// Página de registro
	static register(req: Request, res: Response) {
		if (req.session && (req.session as any).userId) {
			res.redirect("/shopping-lists")
		} else {
			res.render("register", {
				error: null,
				success: null,
				formData: {},
			})
		}
	}

	// Página de listas de compras
	static shoppingLists(req: Request, res: Response) {
		if (!(req.session && (req.session as any).userId)) {
			res.redirect("/login")
		} else {
			res.render("shopping-lists", {
				user: {
					name: (req.session as any).userName,
					id: (req.session as any).userId,
				},
			})
		}
	}

	// Página de detalhes da lista
	static listDetails(req: Request, res: Response) {
		if (!(req.session && (req.session as any).userId)) {
			res.redirect("/login")
		} else {
			res.render("list-details", {
				user: {
					name: (req.session as any).userName,
					id: (req.session as any).userId,
				},
			})
		}
	}
}
