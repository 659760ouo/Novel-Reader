// Discover Page Component
const DiscoverPage = {
    render() {
        const books = BookService.getPlatformBooks();
        return `
            <div class="p-4">
                <h2 class="text-2xl font-bold mb-6">Discover Books</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    ${books.map(book => this.renderBookCard(book)).join('')}
                </div>
            </div>
        `;
    },
    
    renderBookCard(book) {
        return `
            <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                <img 
                    src="${book.cover}" 
                    alt="${book.title}"
                    class="w-full h-56 object-cover mb-3 rounded"
                />
                <h3 class="font-bold">${book.title}</h3>
                <p class="text-gray-600 text-sm">by ${book.author}</p>
                <p class="text-gray-500 text-xs mt-1">${book.genre} • ${book.pages} pages</p>
                <button 
                    data-book-id="${book.id}" 
                    class="download-btn mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1 rounded text-sm"
                >
                    <i class="fa fa-download mr-1"></i> Add to Library
                </button>
            </div>
        `;
    },
    
    setupListeners() {
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('.download-btn').dataset.bookId);
                const result = BookService.downloadBook(bookId);
                if (result.success) {
                    Helpers.showToast('Book added to your library!');
                }
            });
        });
    }
};
    