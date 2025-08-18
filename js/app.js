// Main App Controller
const app = {
    currentPage: 'discover',
    
    init() {
        BookService.init();
        this.render();
    },
    
    render() {
        const appContainer = document.getElementById('app');
        
        if (Auth.isLoggedIn()) {
            appContainer.innerHTML = `
                <div class="min-h-screen flex flex-col">
                    ${Navbar.render(this.currentPage)}
                    <main class="flex-1">
                        ${this.currentPage === 'discover' ? DiscoverPage.render() : LibraryPage.render()}
                    </main>
                    ${Footer.render()}
                </div>
            `;
            Navbar.setupListeners();
            this.currentPage === 'discover' ? DiscoverPage.setupListeners() : LibraryPage.setupListeners();
        } else {
            appContainer.innerHTML = AuthScreen.render();
            AuthScreen.setupListeners();
        }
    },
    
    setPage(page) {
        this.currentPage = page;
        this.render();
    }
};

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => app.init());
    