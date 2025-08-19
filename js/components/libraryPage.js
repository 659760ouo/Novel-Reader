<<<<<<< HEAD
// Library Page Component
=======
>>>>>>> a1833b4 (initial)
const LibraryPage = {
    render() {
        const books = BookService.getUserBooks();
        
<<<<<<< HEAD
        if (books.length === 0) {
            return this.renderEmptyState();
=======
        // Add modal container to body if not exists
        if (!document.getElementById('descriptionModal')) {
            document.body.insertAdjacentHTML('beforeend', `
                <div id="descriptionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
                    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-4">
                                <h3 id="modalTitle" class="text-xl font-bold"></h3>
                                <button id="closeModal" class="text-gray-500 hover:text-gray-700">
                                    <i class="fa fa-times text-xl"></i>
                                </button>
                            </div>
                            <div id="modalContent" class="space-y-4"></div>
                        </div>
                    </div>
                </div>
            `);
            
            // Add modal close listener
            document.getElementById('closeModal').addEventListener('click', () => {
                document.getElementById('descriptionModal').classList.add('hidden');
            });
            
            // Close modal when clicking outside content
            document.getElementById('descriptionModal').addEventListener('click', (e) => {
                if (e.target === document.getElementById('descriptionModal')) {
                    document.getElementById('descriptionModal').classList.add('hidden');
                }
            });
        }
        
        if (books.length === 0) {
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
>>>>>>> a1833b4 (initial)
        }
        
        return `
            <div class="p-4">
                <h2 class="text-2xl font-bold mb-6">My Library</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
<<<<<<< HEAD
                    ${books.map(book => this.renderBookCard(book)).join('')}
=======
                    ${books.map(book => `
                        <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                            <img 
                                src="${book.cover}" 
                                alt="${book.title}"
                                class="w-full h-56 object-cover mb-3 rounded"
                            />
                            <h3 class="font-bold text-lg">${book.title}</h3>
                            <p class="text-gray-600 text-sm">by ${book.author}</p>
                            
                            <!-- Description Button -->
                            <button 
                                data-book-id="${book.id}" 
                                class="view-description-btn mt-2 text-indigo-600 hover:text-indigo-800 text-sm"
                            >
                                <i class="fa fa-info-circle mr-1"></i> View Description
                            </button>
                            
                            <div class="mt-2">
                                <div class="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Reading Progress</span>
                                    <span>Page ${book.progress.currentPage}/${book.pages}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        class="bg-indigo-600 h-2 rounded-full"
                                        style="width: ${(book.progress.currentPage / book.pages) * 100}%"
                                    ></div>
                                </div>
                            </div>
                            
                            <div class="mt-3 flex gap-2">
                                <button 
                                    data-book-id="${book.id}" 
                                    class="read-btn flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded text-sm"
                                >
                                    <i class="fa fa-book mr-1"></i> Read Book
                                </button>
                                <button 
                                    data-book-id="${book.id}" 
                                    class="remove-btn bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded text-sm"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
>>>>>>> a1833b4 (initial)
                </div>
            </div>
        `;
    },
<<<<<<< HEAD
    
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
=======

    setupListeners() {
        // Go to discover from empty library
        const goToDiscover = document.getElementById('goToDiscover');
        if (goToDiscover) {
            goToDiscover.addEventListener('click', () => {
                app.setPage('discover');
            });
        }

        // View description functionality
        document.querySelectorAll('.view-description-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('.view-description-btn').dataset.bookId);
                const book = BookService.getUserBooks().find(b => b.id === bookId);
                
                if (book) {
                    // Populate modal content
                    document.getElementById('modalTitle').textContent = book.title;
                    document.getElementById('modalContent').innerHTML = `
                        <img src="${book.cover}" alt="${book.title}" class="w-full h-64 object-cover rounded mb-4">
                        <p class="text-gray-700"><strong>Author:</strong> ${book.author}</p>
                        <p class="text-gray-700"><strong>Genre:</strong> ${book.genre || 'Uncategorized'}</p>
                        <p class="text-gray-700"><strong>Pages:</strong> ${book.pages}</p>
                        <p class="text-gray-700"><strong>Reading Progress:</strong> ${Math.round((book.progress.currentPage / book.pages) * 100)}%</p>
                        <div class="mt-4">
                            <h4 class="font-medium mb-2">Description</h4>
                            <p class="text-gray-600">${book.description || 'No description available.'}</p>
                        </div>
                        ${book.isUserUploaded ? '<p class="mt-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">User Uploaded Content</p>' : ''}
                    `;
                    
                    // Show modal
                    document.getElementById('descriptionModal').classList.remove('hidden');
                }
            });
        });

        // Read book - open in new tab
        document.querySelectorAll('.read-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('.read-btn').dataset.bookId);
                const book = BookService.getUserBooks().find(b => b.id === bookId);
                
                if (book) {
                    // Create a temporary HTML for the book reader
                    const readerHtml = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>${book.title} - Reader</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                            <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
                            <style>
                                .book-container {
                                    max-width: 800px;
                                    margin: 0 auto;
                                    padding: 2rem;
                                }
                                .book-content {
                                    line-height: 1.8;
                                    font-size: 1.1rem;
                                    white-space: pre-line; /* Preserves line breaks from TXT */
                                }
                            </style>
                        </head>
                        <body class="bg-gray-50">
                            <header class="bg-white shadow-sm py-4 px-6">
                                <div class="max-width: 800px mx-auto">
                                    <h1 class="text-2xl font-bold">${book.title}</h1>
                                    <p class="text-gray-600">by ${book.author}</p>
                                    <p class="text-sm text-gray-500 mt-1">
                                        Page ${book.progress.currentPage} of ${book.pages}
                                    </p>
                                </div>
                            </header>
                            <main class="book-container bg-white my-6 rounded-lg shadow">
                                <div class="book-content">
                                    ${book.fileContent || 'No content available.'}
                                </div>
                            </main>
                            <footer class="text-center py-4 text-gray-500 text-sm">
                                <p>Reading from your library | <a href="index.html" class="text-indigo-600">Back to Library</a></p>
                            </footer>
                        </body>
                        </html>
                    `;

                    // Create a blob and open in new tab
                    const blob = new Blob([readerHtml], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    window.open(url, '_blank');
                }
            });
        });

        // Remove book with confirmation
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('.remove-btn').dataset.bookId);
                const book = BookService.getUserBooks().find(b => b.id === bookId);
                
                if (book && confirm(`Are you sure you want to remove "${book.title}" from your library?`)) {
                    const result = BookService.removeBook(bookId);
                    if (result.success) {
                        Helpers.showToast('Book removed from your library');
                        // Re-render library
                        const mainContent = document.querySelector('main');
                        if (mainContent) {
                            mainContent.innerHTML = LibraryPage.render();
                            LibraryPage.setupListeners();
                        }
                    } else {
                        Helpers.showToast('Failed to remove book', true);
                    }
                }
>>>>>>> a1833b4 (initial)
            });
        });
    }
};
<<<<<<< HEAD
    
=======
>>>>>>> a1833b4 (initial)
