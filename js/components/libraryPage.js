// Library Page Component
const LibraryPage = {
    render() {
        const books = BookService.getUserBooks();
        
        if (books.length === 0) {
            return this.renderEmptyState();
        }
        
        return `
            <div class="p-4">
                <h2 class="text-2xl font-bold mb-6">My Library</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    ${books.map(book => this.renderBookCard(book)).join('')}
                </div>
            </div>
        `;
    },
    
    renderEmptyState() {
        return `
            <div class="flex flex-col items-center justify-center h-[calc(100vh-120px)] p-4 text-center">
                <div class="bg-indigo-100 p-6 rounded-full mb-4">
                    <i class="fa fa-book text-4xl text-indigo-600"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">Your library is empty</h3>
                <p class="text-gray-600 max-w-md mb-6">
                    Browse and download books from the Discover section to get started
                </p>
                <button id="goToDiscover" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
                    Browse Books
                </button>
            </div>
        `;
    },
    
    renderBookCard(book) {
        const progress = Helpers.calculateProgress(book.progress.currentPage, book.pages);
        return `
            <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                <img 
                    src="${book.cover}" 
                    alt="${book.title}"
                    class="w-full h-56 object-cover mb-3 rounded"
                />
                <h3 class="font-bold">${book.title}</h3>
                <p class="text-gray-600 text-sm">by ${book.author}</p>
                <div class="mt-2">
                    <div class="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Reading Progress</span>
                        <span>Page ${book.progress.currentPage}/${book.pages}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-indigo-600 h-2 rounded-full" style="width: ${progress}%"></div>
                    </div>
                </div>
                <button 
                    data-book-id="${book.id}" 
                    class="read-btn mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-1 rounded text-sm"
                >
                    <i class="fa fa-book mr-1"></i> Continue Reading
                </button>
            </div>
        `;
    },
    
    setupListeners() {
        const goToDiscover = document.getElementById('goToDiscover');
        if (goToDiscover) {
            goToDiscover.addEventListener('click', () => app.setPage('discover'));
        }
        
        document.querySelectorAll('.read-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                Helpers.showToast('Opening book reader...');
            });
        });
    }
};
    