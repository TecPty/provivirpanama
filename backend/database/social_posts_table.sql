-- Social Posts Table
-- Tabla para almacenar publicaciones de redes sociales

CREATE TABLE IF NOT EXISTS social_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform ENUM('instagram', 'tiktok') NOT NULL,
    post_id VARCHAR(100) UNIQUE,
    image_url VARCHAR(500) NOT NULL,
    video_url VARCHAR(500),
    caption TEXT,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    post_url VARCHAR(500) NOT NULL,
    is_trending BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_platform (platform),
    INDEX idx_active (is_active),
    INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos de ejemplo con placeholders (hasta conectar API automática)
INSERT INTO social_posts (platform, post_id, image_url, caption, likes_count, comments_count, post_url, is_trending, display_order) VALUES
('instagram', 'temp_ig_001', 'https://via.placeholder.com/1080x1350/0077C2/FFFFFF?text=Proyecto+La+Chorrera', 'Conoce nuestro nuevo proyecto en La Chorrera 🏡✨ #Provivir #CasaNueva', 1200, 86, 'https://www.instagram.com/provivirpanama/', TRUE, 1),
('tiktok', 'temp_tt_001', 'https://via.placeholder.com/1080x1920/00A651/FFFFFF?text=Tour+Virtual', 'Tour virtual por nuestras viviendas 🎥 ¡Mira los acabados! #TourVirtual #Provivir', 432, 52, 'https://www.tiktok.com/@provivirpanama', TRUE, 2),
('instagram', 'temp_ig_002', 'https://via.placeholder.com/1080x1350/0077C2/FFFFFF?text=Familias+Felices', 'Familias felices en sus nuevos hogares 💙 #HogarPropio #Provivir', 890, 43, 'https://www.instagram.com/provivirpanama/', FALSE, 3),
('instagram', 'temp_ig_003', 'https://via.placeholder.com/1080x1350/00A651/FFFFFF?text=Villas+del+Este', 'Villas del Este: tu hogar soñado en Panamá 🌟 #VillasDelEste #Pacora', 1540, 92, 'https://www.instagram.com/provivirpanama/', TRUE, 4),
('tiktok', 'temp_tt_002', 'https://via.placeholder.com/1080x1920/0077C2/FFFFFF?text=Financiamiento', '¿Sabías que tenemos facilidades de pago? 💰 #Financiamiento #CasaPropia', 678, 38, 'https://www.tiktok.com/@provivirpanama', FALSE, 5),
('instagram', 'temp_ig_004', 'https://via.placeholder.com/1080x1350/00A651/FFFFFF?text=Altos+Guayacanes', 'Altos de los Guayacanes: comunidad, seguridad y naturaleza 🌳 #Guayacanes', 2100, 120, 'https://www.instagram.com/provivirpanama/', TRUE, 6);
