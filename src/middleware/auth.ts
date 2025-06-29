import { Request, Response, NextFunction } from "express"

export function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.session && (req.session as any).userId) {
		return next()
	}
	res.redirect("/login")
}
