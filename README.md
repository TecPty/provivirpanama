# 🏠 Provivir Panamá - Landing Page

Landing page profesional para soluciones de vivienda asequible con subsidios gubernamentales y opciones de financiamiento flexibles.

## 🎯 Características

- ✅ Diseño responsive (mobile-first)
- ✅ Sistema de propiedades dinámicas
- ✅ Integración con CMS Headless
- ✅ Formularios de captura de leads
- ✅ Backend API REST en PHP
- ✅ Base de datos MySQL
- ✅ Optimizado para SEO
- ✅ Performance optimizado (Lighthouse 90+)
- ✅ Accesibilidad WCAG 2.1 AA

## 📋 Requisitos

### Frontend
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor web (Apache/Nginx)

### Backend
- PHP 7.4+ o 8.0+
- MySQL 5.7+ o MariaDB 10.2+
- Extensiones PHP: PDO, pdo_mysql, json

## 🚀 Instalación

### 1. Clonar/Descargar el Proyecto

```bash
# Opción 1: Si tienes Git
git clone https://github.com/tu-usuario/provivirpanama.git
cd provivirpanama

# Opción 2: Descargar ZIP y extraer
```

### 2. Estructura de Carpetas

Asegúrate de que tu estructura sea la siguiente:

```
provivirpanama.com/
├── frontend/
│   ├── assets/
│   │   └── images/
│   │       ├── hero/
│   │       ├── properties/
│   │       ├── testimonials/
│   │       ├── partners/
│   │       └── icons/
│   ├── css/
│   ├── js/
│   └── index.html
├── backend/
│   ├── api/
│   └── database/
└── README.md
```

### 3. Configurar Base de Datos

```bash
# 1. Acceder a MySQL
mysql -u root -p

# 2. Ejecutar el schema
mysql -u root -p < backend/database/schema.sql

# 3. Crear usuario (opcional, editar contraseña)
mysql -u root -p
```

```sql
CREATE USER 'provivir_user'@'localhost' IDENTIFIED BY 'TU_CONTRASEÑA_SEGURA';
GRANT SELECT, INSERT, UPDATE, DELETE ON provivir_db.* TO 'provivir_user'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Configurar Backend

Edita `backend/api/config.php`:

```php
$dbConfig = [
    'host' => 'localhost',
    'database' => 'provivir_db',
    'username' => 'provivir_user',
    'password' => 'TU_CONTRASEÑA_AQUI',
    'charset' => 'utf8mb4'
];

// CAMBIAR EN PRODUCCIÓN:
define('ENVIRONMENT', 'production');
define('API_KEY', 'genera_una_api_key_segura_aqui');
```

### 5. Configurar Frontend

Edita `frontend/js/config.js`:

```javascript
const CONFIG = {
    API: {
        BASE_URL: '/api', // Ajustar según tu configuración
        // ...
    }
};
```

### 6. Subir Assets (Imágenes)

Coloca tus imágenes en las carpetas correspondientes:

```
frontend/assets/images/
├── logo.svg (logo de Provivir)
├── favicon.png
├── og-image.jpg (1200x630px para redes sociales)
├── hero/
│   └── hero-illustration.png
├── properties/
│   ├── green-meadows.jpg
│   ├── sunrise-valley.jpg
│   └── urban-heights.jpg
├── testimonials/
│   ├── client-1.jpg
│   ├── client-2.jpg
│   └── client-3.jpg
└── partners/
    ├── citybank.svg
    ├── national-trust.svg
    ├── homefund.svg
    └── govhousing.svg
```

### 7. Configurar Servidor Web

#### Apache (.htaccess)

Crear archivo `.htaccess` en la raíz:

```apache
# Habilitar rewrite
RewriteEngine On

# Forzar HTTPS (producción)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# API routing
RewriteRule ^api/(.*)$ backend/api/$1 [L,QSA]

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Cache headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

#### Nginx

```nginx
server {
    listen 80;
    server_name provivirpanama.com www.provivirpanama.com;
    root /var/www/provivirpanama.com/frontend;
    index index.html;

    # Redirigir a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name provivirpanama.com www.provivirpanama.com;
    
    root /var/www/provivirpanama.com/frontend;
    index index.html;

    # SSL certificates
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # API routing
    location /api/ {
        alias /var/www/provivirpanama.com/backend/api/;
        try_files $uri $uri/ /api/index.php?$query_string;
        
        location ~ \.php$ {
            fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $request_filename;
            include fastcgi_params;
        }
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|webp|svg|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compression
    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

### 8. Verificar Instalación

1. Accede a `https://provivirpanama.com`
2. Verifica que las propiedades se carguen
3. Prueba el formulario de leads
4. Revisa la consola del navegador para errores

## 🔧 Configuración Adicional

### Integración con CMS Headless (Strapi)

1. Instalar Strapi:
```bash
npx create-strapi-app@latest cms
cd cms
npm run develop
```

2. Crear Content Types:
   - Properties
   - Testimonials

3. Configurar API tokens en Strapi

4. Actualizar `frontend/js/config.js`:
```javascript
CMS: {
    ENABLED: true,
    BASE_URL: 'https://cms.provivirpanama.com',
    API_KEY: 'tu_strapi_api_key'
}
```

### Google Analytics

Agregar tu ID en `frontend/js/config.js`:

```javascript
ANALYTICS: {
    GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX',
    TRACK_EVENTS: true
}
```

### Email Notifications

Configurar en `backend/api/config.php`:

```php
define('ADMIN_EMAIL', 'admin@provivirpanama.com');
define('FROM_EMAIL', 'noreply@provivirpanama.com');
```

## 📊 Optimización

### Imágenes

Optimiza tus imágenes antes de subirlas:

- Formato WebP para mejor compresión
- Dimensiones recomendadas:
  - Hero: 1200x800px
  - Properties: 800x600px
  - Testimonials: 400x400px (circular)
  - Partners: SVG o PNG transparente

### Performance

- Lighthouse score objetivo: 90+
- Core Web Vitals:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

## 🔒 Seguridad

### En Producción:

1. Cambiar todas las contraseñas y API keys
2. Habilitar HTTPS con certificado SSL
3. Configurar CORS apropiadamente
4. Implementar rate limiting
5. Validar y sanitizar todos los inputs
6. Mantener PHP y MySQL actualizados

## 📱 Testing

### Navegadores:
- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

### Dispositivos:
- Desktop: 1920x1080, 1366x768
- Tablet: 768x1024
- Mobile: 375x667, 414x896

## 🐛 Troubleshooting

### Propiedades no cargan

1. Verifica conexión a base de datos
2. Revisa logs de PHP: `tail -f /var/log/php/error.log`
3. Verifica permisos de archivos
4. Comprueba que la API responda: `curl https://provivirpanama.com/api/properties.php`

### Formulario no funciona

1. Verifica configuración de CORS
2. Revisa consola del navegador
3. Comprueba endpoint de API
4. Verifica permisos de escritura en BD

## 📞 Soporte

- Email: dev@provivirpanama.com
- Documentación: [docs.provivirpanama.com]

## 📄 Licencia

Copyright © 2024 Provivir Inc. Todos los derechos reservados.

---

**Desarrollado con 💚 para familias panameñas**#   p r o v i v i r p a n a m a  
 