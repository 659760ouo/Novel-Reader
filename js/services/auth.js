
// Authentication service - handles user login/register/logout
const Auth = {
    isLoggedIn() {
        return !!localStorage.getItem('currentUser');
    },
    
    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },
    
    login(username, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true };
        }
        return { success: false, message: 'Invalid username or password' };
    },
    
    register(name, username, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }
        
        const newUser = { id: Date.now(), name, username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        return { success: true };
    },
    
    logout() {
        localStorage.removeItem('currentUser');
    }
};
    
