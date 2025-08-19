const UploadPage = {
    render() {
        const user = Auth.getCurrentUser();
        if (!user) return `<div class="p-4"><p>Please log in to upload novels.</p></div>`;

        return `
            <div class="max-w-2xl mx-auto p-4">
                <h2 class="text-2xl font-bold mb-6">Upload Your Novel</h2>
                
                <form id="novelUploadForm" class="bg-white rounded-lg shadow p-6 space-y-4">
                    <!-- Hidden author field (auto-set to current user) -->
                    <input type="hidden" id="uploadedBy" value="${user.id}">
                    
                    <div>
                        <label for="novelTitle" class="block text-sm font-medium text-gray-700 mb-1">
                            Novel Title *
                        </label>
                        <input
                            type="text"
                            id="novelTitle"
                            required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your novel's title"
                        />
                    </div>
                    
                    <div>
                        <label for="novelDescription" class="block text-sm font-medium text-gray-700 mb-1">
                            Description *
                        </label>
                        <textarea
                            id="novelDescription"
                            rows="4"
                            required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Tell readers about your novel..."
                        ></textarea>
                    </div>
                    
                    <div>
                        <label for="novelGenre" class="block text-sm font-medium text-gray-700 mb-1">
                            Genre
                        </label>
                        <input
                            type="text"
                            id="novelGenre"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., Fantasy, Mystery, Romance"
                        />
                    </div>

                    <div>
                        <label for="novelCover" class="block text-sm font-medium text-gray-700 mb-2">
                            Book Cover (JPG/PNG) *
                        </label>
                        <input
                            type="file"
                            id="novelCover"
                            accept=".jpg, .jpeg, .png"
                            required
                            class="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-medium
                                file:bg-indigo-600 file:text-white
                                hover:file:bg-indigo-700"
                        />
                        <p class="text-xs text-gray-500 mt-1">
                            Upload a cover image (max 2MB)
                        </p>
                    </div>
                    
                    <div>
                        <label for="novelFile" class="block text-sm font-medium text-gray-700 mb-2">
                            Novel File (TXT only) *
                        </label>
                        <input
                            type="file"
                            id="novelFile"
                            accept=".txt"
                            required
                            class="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-medium
                                file:bg-indigo-600 file:text-white
                                hover:file:bg-indigo-700"
                        />
                        <p class="text-xs text-gray-500 mt-1">
                            Upload your novel as a .txt file (max 5MB)
                        </p>
                    </div>
                    
                    <div class="flex justify-end">
                        <button
                            type="submit"
                            id="submitUpload"
                            class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition flex items-center"
                        >
                            <i class="fa fa-upload mr-2"></i>
                            Publish Novel
                        </button>
                    </div>
                </form>
            </div>
        `;
    },

    setupListeners() {
        const form = document.getElementById('novelUploadForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const user = Auth.getCurrentUser();
            
            // Get form data
            const novelData = {
                title: document.getElementById('novelTitle').value,
                description: document.getElementById('novelDescription').value,
                genre: document.getElementById('novelGenre').value || 'Uncategorized',
                author: user.name, // Auto-set author to current user
                authorId: user.id,
                uploadedAt: new Date().toISOString(),
                fileContent: null, // Will store text content from TXT file
                cover: null // Will store cover image data
            };

            // Handle cover image upload
            const coverInput = document.getElementById('novelCover');
            const coverFile = coverInput.files[0];
            
            if (coverFile) {
                // Validate cover image
                if (!['image/jpeg', 'image/png'].includes(coverFile.type)) {
                    return Helpers.showToast('Please upload JPG or PNG images only', true);
                }
                if (coverFile.size > 2 * 1024 * 1024) { // 2MB limit
                    return Helpers.showToast('Cover image must be less than 2MB', true);
                }

                // Read cover image as data URL
                const coverReader = new FileReader();
                coverReader.onload = (event) => {
                    novelData.cover = event.target.result;
                    
                    // Now handle text file
                    const fileInput = document.getElementById('novelFile');
                    const file = fileInput.files[0];
                    
                    if (file) {
                        // Validate text file
                        if (file.type !== 'text/plain') {
                            return Helpers.showToast('Please upload only TXT files', true);
                        }
                        if (file.size > 5 * 1024 * 1024) { // 5MB limit
                            return Helpers.showToast('File size must be less than 5MB', true);
                        }

                        // Read TXT file content
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            novelData.fileContent = event.target.result;
                            novelData.fileName = file.name;
                            novelData.pages = BookService.estimatePages(novelData.fileContent);
                            
                            // Save to "database"
                            const result = BookService.saveUserNovel(novelData);
                            if (result.success) {
                                Helpers.showToast('Novel uploaded successfully! It will appear in Discover.');
                                form.reset();
                                // Redirect to discover page
                                app.setPage('discover');
                            } else {
                                Helpers.showToast(result.message, true);
                            }
                        };
                        reader.readAsText(file);
                    }
                };
                coverReader.readAsDataURL(coverFile);
            }
        });
    }
};
