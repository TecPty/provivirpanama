/**
 * ============================================================================
 * PROPERTY LOADER - Dynamically loads properties from API/CMS
 * ============================================================================
 */

const PropertyLoader = (() => {
    const propertiesGrid = document.getElementById('propertiesGrid');
    let properties = [];

    /**
     * Create property card HTML
     */
    const createPropertyCard = (property) => {
        const {
            id,
            title,
            location,
            price,
            description,
            image,
            bedrooms,
            bathrooms,
            sqft,
            badge,
            badgeType = 'success'
        } = property;

        return `
            <article class="property-card fade-in" data-property-id="${id}">
                <div class="property-card__image-wrapper">
                    <img 
                        src="${image}" 
                        alt="${title}" 
                        class="property-card__image"
                        loading="lazy"
                    >
                    ${badge ? `
                        <span class="property-card__badge property-card__badge--${badgeType}">
                            ${badge}
                        </span>
                    ` : ''}
                    <div class="property-card__location">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" fill="currentColor"/>
                        </svg>
                        ${location}
                    </div>
                </div>
                
                <div class="property-card__content">
                    <div class="property-card__header">
                        <h3 class="property-card__title">${title}</h3>
                        <span class="property-card__price">$${formatPrice(price)}</span>
                    </div>
                    
                    <p class="property-card__description">${description}</p>
                    
                    <div class="property-card__specs">
                        <div class="property-card__spec">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            ${bedrooms} habitaciones
                        </div>
                        <div class="property-card__spec">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M9 2V6M15 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            ${bathrooms} baños
                        </div>
                        <div class="property-card__spec">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            ${sqft} pies²
                        </div>
                    </div>
                    
                    <div class="property-card__actions">
                        <a href="#" class="property-card__btn property-card__btn--primary" data-action="view-details">
                            Ver Detalles
                        </a>
                        <a href="#contacto" class="property-card__btn property-card__btn--secondary" data-action="contact">
                            Contactar
                        </a>
                    </div>
                </div>
            </article>
        `;
    };

    /**
     * Format price with commas
     */
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    /**
     * Render properties to grid
     */
    const renderProperties = (propertiesToRender) => {
        if (!propertiesGrid) return;

        if (propertiesToRender.length === 0) {
            propertiesGrid.innerHTML = `
                <div class="loading" style="grid-column: 1 / -1;">
                    No se encontraron propiedades disponibles
                </div>
            `;
            return;
        }

        const html = propertiesToRender.map(createPropertyCard).join('');
        propertiesGrid.innerHTML = html;

        // Add click event listeners
        attachEventListeners();
    };

    /**
     * Attach event listeners to property cards
     */
    const attachEventListeners = () => {
        const viewDetailButtons = document.querySelectorAll('[data-action="view-details"]');
        const contactButtons = document.querySelectorAll('[data-action="contact"]');

        viewDetailButtons.forEach(button => {
            button.addEventListener('click', handleViewDetails);
        });

        contactButtons.forEach(button => {
            button.addEventListener('click', handleContact);
        });
    };

    /**
     * Handle view details click
     */
    const handleViewDetails = (e) => {
        e.preventDefault();
        const propertyCard = e.target.closest('.property-card');
        const propertyId = propertyCard.dataset.propertyId;
        
        // Aquí puedes abrir un modal, redirigir a una página de detalles, etc.
        console.log('View property details:', propertyId);
        
        // Por ahora, mostrar alerta
        alert(`Ver detalles de la propiedad #${propertyId}`);
    };

    /**
     * Handle contact click
     */
    const handleContact = (e) => {
        const propertyCard = e.target.closest('.property-card');
        const propertyId = propertyCard.dataset.propertyId;
        
        // Store selected property in sessionStorage
        sessionStorage.setItem('selectedPropertyId', propertyId);
        
        console.log('Contact about property:', propertyId);
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
            } else {
                // Fallback to mock data if API fails
                properties = getMockProperties();
                renderProperties(properties);
            }
        } catch (error) {
            console.error('Error loading properties:', error);
            // Load mock data as fallback
            properties = getMockProperties();
            renderProperties(properties);
        }
    };

    /**
     * Mock data for development/testing
     */
    const getMockProperties = () => {
        return [
            {
                id: 1,
                title: 'Green Meadows',
                location: 'Distrito Norte',
                price: 125000,
                description: 'Hermosas casas unifamiliares en una comunidad tranquila con acceso a parques y escuelas de calidad.',
                image: './assets/images/properties/green-meadows.jpg',
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
                image: './assets/images/properties/sunrise-valley.jpg',
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
                image: './assets/images/properties/urban-heights.jpg',
                bedrooms: 3,
                bathrooms: 2,
                sqft: 870,
                badge: 'Más Vendido',
                badgeType: 'success'
            }
        ];
    };

    /**
     * Initialize property loader
     */
    const init = () => {
        if (!propertiesGrid) return;
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