<<<<<<< HEAD
// Book service - handles book data and user library
const BookService = {
    init() {
        if (!localStorage.getItem('platformBooks')) {
            const sampleBooks = [
                {
                    id: 1,
                    title: "Mystery of the Night",
                    author: "Sarah Johnson",
                    cover: "https://picsum.photos/seed/book1/300/450",
                    genre: "Mystery",
                    pages: 280
                },
                {
                    id: 2,
                    title: "Cosmic Journey",
                    author: "Mark Wilson",
                    cover: "https://picsum.photos/seed/book2/300/450",
                    genre: "Sci-Fi",
                    pages: 350
                },
                {
                    id: 3,
                    title: "Love in Spring",
                    author: "Emily Parker",
                    cover: "https://picsum.photos/seed/book3/300/450",
                    genre: "Romance",
                    pages: 220
                }
            ];
            localStorage.setItem('platformBooks', JSON.stringify(sampleBooks));
        }
    },
    
    getPlatformBooks() {
        return JSON.parse(localStorage.getItem('platformBooks') || '[]');
    },
    
=======
const BookService = {
    // Initialize with empty books
    init() {
        if (!localStorage.getItem('platformBooks')) {
            localStorage.setItem('platformBooks', JSON.stringify([]));
        }
    },

    // Get all books for discover page (including user-uploaded)
    getDiscoverBooks() {
        return JSON.parse(localStorage.getItem('platformBooks') || '[]');
    },

    // Check if a book is in user's library
    isBookInLibrary(bookId) {
        const userBooks = this.getUserBooks();
        return userBooks.some(book => book.id === bookId);
    },

    // Save a user-uploaded novel to the platform books
    saveUserNovel(novelData) {
        try {
            const allBooks = this.getDiscoverBooks();
            
            // Create new book object with auto-generated ID
            const newNovel = {
                id: Date.now(), // Unique ID using timestamp
                ...novelData,
                isUserUploaded: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Add to existing books
            allBooks.push(newNovel);
            localStorage.setItem('platformBooks', JSON.stringify(allBooks));
            
            return { success: true };
        } catch (error) {
            console.error('Error saving novel:', error);
            return { success: false, message: 'Failed to upload novel' };
        }
    },

    // Update an existing user-uploaded novel
    updateUserNovel(updatedBook) {
        try {
            const user = Auth.getCurrentUser();
            if (!user) return { success: false, message: 'Not authenticated' };

            let allBooks = this.getDiscoverBooks();
            const bookIndex = allBooks.findIndex(b => b.id === updatedBook.id);
            
            // Verify book exists and belongs to current user
            if (bookIndex === -1) {
                return { success: false, message: 'Book not found' };
            }
            
            if (allBooks[bookIndex].authorId !== user.id) {
                return { success: false, message: 'You do not have permission to edit this book' };
            }

            // Update the book
            allBooks[bookIndex] = {
                ...allBooks[bookIndex],
                ...updatedBook,
                updatedAt: new Date().toISOString()
            };
            
            localStorage.setItem('platformBooks', JSON.stringify(allBooks));
            
            // Update in user libraries if it exists there
            const userBooks = this.getUserBooks();
            const userBookIndex = userBooks.findIndex(b => b.id === updatedBook.id);
            if (userBookIndex !== -1) {
                userBooks[userBookIndex] = {
                    ...userBooks[userBookIndex],
                    ...updatedBook
                };
                localStorage.setItem(`userBooks_${user.id}`, JSON.stringify(userBooks));
            }
            
            return { success: true };
        } catch (error) {
            console.error('Error updating novel:', error);
            return { success: false, message: 'Failed to update novel' };
        }
    },

    // Delete a user-uploaded novel
    deleteUserNovel(bookId) {
        try {
            const user = Auth.getCurrentUser();
            if (!user) return { success: false, message: 'Not authenticated' };

            let allBooks = this.getDiscoverBooks();
            const initialLength = allBooks.length;
            
            // Filter out the book, but only if it belongs to current user
            allBooks = allBooks.filter(book => 
                !(book.id === bookId && book.isUserUploaded && book.authorId === user.id)
            );
            
            // If book was found and removed
            if (allBooks.length < initialLength) {
                localStorage.setItem('platformBooks', JSON.stringify(allBooks));
                
                // Also remove from user's library if present
                let userBooks = this.getUserBooks();
                userBooks = userBooks.filter(book => book.id !== bookId);
                localStorage.setItem(`userBooks_${user.id}`, JSON.stringify(userBooks));
                
                return { success: true };
            }
            
            return { success: false, message: 'Book not found or you do not have permission to delete it' };
        } catch (error) {
            console.error('Error deleting novel:', error);
            return { success: false, message: 'Failed to delete novel' };
        }
    },

    // Estimate pages from text content (rough calculation)
    estimatePages(text) {
        if (!text) return 0;
        const wordsPerPage = 250; // Average words per page
        const wordCount = text.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerPage);
    },

    // Get user's library books
>>>>>>> a1833b4 (initial)
    getUserBooks() {
        const user = Auth.getCurrentUser();
        if (!user) return [];
        return JSON.parse(localStorage.getItem(`userBooks_${user.id}`) || '[]');
    },
<<<<<<< HEAD
    
=======

    // Add book to user's library
>>>>>>> a1833b4 (initial)
    downloadBook(bookId) {
        const user = Auth.getCurrentUser();
        if (!user) return { success: false };

<<<<<<< HEAD
        const allBooks = this.getPlatformBooks();
        const book = allBooks.find(b => b.id === bookId);
        if (!book) return { success: false };

        const userBooks = this.getUserBooks();
=======
        const allBooks = this.getDiscoverBooks();
        const book = allBooks.find(b => b.id === bookId);
        if (!book) return { success: false };

        // Check if book is already in library
        const userBooks = this.getUserBooks();
        if (userBooks.some(b => b.id === bookId)) {
            return { success: false, message: 'Book already in library' };
        }

        // Add book with progress tracking
>>>>>>> a1833b4 (initial)
        const bookWithProgress = {
            ...book,
            progress: { currentPage: 1, lastRead: new Date().toISOString() }
        };
<<<<<<< HEAD
        
        userBooks.push(bookWithProgress);
        localStorage.setItem(`userBooks_${user.id}`, JSON.stringify(userBooks));
        return { success: true };
    }
};
    
=======
        userBooks.push(bookWithProgress);
        
        localStorage.setItem(`userBooks_${user.id}`, JSON.stringify(userBooks));
        return { success: true };
    },

    // Remove book from user's library
    removeBook(bookId) {
        const user = Auth.getCurrentUser();
        if (!user) return { success: false };

        let userBooks = this.getUserBooks();
        const initialLength = userBooks.length;
        
        // Filter out the book to remove
        userBooks = userBooks.filter(book => book.id !== bookId);
        
        // If book was found and removed
        if (userBooks.length < initialLength) {
            localStorage.setItem(`userBooks_${user.id}`, JSON.stringify(userBooks));
            return { success: true };
        }
        
        return { success: false };
    }
};
>>>>>>> a1833b4 (initial)
