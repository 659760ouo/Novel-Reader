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
<<<<<<< HEAD
                        ${this.currentPage === 'discover' ? DiscoverPage.render() : LibraryPage.render()}
=======
                        ${this.currentPage === 'discover' 
                            ? DiscoverPage.render() 
                            : this.currentPage === 'library' 
                                ? LibraryPage.render() 
                                : this.currentPage === 'upload'
                                    ? UploadPage.render()
                                    : this.currentPage === 'my-uploads'
                                        ? MyUploadsPage.render()
                                        : DiscoverPage.render()
                        }
>>>>>>> a1833b4 (initial)
                    </main>
                    ${Footer.render()}
                </div>
            `;
            Navbar.setupListeners();
<<<<<<< HEAD
            this.currentPage === 'discover' ? DiscoverPage.setupListeners() : LibraryPage.setupListeners();
=======
            
            // Setup page-specific listeners
            switch(this.currentPage) {
                case 'discover':
                    DiscoverPage.setupListeners();
                    break;
                case 'library':
                    LibraryPage.setupListeners();
                    break;
                case 'upload':
                    UploadPage.setupListeners();
                    break;
                case 'my-uploads':
                    MyUploadsPage.setupListeners();
                    break;
            }
>>>>>>> a1833b4 (initial)
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

<<<<<<< HEAD
// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => app.init());
    
=======
// Start the app when DOM loads
document.addEventListener('DOMContentLoaded', () => app.init());
>>>>>>> a1833b4 (initial)
