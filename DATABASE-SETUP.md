# 🗄️ DATABASE SETUP GUIDE - PROVIVIR PANAMÁ

## Local Development (Sin MySQL Local)

Para desarrollo sin MySQL local, usaremos las credenciales remotas (GoDaddy).

### Variables de Entorno Requeridas

Actualiza tu `.env` con las credenciales reales:

```env
# Database Configuration (Remote - GoDaddy)
DB_HOST=tu-servidor.godaddy.com
DB_USER=provivir_user
DB_PASSWORD=TuContraseñaSegura
DB_NAME=provivir_db
DB_PORT=3306
DB_SSL=false

# API Configuration
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:8080,http://localhost:3000
```

## Tablas Necesarias

### 1. Tabla `leads` (Para contactos del formulario)

```sql
CREATE TABLE IF NOT EXISTS leads (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(50),
    message TEXT,
    salary VARCHAR(100),
    employment_status VARCHAR(100),
    project_name VARCHAR(255),
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
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. Tabla `properties` (Para propiedades inmobiliarias)

```sql
CREATE TABLE IF NOT EXISTS properties (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    location VARCHAR(255) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500),
    bedrooms TINYINT UNSIGNED NOT NULL,
    bathrooms TINYINT UNSIGNED NOT NULL,
    sqft INT UNSIGNED NOT NULL,
    status ENUM('active', 'sold', 'reserved', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_location (location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Setup en GoDaddy (o Servidor Remoto)

### Opción 1: Via PHPMyAdmin (GoDaddy)

1. Accede a tu Panel de GoDaddy
2. Busca "MySQL Databases" o "cPanel"
3. Abre **PhpMyAdmin**
4. Crea una nueva base de datos llamada `provivir_db`
5. Selecciona la database y ve a "SQL"
6. Copia y pega el contenido de `docstrash/backend/database/schema.sql`
7. Presiona "Go"

### Opción 2: Via línea de comandos (SSH)

```bash
# Conectar vía SSH
ssh user@your-godaddy-server.com

# Entrar a MySQL
mysql -h tu-db-host -u tu-usuario -p

# Copiar el contenido de schema.sql y ejecutarlo
```

## Testing de la Conexión

Para verificar que todo funciona:

```bash
npm run dev
# El backend debería conectarse a MySQL
# Mira los logs: "✅ MySQL pool created successfully"
```

## Verificar Tabla Creada

Accede a **PhpMyAdmin** → selecciona `provivir_db` → verifica que la tabla `leads` existe y tiene estos campos:

- `id` INT AUTO_INCREMENT
- `email` VARCHAR(255)
- `name` VARCHAR(255)
- `phone` VARCHAR(50)
- `message` TEXT
- **`salary` VARCHAR(100)** ← Nuevo
- **`employment_status` VARCHAR(100)** ← Nuevo
- **`project_name` VARCHAR(255)** ← Nuevo
- `property_id` INT (opcional)
- `created_at` TIMESTAMP
- `updated_at` TIMESTAMP

## Troubleshooting

### ❌ "Error: connect ECONNREFUSED"
- **Problema:** MySQL no está accesible
- **Solución:** Verifica credenciales en `.env`

### ❌ "Error: ER_ACCESS_DENIED_ERROR"
- **Problema:** Usuario/contraseña incorrectos
- **Solución:** Actualiza `DB_USER` y `DB_PASSWORD` en `.env`

### ❌ "Error: Unknown database 'provivir_db'"
- **Problema:** Base de datos no existe
- **Solución:** Crea la database ejecutando el SQL del schema

### ✅ Verificar conexión
```javascript
curl http://localhost:3000/api/leads/test
// Response: { success: true, message: 'Database connection OK' }
```

---

**Status:** ✅ Setup listo para deployment
