<<<<<<< HEAD
// Authentication service - handles user login/register/logout
=======
>>>>>>> a1833b4 (initial)
const Auth = {
    isLoggedIn() {
        return !!localStorage.getItem('currentUser');
    },
<<<<<<< HEAD
    
=======
>>>>>>> a1833b4 (initial)
    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },
<<<<<<< HEAD
    
    login(username, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        
=======
    login(username, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
>>>>>>> a1833b4 (initial)
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true };
        }
        return { success: false, message: 'Invalid username or password' };
    },
<<<<<<< HEAD
    
    register(name, username, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }
        
=======
    register(name, username, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }
>>>>>>> a1833b4 (initial)
        const newUser = { id: Date.now(), name, username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        return { success: true };
    },
<<<<<<< HEAD
    
=======
>>>>>>> a1833b4 (initial)
    logout() {
        localStorage.removeItem('currentUser');
    }
};
<<<<<<< HEAD
    
=======
>>>>>>> a1833b4 (initial)
