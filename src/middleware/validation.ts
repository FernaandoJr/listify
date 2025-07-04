import { body, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"

export const validateRegistration = [
	body("name")
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage("Nome deve ter entre 2 e 50 caracteres"),

	body("email")
		.isEmail()
		.normalizeEmail()
		.withMessage("Por favor, forneça um e-mail válido"),

	body("password")
		.isLength({ min: 6 })
		.withMessage("Senha deve ter pelo menos 6 caracteres")
		.matches(/\d/)
		.withMessage("Senha deve conter pelo menos um número"),
]

export const validateLogin = [
	body("email")
		.isEmail()
		.normalizeEmail()
		.withMessage("Por favor, forneça um e-mail válido"),

	body("password").notEmpty().withMessage("Senha é obrigatória"),
]

export const validateShoppingList = [
	body("name")
		.trim()
		.isLength({ min: 1, max: 100 })
		.withMessage("Nome da lista deve ter entre 1 e 100 caracteres"),
]

export const validateShoppingItem = [
	body("description")
		.trim()
		.isLength({ min: 1, max: 200 })
		.withMessage("Descrição do item deve ter entre 1 e 200 caracteres"),

	body("quantity")
		.optional()
		.isInt({ min: 1, max: 999 })
		.withMessage("Quantidade deve ser um número entre 1 e 999"),
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

		// Return JSON error response
		return res.status(400).json({
			success: false,
			message: errorMessage,
			errors: errors.array()
		})
	}

	next()
}
