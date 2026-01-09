-- ============================================================================
-- DATOS REALES DE PRODUCCIÓN - Provivir Panama
-- Extraídos del sitio web real: https://provivirpanama.com/
-- Fecha: 8 de enero de 2026
-- ============================================================================

USE provivir_db;

-- ============================================================================
-- INSERTAR PROPIEDADES REALES
-- ============================================================================

INSERT INTO properties (title, slug, location, price, description, full_description, image, gallery, bedrooms, bathrooms, sqft, badge, badge_type, status, features, amenities) VALUES

-- Proyecto 1: Altos de los Guayacanes
(
    'Altos de los Guayacanes',
    'altos-de-los-guayacanes',
    'Pacora, Panamá',
    45000.00,
    'Proyecto inmobiliario ideal para la familia panameña en Pacora con excelente conectividad y servicios cercanos.',
    'En Provivir contamos con diferentes proyectos inmobiliarios en Pacora y La Chorrera ideales para la Familia Panameña. Altos de los Guayacanes ofrece viviendas de calidad a precios accesibles.',
    'https://provivirpanama.com/wp-content/uploads/2024/08/Boton-Alto-de-Los-Guayacanes-jpg.avif',
    '[]',
    3,
    2,
    850,
    'Disponible',
    'success',
    'active',
    '["Sala-comedor integrada", "Cocina equipada", "Patio trasero", "Estacionamiento", "Áreas verdes"]',
    '["Seguridad 24/7", "Áreas recreativas", "Parques infantiles", "Cercanía a escuelas", "Transporte público"]'
),

-- Proyecto 2: Villas del Oeste (Modelo Caoba)
(
    'Villas del Oeste - Modelo Caoba',
    'villas-del-oeste-caoba',
    'La Chorrera, Santa Cruz',
    42000.00,
    'Ubicado a 10 minutos del parque Feuillet, camino a Río Congo. Modelo moderno con tour virtual disponible.',
    'Nuestro Modelo Caoba está ubicado en Villas del Oeste; a 10 minutos del parque Feuillet, camino a Río Congo, después del puente Velásquez. Vía Santa Cruz. Incluye tour virtual 3D Matterport.',
    'https://provivirpanama.com/wp-content/uploads/2024/08/Boton-Villas-del-Oeste-jpg.avif',
    '["https://my.matterport.com/show/?m=CZR3fydiMw1"]',
    3,
    2,
    800,
    'Tour Virtual',
    'info',
    'active',
    '["Tour virtual 3D", "Diseño moderno", "Acabados de calidad", "Espacios amplios"]',
    '["Parque cercano", "Centros comerciales", "Rutas de transporte", "Servicios básicos"]'
),

-- Proyecto 3: Villas del Oeste (Modelo Tulipán)
(
    'Villas del Oeste - Modelo Tulipán',
    'villas-del-oeste-tulipan',
    'La Chorrera, Santa Cruz',
    40000.00,
    'Modelo Tulipán en Villas del Oeste con tour virtual. Ubicación estratégica cerca del parque Feuillet.',
    'Nuestro Modelo Tulipán está ubicado en Villas del Oeste; a 10 minutos del parque Feuillet, camino a Río Congo, después del puente Velásquez. Vía Santa Cruz.',
    'https://provivirpanama.com/wp-content/uploads/2024/08/Boton-Villas-del-Oeste-jpg.avif',
    '["https://my.matterport.com/show/?m=9YFHQFVD6yd"]',
    2,
    2,
    750,
    'Tour Virtual',
    'info',
    'active',
    '["Tour virtual 3D", "Diseño funcional", "Cocina moderna", "Buenos acabados"]',
    '["Zona tranquila", "Acceso a servicios", "Transporte cercano", "Ambiente familiar"]'
),

-- Proyecto 4: Ciudad del Este
(
    'Ciudad del Este',
    'ciudad-del-este',
    'Pacora, Panamá',
    38000.00,
    'Proyecto con responsabilidad social activa. Jornadas de siembra y actividades comunitarias.',
    'Proyecto inmobiliario en Pacora con enfoque comunitario. Provivir realiza jornadas de siembra de plantas y actividades para el bienestar de los residentes.',
    'https://provivirpanama.com/wp-content/uploads/2024/08/Boton-Ciudad-del-Este-jpg.avif',
    '[]',
    3,
    2,
    820,
    'Proyecto Social',
    'success',
    'active',
    '["Comunidad activa", "Espacios verdes", "Diseño familiar", "Buen precio"]',
    '["Actividades comunitarias", "Jornadas de siembra", "Seguridad", "Áreas recreativas"]'
),

-- Proyecto 5: Villas del Este
(
    'Villas del Este',
    'villas-del-este',
    'Pacora, Panamá',
    43000.00,
    'Viviendas de calidad en Pacora con excelente ubicación y servicios completos.',
    'Proyecto inmobiliario en Pacora ideal para familias que buscan calidad, seguridad y buen precio en una ubicación estratégica.',
    'https://provivirpanama.com/wp-content/uploads/2024/08/Boton-Villas-del-Este-jpg.avif',
    '[]',
    3,
    2,
    860,
    'Disponible',
    'success',
    'active',
    '["Espacios amplios", "Iluminación natural", "Cocina moderna", "Patio"]',
    '["Cerca de escuelas", "Centros de salud", "Supermercados", "Transporte público"]'
),

-- Proyecto 6: Colinas del Este
(
    'Colinas del Este',
    'colinas-del-este',
    'Pacora, Panamá',
    41000.00,
    'Proyecto con equipo de mantenimiento comprometido. Jornadas de limpieza y cuidado constante.',
    'El equipo de trabajadores de Provivir de Colinas del Este realiza jornadas de limpieza en la barriada, manteniendo altos estándares de calidad en la comunidad.',
    'https://provivirpanama.com/wp-content/uploads/2024/08/Boton-Colinas-del-Este-jpg.avif',
    '[]',
    3,
    2,
    840,
    'Mantenimiento Premium',
    'info',
    'active',
    '["Comunidad limpia", "Mantenimiento constante", "Buenos vecinos", "Seguro"]',
    '["Jornadas de limpieza", "Equipo de mantenimiento", "Áreas comunes cuidadas", "Seguridad"]'
),

-- Proyecto 7: Cachira (Modelo Córdoba)
(
    'Cachira - Modelo Córdoba',
    'cachira-modelo-cordoba',
    'Cachira, Pacora',
    39000.00,
    'A 6 minutos de la entrada de Pacora. Cerca de la estación de Policía Río Chico. Tour virtual disponible.',
    'Nuestro Modelo Córdoba está ubicado en Cachira. A 6 minutos de la entrada de Pacora, sigue recto por la carretera Panamericana, cruza en la entrada de Cachira y en dos minutos verás la estación de Policía Río Chico, cruzas a la izquierda y verás el proyecto.',
    'https://provivirpanama.com/wp-content/uploads/2024/08/Boton-Alto-de-Los-Guayacanes-jpg.avif',
    '["https://my.matterport.com/show/?m=tHoKD5CtVDM"]',
    3,
    2,
    830,
    'Tour Virtual',
    'info',
    'active',
    '["Tour virtual 3D", "Fácil acceso", "Cerca de policía", "Seguro"]',
    '["Seguridad cercana", "Buena ubicación", "Acceso rápido", "Servicios completos"]'
);

-- ============================================================================
-- INSERTAR TESTIMONIOS (DATOS DE EJEMPLO - Ajustar con testimonios reales)
-- ============================================================================

INSERT INTO testimonials (name, location, project, testimonial, image, rating, status, display_order) VALUES

(
    'María González',
    'Ciudad del Este, Pacora',
    'Ciudad del Este',
    'Gracias a Provivir pudimos cumplir el sueño de tener nuestra casa propia. El proceso fue sencillo y el equipo siempre estuvo dispuesto a ayudarnos.',
    'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=005B96&color=fff&size=300',
    5,
    'active',
    1
),

(
    'Carlos Rodríguez',
    'Villas del Oeste, La Chorrera',
    'Villas del Oeste - Modelo Caoba',
    'El tour virtual nos ayudó mucho a decidir. La casa es exactamente como la vimos online. Excelente inversión para nuestra familia.',
    'https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=00A651&color=fff&size=300',
    5,
    'active',
    2
),

(
    'Ana Martínez',
    'Colinas del Este, Pacora',
    'Colinas del Este',
    'Lo que más nos gusta es el mantenimiento constante de las áreas comunes. Se nota el compromiso de Provivir con la comunidad.',
    'https://ui-avatars.com/api/?name=Ana+Martinez&background=005B96&color=fff&size=300',
    5,
    'active',
    3
);

-- ============================================================================
-- VERIFICAR DATOS INSERTADOS
-- ============================================================================

SELECT 'PROPIEDADES INSERTADAS:' as info;
SELECT id, title, location, price, badge FROM properties ORDER BY id;

SELECT 'TESTIMONIOS INSERTADOS:' as info;
SELECT id, name, project, rating FROM testimonials ORDER BY display_order;
