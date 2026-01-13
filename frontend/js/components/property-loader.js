/**
 * ============================================================================
 * PROPERTY LOADER - Provivir Panama
 * Carga y renderiza propiedades desde la API
 * ============================================================================
 */

const PropertyLoader = (() => {
    const propertiesGrid = document.getElementById('properties-grid');
    let properties = [];

    /**
     * Create placeholder image SVG
     */
    const createPlaceholder = (text) => {
        return `data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23005B96'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='48' fill='%23FFFFFF' text-anchor='middle' dominant-baseline='middle'%3E%F0%9F%8F%A1 ${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
    };

    /**
     * Mock data with placeholders
     */
    const getMockProperties = () => {
        return [
            {
                id: 1,
                title: 'Green Meadows',
                location: 'Distrito Norte',
                price: 125000,
                description: 'Hermosas casas unifamiliares en una comunidad tranquila con acceso a parques y escuelas de calidad.',
                image: createPlaceholder('Green Meadows'),
                bedrooms: 3,
                bathrooms: 2,
                sqft: 1200,
                badge: '¡Pocas Unidades!',
                badgeType: 'warning'
            },
            {
                id: 2,
                title: 'Sunrise Valley',
                location: 'Este',
                price: 145000,
                description: 'Modernos apartamentos con acabados de lujo en ubicación privilegiada cerca de zonas comerciales.',
                image: createPlaceholder('Sunrise Valley'),
                bedrooms: 3,
                bathrooms: 2,
                sqft: 901,
                badge: null,
                badgeType: 'success'
            },
            {
                id: 3,
                title: 'Urban Heights',
                location: 'Centro de la Ciudad',
                price: 175000,
                description: 'Vive en el corazón de la ciudad con acceso inmediato a transporte público y entretenimiento.',
                image: createPlaceholder('Urban Heights'),
                bedrooms: 3,
                bathrooms: 2,
                sqft: 870,
                badge: 'Más Vendido',
                badgeType: 'success'
            }
        ];
    };

    /**
     * Create property card HTML
     */
    const createPropertyCard = (property) => {
        return `
            <div class="property-card" data-property-id="${property.id}">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                ${property.badge ? `<span class="property-badge badge-${property.badgeType}">${property.badge}</span>` : ''}
                <div class="property-info">
                    <h3>${property.title}</h3>
                    <p class="property-location">${property.location}</p>
                    <p class="property-description">${property.description}</p>
                    <div class="property-features">
                        <span>${property.bedrooms} hab</span>
                        <span>${property.bathrooms} baños</span>
                        <span>${property.sqft} m²</span>
                    </div>
                    <div class="property-actions">
                        <span class="property-price">B/.${property.price.toLocaleString()}</span>
                        <button class="btn btn-primary" data-action="contact">Contactar</button>
                    </div>
                </div>
            </div>
        `;
    };

    /**
     * Render properties to grid
     */
    const renderProperties = (propertiesToRender) => {
        if (!propertiesGrid) return;

        const html = propertiesToRender.map(createPropertyCard).join('');
        propertiesGrid.innerHTML = html;

        attachEventListeners();
    };

    /**
     * Attach event listeners
     */
    const attachEventListeners = () => {
        const contactButtons = document.querySelectorAll('[data-action="contact"]');

        contactButtons.forEach(button => {
            button.addEventListener('click', handleContact);
        });
    };

    /**
     * Handle contact button click
     */
    const handleContact = (e) => {
        const propertyCard = e.target.closest('.property-card');
        const propertyId = propertyCard.dataset.propertyId;
        
        sessionStorage.setItem('selectedPropertyId', propertyId);
        
        if (CONFIG.ENVIRONMENT === 'development') {
            console.log('Contact about property:', propertyId);
        }
        
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    /**
     * Load properties from API
     */
    const loadProperties = async () => {
        try {
            const response = await API.getProperties();
            
            if (response.success && response.data) {
                properties = response.data;
                renderProperties(properties);
                console.log('✅ Properties loaded from API:', properties.length);
            } else {
                console.warn('⚠️ API response failed, using mock data');
                properties = getMockProperties();
                renderProperties(properties);
            }
        } catch (error) {
            console.error('❌ Error loading properties:', error);
            properties = getMockProperties();
            renderProperties(properties);
        }
    };

    /**
     * Initialize
     */
    const init = () => {
        if (!propertiesGrid) {
            console.warn('Properties grid not found');
            return;
        }
        loadProperties();
    };

    // Public API
    return {
        init,
        loadProperties,
        renderProperties
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', PropertyLoader.init);
} else {
    PropertyLoader.init();
}
