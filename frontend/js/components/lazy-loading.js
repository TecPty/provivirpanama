/**
 * ============================================================================
 * LAZY LOADING - Images
 * ============================================================================
 */

const LazyLoading = (() => {
    
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.01
    };
    
    /**
     * Load image
     */
    const loadImage = (image) => {
        const src = image.dataset.src;
        if (!src) return;
        
        // Load image
        image.src = src;
        
        // Remove data-src attribute
        image.removeAttribute('data-src');
        
        // Add loaded class
        image.classList.add('loaded');
    };
    
    /**
     * Intersection Observer callback
     */
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    };
    
    /**
     * Initialize lazy loading
     */
    const init = () => {
        if (!CONFIG.FEATURES.LAZY_LOADING) return;
        
        // Check for Intersection Observer support
        if (!('IntersectionObserver' in window)) {
            // Fallback: load all images immediately
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(loadImage);
            return;
        }
        
        // Create observer
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        
        // Select images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        // Observe each image
        lazyImages.forEach(image => {
            observer.observe(image);
        });
        
        console.log(`✅ Lazy loading initialized (${lazyImages.length} images)`);
    };
    
    // Public API
    return {
        init
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', LazyLoading.init);
} else {
    LazyLoading.init();
}