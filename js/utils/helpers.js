// Helper utilities
const Helpers = {
    showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`;
        toast.innerHTML = `
            <i class="fa ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'} mr-2"></i>
            ${message}
        `;
        document.body.appendChild(toast);

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
    
