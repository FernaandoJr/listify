// Authentication JavaScript
class AuthManager {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }

        // Register form
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', this.handleRegister.bind(this));
        }
    }

    async handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('error-message');
        const submitButton = document.getElementById('login-btn');

        this.setLoading(submitButton, true);
        this.hideError(errorElement);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.success) {
                    window.location.href = '/shopping-lists.html';
                } else {
                    this.showError(errorElement, data.message || 'Login falhou');
                }
            } else {
                this.showError(errorElement, data.message || 'E-mail ou senha inválidos');
            }
        } catch (error) {
            this.showError(errorElement, 'Erro de conexão. Tente novamente.');
        } finally {
            this.setLoading(submitButton, false);
        }
    }

    async handleRegister(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('error-message');
        const submitButton = document.getElementById('register-btn');

        this.setLoading(submitButton, true);
        this.hideError(errorElement);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.success) {
                    window.location.href = '/login.html';
                } else {
                    this.showError(errorElement, data.message || 'Registro falhou');
                }
            } else {
                this.showError(errorElement, data.message || 'E-mail já está cadastrado');
            }
        } catch (error) {
            this.showError(errorElement, 'Erro de conexão. Tente novamente.');
        } finally {
            this.setLoading(submitButton, false);
        }
    }

    showError(element, message) {
        element.textContent = message;
        element.classList.remove('hidden');
    }

    hideError(element) {
        element.classList.add('hidden');
    }

    setLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.textContent = 'Carregando...';
            button.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            button.disabled = false;
            button.classList.remove('opacity-50', 'cursor-not-allowed');
            
            if (button.id === 'login-btn') {
                button.textContent = 'Entrar';
            } else if (button.id === 'register-btn') {
                button.textContent = 'Criar Conta';
            }
        }
    }

    // Check if user is authenticated
    static async checkAuth() {
        try {
            console.log('Checking authentication...');
            const response = await fetch('/api/profile');
            console.log('Auth check response status:', response.status);
            const isAuth = response.ok;
            console.log('Is authenticated:', isAuth);
            return isAuth;
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    }

    // Redirect to login if not authenticated
    static async requireAuth() {
        console.log('Requiring authentication...');
        const isAuthenticated = await AuthManager.checkAuth();
        console.log('requireAuth result:', isAuthenticated);
        if (!isAuthenticated) {
            console.log('Redirecting to login page');
            window.location.href = '/login.html';
            return false;
        }
        return true;
    }
}

// Initialize authentication manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});
