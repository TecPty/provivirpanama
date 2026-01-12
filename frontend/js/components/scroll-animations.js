/**
 * ============================================================================
 * SCROLL ANIMATIONS - Intersection Observer
 * ============================================================================
 */

const ScrollAnimations = (() => {
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    /**
     * Intersection Observer callback
     */
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('fade-in');
                
                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    };
    
    /**
     * Initialize animations
     */
    const init = () => {
        if (!CONFIG.FEATURES.SCROLL_ANIMATIONS) return;
        
        // Check for Intersection Observer support
        if (!('IntersectionObserver' in window)) {
            console.warn('Intersection Observer not supported');
            return;
        }
        
        // Create observer
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        
        // Select elements to animate
        const animatedElements = document.querySelectorAll('.property-card, .value-card, .testimonial-card');
        
        // Observe each element
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        console.log('✅ Scroll animations initialized');
    };
    
    // Public API
    return {
        init
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ScrollAnimations.init);
} else {
    ScrollAnimations.init();
}