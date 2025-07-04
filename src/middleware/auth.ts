import { Request, Response, NextFunction } from "express"

export function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.session && (req.session as any).userId) {
		return next()
	}
	res.status(401).json({ success: false, message: "Authentication required" })
}
