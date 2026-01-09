-- ============================================================================
-- DATOS REALES COMPLETOS - PROYECTOS PROVIVIR PANAMA
-- Extraídos del sitio web oficial: https://provivirpanama.com/
-- Fecha: 8 de enero de 2026
-- ============================================================================

USE provivir_db;

-- Limpiar datos previos
TRUNCATE TABLE properties;

-- ============================================================================
-- CIUDAD DEL ESTE - PACORA
-- ============================================================================

-- Modelo Córdoba
INSERT INTO properties (title, slug, location, price, description, full_description, image, gallery, bedrooms, bathrooms, sqft, badge, badge_type, status, features, amenities) VALUES
(
    'Ciudad del Este - Modelo Córdoba',
    'ciudad-del-este-cordoba',
    'Cachira, Pacora',
    25000.00, -- Estimado basado en pago quincenal B/.104.34
    'Modelo Córdoba con terrenos hasta 190 m². Pago quincenal desde B/.104.34',
    'Ubicado en Cachira, Pacora. A 6 minutos de la entrada de Pacora, sigue recto por la carretera Panamericana, cruza en la entrada de Cachira. Modelo familiar con excelentes acabados y amplios espacios.',
    '/assets/images/properties/ciudad-del-este/modelo-cordoba.avif',
    '["/assets/images/properties/ciudad-del-este/modelo-cordoba.avif"]',
    3,
    2,
    190,
    'Pago Quincenal B/.104.34',
    'success',
    'active',
    '["3 habitaciones", "2 baños", "Sala amplia", "Cocina equipada", "Patio", "Estacionamiento"]',
    '["Terreno hasta 190 m²", "Financiamiento disponible", "Cerca de servicios", "Transporte público", "Tour virtual 3D"]'
),

-- Modelo Granada
(
    'Ciudad del Este - Modelo Granada',
    'ciudad-del-este-granada',
    'Cachira, Pacora',
    14700.00, -- Estimado basado en pago quincenal B/.61.27
    'Modelo Granada con terrenos hasta 190 m². Pago quincenal desde B/.61.27',
    'Modelo compacto ideal para familias jóvenes en Ciudad del Este. Diseño funcional con excelentes acabados y espacios bien distribuidos.',
    '/assets/images/properties/ciudad-del-este/modelo-granada.avif',
    '["/assets/images/properties/ciudad-del-este/modelo-granada.avif"]',
    2,
    1,
    190,
    'Pago Quincenal B/.61.27',
    'success',
    'active',
    '["2 habitaciones", "1 baño", "Sala-comedor", "Cocina", "Patio trasero"]',
    '["Terreno hasta 190 m²", "Precio accesible", "Financiamiento flexible", "Jornadas comunitarias"]'
);

-- ============================================================================
-- ALTOS DE LOS GUAYACANES - PACORA
-- ============================================================================

-- Modelo Lirio
INSERT INTO properties (title, slug, location, price, description, full_description, image, gallery, bedrooms, bathrooms, sqft, badge, badge_type, status, features, amenities) VALUES
(
    'Altos de los Guayacanes - Modelo Lirio',
    'altos-guayacanes-lirio',
    'Pacora',
    22500.00, -- Estimado basado en pago quincenal B/.93.55
    'Modelo Lirio con terrenos hasta 190 m². Pago quincenal desde B/.93.55',
    'Proyecto en Altos de los Guayacanes, Pacora. Modelo familiar con diseño moderno y acabados de primera calidad. Ideal para familias que buscan comodidad y espacio.',
    '/assets/images/properties/altos-guayacanes/modelo-lirio.avif',
    '["/assets/images/properties/altos-guayacanes/modelo-lirio.avif"]',
    3,
    2,
    190,
    'Pago Quincenal B/.93.55',
    'info',
    'active',
    '["3 habitaciones", "2 baños", "Sala amplia", "Cocina moderna", "Patio", "Estacionamiento"]',
    '["Terreno hasta 190 m²", "Ubicación premium", "Cerca de escuelas", "Centros comerciales", "Parques"]'
),

-- Modelo Jazmín
(
    'Altos de los Guayacanes - Modelo Jazmín',
    'altos-guayacanes-jazmin',
    'Pacora',
    14700.00, -- Estimado basado en pago quincenal B/.61.27
    'Modelo Jazmín con terrenos hasta 186 m². Pago quincenal desde B/.61.27',
    'Modelo compacto y funcional en Altos de los Guayacanes. Perfecto para parejas o familias pequeñas que buscan su primera vivienda.',
    '/assets/images/properties/altos-guayacanes/modelo-jazmin.avif',
    '["/assets/images/properties/altos-guayacanes/modelo-jazmin.avif"]',
    2,
    1,
    186,
    'Pago Quincenal B/.61.27',
    'success',
    'active',
    '["2 habitaciones", "1 baño", "Sala-comedor integrada", "Cocina", "Patio"]',
    '["Terreno hasta 186 m²", "Precio accesible", "Primera vivienda", "Financiamiento fácil"]'
);

-- ============================================================================
-- COLINAS DEL ESTE - PACORA
-- ============================================================================

-- Modelo Andalucía
INSERT INTO properties (title, slug, location, price, description, full_description, image, gallery, bedrooms, bathrooms, sqft, badge, badge_type, status, features, amenities) VALUES
(
    'Colinas del Este - Modelo Andalucía',
    'colinas-este-andalucia',
    'Pacora',
    14700.00, -- Estimado basado en pago quincenal B/.61.27
    'Modelo Andalucía con terrenos hasta 190 m². Pago quincenal desde B/.61.27',
    'El equipo de trabajadores de Provivir de Colinas del Este realiza jornadas de limpieza en la barriada, manteniendo altos estándares. Modelo familiar con excelentes espacios.',
    '/assets/images/properties/colinas-este/modelo-andalucia.avif',
    '["/assets/images/properties/colinas-este/modelo-andalucia.avif"]',
    2,
    1,
    190,
    'Mantenimiento Premium',
    'info',
    'active',
    '["2 habitaciones", "1 baño", "Sala amplia", "Cocina", "Patio"]',
    '["Terreno hasta 190 m²", "Jornadas de limpieza", "Mantenimiento constante", "Comunidad organizada"]'
);

-- ============================================================================
-- VILLAS DEL ESTE - PACORA
-- ============================================================================

-- Modelo Roble
INSERT INTO properties (title, slug, location, price, description, full_description, image, gallery, bedrooms, bathrooms, sqft, badge, badge_type, status, features, amenities) VALUES
(
    'Villas del Este - Modelo Roble',
    'villas-este-roble',
    'Pacora',
    21300.00, -- Estimado basado en pago quincenal B/.88.64
    'Modelo Roble con terrenos hasta 190 m². Pago quincenal desde B/.88.64',
    'Modelo familiar en Villas del Este con diseño moderno y funcional. Espacios amplios y bien iluminados, ideal para familias que buscan confort.',
    '/assets/images/properties/villas-este/modelo-roble.avif',
    '["/assets/images/properties/villas-este/modelo-roble.avif"]',
    2,
    1,
    190,
    'Pago Quincenal B/.88.64',
    'success',
    'active',
    '["2 habitaciones", "1 baño", "Sala amplia", "Cocina moderna", "Patio"]',
    '["Terreno hasta 190 m²", "Diseño moderno", "Buenos acabados", "Zona tranquila"]'
),

-- Modelo Cerezo
(
    'Villas del Este - Modelo Cerezo',
    'villas-este-cerezo',
    'Pacora',
    26500.00, -- Estimado basado en pago quincenal B/.110.22
    'Modelo Cerezo con terrenos hasta 221 m². Pago quincenal desde B/.110.22',
    'Modelo premium en Villas del Este con terreno más amplio. Ideal para familias que buscan mayor espacio y comodidad con 3 habitaciones y 2 baños.',
    '/assets/images/properties/villas-este/modelo-cerezo.png',
    '["/assets/images/properties/villas-este/modelo-cerezo.png"]',
    3,
    2,
    221,
    'Terreno Premium 221 m²',
    'info',
    'active',
    '["3 habitaciones", "2 baños", "Sala amplia", "Cocina equipada", "Patio grande", "Estacionamiento"]',
    '["Terreno hasta 221 m²", "Mayor espacio", "Tour virtual disponible", "Zona premium"]'
);

-- ============================================================================
-- VILLAS DEL OESTE - LA CHORRERA
-- ============================================================================

-- Modelo Tulipán
INSERT INTO properties (title, slug, location, price, description, full_description, image, gallery, bedrooms, bathrooms, sqft, badge, badge_type, status, features, amenities) VALUES
(
    'Villas del Oeste - Modelo Tulipán',
    'villas-oeste-tulipan',
    'La Chorrera, Santa Cruz',
    14700.00, -- Estimado basado en pago quincenal B/.61.27
    'Modelo Tulipán con terrenos hasta 135 m². Pago quincenal desde B/.61.27',
    'Ubicado en Villas del Oeste a 10 minutos del parque Feuillet, camino a Río Congo. Modelo compacto y funcional con tour virtual 3D disponible.',
    '/assets/images/properties/villas-oeste/modelo-tulipan.png',
    '["https://my.matterport.com/show/?m=9YFHQFVD6yd"]',
    2,
    1,
    135,
    'Tour Virtual 3D',
    'info',
    'active',
    '["2 habitaciones", "1 baño", "Sala", "Cocina", "Patio"]',
    '["Terreno hasta 135 m²", "Tour virtual Matterport", "Cerca parque Feuillet", "Transporte accesible"]'
),

-- Modelo Caoba
(
    'Villas del Oeste - Modelo Caoba',
    'villas-oeste-caoba',
    'La Chorrera, Santa Cruz',
    22500.00, -- Estimado basado en pago quincenal B/.93.55
    'Modelo Caoba con terrenos hasta 186 m². Pago quincenal desde B/.93.55',
    'Nuestro Modelo Caoba está ubicado en Villas del Oeste a 10 minutos del parque Feuillet. Modelo familiar con 3 habitaciones, tour virtual 3D Matterport disponible.',
    '/assets/images/properties/villas-oeste/modelo-caoba.avif',
    '["https://my.matterport.com/show/?m=CZR3fydiMw1"]',
    3,
    2,
    186,
    'Tour Virtual 3D',
    'success',
    'active',
    '["3 habitaciones", "2 baños", "Sala amplia", "Comedor", "Cocina moderna", "Patio", "Estacionamiento"]',
    '["Terreno hasta 186 m²", "Tour virtual Matterport", "Ubicación estratégica", "Cerca de servicios"]'
);

-- ============================================================================
-- VERIFICAR INSERCIÓN
-- ============================================================================

SELECT 'RESUMEN DE PROPIEDADES INSERTADAS:' as info;
SELECT 
    title as 'Proyecto',
    location as 'Ubicación',
    CONCAT('B/.', FORMAT(price, 2)) as 'Precio Estimado',
    badge as 'Pago Quincenal',
    bedrooms as 'Hab.',
    bathrooms as 'Baños',
    sqft as 'm²'
FROM properties 
ORDER BY location, price;

SELECT CONCAT('Total de propiedades: ', COUNT(*)) as 'Total' FROM properties;
