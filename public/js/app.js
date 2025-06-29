// Utility Functions
function showToast(message, type = "success") {
	const toast = document.createElement("div")
	toast.className = `toast ${type}`
	toast.textContent = message
	document.body.appendChild(toast)

	setTimeout(() => toast.classList.add("show"), 100)
	setTimeout(() => {
		toast.classList.remove("show")
		setTimeout(() => document.body.removeChild(toast), 300)
	}, 3000)
}

// Form Validation
function validateForm(formElement) {
	const inputs = formElement.querySelectorAll("input[required]")
	let isValid = true

	inputs.forEach((input) => {
		if (!input.value.trim()) {
			input.style.borderColor = "#dc3545"
			isValid = false
		} else {
			input.style.borderColor = "#28a745"
		}
	})

	return isValid
}

// Auto-save functionality
function autoSave() {
	const forms = document.querySelectorAll("form[data-autosave]")

	forms.forEach((form) => {
		const inputs = form.querySelectorAll("input, textarea")
		inputs.forEach((input) => {
			input.addEventListener(
				"input",
				debounce(() => {
					localStorage.setItem(`autosave_${input.name}`, input.value)
				}, 500)
			)

			// Restore saved values
			const savedValue = localStorage.getItem(`autosave_${input.name}`)
			if (savedValue) {
				input.value = savedValue
			}
		})

		form.addEventListener("submit", () => {
			// Clear autosave on successful submit
			const inputs = form.querySelectorAll("input, textarea")
			inputs.forEach((input) => {
				localStorage.removeItem(`autosave_${input.name}`)
			})
		})
	})
}

// Debounce function
function debounce(func, wait) {
	let timeout
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout)
			func(...args)
		}
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}

// Shopping List Specific Functions
function updateProgress() {
	const items = document.querySelectorAll(".item-card")
	const purchasedItems = document.querySelectorAll(".item-card.purchased")
	const total = items.length
	const purchased = purchasedItems.length

	if (total > 0) {
		const percentage = (purchased / total) * 100
		const progressBar = document.querySelector(".progress-bar")
		if (progressBar) {
			progressBar.style.width = `${percentage}%`
		}

		// Update stats
		const totalStat = document.querySelector(
			'.stat-number[data-stat="total"]'
		)
		const purchasedStat = document.querySelector(
			'.stat-number[data-stat="purchased"]'
		)
		const remainingStat = document.querySelector(
			'.stat-number[data-stat="remaining"]'
		)
		const completionStat = document.querySelector(
			'.stat-number[data-stat="completion"]'
		)

		if (totalStat) totalStat.textContent = total
		if (purchasedStat) purchasedStat.textContent = purchased
		if (remainingStat) remainingStat.textContent = total - purchased
		if (completionStat)
			completionStat.textContent = `${Math.round(percentage)}%`
	}
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
	document.addEventListener("keydown", (e) => {
		// Ctrl/Cmd + N for new item
		if ((e.ctrlKey || e.metaKey) && e.key === "n") {
			e.preventDefault()
			const newItemInput = document.querySelector(
				'input[name="description"]'
			)
			if (newItemInput) {
				newItemInput.focus()
			}
		}

		// Escape to close modals or clear focus
		if (e.key === "Escape") {
			document.activeElement.blur()
		}
	})
}

// Search and filter functionality
function setupSearch() {
	const searchInput = document.querySelector("#search-items")
	if (searchInput) {
		searchInput.addEventListener(
			"input",
			debounce((e) => {
				const searchTerm = e.target.value.toLowerCase()
				const items = document.querySelectorAll(".item-card")

				items.forEach((item) => {
					const description = item
						.querySelector(".item-description")
						.textContent.toLowerCase()
					if (description.includes(searchTerm)) {
						item.style.display = ""
					} else {
						item.style.display = "none"
					}
				})
			}, 300)
		)
	}
}

// Drag and drop for reordering (future enhancement)
function setupDragAndDrop() {
	const items = document.querySelectorAll(".item-card")

	items.forEach((item) => {
		item.draggable = true

		item.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("text/plain", item.dataset.itemId)
			item.classList.add("dragging")
		})

		item.addEventListener("dragend", () => {
			item.classList.remove("dragging")
		})

		item.addEventListener("dragover", (e) => {
			e.preventDefault()
		})

		item.addEventListener("drop", (e) => {
			e.preventDefault()
			const draggedId = e.dataTransfer.getData("text/plain")
			const draggedElement = document.querySelector(
				`[data-item-id="${draggedId}"]`
			)

			if (draggedElement && draggedElement !== item) {
				const container = item.parentNode
				const items = Array.from(container.children)
				const draggedIndex = items.indexOf(draggedElement)
				const targetIndex = items.indexOf(item)

				if (draggedIndex < targetIndex) {
					container.insertBefore(draggedElement, item.nextSibling)
				} else {
					container.insertBefore(draggedElement, item)
				}
			}
		})
	})
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	autoSave()
	setupKeyboardShortcuts()
	setupSearch()
	updateProgress()

	// Add smooth scrolling
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault()
			const target = document.querySelector(this.getAttribute("href"))
			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
				})
			}
		})
	})

	// Add loading states to forms
	document.querySelectorAll("form").forEach((form) => {
		form.addEventListener("submit", (e) => {
			const submitBtn = form.querySelector('button[type="submit"]')
			if (submitBtn) {
				submitBtn.disabled = true
				submitBtn.innerHTML = '<div class="spinner"></div>'
			}
		})
	})
})
