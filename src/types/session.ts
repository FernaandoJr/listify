import { Session, SessionData } from "express-session"
import { Request } from "express"

declare module "express-session" {
	interface SessionData {
		id?: number
	}
}

export interface AuthenticatedRequest extends Request {
	session: Session & Partial<SessionData>
}
