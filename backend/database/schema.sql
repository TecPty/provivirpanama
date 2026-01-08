-- ============================================================================
-- DATABASE SCHEMA - Provivir Panama
-- MySQL 5.7+ / MariaDB 10.2+
-- ============================================================================

-- Create database
CREATE DATABASE IF NOT EXISTS provivir_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE provivir_db;

-- ============================================================================
-- PROPERTIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS properties (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    location VARCHAR(255) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    description TEXT NOT NULL,
    full_description LONGTEXT,
    image VARCHAR(500),
    gallery JSON,
    bedrooms TINYINT UNSIGNED NOT NULL,
    bathrooms TINYINT UNSIGNED NOT NULL,
    sqft INT UNSIGNED NOT NULL,
    badge VARCHAR(100),
    badge_type ENUM('success', 'warning', 'info') DEFAULT 'success',
    status ENUM('active', 'sold', 'reserved', 'inactive') DEFAULT 'active',
    features JSON,
    amenities JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_price (price),
    INDEX idx_location (location),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- TESTIMONIALS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS testimonials (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    project VARCHAR(255),
    testimonial TEXT NOT NULL,
    image VARCHAR(500),
    rating TINYINT UNSIGNED DEFAULT 5,
    status ENUM('active', 'inactive') DEFAULT 'active',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- LEADS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS leads (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(50),
    message TEXT,
    property_id INT UNSIGNED,
    source VARCHAR(100) DEFAULT 'website',
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    status ENUM('new', 'contacted', 'qualified', 'converted', 'lost') DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created (created_at),
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- CONTACTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS contacts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SAMPLE DATA - Properties
-- ============================================================================
INSERT INTO properties (title, location, price, description, image, bedrooms, bathrooms, sqft, badge, badge_type) VALUES
('Green Meadows', 'Distrito Norte', 125000.00, 'Hermosas casas unifamiliares en una comunidad tranquila con acceso a parques y escuelas de calidad. Perfectas para familias que buscan un ambiente seguro y acogedor.', './assets/images/properties/green-meadows.jpg', 3, 2, 1200, '¡Pocas Unidades!', 'warning'),
('Sunrise Valley', 'Este', 145000.00, 'Modernos apartamentos con acabados de lujo en ubicación privilegiada cerca de zonas comerciales. Diseño contemporáneo con amplios espacios y excelente iluminación natural.', './assets/images/properties/sunrise-valley.jpg', 3, 2, 901, NULL, 'success'),
('Urban Heights', 'Centro de la Ciudad', 175000.00, 'Vive en el corazón de la ciudad con acceso inmediato a transporte público y entretenimiento. Edificio moderno con amenidades de primera clase.', './assets/images/properties/urban-heights.jpg', 3, 2, 870, 'Más Vendido', 'success');

-- ============================================================================
-- SAMPLE DATA - Testimonials
-- ============================================================================
INSERT INTO testimonials (name, location, project, testimonial, image, rating) VALUES
('Eugen Martinez', 'Green Meadows Resident', 'Green Meadows', 'Nunca pensé que podríamos permitirnos una casa en esta área. Provivir hizo el proceso de financiamiento increíblemente claro y fácil.', './assets/images/testimonials/client-1.jpg', 5),
('James Wilson', 'Sunrise Valley Resident', 'Sunrise Valley', 'El aspecto comunitario es lo que más nos vendió. Nuestros hijos ahora tienen lugar seguro para jugar, y hemos hecho grandes amigos cerca.', './assets/images/testimonials/client-2.jpg', 5),
('Elena Rodriguez', 'Urban Heights Resident', 'Urban Heights', 'Equipo profesional y gran calidad de construcción. Recomiendo Provivir a cualquiera que busque su primera propiedad.', './assets/images/testimonials/client-3.jpg', 5);

-- ============================================================================
-- Create database user (run separately with appropriate privileges)
-- ============================================================================
-- CREATE USER 'provivir_user'@'localhost' IDENTIFIED BY 'your_secure_password_here';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON provivir_db.* TO 'provivir_user'@'localhost';
-- FLUSH PRIVILEGES;