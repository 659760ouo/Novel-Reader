<<<<<<< HEAD
// Helper utilities
=======
>>>>>>> a1833b4 (initial)
const Helpers = {
    showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`;
        toast.innerHTML = `
            <i class="fa ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'} mr-2"></i>
            ${message}
        `;
        document.body.appendChild(toast);

<<<<<<< HEAD
        setTimeout(() => toast.classList.add('opacity-100'), 10);
        setTimeout(() => {
            toast.classList.remove('opacity-100');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    
    calculateProgress(current, total) {
        return total ? Math.min(100, Math.round((current / total) * 100)) : 0;
    }
};
    
=======
        // Animate in
        setTimeout(() => toast.classList.add('opacity-100'), 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    calculateProgress(currentPage, totalPages) {
        if (!currentPage || !totalPages) return 0;
        return Math.min(Math.round((currentPage / totalPages) * 100), 100);
    }
};
>>>>>>> a1833b4 (initial)
