// Listas de compras simples
let listas = []

// Inicializar
async function iniciar() {
	if (!(await verificarLogin())) {
		window.location.href = "/login"
		return
	}

	document
		.getElementById("new-list-form")
		.addEventListener("submit", criarLista)
	document.getElementById("logout-btn").addEventListener("click", logout)
	await carregarListas()
}

// Carregar listas
async function carregarListas() {
	try {
		const resp = await fetch("/api/shopping-lists")
		const dados = await resp.json()
		listas = dados.lists || []
		mostrarListas()
	} catch (error) {
		console.error("Erro:", error)
	}
}

// Criar lista
async function criarLista(event) {
	event.preventDefault()

	const input = document.getElementById("list-name")
	const nome = input.value.trim()

	if (!nome) return

	try {
		await fetch("/api/shopping-lists", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: nome }),
		})

		input.value = ""
		await carregarListas()
	} catch (error) {
		alert("Erro ao criar lista")
	}
}

// Excluir lista
async function excluirLista(id) {
	if (!confirm("Excluir lista?")) return

	try {
		await fetch(`/api/shopping-lists/${id}`, { method: "DELETE" })
		await carregarListas()
	} catch (error) {
		console.error("Erro:", error)
	}
}

// Logout
async function logout() {
	try {
		await fetch("/api/logout", { method: "POST" })
		window.location.href = "/login"
	} catch (error) {
		console.error("Erro:", error)
	}
}

// Mostrar listas
function mostrarListas() {
	const container = document.getElementById("lists-grid")
	container.innerHTML = ""

	if (listas.length === 0) {
		document.getElementById("empty-state").classList.remove("hidden")
		return
	}

	document.getElementById("empty-state").classList.add("hidden")

	listas.forEach((lista) => {
		const div = document.createElement("div")
		div.className = "bg-white p-4 border rounded-lg shadow"

		div.innerHTML = `
			<h3 class="font-bold mb-2">${lista.name}</h3>
			<div class="flex gap-2">
				<a href="/list-details?id=${lista.id}" class="bg-blue-500 text-white px-4 py-2 rounded flex-1 text-center">
					Ver Itens
				</a>
				<button onclick="excluirLista(${lista.id})" class="bg-red-500 text-white px-4 py-2 rounded">
					Excluir
				</button>
			</div>
		`

		container.appendChild(div)
	})
}

document.addEventListener("DOMContentLoaded", iniciar)
