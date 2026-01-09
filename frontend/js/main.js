/**
 * ============================================================================
 * MAIN JAVASCRIPT - Provivir Panama
 * Initializes all components and handles global functionality
 * ============================================================================
 */

(function() {
    'use strict';
    
    /**
     * Smooth scroll for anchor links
     */
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Don't prevent default for just "#"
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    /**
     * Initialize Google Analytics
     */
    const initAnalytics = () => {
        if (!CONFIG.FEATURES.ANALYTICS || !CONFIG.ANALYTICS.GOOGLE_ANALYTICS_ID) return;
        
        // Load Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.ANALYTICS.GOOGLE_ANALYTICS_ID}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', CONFIG.ANALYTICS.GOOGLE_ANALYTICS_ID);
        
        // Make gtag available globally
        window.gtag = gtag;
    };
    
    /**
     * Track page view
     */
    const trackPageView = () => {
        if (CONFIG.FEATURES.ANALYTICS && window.gtag) {
            gtag('event', 'page_view', {
                page_path: window.location.pathname,
                page_title: document.title
            });
        }
    };
    
    /**
     * Handle external links
     */
    const initExternalLinks = () => {
        const externalLinks = ['blogLink', 'aboutLink', 'privacyLink', 'termsLink', 'equalHousingLink'];
        
        externalLinks.forEach(linkId => {
            const link = document.getElementById(linkId);
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Esta sección estará disponible próximamente.');
                });
            }
        });
    };
    
    /**
     * Performance monitoring
     */
    const monitorPerformance = () => {
        if (!window.performance) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                const renderTime = perfData.domComplete - perfData.domLoading;
                
                if (CONFIG.ENVIRONMENT === 'development') {
                    console.log('Performance Metrics:');
                    console.log(`Page Load Time: ${pageLoadTime}ms`);
                    console.log(`Connect Time: ${connectTime}ms`);
                    console.log(`Render Time: ${renderTime}ms`);
                }
                
                // Send to analytics if enabled
                if (CONFIG.FEATURES.ANALYTICS && window.gtag) {
                    gtag('event', 'timing_complete', {
                        name: 'load',
                        value: pageLoadTime,
                        event_category: 'Performance'
                    });
                }
            }, 0);
        });
    };
    
    /**
     * Console welcome message
     */
    const showWelcomeMessage = () => {
        if (CONFIG.API.BASE_URL !== '/api') return; // Only in development
        
        console.log('%c¡Bienvenido a Provivir Panamá! 🏠', 
            'font-size: 20px; font-weight: bold; color: #005B96;');
        console.log('%cDesarrollado con 💚 para familias panameñas', 
            'font-size: 14px; color: #00A651;');
        console.log('%c', 'font-size: 1px; padding: 20px 100px; background: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ctext y=\'.9em\' font-size=\'90\'%3E🏡%3C/text%3E%3C/svg%3E") no-repeat;');
    };
    
    /**
     * Initialize all components
     */
    const init = () => {
        // Show welcome message
        showWelcomeMessage();
        
        // Initialize analytics
        initAnalytics();
        trackPageView();
        
        // Initialize smooth scrolling
        initSmoothScroll();
        
        // Handle external links
        initExternalLinks();
        
        // Monitor performance
        if (CONFIG.API.BASE_URL !== '/api') { // Development only
            monitorPerformance();
        }
        
        if (CONFIG.ENVIRONMENT === 'development') {
            console.log('✅ Provivir Panama initialized successfully');
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();