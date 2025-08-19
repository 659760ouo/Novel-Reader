const MyUploadsPage = {
    render() {
        const user = Auth.getCurrentUser();
        if (!user) {
            return `<div class="p-4"><p>Please log in to view your uploaded books.</p></div>`;
        }

        // Get only books uploaded by current user
        const myBooks = BookService.getDiscoverBooks().filter(
            book => book.isUserUploaded && book.authorId === user.id
        );

        if (myBooks.length === 0) {
            return `
                <div class="flex flex-col items-center justify-center h-[calc(100vh-120px)] p-4 text-center">
                    <div class="bg-indigo-100 p-6 rounded-full mb-4">
                        <i class="fa fa-upload text-4xl text-indigo-600"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">You haven't uploaded any books</h3>
                    <p class="text-gray-600 max-w-md mb-6">
                        Upload your first novel to see it here
                    </p>
                    <button id="goToUpload" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
                        Upload New Book
                    </button>
                </div>
            `;
        }

        // Ensure edit modal exists
        this.initializeEditModal();

        return `
            <div class="p-4">
                <h2 class="text-2xl font-bold mb-6">My Uploaded Books</h2>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    ${myBooks.map(book => `
                        <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                            <img 
                                src="${book.cover}" 
                                alt="${book.title}"
                                class="w-full h-56 object-cover mb-3 rounded"
                            />
                            <h3 class="font-bold text-lg">${book.title}</h3>
                            <p class="text-gray-600 text-sm">by ${book.author}</p>
                            <p class="text-gray-500 text-xs mt-1">${book.genre}</p>
                            
                            <p class="mt-2 text-sm text-gray-700 line-clamp-2">
                                ${book.description ? book.description.substring(0, 100) + '...' : 'No description available.'}
                            </p>
                            
                            <div class="mt-3 flex gap-2">
                                <button 
                                    data-book-id="${book.id}" 
                                    class="edit-btn flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded text-sm"
                                >
                                    <i class="fa fa-edit mr-1"></i> Edit Book
                                </button>
                                <button 
                                    data-book-id="${book.id}" 
                                    class="delete-upload-btn bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded text-sm"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    initializeEditModal() {
        if (!document.getElementById('editBookModal')) {
            document.body.insertAdjacentHTML('beforeend', `
                <div id="editBookModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
                    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-4">
                                <h3 id="editModalTitle" class="text-xl font-bold">Edit Book</h3>
                                <button id="closeEditModal" class="text-gray-500 hover:text-gray-700">
                                    <i class="fa fa-times text-xl"></i>
                                </button>
                            </div>
                            <form id="editBookForm" class="space-y-4">
                                <input type="hidden" id="editBookId">
                                
                                <div>
                                    <label for="editNovelTitle" class="block text-sm font-medium text-gray-700 mb-1">
                                        Novel Title *
                                    </label>
                                    <input
                                        type="text"
                                        id="editNovelTitle"
                                        required
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                
                                <div>
                                    <label for="editNovelDescription" class="block text-sm font-medium text-gray-700 mb-1">
                                        Description *
                                    </label>
                                    <textarea
                                        id="editNovelDescription"
                                        rows="4"
                                        required
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    ></textarea>
                                </div>
                                
                                <div>
                                    <label for="editNovelGenre" class="block text-sm font-medium text-gray-700 mb-1">
                                        Genre
                                    </label>
                                    <input
                                        type="text"
                                        id="editNovelGenre"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label for="editNovelCover" class="block text-sm font-medium text-gray-700 mb-2">
                                        Update Book Cover (JPG/PNG)
                                    </label>
                                    <input
                                        type="file"
                                        id="editNovelCover"
                                        accept=".jpg, .jpeg, .png"
                                        class="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-lg file:border-0
                                            file:text-sm file:font-medium
                                            file:bg-indigo-600 file:text-white
                                            hover:file:bg-indigo-700"
                                    />
                                    <p class="text-xs text-gray-500 mt-1">
                                        Optional - leave blank to keep current cover
                                    </p>
                                </div>
                                
                                <div>
                                    <label for="editNovelFile" class="block text-sm font-medium text-gray-700 mb-2">
                                        Update Novel File (TXT only)
                                    </label>
                                    <input
                                        type="file"
                                        id="editNovelFile"
                                        accept=".txt"
                                        class="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-lg file:border-0
                                            file:text-sm file:font-medium
                                            file:bg-indigo-600 file:text-white
                                            hover:file:bg-indigo-700"
                                    />
                                    <p class="text-xs text-gray-500 mt-1">
                                        Optional - leave blank to keep current content
                                    </p>
                                </div>
                                
                                <div class="flex justify-end">
                                    <button
                                        type="submit"
                                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition flex items-center"
                                    >
                                        <i class="fa fa-save mr-2"></i>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `);
            
            // Close modal listeners
            document.getElementById('closeEditModal').addEventListener('click', () => {
                document.getElementById('editBookModal').classList.add('hidden');
            });
            
            document.getElementById('editBookModal').addEventListener('click', (e) => {
                if (e.target === document.getElementById('editBookModal')) {
                    document.getElementById('editBookModal').classList.add('hidden');
                }
            });
        }
    },

    setupListeners() {
        // Go to upload page from empty state
        const goToUpload = document.getElementById('goToUpload');
        if (goToUpload) {
            goToUpload.addEventListener('click', () => {
                app.setPage('upload');
            });
        }

        // Edit book functionality
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('.edit-btn').dataset.bookId);
                const book = BookService.getDiscoverBooks().find(b => b.id === bookId);
                
                if (book) {
                    // Populate form with current book data
                    document.getElementById('editBookId').value = book.id;
                    document.getElementById('editNovelTitle').value = book.title;
                    document.getElementById('editNovelDescription').value = book.description || '';
                    document.getElementById('editNovelGenre').value = book.genre || '';
                    
                    // Show modal
                    document.getElementById('editBookModal').classList.remove('hidden');
                }
            });
        });

        // Handle edit form submission
        const editForm = document.getElementById('editBookForm');
        if (editForm) {
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const bookId = parseInt(document.getElementById('editBookId').value);
                const book = BookService.getDiscoverBooks().find(b => b.id === bookId);
                
                if (book) {
                    // Create updated book data object
                    const updatedData = {
                        ...book,
                        title: document.getElementById('editNovelTitle').value,
                        description: document.getElementById('editNovelDescription').value,
                        genre: document.getElementById('editNovelGenre').value || 'Uncategorized',
                        updatedAt: new Date().toISOString()
                    };

                    // Handle cover image update if provided
                    const coverInput = document.getElementById('editNovelCover');
                    const coverFile = coverInput.files[0];
                    
                    const handleCoverUpdate = (coverData) => {
                        if (coverData) updatedData.cover = coverData;
                        
                        // Handle text file update if provided
                        const fileInput = document.getElementById('editNovelFile');
                        const file = fileInput.files[0];
                        
                        const handleFileUpdate = (fileContent) => {
                            if (fileContent) {
                                updatedData.fileContent = fileContent;
                                updatedData.fileName = file.name;
                                updatedData.pages = BookService.estimatePages(fileContent);
                            }
                            
                            // Save updates
                            const result = BookService.updateUserNovel(updatedData);
                            if (result.success) {
                                Helpers.showToast('Book updated successfully!');
                                document.getElementById('editBookModal').classList.add('hidden');
                                // Refresh page
                                const mainContent = document.querySelector('main');
                                if (mainContent) {
                                    mainContent.innerHTML = MyUploadsPage.render();
                                    MyUploadsPage.setupListeners();
                                }
                            } else {
                                Helpers.showToast(result.message, true);
                            }
                        };
                        
                        // Process file update if provided
                        if (file) {
                            if (file.type !== 'text/plain') {
                                return Helpers.showToast('Please upload only TXT files', true);
                            }
                            if (file.size > 5 * 1024 * 1024) {
                                return Helpers.showToast('File size must be less than 5MB', true);
                            }
                            
                            const reader = new FileReader();
                            reader.onload = (event) => handleFileUpdate(event.target.result);
                            reader.readAsText(file);
                        } else {
                            handleFileUpdate(null);
                        }
                    };
                    
                    // Process cover update if provided
                    if (coverFile) {
                        if (!['image/jpeg', 'image/png'].includes(coverFile.type)) {
                            return Helpers.showToast('Please upload JPG or PNG images only', true);
                        }
                        if (coverFile.size > 2 * 1024 * 1024) {
                            return Helpers.showToast('Cover image must be less than 2MB', true);
                        }
                        
                        const coverReader = new FileReader();
                        coverReader.onload = (event) => handleCoverUpdate(event.target.result);
                        coverReader.readAsDataURL(coverFile);
                    } else {
                        handleCoverUpdate(null);
                    }
                }
            });
        }

        // Delete uploaded book functionality
        document.querySelectorAll('.delete-upload-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('.delete-upload-btn').dataset.bookId);
                const book = BookService.getDiscoverBooks().find(b => b.id === bookId);
                
                if (book && confirm(`Are you sure you want to delete "${book.title}"? This action cannot be undone.`)) {
                    const result = BookService.deleteUserNovel(bookId);
                    if (result.success) {
                        Helpers.showToast('Book deleted successfully');
                        // Refresh page
                        const mainContent = document.querySelector('main');
                        if (mainContent) {
                            mainContent.innerHTML = MyUploadsPage.render();
                            MyUploadsPage.setupListeners();
                        }
                    } else {
                        Helpers.showToast('Failed to delete book', true);
                    }
                }
            });
        });
    }
};
