// Shopping Lists JavaScript
class ShoppingListsManager {
	constructor() {
		this.lists = []
		this.init()
	}

	async init() {
		console.log("Initializing ShoppingListsManager...")
		// Check authentication
		const isAuthenticated = await AuthManager.checkAuth()
		console.log("Authentication check result:", isAuthenticated)

		if (!isAuthenticated) {
			console.log("User not authenticated, redirecting to login")
			window.location.href = "/login.html"
			return
		}

		console.log(
			"User authenticated, initializing event listeners and loading lists"
		)
		this.initializeEventListeners()
		await this.loadLists()
	}

	initializeEventListeners() {
		// New list form
		const newListForm = document.getElementById("new-list-form")
		if (newListForm) {
			newListForm.addEventListener(
				"submit",
				this.handleCreateList.bind(this)
			)
		}

		// Logout button
		const logoutBtn = document.getElementById("logout-btn")
		if (logoutBtn) {
			logoutBtn.addEventListener("click", this.handleLogout.bind(this))
		}
	}

	async loadLists() {
		try {
			const response = await fetch("/api/shopping-lists")
			if (response.ok) {
				const data = await response.json()
				this.lists = data.lists || []
				this.renderLists()
			} else if (response.status === 401) {
				// User not authenticated, redirect to login
				window.location.href = "/login.html"
			} else {
				console.error("Failed to load lists", response.status)
			}
		} catch (error) {
			console.error("Error loading lists:", error)
		}
	}

	async handleCreateList(event) {
		event.preventDefault()

		const nameInput = document.getElementById("list-name")
		const name = nameInput.value.trim()

		console.log("Attempting to create list with name:", name)

		if (!name) {
			console.log("No name provided")
			return
		}

		try {
			console.log("Sending request to /api/shopping-lists")
			const response = await fetch("/api/shopping-lists", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			})

			console.log("Response status:", response.status)
			const data = await response.json()
			console.log("Response data:", data)

			if (response.ok && data.success) {
				console.log("List created successfully")
				nameInput.value = ""
				nameInput.focus()
				await this.loadLists() // Reload lists
			} else if (response.status === 401) {
				console.log("Authentication required, redirecting to login")
				// User not authenticated, redirect to login
				window.location.href = "/login.html"
			} else {
				console.error(
					"Error creating list:",
					data.message || "Unknown error"
				)
				alert(
					"Erro ao criar lista: " +
						(data.message || "Erro desconhecido")
				)
			}
		} catch (error) {
			console.error("Error creating list:", error)
			alert("Erro de conexão ao criar lista")
		}
	}

	async handleDeleteList(listId) {
		if (!confirm("Tem certeza que deseja excluir esta lista?")) {
			return
		}

		try {
			const response = await fetch(`/api/shopping-lists/${listId}`, {
				method: "DELETE",
			})

			if (response.ok) {
				await this.loadLists() // Reload lists
			}
		} catch (error) {
			console.error("Error deleting list:", error)
		}
	}

	async handleLogout() {
		try {
			const response = await fetch("/api/logout", { method: "POST" })
			if (response.ok) {
				window.location.href = "/login.html"
			}
		} catch (error) {
			console.error("Error logging out:", error)
		}
	}

	renderLists() {
		const emptyState = document.getElementById("empty-state")
		const listsGrid = document.getElementById("lists-grid")

		if (this.lists.length === 0) {
			emptyState.classList.remove("hidden")
			listsGrid.innerHTML = ""
		} else {
			emptyState.classList.add("hidden")
			listsGrid.innerHTML = this.lists
				.map((list) => this.createListCard(list))
				.join("")

			// Add event listeners to delete buttons
			this.lists.forEach((list) => {
				const deleteBtn = document.getElementById(`delete-${list.id}`)
				if (deleteBtn) {
					deleteBtn.addEventListener("click", () =>
						this.handleDeleteList(list.id)
					)
				}
			})
		}
	}

	createListCard(list) {
		return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <a href="/list-details.html?id=${
					list.id
				}" class="block p-6 hover:bg-gray-50 rounded-xl transition-colors">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">${this.escapeHtml(
						list.name
					)}</h3>
                    <p class="text-gray-600 mb-4">Clique para ver e gerenciar seus itens</p>
                </a>
                
                <div class="px-6 pb-6 flex gap-2">
                    <a href="/list-details.html?id=${list.id}" 
                       class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Ver Itens
                    </a>
                    <button id="delete-${list.id}" 
                            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        Excluir
                    </button>
                </div>
            </div>
        `
	}

	escapeHtml(text) {
		const map = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#039;",
		}
		return text.replace(/[&<>"']/g, (m) => map[m])
	}
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	new ShoppingListsManager()
})
