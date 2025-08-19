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
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    },
    
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
    
