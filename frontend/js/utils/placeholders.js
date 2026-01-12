/**
 * ============================================================================
 * PLACEHOLDERS - Genera imágenes placeholder automáticamente
 * ============================================================================
 */

const Placeholders = (() => {
    
    /**
     * Genera un SVG placeholder
     */
    const generateSVG = (width, height, text, bgColor = '#005B96', textColor = '#FFFFFF') => {
        return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='${width}' height='${height}' fill='${bgColor}'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='${Math.min(width, height) * 0.1}' fill='${textColor}' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
    };
    
    /**
     * Genera placeholder para el logo
     */
    const createLogo = () => {
        return generateSVG(150, 50, 'PROVIVIR', '#005B96', '#FFFFFF');
    };
    
    /**
     * Genera placeholder para hero
     */
    const createHeroImage = () => {
        return generateSVG(1200, 800, '🏠 Tu Nuevo Hogar', '#00A651', '#FFFFFF');
    };
    
    /**
     * Genera placeholder para propiedades
     */
    const createPropertyImage = (name) => {
        return generateSVG(800, 600, `🏡 ${name}`, '#005B96', '#FFFFFF');
    };
    
    /**
     * Genera placeholder para testimonios (avatar circular)
     */
    const createAvatarImage = (name) => {
        const initial = name.charAt(0).toUpperCase();
        return generateSVG(400, 400, initial, '#00A651', '#FFFFFF');
    };
    
    /**
     * Genera placeholder para partners (logo)
     */
    const createPartnerLogo = (name) => {
        return generateSVG(150, 50, name, '#E5E7EB', '#2C3E50');
    };
    
    /**
     * Reemplaza todas las imágenes rotas con placeholders
     */
    const replaceAllBrokenImages = () => {
        // Logo principal
        const logos = document.querySelectorAll('img[src*="logo"]');
        logos.forEach(img => {
            img.onerror = () => {
                img.src = createLogo();
                img.onerror = null;
            };
        });
        
        // Hero image
        const heroImages = document.querySelectorAll('.hero__image img');
        heroImages.forEach(img => {
            img.onerror = () => {
                img.src = createHeroImage();
                img.onerror = null;
            };
        });
        
        // Property images
        const propertyImages = document.querySelectorAll('.property-card__image');
        propertyImages.forEach(img => {
            img.onerror = () => {
                const propertyName = img.alt || 'Propiedad';
                img.src = createPropertyImage(propertyName);
                img.onerror = null;
            };
        });
        
        // Testimonial avatars
        const avatars = document.querySelectorAll('.testimonial-card__avatar');
        avatars.forEach(img => {
            img.onerror = () => {
                const name = img.alt || 'Cliente';
                img.src = createAvatarImage(name);
                img.onerror = null;
            };
        });
        
        // Partner logos
        const partnerLogos = document.querySelectorAll('.trust-bar__logo');
        partnerLogos.forEach(img => {
            img.onerror = () => {
                const name = img.alt || 'Partner';
                img.src = createPartnerLogo(name);
                img.onerror = null;
            };
        });
        
        console.log('✅ Placeholders automáticos activados');
    };
    
    /**
     * Inicializar placeholders
     */
    const init = () => {
        // Reemplazar al cargar
        replaceAllBrokenImages();
        
        // Observer para imágenes dinámicas
        const observer = new MutationObserver(() => {
            replaceAllBrokenImages();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };
    
    // Public API
    return {
        init,
        createLogo,
        createHeroImage,
        createPropertyImage,
        createAvatarImage,
        createPartnerLogo
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', Placeholders.init);
} else {
    Placeholders.init();
}