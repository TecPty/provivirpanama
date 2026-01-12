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
};