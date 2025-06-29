import { Router } from "express"
import {
	getRegister,
	postRegister,
	getLogin,
	postLogin,
	logout,
} from "../controllers/auth"
import {
	validateRegistration,
	validateLogin,
	handleValidationErrors,
} from "../middleware/validation"

const router = Router()

router.get("/", (req, res) => {
	if (req.session && (req.session as any).userId) {
		res.redirect("/shopping-lists")
	} else {
		res.redirect("/login")
	}
})

router.get("/register", getRegister)
router.post(
	"/register",
	validateRegistration,
	handleValidationErrors,
	postRegister
)

router.get("/login", getLogin)
router.post("/login", validateLogin, handleValidationErrors, postLogin)

router.get("/logout", logout)

router.get("/logout", logout)

export default router
