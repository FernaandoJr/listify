const { body, validationResult } = require("express-validator")
import { Request, Response, NextFunction } from "express"

export const validateRegistration = [
	body("name")
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage("Name must be between 2 and 50 characters"),

	body("email")
		.isEmail()
		.normalizeEmail()
		.withMessage("Please provide a valid email"),

	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long")
		.matches(/\d/)
		.withMessage("Password must contain at least one number"),
]

export const validateLogin = [
	body("email")
		.isEmail()
		.normalizeEmail()
		.withMessage("Please provide a valid email"),

	body("password").notEmpty().withMessage("Password is required"),
]

export const validateShoppingList = [
	body("name")
		.trim()
		.isLength({ min: 1, max: 100 })
		.withMessage("List name must be between 1 and 100 characters"),
]

export const validateShoppingItem = [
	body("description")
		.trim()
		.isLength({ min: 1, max: 200 })
		.withMessage("Item description must be between 1 and 200 characters"),

	body("quantity")
		.optional()
		.isInt({ min: 1, max: 999 })
		.withMessage("Quantity must be a number between 1 and 999"),
]

export const handleValidationErrors = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map((error: any) => error.msg)
		const errorMessage = errorMessages.join(", ")

		// Return to previous page with error
		const referer = req.get("Referer") || "/"

		if (referer.includes("/login")) {
			return res.render("login", { error: errorMessage })
		} else if (referer.includes("/register")) {
			return res.render("register", { error: errorMessage })
		} else {
			return res.redirect("back")
		}
	}

	next()
}
