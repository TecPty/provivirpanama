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
    ];

    const PropertyLoader = (() => {
        const propertiesGrid = document.getElementById('properties-grid');
        let properties = [];

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

        const renderProperties = (propertiesToRender) => {
            if (!propertiesGrid) return;

            const html = propertiesToRender.map(createPropertyCard).join('');
            propertiesGrid.innerHTML = html;

            attachEventListeners();
        };

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

        const handleViewDetails = (e) => {
            e.preventDefault();
            const propertyCard = e.target.closest('.property-card');
            const propertyId = propertyCard.dataset.propertyId;
            
            if (CONFIG.ENVIRONMENT === 'development') {
                console.log('View property details:', propertyId);
            }
            
            alert(`Ver detalles de la propiedad #${propertyId}`);
        };

        const handleContact = (e) => {
            const propertyCard = e.target.closest('.property-card');
            const propertyId = propertyCard.dataset.propertyId;
            
            sessionStorage.setItem('selectedPropertyId', propertyId);
            
            if (CONFIG.ENVIRONMENT === 'development') {
                console.log('Contact about property:', propertyId);
            }
        };

        const loadProperties = async () => {
            try {
                const response = await API.getProperties();
                
                if (response.success && response.data) {
                    properties = response.data;
                    renderProperties(properties);
                } else {
                    properties = getMockProperties();
                    renderProperties(properties);
                }
            } catch (error) {
                console.error('Error loading properties:', error);
                properties = getMockProperties();
                renderProperties(properties);
            }
        };

        const init = () => {
            if (!propertiesGrid) return;
            loadProperties();
        };

        return {
            init,
            loadProperties,
            renderProperties
        };
    })();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', PropertyLoader.init);
    } else {
        PropertyLoader.init();
    }
