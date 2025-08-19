const BookReader = {
    // Open the book reader with specific book
    open(bookId) {
        const user = Auth.getCurrentUser();
        if (!user) return;

        // Get book from user's library
        const userBooks = BookService.getUserBooks();
        const book = userBooks.find(b => b.id === bookId);
        
        if (!book || !book.fileContent) {
            return Helpers.showToast('Could not load book content', true);
        }

        // Render reader modal
        const appContainer = document.getElementById('app');
        appContainer.innerHTML += this.renderReader(book);
        
        // Setup reader listeners
        this.setupListeners(bookId, book.progress.currentPage);
        
        // Focus on reader content
        document.getElementById('bookReaderContent').scrollTop = 
            this.calculateScrollPosition(book.progress.currentPage, book.fileContent);
    },

    // Calculate scroll position based on page number
    calculateScrollPosition(pageNum, content) {
        const wordsPerPage = 250;
        const totalWords = content.split(/\s+/).length;
        const totalPages = Math.max(1, Math.ceil(totalWords / wordsPerPage));
        const contentHeight = document.getElementById('bookReaderContent').scrollHeight;
        
        return (pageNum / totalPages) * contentHeight;
    },

    // Calculate current page based on scroll position
    calculateCurrentPage(scrollTop, content) {
        const wordsPerPage = 250;
        const totalWords = content.split(/\s+/).length;
        const totalPages = Math.max(1, Math.ceil(totalWords / wordsPerPage));
        const contentHeight = document.getElementById('bookReaderContent').scrollHeight;
        
        if (contentHeight === 0) return 1;
        const scrollPercent = scrollTop / contentHeight;
        return Math.max(1, Math.ceil(scrollPercent * totalPages));
    },

    // Render the book reader modal
    renderReader(book) {
        return `
            <div id="bookReaderModal" class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                    <!-- Reader Header -->
                    <div class="p-4 border-b flex justify-between items-center">
                        <div>
                            <h2 class="font-bold text-lg">${book.title}</h2>
                            <p class="text-sm text-gray-600">by ${book.author}</p>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span id="currentPageIndicator" class="text-sm bg-gray-100 px-3 py-1 rounded">
                                Page ${book.progress.currentPage}/${book.pages}
                            </span>
                            <button id="closeReader" class="text-gray-500 hover:text-gray-700">
                                <i class="fa fa-times text-xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Reader Content -->
                    <div id="bookReaderContent" class="flex-1 overflow-auto p-6 text-lg leading-relaxed">
                        ${this.formatTextForReading(book.fileContent)}
                    </div>
                    
                    <!-- Reader Controls -->
                    <div class="p-4 border-t flex justify-between items-center">
                        <button id="prevPage" class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded flex items-center">
                            <i class="fa fa-arrow-left mr-2"></i> Previous Page
                        </button>
                        <button id="nextPage" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center">
                            Next Page <i class="fa fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Format raw text for better reading experience
    formatTextForReading(text) {
        // Replace line breaks with proper HTML
        return text
            .replace(/\n\n+/g, '</p><p>') // Paragraphs
            .replace(/\n/g, '<br>') // Line breaks
            .replace(/^/, '<p>') // Start with paragraph
            .replace(/$/, '</p>'); // End with paragraph
    },

    // Setup reader event listeners
    setupListeners(bookId, startPage) {
        const modal = document.getElementById('bookReaderModal');
        const content = document.getElementById('bookReaderContent');
        const closeBtn = document.getElementById('closeReader');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        const pageIndicator = document.getElementById('currentPageIndicator');
        
        // Get book content
        const userBooks = BookService.getUserBooks();
        const book = userBooks.find(b => b.id === bookId);
        if (!book) return;

        // Close reader
        closeBtn.addEventListener('click', () => {
            // Save progress before closing
            const currentPage = this.calculateCurrentPage(content.scrollTop, book.fileContent);
            BookService.updateReadingProgress(bookId, currentPage);
            modal.remove();
        });

        // Close when clicking outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                const currentPage = this.calculateCurrentPage(content.scrollTop, book.fileContent);
                BookService.updateReadingProgress(bookId, currentPage);
                modal.remove();
            }
        });

        // Update page indicator on scroll
        content.addEventListener('scroll', () => {
            const currentPage = this.calculateCurrentPage(content.scrollTop, book.fileContent);
            pageIndicator.textContent = `Page ${currentPage}/${book.pages}`;
        });

        // Previous page
        prevBtn.addEventListener('click', () => {
            const currentPage = this.calculateCurrentPage(content.scrollTop, book.fileContent);
            const newPage = Math.max(1, currentPage - 1);
            content.scrollTop = this.calculateScrollPosition(newPage, book.fileContent);
            BookService.updateReadingProgress(bookId, newPage);
        });

        // Next page
        nextBtn.addEventListener('click', () => {
            const currentPage = this.calculateCurrentPage(content.scrollTop, book.fileContent);
            const newPage = Math.min(book.pages, currentPage + 1);
            content.scrollTop = this.calculateScrollPosition(newPage, book.fileContent);
            BookService.updateReadingProgress(bookId, newPage);
        });
    }
};
