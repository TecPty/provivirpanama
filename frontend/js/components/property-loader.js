/**
 * ============================================================================
 * PROPERTY LOADER - Provivir Panama
 * Carga y renderiza propiedades desde mock data
 * ============================================================================
 */

const PropertyLoader = (() => {
    const propertiesGrid = document.getElementById('propertiesGrid');
    const propertiesLoading = document.getElementById('propertiesLoading');
    const propertiesError = document.getElementById('propertiesError');
    let properties = [];
    let filteredProperties = [];
    let showingAll = false;

    /**
     * Mock data - 9 proyectos
     */
    const getMockProperties = () => {
        return [
            {
                id: 1,
                title: 'Green Meadows',
                location: 'Distrito Norte',
                price: 125000,
                description: 'Hermosas casas unifamiliares en una comunidad tranquila con acceso a parques y escuelas de calidad. Perfectas para familias que buscan un ambiente seguro y acogedor.',
                image: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?w=800&q=80',
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
                description: 'Modernos apartamentos con acabados de lujo en ubicación privilegiada cerca de zonas comerciales. Diseño contemporáneo con amplios espacios y excelente iluminación natural.',
                image: 'https://images.unsplash.com/photo-1500595046891-d9ba81e5f325?w=800&q=80',
                bedrooms: 3,
                bathrooms: 2,
                sqft: 901,
                badge: 'Nuevo Lanzamiento',
                badgeType: 'info'
            },
            {
                id: 3,
                title: 'Urban Heights',
                location: 'Centro de la Ciudad',
                price: 175000,
                description: 'Vive en el corazón de la ciudad con acceso inmediato a transporte público y entretenimiento. Edificio moderno con amenidades de primera clase.',
                image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f5d?w=800&q=80',
                bedrooms: 3,
                bathrooms: 2,
                sqft: 870,
                badge: 'Más Vendido',
                badgeType: 'success'
            },
            {
                id: 4,
                title: 'Pacific Breeze',
                location: 'Punta Pacífica',
                price: 450000,
                description: 'Lujosos penthouses con vistas al océano y amenidades tipo resort de cinco estrellas. Exclusivo complejo residencial con seguridad 24/7.',
                image: 'https://images.unsplash.com/photo-1512917774080-9b274b3c0fa3?w=800&q=80',
                bedrooms: 4,
                bathrooms: 3,
                sqft: 2300,
                badge: null,
                badgeType: null
            },
            {
                id: 5,
                title: 'Mountain View',
                location: 'Altos del Este',
                price: 98000,
                description: 'Casas acogedoras ideales para parejas jóvenes. Diseñadas para el descanso y la convivencia con la naturaleza. Comunidad cerrada con excelentes servicios.',
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
                bedrooms: 2,
                bathrooms: 1,
                sqft: 1000,
                badge: 'Entrega Inmediata',
                badgeType: 'success'
            },
            {
                id: 6,
                title: 'Azure Bay',
                location: 'Playa Blanca',
                price: 215000,
                description: 'La mejor inversión en propiedades de playa con alta rentabilidad y amenidades exclusivas. Oportunidad de negocios perfecta para inversores.',
                image: 'https://images.unsplash.com/photo-1566195992271-5f4e466febda?w=800&q=80',
                bedrooms: 3,
                bathrooms: 2,
                sqft: 1370,
                badge: null,
                badgeType: null
            },
            {
                id: 7,
                title: 'Central Garden',
                location: 'Hato Pintado',
                price: 189000,
                description: 'Espacios amplios y jardines privados en el centro de la ciudad. Ideal para familias en crecimiento. Comunidad con parques y escuelas cercanas.',
                image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
                bedrooms: 3,
                bathrooms: 2,
                sqft: 1450,
                badge: null,
                badgeType: null
            },
            {
                id: 8,
                title: 'The Landmark',
                location: 'Casco Viejo',
                price: 165000,
                description: 'Arquitectura clásica y estilo de vida cosmopolita. El nuevo punto de referencia en el centro histórico. Perfecto para profesionales y emprendedores.',
                image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
                bedrooms: 2,
                bathrooms: 1,
                sqft: 920,
                badge: 'En Preventa',
                badgeType: 'info'
            },
            {
                id: 9,
                title: 'Eco Village',
                location: 'Arraiján',
                price: 110000,
                description: 'Proyecto eco-sostenible con paneles solares incluidos y sistema de recolección de agua. Perfecto para familias comprometidas con la sostenibilidad ambiental.',
                image: 'https://images.unsplash.com/photo-1499209974033-bc7655ee27d5?w=800&q=80',
                bedrooms: 3,
                bathrooms: 2,
                sqft: 1390,
                badge: 'Sostenible',
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
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}" loading="lazy">
                    ${property.badge ? `<span class="property-badge badge-${property.badgeType}">${property.badge}</span>` : ''}
                </div>
                <div class="property-info">
                    <p class="property-location">${property.location}</p>
                    <h3>${property.title}</h3>
                    <p class="property-description">${property.description}</p>
                    <div class="property-features">
                        <span>🛏️ ${property.bedrooms} hab</span>
                        <span>🚿 ${property.bathrooms} baños</span>
                        <span>📐 ${property.sqft} m²</span>
                    </div>
                    <div class="property-actions">
                        <span class="property-price">B/.${property.price.toLocaleString()}</span>
                        <button class="btn btn--primary" data-action="contact">Contactar</button>
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

        propertiesLoading.classList.add('hidden');
        propertiesError.classList.add('hidden');

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
        const property = properties.find(p => p.id == propertyId);

        sessionStorage.setItem('selectedPropertyId', propertyId);
        sessionStorage.setItem('selectedPropertyTitle', property.title);

        if (CONFIG.ENVIRONMENT === 'development') {
            console.log('Contact about property:', propertyId);
        }

        // Scroll to contact form
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    /**
     * Toggle view - show all or just 3
     */
    const toggleViewAll = () => {
        showingAll = !showingAll;
        
        if (showingAll) {
            renderProperties(properties);
        } else {
            renderProperties(properties.slice(0, 3));
        }
        
        updateViewMoreButton();
    };

    /**
     * Update view more button text
     */
    const updateViewMoreButton = () => {
        const button = document.querySelector('[data-action="view-all"]');
        if (button) {
            button.textContent = showingAll ? '← Ver Menos Proyectos' : 'Ver Todos los Proyectos →';
            button.dataset.toggle = showingAll ? 'less' : 'more';
        }
    };

    /**
     * Load properties
     */
    const loadProperties = async () => {
        try {
            // Simular pequeño delay de carga
            await new Promise(resolve => setTimeout(resolve, 300));
            
            properties = getMockProperties();
            filteredProperties = properties.slice(0, 3); // Mostrar 3 inicialmente
            renderProperties(filteredProperties);
            
            // Attach view all button listener
            const viewAllBtn = document.querySelector('[data-action="view-all"]');
            if (viewAllBtn) {
                viewAllBtn.addEventListener('click', toggleViewAll);
            }

            if (CONFIG.ENVIRONMENT === 'development') {
                console.log('✅ Properties loaded:', properties.length);
            }
        } catch (error) {
            console.error('❌ Error loading properties:', error);
            propertiesLoading.classList.add('hidden');
            propertiesError.classList.remove('hidden');
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
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', PropertyLoader.init);
} else {
    PropertyLoader.init();
}
