<<<<<<< HEAD
// Navbar Component
const Navbar = {
    render(currentPage) {
        const user = Auth.getCurrentUser();
        return `
            <nav class="bg-white shadow-sm">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <div class="flex-shrink-0 flex items-center">
                                <i class="fa fa-book text-indigo-600 text-2xl mr-2"></i>
                                <span class="text-xl font-bold">Book Library</span>
                            </div>
                            <div class="ml-10 flex items-center space-x-6">
                                <button 
                                    id="navDiscover" 
                                    class="py-2 px-1 border-b-2 ${currentPage === 'discover' ? 'tab-active' : 'border-transparent text-gray-500 hover:text-gray-700'}"
                                >
                                    Discover
                                </button>
                                <button 
                                    id="navLibrary" 
                                    class="py-2 px-1 border-b-2 ${currentPage === 'library' ? 'tab-active' : 'border-transparent text-gray-500 hover:text-gray-700'}"
                                >
                                    My Library
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <span class="mr-3">Hello, ${user.name}</span>
                            <button id="logoutBtn" class="text-gray-500 hover:text-red-500">
                                <i class="fa fa-sign-out"></i>
=======
const Navbar = {
    render(currentPage) {
        const user = Auth.getCurrentUser();
        const username = user ? user.name : 'Guest';
        
        return `
            <nav class="bg-white shadow-sm">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <a href="#" class="flex-shrink-0 flex items-center">
                                <i class="fa fa-book text-indigo-600 text-2xl mr-2"></i>
                                <span class="font-bold text-xl">Novel The Less</span>
                            </a>
                        </div>
                        <div class="flex items-center space-x-4">
                            <!-- Display username -->
                            <span class="text-sm text-gray-600 hidden md:inline-block">
                                <i class="fa fa-user mr-1"></i>${username}
                            </span>
                            
                            <button 
                                data-page="discover" 
                                class="nav-link px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'discover' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}"
                            >
                                <i class="fa fa-compass mr-1"></i> Discover
                            </button>
                            <button 
                                data-page="library" 
                                class="nav-link px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'library' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}"
                            >
                                <i class="fa fa-book mr-1"></i> My Library
                            </button>
                            <button 
                                data-page="upload" 
                                class="nav-link px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'upload' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}"
                            >
                                <i class="fa fa-upload mr-1"></i> Upload
                            </button>
                            <button 
                                data-page="my-uploads" 
                                class="nav-link px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'my-uploads' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}"
                            >
                                <i class="fa fa-pencil mr-1"></i> My Uploads
                            </button>
                            <button id="logoutBtn" class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600">
                                <i class="fa fa-sign-out mr-1"></i> Logout
>>>>>>> a1833b4 (initial)
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    },
<<<<<<< HEAD
    
    setupListeners() {
        document.getElementById('navDiscover').addEventListener('click', () => {
            app.setPage('discover');
        });
        
        document.getElementById('navLibrary').addEventListener('click', () => {
            app.setPage('library');
        });
        
        document.getElementById('logoutBtn').addEventListener('click', () => {
            Auth.logout();
            Helpers.showToast('Logged out successfully');
            app.render();
        });
    }
};
    
=======

    setupListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const page = e.target.closest('.nav-link').dataset.page;
                if (page) {
                    app.setPage(page);
                }
            });
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            Auth.logout();
            app.init();
            Helpers.showToast('Logged out successfully');
        });
    }
};
>>>>>>> a1833b4 (initial)
