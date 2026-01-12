/**
 * ============================================================================
 * HELPERS - Utility functions
 * ============================================================================
 */

const Helpers = (() => {
    
    /**
     * Format price with commas
     */
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    
    /**
     * Format date
     */
    const formatDate = (date, locale = 'es-PA') => {
        return new Date(date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
    /**
     * Debounce function
     */
    const debounce = (func, wait = 300) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    /**
     * Throttle function
     */
    const throttle = (func, limit = 200) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };
    
    /**
     * Get URL parameters
     */
    const getUrlParams = () => {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    };
    
    /**
     * Scroll to element smoothly
     */
    const scrollToElement = (element, offset = 80) => {
        if (!element) return;
        
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };
    
    /**
     * Copy text to clipboard
     */
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    };
    
    /**
     * Generate unique ID
     */
    const generateId = () => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };
    
    /**
     * Check if element is in viewport
     */
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    /**
     * Format phone number (Panama)
     */
    const formatPhone = (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{4})(\d{4})$/);
        if (match) {
            return `${match[1]}-${match[2]}`;
        }
        return phone;
    };
    
    // Public API
    return {
        formatPrice,
        formatDate,
        debounce,
        throttle,
        getUrlParams,
        scrollToElement,
        copyToClipboard,
        generateId,
        isInViewport,
        formatPhone
    };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Helpers;
}