# 🏠 Provivir Panamá - Landing Page

> **"Hogares para crecer, comunidades para vivir"**

Landing page profesional para soluciones de vivienda asequible con subsidios gubernamentales y opciones de financiamiento flexibles en Panamá.

## 🎯 Características Principales

### Frontend
- ✅ Diseño responsive moderno (mobile-first)
- ✅ Sistema de propiedades dinámicas con lazy loading
- ✅ Carrusel de testimonios en tiempo real
- ✅ Feed de redes sociales (Instagram/TikTok)
- ✅ Formularios de captura de leads con validación
- ✅ Animaciones de scroll suaves
- ✅ Optimizado para SEO
- ✅ Performance Score 90+ (Lighthouse)
- ✅ Accesibilidad WCAG 2.1 AA

### Backend
- ✅ API REST en PHP con PDO
- ✅ Base de datos MySQL optimizada
- ✅ Sistema CRUD para testimonios
- ✅ Sistema CRUD para social posts
- ✅ Gestión de leads con timestamps
- ✅ Validación y sanitización de datos
- ✅ CORS configurado
- ✅ Manejo de errores robusto

### Integración de Redes Sociales
- ✅ Sistema manual con escalabilidad a API automática
- ✅ Soporte para Instagram y TikTok
- ✅ Badges de "trending" para posts destacados
- ✅ Carrusel con navegación y autoplay
- ✅ Responsive (1/2/3 columnas según dispositivo)
- ✅ Documentación completa en [SOCIAL-FEED-README.md](SOCIAL-FEED-README.md)

## 📋 Requisitos del Sistema

### Frontend
- Navegador moderno con soporte ES6+ (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Servidor web (Apache 2.4+ o Nginx 1.18+)

### Backend
- **PHP:** 7.4+ o 8.0+ (recomendado 8.1+)
- **MySQL:** 5.7+ o MariaDB 10.2+ (recomendado MySQL 8.0+)
- **Extensiones PHP requeridas:**
  - `pdo` - PDO Database Abstraction
  - `pdo_mysql` - MySQL PDO Driver
  - `json` - JSON Support
  - `mbstring` - Multibyte String Functions
  - `openssl` - OpenSSL Support (para HTTPS)

### Desarrollo Local (XAMPP)
- XAMPP 8.0+ (incluye Apache, MySQL, PHP)
- phpMyAdmin para gestión de base de datos
- Git para control de versiones

## 🚀 Instalación y Configuración

### Método 1: Desarrollo Local con XAMPP (Windows)

#### 1. Instalar XAMPP
1. Descargar XAMPP desde [https://www.apachefriends.org](https://www.apachefriends.org)
2. Instalar en `C:\xampp\`
3. Iniciar Apache y MySQL desde el panel de control

#### 2. Clonar el Repositorio
```bash
# Opción 1: Usando Git
git clone https://github.com/TecPty/provivirpanama.git
cd provivirpanama

# Opción 2: Descargar ZIP desde GitHub
# Extraer en C:\Users\TU_USUARIO\provivirpanama
```

#### 3. Copiar Archivos a XAMPP
```bash
# Copiar frontend y backend a htdocs
xcopy "C:\Users\TU_USUARIO\provivirpanama\frontend" "C:\xampp\htdocs\provivirpanama\frontend\" /E /Y /I
xcopy "C:\Users\TU_USUARIO\provivirpanama\backend" "C:\xampp\htdocs\provivirpanama\backend\" /E /Y /I
```

#### 4. Configurar Base de Datos MySQL

**Opción A: Usando phpMyAdmin**
1. Abrir http://localhost/phpmyadmin
2. Crear nueva base de datos: `provivir_db`
3. Ir a la pestaña "SQL"
4. Importar `backend/database/schema.sql`
5. Importar datos de prueba (opcional):
   - `backend/database/seed-real-data.sql` (proyectos reales)
   - `backend/database/social_posts_table.sql` (redes sociales)

**Opción B: Usando línea de comandos**
```bash
# Acceder a MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE provivir_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE provivir_db;

# Importar schema
SOURCE C:/xampp/htdocs/provivirpanama/backend/database/schema.sql;
SOURCE C:/xampp/htdocs/provivirpanama/backend/database/seed-real-data.sql;
SOURCE C:/xampp/htdocs/provivirpanama/backend/database/social_posts_table.sql;
```

#### 5. Configurar Credenciales del Backend

Editar `backend/api/config.php`:
```php
<?php
$dbConfig = [
    'host' => 'localhost',
    'database' => 'provivir_db',
    'username' => 'root',           // Usuario por defecto en XAMPP
    'password' => '',                // Sin contraseña en XAMPP
    'charset' => 'utf8mb4'
];

// Ambiente de desarrollo
define('ENVIRONMENT', 'development');
define('API_KEY', 'tu_api_key_aqui'); // Cambiar en producción
?>
```

#### 6. Configurar URL del Frontend

Editar `frontend/js/config.js`:
```javascript
const CONFIG = {
    API: {
        BASE_URL: '/provivirpanama/backend/api', // Ruta local XAMPP
        TIMEOUT: 10000
    },
    // ... resto de configuración
};
```

#### 7. Verificar Instalación
1. Abrir http://localhost/provivirpanama/frontend/index.html
2. Verificar que las propiedades se carguen
3. Probar el formulario de contacto
4. Revisar la consola del navegador (F12) para errores

---

### Método 2: Instalación en Servidor Producción (Linux)

#### 1. Clonar Repositorio
```bash
cd /var/www
git clone https://github.com/TecPty/provivirpanama.git
cd provivirpanama
```

#### 2. Configurar Base de Datos
```bash
mysql -u root -p
```

```sql
-- Crear base de datos
CREATE DATABASE provivir_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario con permisos
CREATE USER 'provivir_user'@'localhost' IDENTIFIED BY 'CONTRASEÑA_SEGURA_AQUI';
GRANT SELECT, INSERT, UPDATE, DELETE ON provivir_db.* TO 'provivir_user'@'localhost';
FLUSH PRIVILEGES;

-- Importar schema
USE provivir_db;
SOURCE /var/www/provivirpanama/backend/database/schema.sql;
SOURCE /var/www/provivirpanama/backend/database/seed-real-data.sql;
SOURCE /var/www/provivirpanama/backend/database/social_posts_table.sql;
```

#### 3. Configurar Backend
```bash
cd backend/api
cp config.example.php config.php
nano config.php
```

```php
<?php
$dbConfig = [
    'host' => 'localhost',
    'database' => 'provivir_db',
    'username' => 'provivir_user',
    'password' => 'CONTRASEÑA_SEGURA_AQUI',
    'charset' => 'utf8mb4'
];

define('ENVIRONMENT', 'production');
define('API_KEY', 'genera_clave_segura_con_openssl');
?>
```

#### 4. Configurar Permisos
```bash
# Propietario del servidor web
chown -R www-data:www-data /var/www/provivirpanama
chmod -R 755 /var/www/provivirpanama
chmod 600 backend/api/config.php
```

#### 5. Configurar Frontend
```bash
nano frontend/js/config.js
```

```javascript
const CONFIG = {
    API: {
        BASE_URL: '/api',  // Con rewrite rules de Apache/Nginx
        TIMEOUT: 10000
    }
};
```

---

## 📁 Estructura del Proyecto

```
provivirpanama/
├── frontend/                    # Frontend estático
│   ├── index.html              # Página principal
│   ├── assets/
│   │   └── images/
│   │       ├── hero/           # Imágenes del hero slider (5 proyectos)
│   │       ├── properties/     # Imágenes de propiedades por proyecto
│   │       ├── partners/       # Logos de bancos (5 PNG)
│   │       ├── team/           # Fotos del equipo de asesoras
│   │       ├── social/         # Posts de Instagram/TikTok
│   │       ├── logo/           # Logos de Provivir
│   │       └── icons/          # Favicons y PWA icons
│   ├── css/
│   │   ├── 00-reset.css        # CSS Reset
│   │   ├── 01-variables.css    # Variables CSS (colores, fuentes)
│   │   ├── 02-global.css       # Estilos globales
│   │   ├── 03-typography.css   # Tipografía
│   │   ├── main.css            # Imports principales
│   │   └── components/         # Componentes modulares
│   │       ├── header.css
│   │       ├── hero.css
│   │       ├── property-card.css
│   │       ├── value-props.css      # Visión y Misión
│   │       ├── trust-bar.css        # Logos bancarios
│   │       ├── team.css             # Carrusel de equipo
│   │       ├── testimonials.css     # Testimonios
│   │       ├── social-feed.css      # Feed de redes sociales
│   │       ├── cta-section.css      # Formulario de contacto
│   │       ├── footer.css
│   │       └── whatsapp-button.css
│   └── js/
│       ├── config.js            # Configuración global
│       ├── api.js               # Cliente API REST
│       ├── main.js              # Inicialización
│       ├── components/          # Módulos JavaScript
│       │   ├── property-loader.js
│       │   ├── testimonial-loader.js
│       │   ├── social-feed-loader.js  # Nuevo: feed social
│       │   ├── form-handler.js
│       │   ├── hero-slider.js
│       │   ├── team-carousel.js
│       │   ├── mobile-menu.js
│       │   ├── lazy-loading.js
│       │   └── scroll-animations.js
│       └── utils/
│           ├── validators.js
│           ├── helpers.js
│           └── placeholders.js
│
├── backend/                     # Backend PHP
│   ├── api/
│   │   ├── config.php           # Configuración de BD (no versionado)
│   │   ├── config.example.php   # Plantilla de configuración
│   │   ├── properties.php       # API de propiedades
│   │   ├── testimonials.php     # API de testimonios
│   │   ├── social-posts.php     # API de posts sociales (nuevo)
│   │   └── leads.php            # API de leads
│   └── database/
│       ├── schema.sql           # Schema principal
│       ├── seed-real-data.sql   # Datos de proyectos reales
│       └── social_posts_table.sql  # Tabla de redes sociales (nuevo)
│
├── logos/                       # Assets de diseño original
├── DEPLOYMENT.md                # Guía de despliegue
├── SOCIAL-FEED-README.md        # Guía del sistema de social feed
└── README.md                    # Este archivo
```

---

## 🎨 Subir Assets (Imágenes)

### Imágenes Requeridas

```
frontend/assets/images/
├── logo/
│   ├── logo-provivir.png        # Logo completo
│   ├── logo-icon-provivir.png   # Solo icono
│   └── logo-word-provivir.png   # Solo texto
│
├── icons/
│   ├── favicon.ico              # Favicon 32x32
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png     # 180x180
│   ├── android-chrome-192x192.png
│   └── android-chrome-512x512.png
│
├── hero/                         # Hero slider (1920x1080px)
│   ├── hero-villas-este.jpg
│   ├── hero-villas-oeste.avif
│   ├── hero-colinas-este.jpg
│   ├── hero-ciudad-este.avif
│   └── hero-guayacanes.avif
│
├── properties/                   # Por proyecto
│   ├── villas-este/
│   │   ├── villas-este.png      # Logo del proyecto
│   │   ├── modelo-roble.avif    # Modelos (800x600px)
│   │   └── modelo-cerezo.png
│   ├── villas-oeste/
│   ├── colinas-este/
│   ├── ciudad-del-este/
│   └── altos-guayacanes/
│
├── partners/                     # Logos bancarios (540x144px)
│   ├── banco-general.png
│   ├── banco-nacional.png
│   ├── banco-mercantil.png
│   ├── caja-de-ahorro.png
│   └── la-hipótecaria.png
│
├── team/                         # Fotos del equipo (400x500px)
│   ├── veronica_barboza.png
│   ├── kenia_vergara.png
│   ├── jacmily_figuera.png
│   ├── anny_navas.png
│   ├── alberto_valencia.png     # Pendiente
│   └── alanis_gutierrez.png     # Pendiente
│
└── social/                       # Posts de redes sociales (1080x1350px)
    ├── post-1.jpg               # Pendiente
    ├── post-2.jpg               # Pendiente
    └── post-3.jpg               # Pendiente
```

### Optimización de Imágenes

**Herramientas recomendadas:**
- [TinyPNG](https://tinypng.com) - Compresión PNG/JPG
- [Squoosh](https://squoosh.app) - Conversión a WebP/AVIF
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Optimización SVG

**Formatos recomendados:**
- **AVIF** para hero/properties (mejor compresión)
- **WebP** como fallback
- **PNG** para logos con transparencia
- **JPG** para fotos sin transparencia

---

## ⚙️ Configuración del Servidor Web

### Apache (.htaccess)

Crear `.htaccess` en la raíz de `frontend/`:

```apache
# Habilitar mod_rewrite
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Forzar HTTPS en producción
    # RewriteCond %{HTTPS} off
    # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # API routing
    RewriteRule ^api/(.*)$ ../backend/api/$1 [L,QSA]
</IfModule>

# Compression GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Cache headers para performance
<IfModule mod_expires.c>
    ExpiresActive On
    
    # Imágenes
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/avif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    
    # CSS y JavaScript
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    
    # Fonts
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    # Prevenir clickjacking
    Header always set X-Frame-Options "SAMEORIGIN"
    
    # XSS Protection
    Header always set X-XSS-Protection "1; mode=block"
    
    # Content Type Options
    Header always set X-Content-Type-Options "nosniff"
    
    # Referrer Policy
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

### Nginx (Configuración Completa)

Crear archivo `/etc/nginx/sites-available/provivirpanama`:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name provivirpanama.com www.provivirpanama.com;
    
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name provivirpanama.com www.provivirpanama.com;
    
    root /var/www/provivirpanama/frontend;
    index index.html;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/provivirpanama.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/provivirpanama.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Main location
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API routing
    location /api/ {
        alias /var/www/provivirpanama/backend/api/;
        
        location ~ \.php$ {
            fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $request_filename;
            include fastcgi_params;
        }
    }
    
    # Static files caching
    location ~* \.(jpg|jpeg|png|webp|avif|svg|css|js|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css application/javascript application/json image/svg+xml;
    
    # Logs
    access_log /var/log/nginx/provivirpanama-access.log;
    error_log /var/log/nginx/provivirpanama-error.log;
}
```

**Habilitar sitio:**
```bash
ln -s /etc/nginx/sites-available/provivirpanama /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## 📊 Gestión de Contenido

### 1. Agregar Nuevos Proyectos

**Opción A: phpMyAdmin**
1. Abrir http://localhost/phpmyadmin
2. Seleccionar base de datos `provivir_db`
3. Ir a tabla `properties`
4. Hacer clic en "Insertar"
5. Llenar campos y guardar

**Opción B: SQL**
```sql
INSERT INTO properties (
    project_name, model_name, price, bedrooms, bathrooms, 
    parking, area_sqft, location, description, image_url, status
) VALUES (
    'Villas del Este', 'Modelo Roble', 89000, 3, 2, 2, 1200,
    'Panamá Este', 'Casa moderna con diseño funcional',
    '/assets/images/properties/villas-este/modelo-roble.avif', 'available'
);
```

### 2. Gestionar Testimonios

Ver documentación completa en el código de `testimonials.php`.

**Crear testimonio:**
```bash
curl -X POST http://localhost/provivirpanama/backend/api/testimonials.php \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "María González",
    "project": "Villas del Este",
    "rating": 5,
    "comment": "Excelente servicio, cumplieron con todo lo prometido.",
    "is_featured": true
  }'
```

### 3. Gestionar Posts de Redes Sociales

Ver documentación completa en [SOCIAL-FEED-README.md](SOCIAL-FEED-README.md).

**Agregar post manualmente:**
```sql
INSERT INTO social_posts (
    platform, post_id, image_url, caption, 
    likes_count, comments_count, post_url, is_trending
) VALUES (
    'instagram', 'ABC123XYZ', '/assets/images/social/post-1.jpg',
    '¡Familias felices en su nuevo hogar! 🏠✨',
    1250, 34, 'https://www.instagram.com/p/ABC123XYZ', TRUE
);
```

---

## 🧪 Testing y Validación

### Verificar Instalación

1. **Frontend:** http://localhost/provivirpanama/frontend/index.html
2. **API Properties:** http://localhost/provivirpanama/backend/api/properties.php
3. **API Testimonials:** http://localhost/provivirpanama/backend/api/testimonials.php
4. **API Social Posts:** http://localhost/provivirpanama/backend/api/social-posts.php

### Checklist de Testing

- [ ] Hero slider funciona correctamente
- [ ] Propiedades se cargan dinámicamente
- [ ] Filtros de propiedades funcionan
- [ ] Formulario de contacto envía datos
- [ ] Testimonios rotan automáticamente
- [ ] Feed social muestra posts
- [ ] Navegación del carrusel funciona
- [ ] Botón de WhatsApp abre chat
- [ ] Menú móvil responsive
- [ ] Lazy loading de imágenes
- [ ] Animaciones de scroll
- [ ] Sin errores en consola (F12)

### Navegadores Soportados
- ✅ Chrome 90+ (Windows, macOS, Android)
- ✅ Firefox 88+ (Windows, macOS)
- ✅ Safari 14+ (macOS, iOS)
- ✅ Edge 90+ (Windows)

### Dispositivos de Prueba
- **Desktop:** 1920x1080, 1366x768, 1440x900
- **Tablet:** 768x1024 (iPad), 1024x768 (landscape)
- **Mobile:** 375x667 (iPhone SE), 414x896 (iPhone 11)

---

## 🚀 Optimización y Performance

### Métricas Objetivo (Lighthouse)

- **Performance:** 90+ 
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Técnicas Implementadas

✅ **Lazy Loading** - Imágenes cargadas bajo demanda  
✅ **Code Splitting** - JavaScript modular por componente  
✅ **CSS Minification** - Estilos comprimidos en producción  
✅ **Image Optimization** - AVIF/WebP con fallback JPG  
✅ **Caching** - Headers de cache para assets estáticos  
✅ **GZIP Compression** - Compresión de texto en servidor  
✅ **Preconnect** - DNS prefetch para APIs externas  
✅ **Async/Defer** - Carga no bloqueante de scripts

---

## 🔒 Seguridad

### Checklist de Seguridad

#### Backend
- [ ] Cambiar todas las contraseñas por defecto
- [ ] Usar contraseñas seguras (min. 16 caracteres)
- [ ] Configurar `config.php` con permisos 600
- [ ] Habilitar HTTPS con certificado SSL válido
- [ ] Configurar CORS apropiadamente
- [ ] Implementar rate limiting en API
- [ ] Validar y sanitizar todos los inputs
- [ ] Usar prepared statements (PDO)
- [ ] Mantener PHP y MySQL actualizados
- [ ] Deshabilitar `display_errors` en producción

#### Frontend
- [ ] Implementar CSP (Content Security Policy)
- [ ] Validar formularios del lado del cliente
- [ ] Escapar HTML en contenido dinámico
- [ ] No exponer API keys en código
- [ ] Usar HTTPS para todas las peticiones

#### Base de Datos
- [ ] Backups automáticos diarios
- [ ] Usuario con permisos mínimos necesarios
- [ ] No usar usuario root en aplicación
- [ ] Encriptar datos sensibles

### Ejemplo: Content Security Policy

Agregar en `<head>` de `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://www.googletagmanager.com; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               connect-src 'self' https://api.provivirpanama.com;">
```

---

## 🐛 Troubleshooting

### Problema: Propiedades no cargan

**Síntomas:** Sección de propiedades vacía o con mensaje "Cargando..."

**Soluciones:**
1. Verificar conexión a base de datos en `backend/api/config.php`
2. Revisar logs de PHP: 
   ```bash
   # XAMPP Windows
   C:\xampp\apache\logs\error.log
   
   # Linux
   tail -f /var/log/apache2/error.log
   ```
3. Probar endpoint directamente: http://localhost/provivirpanama/backend/api/properties.php
4. Verificar que existan datos en la tabla `properties`
5. Revisar consola del navegador (F12) para errores CORS

### Problema: Formulario no envía datos

**Síntomas:** Click en "Enviar" no hace nada o muestra error

**Soluciones:**
1. Verificar configuración de CORS en `leads.php`
2. Revisar consola del navegador para errores JavaScript
3. Probar endpoint con cURL:
   ```bash
   curl -X POST http://localhost/provivirpanama/backend/api/leads.php \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","phone":"6000-0000"}'
   ```
4. Verificar permisos de escritura en base de datos
5. Comprobar validaciones en `frontend/js/components/form-handler.js`

### Problema: Imágenes no se muestran

**Síntomas:** Iconos rotos o espacios vacíos

**Soluciones:**
1. Verificar rutas de archivos (case-sensitive en Linux)
2. Comprobar permisos de lectura (755 para carpetas, 644 para archivos)
3. Revisar extensiones (.jpg vs .jpeg, .png, .avif)
4. Usar DevTools (F12) → Network para ver errores 404
5. Verificar que las imágenes estén en las carpetas correctas

### Problema: Base de datos no conecta

**Síntomas:** Error "Connection failed" en logs

**Soluciones:**
1. Verificar que MySQL esté corriendo:
   ```bash
   # Windows XAMPP
   # Abrir panel de control y verificar estado
   
   # Linux
   systemctl status mysql
   ```
2. Probar conexión manual:
   ```bash
   mysql -u provivir_user -p -h localhost provivir_db
   ```
3. Verificar credenciales en `backend/api/config.php`
4. Comprobar que el usuario tenga permisos:
   ```sql
   SHOW GRANTS FOR 'provivir_user'@'localhost';
   ```

### Problema: Social feed no carga

**Síntomas:** Sección "Caught on Camera" vacía

**Soluciones:**
1. Verificar que la tabla `social_posts` exista:
   ```sql
   SHOW TABLES LIKE 'social_posts';
   ```
2. Importar SQL si falta:
   ```bash
   mysql -u root -p provivir_db < backend/database/social_posts_table.sql
   ```
3. Verificar que existan posts activos:
   ```sql
   SELECT * FROM social_posts WHERE is_active = 1;
   ```
4. Probar API: http://localhost/provivirpanama/backend/api/social-posts.php
5. Revisar consola del navegador para errores

---

## 📚 Documentación Adicional

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía completa de despliegue en producción
- **[SOCIAL-FEED-README.md](SOCIAL-FEED-README.md)** - Sistema de feed de redes sociales
- **[frontend/assets/images/LOGOS-GUIDE.md](frontend/assets/images/LOGOS-GUIDE.md)** - Guía de logos y branding

---

## 🤝 Contribuir

### Workflow de Git

```bash
# 1. Crear rama feature
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "feat: descripción del cambio"

# 3. Push a GitHub
git push origin feature/nueva-funcionalidad

# 4. Crear Pull Request en GitHub
```

### Convención de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato, espacios (no afecta código)
- `refactor:` Refactorización sin cambiar funcionalidad
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento

---

## 🏢 Información del Proyecto

### Contacto
- **Empresa:** Provivir Panamá
- **Slogan:** "Hogares para crecer, comunidades para vivir"
- **Email:** info@provivirpanama.com
- **WhatsApp:** +507 6000-0000
- **Ubicación:** Panamá Este, Panamá

### Aliados Financieros
- Banco General
- Banco Nacional de Panamá
- La Hipotecaria
- Caja de Ahorros
- Banco Mercantil

### Equipo de Asesoras
- Verónica Barboza
- Kenia Vergara
- Jacmily Figuera
- Anny Navas
- Alberto Valencia
- Alanis Gutiérrez

---

## 📄 Licencia

Copyright © 2026 Provivir Panamá. Todos los derechos reservados.

Este proyecto es propiedad de Provivir Inc. y está protegido por las leyes de derechos de autor de Panamá.

---

## 🎯 Roadmap

### v1.0 (Actual)
- ✅ Landing page completa
- ✅ Sistema de propiedades dinámico
- ✅ Formulario de leads
- ✅ Testimonios
- ✅ Feed de redes sociales manual

### v1.1 (Próximo)
- [ ] Integración automática con Instagram API
- [ ] Integración automática con TikTok API
- [ ] Panel de administración
- [ ] Sistema de notificaciones por email
- [ ] Chat en vivo

### v2.0 (Futuro)
- [ ] Portal de clientes
- [ ] Calculadora de hipoteca
- [ ] Tours virtuales 360°
- [ ] Integración con CRM
- [ ] App móvil nativa

---

**Desarrollado con 💚 para familias panameñas**
