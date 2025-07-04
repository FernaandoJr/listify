// List Details JavaScript
class ListDetailsManager {
	constructor() {
		this.listId = null
		this.list = null
		this.items = []
		this.init()
	}

	async init() {
		// Check authentication
		const isAuthenticated = await AuthManager.requireAuth()
		if (!isAuthenticated) return

		// Get list ID from URL
		const urlParams = new URLSearchParams(window.location.search)
		this.listId = urlParams.get("id")

		if (!this.listId) {
			window.location.href = "/shopping-lists.html"
			return
		}

		this.initializeEventListeners()
		await this.loadListData()
	}

	initializeEventListeners() {
		// Add item form
		const addItemForm = document.getElementById("add-item-form")
		if (addItemForm) {
			addItemForm.addEventListener(
				"submit",
				this.handleAddItem.bind(this)
			)
		}
	}

	async loadListData() {
		try {
			// Load list details
			const listResponse = await fetch(
				`/api/shopping-lists/${this.listId}`
			)
			if (!listResponse.ok) {
				window.location.href = "/shopping-lists.html"
				return
			}

			const listData = await listResponse.json()
			this.list = listData.list

			// Load list items
			const itemsResponse = await fetch(
				`/api/shopping-lists/${this.listId}/items`
			)
			if (itemsResponse.ok) {
				const itemsData = await itemsResponse.json()
				this.items = itemsData.items || []
			}

			this.updatePageTitle()
			this.updateStats()
			this.renderItems()
		} catch (error) {
			console.error("Error loading list data:", error)
		}
	}

	async handleAddItem(event) {
		event.preventDefault()

		const description = document
			.getElementById("item-description")
			.value.trim()
		const quantity = parseInt(
			document.getElementById("item-quantity").value
		)

		if (!description) return

		try {
			const response = await fetch(
				`/api/shopping-lists/${this.listId}/items`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ description, quantity }),
				}
			)

			if (response.ok) {
				const data = await response.json()
				if (data.success) {
					document.getElementById("item-description").value = ""
					document.getElementById("item-quantity").value = "1"

					await this.loadListData() // Reload data
				}
			}
		} catch (error) {
			console.error("Error adding item:", error)
		}
	}

	async handleToggleItem(itemId, purchased) {
		try {
			const response = await fetch(
				`/api/shopping-lists/${this.listId}/items/${itemId}/toggle`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ purchased }),
				}
			)

			if (response.ok) {
				await this.loadListData() // Reload data
			}
		} catch (error) {
			console.error("Error toggling item:", error)
		}
	}

	async handleDeleteItem(itemId) {
		if (!confirm("Tem certeza que deseja remover este item?")) {
			return
		}

		try {
			const response = await fetch(
				`/api/shopping-lists/${this.listId}/items/${itemId}`,
				{
					method: "DELETE",
				}
			)

			if (response.ok) {
				await this.loadListData() // Reload data
			}
		} catch (error) {
			console.error("Error deleting item:", error)
		}
	}

	updatePageTitle() {
		if (this.list) {
			document.getElementById(
				"page-title"
			).textContent = `${this.list.name} - Listify`
			document.getElementById(
				"list-title"
			).textContent = `🛒 ${this.list.name}`
		}
	}

	updateStats() {
		const totalItems = this.items.length
		const purchasedItems = this.items.filter(
			(item) => item.purchased
		).length
		const remainingItems = totalItems - purchasedItems
		const completionPercentage =
			totalItems > 0 ? Math.round((purchasedItems / totalItems) * 100) : 0

		if (totalItems > 0) {
			document
				.getElementById("stats-container")
				.classList.remove("hidden")
			document.getElementById("total-items").textContent = totalItems
			document.getElementById("purchased-items").textContent =
				purchasedItems
			document.getElementById("remaining-items").textContent =
				remainingItems
			document.getElementById(
				"completion-percentage"
			).textContent = `${completionPercentage}%`
		} else {
			document.getElementById("stats-container").classList.add("hidden")
		}
	}

	renderItems() {
		const emptyState = document.getElementById("empty-items-state")
		const itemsList = document.getElementById("items-list")
		const itemsGrid = document.getElementById("items-grid")

		if (this.items.length === 0) {
			emptyState.classList.remove("hidden")
			itemsList.classList.add("hidden")
		} else {
			emptyState.classList.add("hidden")
			itemsList.classList.remove("hidden")
			itemsGrid.innerHTML = this.items
				.map((item) => this.createItemCard(item))
				.join("")

			// Add event listeners
			this.items.forEach((item) => {
				const checkbox = document.getElementById(`checkbox-${item.id}`)
				if (checkbox) {
					checkbox.addEventListener("change", () => {
						this.handleToggleItem(item.id, checkbox.checked)
					})
				}

				const deleteBtn = document.getElementById(
					`delete-item-${item.id}`
				)
				if (deleteBtn) {
					deleteBtn.addEventListener("click", () =>
						this.handleDeleteItem(item.id)
					)
				}
			})
		}
	}

	createItemCard(item) {
		return `
            <div class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
				item.purchased ? "opacity-75" : ""
			}">
                <div class="flex-shrink-0">
                    <input type="checkbox" 
                           id="checkbox-${item.id}"
                           class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                           ${item.purchased ? "checked" : ""}>
                </div>

                <div class="flex-1">
                    <div class="font-medium text-gray-800 ${
						item.purchased ? "line-through" : ""
					}">
                        ${this.escapeHtml(item.description)}
                    </div>
                    <div class="text-sm text-gray-600">
                        Quantidade: ${item.quantity}
                    </div>
                </div>

                <div class="flex-shrink-0">
                    <button id="delete-item-${item.id}" 
                            class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm">
                        Remover
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
	new ListDetailsManager()
})
