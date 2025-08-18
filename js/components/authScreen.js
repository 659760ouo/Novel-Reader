// Auth Screen Component
const AuthScreen = {
    render() {
        return `
            <div class="min-h-screen flex items-center justify-center p-4">
                <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                    <!-- Tabs -->
                    <div class="flex border-b">
                        <button id="loginTab" class="flex-1 py-4 px-4 font-medium tab-active border-b-2">
                            Login
                        </button>
                        <button id="registerTab" class="flex-1 py-4 px-4 font-medium text-gray-500 hover:text-gray-700">
                            Register
                        </button>
                    </div>
                    
                    <!-- Login Form -->
                    <div id="loginFormContainer" class="p-6">
                        <form id="loginForm" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="loginUsername"
                                    required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="loginPassword"
                                    required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            
                            <button
                                type="submit"
                                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                    
                    <!-- Register Form -->
                    <div id="registerFormContainer" class="p-6 hidden">
                        <form id="registerForm" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="regName"
                                    required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="regUsername"
                                    required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Password (min. 6 chars)
                                </label>
                                <input
                                    type="password"
                                    id="regPassword"
                                    minlength="6"
                                    required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            
                            <button
                                type="submit"
                                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },
    
    setupListeners() {
        // Tab switching
        document.getElementById('loginTab').addEventListener('click', () => this.switchTab('login'));
        document.getElementById('registerTab').addEventListener('click', () => this.switchTab('register'));

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));
    },
    
    switchTab(tab) {
        const isLogin = tab === 'login';
        
        document.getElementById('loginTab').classList.toggle('tab-active', isLogin);
        document.getElementById('registerTab').classList.toggle('tab-active', !isLogin);
        document.getElementById('loginFormContainer').classList.toggle('hidden', !isLogin);
        document.getElementById('registerFormContainer').classList.toggle('hidden', isLogin);
    },
    
    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = Auth.login(username, password);
        result.success ? Helpers.showToast('Login successful!') : Helpers.showToast(result.message, true);
        if (result.success) app.render();
    },
    
    handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        
        if (password.length < 6) {
            return Helpers.showToast('Password must be at least 6 characters', true);
        }
        
        const result = Auth.register(name, username, password);
        result.success ? Helpers.showToast('Registration successful!') : Helpers.showToast(result.message, true);
        if (result.success) app.render();
    }
};
    