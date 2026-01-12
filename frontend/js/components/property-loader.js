/**
 * Mock data with placeholders
 */
const getMockProperties = () => {
    // Siempre usar placeholders cuando no hay imágenes reales
    const createPlaceholder = (text) => {
        return `data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23005B96'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='48' fill='%23FFFFFF' text-anchor='middle' dominant-baseline='middle'%3E%F0%9F%8F%A1 ${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
    };
    
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
<<<<<<< HEAD
    ];
};
=======

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
        if (CONFIG.ENVIRONMENT === 'development') {
            console.log('View property details:', propertyId);
        }
        
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
        
        if (CONFIG.ENVIRONMENT === 'development') {
            console.log('Contact about property:', propertyId);
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
>>>>>>> 2a3a6b9ea61feb000f9140425420fc8aa4b05932
