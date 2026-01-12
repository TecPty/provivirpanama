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

-- Datos de ejemplo (posts iniciales)
INSERT INTO social_posts (platform, image_url, caption, likes_count, comments_count, post_url, is_trending, display_order) VALUES
('instagram', './assets/images/social/post-1.jpg', 'Conoce nuestro nuevo proyecto en La Chorrera 🏡✨', 1200, 86, 'https://www.instagram.com/p/example1', TRUE, 1),
('tiktok', './assets/images/social/post-2.jpg', 'Tour virtual por nuestras viviendas 🎥', 432, 52, 'https://www.tiktok.com/@provivirpanama/video/example2', TRUE, 2),
('instagram', './assets/images/social/post-3.jpg', 'Familias felices en sus nuevos hogares 💙', 890, 43, 'https://www.instagram.com/p/example3', FALSE, 3);
