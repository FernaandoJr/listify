// Lista de itens simples
let idLista = null
let itens = []

// Inicializar
async function iniciar() {
	if (!(await verificarLogin())) {
		window.location.href = "/login.html"
		return
	}

	idLista = new URLSearchParams(window.location.search).get("id")
	if (!idLista) {
		window.location.href = "/shopping-lists.html"
		return
	}

	document
		.getElementById("add-item-form")
		.addEventListener("submit", adicionarItem)
	document.getElementById("logout-btn").addEventListener("click", logout)
	await carregarItens()
}

// Carregar itens
async function carregarItens() {
	try {
		const resp1 = await fetch(`/api/shopping-lists/${idLista}`)
		const lista = await resp1.json()
		document.getElementById(
			"list-title"
		).textContent = `🛒 ${lista.list.name}`

		const resp2 = await fetch(`/api/shopping-lists/${idLista}/items`)
		const dados = await resp2.json()
		itens = dados.items || []

		mostrarItens()
	} catch (error) {
		console.error("Erro:", error)
	}
}

// Adicionar item
async function adicionarItem(event) {
	event.preventDefault()

	const descricao = document.getElementById("item-description").value.trim()
	const quantidade = parseInt(document.getElementById("item-quantity").value)

	if (!descricao) return

	try {
		await fetch(`/api/shopping-lists/${idLista}/items`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				description: descricao,
				quantity: quantidade,
			}),
		})

		document.getElementById("item-description").value = ""
		document.getElementById("item-quantity").value = "1"
		await carregarItens()
	} catch (error) {
		console.error("Erro:", error)
	}
}

// Marcar item
async function marcarItem(id, comprado) {
	try {
		await fetch(`/api/shopping-lists/${idLista}/items/${id}/toggle`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ purchased: comprado }),
		})
		await carregarItens()
	} catch (error) {
		console.error("Erro:", error)
	}
}

// Excluir item
async function excluirItem(id) {
	if (!confirm("Excluir item?")) return

	try {
		await fetch(`/api/shopping-lists/${idLista}/items/${id}`, {
			method: "DELETE",
		})
		await carregarItens()
	} catch (error) {
		console.error("Erro:", error)
	}
}

// Mostrar itens
function mostrarItens() {
	const container = document.getElementById("items-grid")
	container.innerHTML = ""

	if (itens.length === 0) {
		document.getElementById("empty-items-state").classList.remove("hidden")
		document.getElementById("items-list").classList.add("hidden")
		return
	}

	document.getElementById("empty-items-state").classList.add("hidden")
	document.getElementById("items-list").classList.remove("hidden")

	itens.forEach((item) => {
		const div = document.createElement("div")
		div.className = "flex items-center gap-4 p-4 border rounded-lg"
		if (item.purchased) div.className += " opacity-50"

		// Checkbox
		const check = document.createElement("input")
		check.type = "checkbox"
		check.checked = item.purchased
		check.className = "w-5 h-5"
		check.onchange = () => marcarItem(item.id, check.checked)

		// Texto
		const texto = document.createElement("div")
		texto.className = "flex-1"
		texto.innerHTML = `
			<div class="${item.purchased ? "line-through" : ""}">${item.description}</div>
			<div class="text-sm text-gray-600">Qtd: ${item.quantity}</div>
		`

		// Botão excluir
		const botao = document.createElement("button")
		botao.textContent = "X"
		botao.className = "bg-red-500 text-white px-3 py-1 rounded"
		botao.onclick = () => excluirItem(item.id)

		div.appendChild(check)
		div.appendChild(texto)
		div.appendChild(botao)
		container.appendChild(div)
	})
}

// Logout
function logout() {
	localStorage.removeItem("token")
	window.location.href = "/login.html"
}

document.addEventListener("DOMContentLoaded", iniciar)
