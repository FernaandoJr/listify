import { Router } from "express"
import {
	getRegister,
	postRegister,
	getLogin,
	postLogin,
	logout,
	getProfile,
} from "../controllers/auth"
import {
	validateRegistration,
	validateLogin,
	handleValidationErrors,
} from "../middleware/validation"

const router = Router()

router.get("/profile", getProfile)

router.get("/register", getRegister)
router.post(
	"/register",
	validateRegistration,
	handleValidationErrors,
	postRegister
)

router.get("/login", getLogin)
router.post("/login", validateLogin, handleValidationErrors, postLogin)

router.post("/logout", logout)

export default router
