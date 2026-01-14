/**
 * Real properties from provivirpanama.com with actual image paths
 */
const getMockProperties = () => {
    return [
        // ALTOS DE LOS GUAYACANES - Lirio
        {
            id: 1,
            title: 'Altos de los Guayacanes - Lirio',
            location: 'Altos de los Guayacanes',
            price: 93.55,
            currency: 'B/.',
            pricePeriod: 'quincenal',
            description: 'Hermoso modelo Lirio con 3 habitaciones y 2 baños. Diseño moderno con amplios espacios.',
            image: '/provivirpanama/frontend/assets/images/properties/altos-guayacanes/lirio-sala.avif',
            bedrooms: 3,
            bathrooms: 2,
            sqft: 190,
            badge: null,
            badgeType: 'success'
        },
        // ALTOS DE LOS GUAYACANES - Jazmín
        {
            id: 2,
            title: 'Altos de los Guayacanes - Jazmin',
            location: 'Altos de los Guayacanes',
            price: 61.27,
            currency: 'B/.',
            pricePeriod: 'quincenal',
            description: 'Compacto y funcional modelo Jazmin con 2 habitaciones y 1 baño. Ideal para parejas o pequeñas familias.',
            image: '/provivirpanama/frontend/assets/images/properties/altos-guayacanes/jazmin-sala.avif',
            bedrooms: 2,
            bathrooms: 1,
            sqft: 186,
            badge: null,
            badgeType: 'success'
        },
        // VILLAS DEL ESTE - Roble
        {
            id: 3,
            title: 'Villas del Este - Roble',
            location: 'Villas del Este',
            price: 88.64,
            currency: 'B/.',
            pricePeriod: 'quincenal',
            description: 'Modelo Roble con 2 habitaciones y 1 baño. Ubicacion privilegiada en Villas del Este.',
            image: '/provivirpanama/frontend/assets/images/properties/villas-este/roble-sala.avif',
            bedrooms: 2,
            bathrooms: 1,
            sqft: 190,
            badge: null,
            badgeType: 'success'
        },
        // VILLAS DEL ESTE - Cerezo
        {
            id: 4,
            title: 'Villas del Este - Cerezo',
            location: 'Villas del Este',
            price: 110.22,
            currency: 'B/.',
            pricePeriod: 'quincenal',
            description: 'Espacioso modelo Cerezo con 3 habitaciones y 2 baños. Premium con acabados de lujo.',
            image: '/provivirpanama/frontend/assets/images/properties/villas-este/cerezo-sala.png',
            bedrooms: 3,
            bathrooms: 2,
            sqft: 221,
            badge: 'Mas Espacioso',
            badgeType: 'success'
        },
        // CIUDAD DEL ESTE - Córdoba
        {
            id: 5,
            title: 'Ciudad del Este - Cordoba',
            location: 'Ciudad del Este',
            price: 104.34,
            currency: 'B/.',
            pricePeriod: 'quincenal',
            description: 'Elegante modelo Cordoba con 3 habitaciones y 2 baños. Diseño moderno y funcional.',
            image: '/provivirpanama/frontend/assets/images/properties/ciudad-este/cordoba-sala.avif',
            bedrooms: 3,
            bathrooms: 2,
            sqft: 190,
            badge: null,
            badgeType: 'success'
        },
        // CIUDAD DEL ESTE - Granada
        {
            id: 6,
            title: 'Ciudad del Este - Granada',
            location: 'Ciudad del Este',
            price: 61.27,
            currency: 'B/.',
            pricePeriod: 'quincenal',
            description: 'Practico modelo Granada con 2 habitaciones y 1 baño. Acceso facil a todos los servicios.',
            image: '/provivirpanama/frontend/assets/images/properties/ciudad-este/granada-sala.avif',
            bedrooms: 2,
            bathrooms: 1,
            sqft: 190,
            badge: null,
            badgeType: 'success'
        },
        // COLINAS DEL ESTE - Andalucía
        {
            id: 7,
            title: 'Colinas del Este - Andalucia',
            location: 'Colinas del Este',
            price: 61.27,
            currency: 'B/.',
            pricePeriod: 'quincenal',
            description: 'Acogedora modelo Andalucia con 2 habitaciones y 1 baño. Excelente relacion calidad-precio.',
            image: '/provivirpanama/frontend/assets/images/properties/colinas-este/andalucia-sala.avif',
            bedrooms: 2,
            bathrooms: 1,
            sqft: 190,
            badge: null,
            badgeType: 'success'
        },
        // VILLAS DEL OESTE - Tulipán (Archived)
        {
            id: 8,
            title: 'Villas del Oeste - Tulipan',
            location: 'Villas del Oeste',
            price: 61.27,
            currency: 'B/.',
            pricePeriod: 'quincenal',
            description: 'Modelo Tulipan con 2 habitaciones y 1 baño. Comunidad en renovacion.',
            image: '/provivirpanama/frontend/assets/images/properties/villas-oeste/placeholder.png',
            bedrooms: 2,
            bathrooms: 1,
            sqft: 135,
            badge: 'En Renovacion',
            badgeType: 'warning'
        },
        // VILLAS DEL OESTE - Caoba (Archived)
        {
            id: 9,
            title: 'Villas del Oeste - Caoba',
            location: 'Villas del Oeste',
            price: 93.55,
            currency: 'B/.',
            pricePeriod: 'quincenal',
            description: 'Modelo Caoba con 3 habitaciones y 2 baños. Comunidad en renovacion.',
            image: '/provivirpanama/frontend/assets/images/properties/villas-oeste/placeholder.png',
            bedrooms: 3,
            bathrooms: 2,
            sqft: 186,
            badge: 'En Renovacion',
            badgeType: 'warning'
        }
    ];
};

/**
 * Property Loader Module
 */
const PropertyLoader = (() => {
    let properties = [];
    let filteredProperties = [];
    let isViewingAll = false;

    const propertiesGrid = document.querySelector('.properties__grid');
    const propertiesLoading = document.querySelector('#propertiesLoading');
    const propertiesError = document.querySelector('#propertiesError');

    /**
     * Render properties in grid
     */
    const renderProperties = (propsToRender = properties) => {
        if (!propertiesGrid) {
            console.warn('Properties grid not found');
            return;
        }

        propertiesGrid.innerHTML = '';

        propsToRender.forEach(property => {
            const badge = property.badge ? `<span class="property-card__badge property-card__badge--${property.badgeType}">${property.badge}</span>` : '';
            
            const card = document.createElement('div');
            card.className = 'property-card';
            card.innerHTML = `
                <div class="property-card__image-container">
                    <img src="${property.image}" alt="${property.title}" class="property-card__image" loading="lazy">
                    ${badge}
                </div>
                <div class="property-card__content">
                    <h3 class="property-card__title">${property.title}</h3>
                    <p class="property-card__location">${property.location}</p>
                    <p class="property-card__description">${property.description}</p>
                    <div class="property-card__specs">
                        <span class="property-card__spec">
                            <span class="property-card__spec-label">Hab:</span>
                            <span>${property.bedrooms}</span>
                        </span>
                        <span class="property-card__spec">
                            <span class="property-card__spec-label">Banos:</span>
                            <span>${property.bathrooms}</span>
                        </span>
                        <span class="property-card__spec">
                            <span class="property-card__spec-label">m2:</span>
                            <span>${property.sqft}</span>
                        </span>
                    </div>
                    <div class="property-card__footer">
                        <div class="property-card__price">
                            <span class="property-card__price-value">${property.currency} ${property.price.toFixed(2)}</span>
                            <span class="property-card__price-period">/${property.pricePeriod}</span>
                        </div>
                        <button class="btn btn--primary property-card__contact-btn" data-property-id="${property.id}">Contactar</button>
                    </div>
                </div>
            `;

            card.querySelector('.property-card__contact-btn').addEventListener('click', () => {
                handleContact(property);
            });

            propertiesGrid.appendChild(card);
        });

        // Hide loading state if element exists
        if (propertiesLoading) {
            propertiesLoading.classList.add('hidden');
        }
    };

    /**
     * Handle contact button click
     */
    const handleContact = (property) => {
        // Store property info in session for form
        sessionStorage.setItem('selectedProperty', JSON.stringify({
            id: property.id,
            title: property.title,
            location: property.location
        }));
        
        // Scroll to contact form or open modal
        const contactSection = document.querySelector('#contact-section') || document.querySelector('form');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    /**
     * Toggle view all properties
     */
    const toggleViewAll = () => {
        isViewingAll = !isViewingAll;
        
        if (isViewingAll) {
            filteredProperties = properties;
        } else {
            filteredProperties = properties.slice(0, 3);
        }
        
        renderProperties(filteredProperties);
        
        // Update button text
        const viewAllBtn = document.querySelector('[data-action="view-all"]');
        if (viewAllBtn) {
            viewAllBtn.textContent = isViewingAll ? 'Ver Menos' : 'Ver Todos los Proyectos';
        }
    };

    /**
     * Load properties
     */
    const loadProperties = async () => {
        try {
            // Simulate small loading delay
            await new Promise(resolve => setTimeout(resolve, 300));

            properties = getMockProperties();
            filteredProperties = properties.slice(0, 3); // Show 3 initially

            renderProperties(filteredProperties);

            // Attach view all button listener after rendering
            attachViewAllListener();

            if (typeof CONFIG !== 'undefined' && CONFIG.ENVIRONMENT === 'development') {
                console.log('Properties loaded:', properties.length);
            }
        } catch (error) {
            console.error('Error loading properties:', error);
            if (propertiesLoading) propertiesLoading.classList.add('hidden');
            if (propertiesError) propertiesError.classList.remove('hidden');
        }
    };

    /**
     * Attach view all button listener
     */
    const attachViewAllListener = () => {
        const viewAllBtn = document.querySelector('[data-action="view-all"]');
        console.log('Searching for button with data-action="view-all"');
        console.log('Found button:', viewAllBtn);
        
        if (viewAllBtn) {
            console.log('Button found, attaching click listener');
            viewAllBtn.addEventListener('click', (e) => {
                console.log('View all button clicked!');
                e.preventDefault();
                toggleViewAll();
            });
            
            if (typeof CONFIG !== 'undefined' && CONFIG.ENVIRONMENT === 'development') {
                console.log('View all button listener attached');
            }
        } else {
            console.warn('View all button not found - searched for [data-action="view-all"]');
            // Debug: try to find any buttons
            const allButtons = document.querySelectorAll('button');
            console.log('All buttons on page:', allButtons.length);
            allButtons.forEach((btn, idx) => {
                console.log(`Button ${idx}:`, btn.className, btn.textContent, btn.dataset);
            });
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
        renderProperties,
        toggleViewAll
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Property Loader: DOMContentLoaded triggered');
    if (typeof PropertyLoader !== 'undefined' && PropertyLoader.init) {
        PropertyLoader.init();
    } else {
        console.warn('PropertyLoader not found or init method missing');
    }
});
