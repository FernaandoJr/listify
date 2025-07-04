// Sistema de autenticação simples

// Função para fazer login
async function fazerLogin(event) {
	event.preventDefault()

	const email = document.getElementById("email").value
	const password = document.getElementById("password").value
	const erro = document.getElementById("error-message")

	erro.classList.add("hidden")

	try {
		const response = await fetch("/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		})

		const data = await response.json()

		if (response.ok && data.success) {
			window.location.href = "/shopping-lists"
		} else {
			erro.textContent = data.message || "E-mail ou senha inválidos"
			erro.classList.remove("hidden")
		}
	} catch (error) {
		erro.textContent = "Erro de conexão. Tente novamente."
		erro.classList.remove("hidden")
	}
}

// Função para fazer registro
async function fazerRegistro(event) {
	event.preventDefault()

	const name = document.getElementById("name").value
	const email = document.getElementById("email").value
	const password = document.getElementById("password").value
	const erro = document.getElementById("error-message")

	erro.classList.add("hidden")

	try {
		const response = await fetch("/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		})

		const data = await response.json()

		if (response.ok && data.success) {
			window.location.href = "/login"
		} else {
			erro.textContent = data.message || "Erro ao criar conta"
			erro.classList.remove("hidden")
		}
	} catch (error) {
		erro.textContent = "Erro de conexão. Tente novamente."
		erro.classList.remove("hidden")
	}
}

// Função para verificar se está logado
async function verificarLogin() {
	try {
		const response = await fetch("/api/profile")
		return response.ok
	} catch (error) {
		return false
	}
}

// Configurar eventos quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
	const loginForm = document.getElementById("login-form")
	if (loginForm) {
		loginForm.addEventListener("submit", fazerLogin)
	}

	const registerForm = document.getElementById("register-form")
	if (registerForm) {
		registerForm.addEventListener("submit", fazerRegistro)
	}
})
