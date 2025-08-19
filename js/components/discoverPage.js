<<<<<<< HEAD
// Discover Page Component
const DiscoverPage = {
    render() {
        const books = BookService.getPlatformBooks();
        return `
            <div class="p-4">
                <h2 class="text-2xl font-bold mb-6">Discover Books</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    ${books.map(book => this.renderBookCard(book)).join('')}
=======
const DiscoverPage = {
    render() {
        const searchTerm = localStorage.getItem('currentSearchTerm') || '';
        const books = BookService.getDiscoverBooks();
        
        // Filter books based on search term
        const filteredBooks = searchTerm 
            ? books.filter(book => 
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.genre.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : books;

        // Ensure modal exists
        this.initializeModal();

        if (filteredBooks.length === 0) {
            return `
                <div class="p-4 text-center">
                    <h2 class="text-2xl font-bold mb-6">Discover Books</h2>
                    <!-- Search Bar -->
                    <div class="mb-6 max-w-md mx-auto">
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="Search books by title, author, or genre..."
                            value="${searchTerm}"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div class="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
                        <i class="fa fa-search text-gray-400 text-4xl mb-4"></i>
                        <h3 class="text-xl font-medium mb-2">No books found</h3>
                        <p class="text-gray-600">Try a different search term or upload your own book.</p>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="p-4">
                <h2 class="text-2xl font-bold mb-6">Discover Books</h2>
                
                <!-- Search Bar -->
                <div class="mb-6 max-w-md">
                    <input
                        type="text"
                        id="searchInput"
                        placeholder="Search books by title, author, or genre..."
                        value="${searchTerm}"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    ${filteredBooks.map(book => {
                        const isInLibrary = BookService.isBookInLibrary(book.id);
                        return `
                            <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                                <img 
                                    src="${book.cover}" 
                                    alt="${book.title}"
                                    class="w-full h-56 object-cover mb-3 rounded"
                                />
                                ${book.isUserUploaded && (
                                    `<div class="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded mb-2">
                                        User Upload
                                    </div>`
                                )}
                                <h3 class="font-bold text-lg">${book.title}</h3>
                                <p class="text-gray-600 text-sm">by ${book.author}</p>
                                <p class="text-gray-500 text-xs mt-1">${book.genre}</p>
                                
                                <!-- Description Preview and Button -->
                                <p class="mt-2 text-sm text-gray-700 line-clamp-2">
                                    ${book.description ? book.description.substring(0, 100) + '...' : 'No description available.'}
                                </p>
                                <button 
                                    data-book-id="${book.id}" 
                                    class="view-description-btn mt-1 text-indigo-600 hover:text-indigo-800 text-sm"
                                >
                                    <i class="fa fa-info-circle mr-1"></i> Full description
                                </button>
                                
                                ${isInLibrary ? (
                                    `<div class="mt-3 w-full bg-gray-100 text-gray-600 py-1 rounded text-sm text-center">
                                        <i class="fa fa-check mr-1"></i> Added to Library
                                    </div>`
                                ) : (
                                    `<button 
                                        data-book-id="${book.id}" 
                                        class="download-btn mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1 rounded text-sm"
                                    >
                                        <i class="fa fa-download mr-1"></i> Add to Library
                                    </button>`
                                )}
                            </div>
                        `;
                    }).join('')}
>>>>>>> a1833b4 (initial)
                </div>
            </div>
        `;
    },
<<<<<<< HEAD
    
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
=======

    initializeModal() {
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
    },

    setupListeners() {
        // Search functionality with focus maintenance
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            // Store current cursor position before re-render
            let cursorPosition = 0;
            
            searchInput.addEventListener('input', (e) => {
                // Save current cursor position
                cursorPosition = e.target.selectionStart;
                
                // Update search term in storage
                localStorage.setItem('currentSearchTerm', e.target.value);
                
                // Re-render results only (not the entire search input)
                const resultsContainer = document.querySelector('.grid');
                if (resultsContainer) {
                    // Get current HTML structure
                    const currentHTML = document.querySelector('main').innerHTML;
                    // Create temporary element to extract search input
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = currentHTML;
                    const searchHTML = tempDiv.querySelector('#searchInput').outerHTML;
                    
                    // Re-render main content
                    const mainContent = document.querySelector('main');
                    mainContent.innerHTML = DiscoverPage.render();
                    
                    // Restore search input with focus and cursor position
                    const newSearchInput = document.getElementById('searchInput');
                    if (newSearchInput) {
                        newSearchInput.focus();
                        newSearchInput.selectionStart = cursorPosition;
                        newSearchInput.selectionEnd = cursorPosition;
                    }
                    
                    // Reattach all listeners
                    DiscoverPage.setupListeners();
                }
            });

            // Set initial focus if this is the discover page
            if (app.currentPage === 'discover') {
                searchInput.focus();
            }
        }

        // View description functionality
        document.querySelectorAll('.view-description-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('.view-description-btn').dataset.bookId);
                const book = BookService.getDiscoverBooks().find(b => b.id === bookId);
                
                if (book) {
                    document.getElementById('modalTitle').textContent = book.title;
                    document.getElementById('modalContent').innerHTML = `
                        <img src="${book.cover}" alt="${book.title}" class="w-full h-64 object-cover rounded mb-4">
                        <p class="text-gray-700"><strong>Author:</strong> ${book.author}</p>
                        <p class="text-gray-700"><strong>Genre:</strong> ${book.genre || 'Uncategorized'}</p>
                        <p class="text-gray-700"><strong>Pages:</strong> ${book.pages}</p>
                        <div class="mt-4">
                            <h4 class="font-medium mb-2">Description</h4>
                            <p class="text-gray-600">${book.description || 'No description available.'}</p>
                        </div>
                        ${book.isUserUploaded ? '<p class="mt-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">User Uploaded Content</p>' : ''}
                    `;
                    
                    document.getElementById('descriptionModal').classList.remove('hidden');
                }
            });
        });

        // Download book functionality
>>>>>>> a1833b4 (initial)
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('.download-btn').dataset.bookId);
                const result = BookService.downloadBook(bookId);
                if (result.success) {
                    Helpers.showToast('Book added to your library!');
<<<<<<< HEAD
=======
                    const mainContent = document.querySelector('main');
                    if (mainContent) {
                        mainContent.innerHTML = DiscoverPage.render();
                        DiscoverPage.setupListeners();
                    }
                } else {
                    Helpers.showToast(result.message, true);
>>>>>>> a1833b4 (initial)
                }
            });
        });
    }
};
<<<<<<< HEAD
    
=======
>>>>>>> a1833b4 (initial)
