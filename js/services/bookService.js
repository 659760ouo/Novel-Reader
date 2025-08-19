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
    
    getUserBooks() {
        const user = Auth.getCurrentUser();
        if (!user) return [];
        return JSON.parse(localStorage.getItem(`userBooks_${user.id}`) || '[]');
    },
    
    downloadBook(bookId) {
        const user = Auth.getCurrentUser();
        if (!user) return { success: false };

        const allBooks = this.getPlatformBooks();
        const book = allBooks.find(b => b.id === bookId);
        if (!book) return { success: false };

        const userBooks = this.getUserBooks();
        const bookWithProgress = {
            ...book,
            progress: { currentPage: 1, lastRead: new Date().toISOString() }
        };
        
        userBooks.push(bookWithProgress);
        localStorage.setItem(`userBooks_${user.id}`, JSON.stringify(userBooks));
        return { success: true };
    }
};
    
