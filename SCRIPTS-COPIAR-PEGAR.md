# 🛠️ SCRIPTS ÚTILES - COPIAR/PEGAR

Copiar y pegar directamente en terminal o archivos.

---

## 1. SQL - CREAR TABLA LEADS

```sql
-- Copiar TODO y pegar en MySQL prompt
CREATE TABLE IF NOT EXISTS leads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT,
  property_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at),
  INDEX idx_property (property_id)
);

-- Verificar tabla creada
DESCRIBE leads;

-- Ver leads guardados
SELECT * FROM leads ORDER BY created_at DESC;

-- Contar leads por propiedad
SELECT property_id, COUNT(*) as total FROM leads GROUP BY property_id;

-- Limpiar tabla (solo para testing)
-- DELETE FROM leads WHERE created_at < DATE_SUB(NOW(), INTERVAL 7 DAY);
```

---

## 2. BASH - INSTALAR DEPENDENCIAS

```bash
# Copiar y pegar en terminal
npm install
npm install express-validator helmet express-rate-limit csurf cookie-parser
```

---

## 3. JAVASCRIPT - TEST CONEXIÓN DB

**Crear archivo:** `test-db.js` en raíz del proyecto

```javascript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  console.log('Testing MySQL connection...');
  console.log('Host:', process.env.DB_HOST);
  console.log('User:', process.env.DB_USER);
  console.log('Database:', process.env.DB_NAME);
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
    
    console.log('✅ Conexión a MySQL exitosa\n');
    
    // Test query
    const [results] = await connection.query('SELECT COUNT(*) as leads_count FROM leads');
    console.log('✅ Query exitosa');
    console.log(`📊 Leads en base de datos: ${results[0].leads_count}`);
    
    // Ver últimos leads
    const [latest] = await connection.query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 3');
    console.log('\n📋 Últimos 3 leads:');
    console.table(latest);
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Detalles:', error);
    process.exit(1);
  }
}

testConnection();
```

**Ejecutar:**
```bash
node test-db.js
```

---

## 4. JAVASCRIPT - VALIDADOR DE EMAIL (frontend)

Copiar en `frontend/js/utils/validators.js`:

```javascript
/**
 * Email validation regex (RFC 5322 simplificado)
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone validation (Panamá +507-XXXX-XXXX)
 */
export const isValidPhone = (phone) => {
  // Acepta: +507-XXXX-XXXX, +507XXXXXXXX, 6371-2652, etc
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone);
};

/**
 * Sanitize HTML (XSS prevention)
 */
export const sanitizeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Test todas las validaciones
 */
if (typeof window !== 'undefined') {
  console.log('📋 Validadores disponibles:');
  console.log('- isValidEmail(email)');
  console.log('- isValidPhone(phone)');
  console.log('- sanitizeHTML(string)');
}
```

---

## 5. BASH - CONVERTIR IMÁGENES PNG A WEBP

### Opción A: ImageMagick (recomendado)
```bash
# Instalar (Windows: descargar desde imagemagick.org)
# Ubuntu/Mac: brew install imagemagick

# Convertir una imagen
convert properties/villas.png -quality 85 properties/villas.webp

# Convertir todas en carpeta
for file in frontend/assets/images/properties/*.png; do
  convert "$file" -quality 85 "${file%.png}.webp"
done

# Verificar tamaño
ls -lh frontend/assets/images/properties/ | grep -E "(png|webp)"
```

### Opción B: Online Squoosh
1. Abrir https://squoosh.app
2. Drag & drop imagen PNG
3. Select WebP format
4. Quality: 85
5. Download

### Opción C: Node.js script
```bash
npm install -D imagemin imagemin-webp

# Crear script: image-optimization.js
```

```javascript
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

(async () => {
  const files = await imagemin(['frontend/assets/images/**/*.png'], {
    destination: 'frontend/assets/images',
    plugins: [
      imageminWebp({ quality: 85 })
    ]
  });

  console.log('Optimized files:', files);
})();
```

```bash
node image-optimization.js
```

---

## 6. BASH - COMPRIMIR VIDEO

### Usando FFmpeg
```bash
# Instalación
# Windows: https://ffmpeg.org/download.html
# Mac: brew install ffmpeg
# Ubuntu: sudo apt-get install ffmpeg

# Comprimir video principal
ffmpeg -i frontend/assets/images/hero/hero-video-desktop.mp4 \
  -vcodec libx264 \
  -crf 23 \
  -preset slow \
  -acodec aac \
  -b:a 128k \
  frontend/assets/images/hero/hero-video-compressed.mp4

# Versión mobile (720p)
ffmpeg -i frontend/assets/images/hero/hero-video-desktop.mp4 \
  -vf scale=1280:720 \
  -vcodec libx264 \
  -crf 25 \
  -preset medium \
  frontend/assets/images/hero/hero-video-mobile.mp4

# Extraer poster (primer frame)
ffmpeg -i frontend/assets/images/hero/hero-video-desktop.mp4 \
  -ss 00:00:00 \
  -vframes 1 \
  frontend/assets/images/hero/hero-poster.jpg

# Verificar tamaños
ls -lh frontend/assets/images/hero/ | grep video
```

---

## 7. BASH - MINIFICAR CSS/JS

### Con uglify-js y cssnano
```bash
npm install -D uglify-js cssnano

# Minificar JS
npx uglifyjs frontend/js/main.js -o frontend/js/main.min.js

# Minificar CSS (más complejo, mejor usar herramienta online)
# https://cssnano.co/
```

### Script package.json (agregar en "scripts")
```json
{
  "scripts": {
    "build": "npm run minify:js && npm run minify:css",
    "minify:js": "uglifyjs frontend/js/*.js -o dist/bundle.min.js",
    "minify:css": "cleancss frontend/css/main.css -o dist/main.min.css"
  }
}
```

```bash
npm run build
```

---

## 8. JAVASCRIPT - VERIFICAR CONSOLE LOGS

```javascript
// Ejecutar en DevTools Console

// Encontrar todos los console.log
console.log('Searching for console.logs in source...');

// Método 1: Buscar en archivos
fetch('/frontend/js/main.js')
  .then(r => r.text())
  .then(text => {
    const matches = text.match(/console\.(log|error|warn|info)/g);
    console.log('Console calls found:', matches ? matches.length : 0);
  });

// Método 2: Checkeo en tiempo real
window.addEventListener('load', () => {
  const originalLog = console.log;
  console.log = function(...args) {
    console.warn('⚠️ Console.log detectado:', args);
    originalLog.apply(console, args);
  };
});
```

---

## 9. HTML - ACTUALIZAR ANALYTICS ID

**Buscar en `index.html` (línea 88):**
```html
<!-- ANTES -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  gtag('config', 'G-XXXXXXXXXX', {
```

**Reemplazar con tu ID (ej: G-ABC123DEF):**
```html
<!-- DESPUÉS -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF"></script>
<script>
  gtag('config', 'G-ABC123DEF', {
```

---

## 10. GIT - COMMITS ÚTILES

```bash
# Lunes: Formulario
git add -A
git commit -m "🔴 CRÍTICO: Implementar API /api/leads + validación backend"

# Martes: Optimización
git add -A
git commit -m "🚀 Martes: Optimizar imágenes a WebP + comprimir video hero"

# Miércoles: SEO
git add -A
git commit -m "📊 Miércoles: SEO completo + Google Analytics + mobile responsive"

# Jueves: Seguridad
git add -A
git commit -m "🔒 Jueves: Helmet.js + Rate Limiting + CSRF + Accesibilidad"

# Viernes: Deploy
git add -A
git commit -m "🚀 Viernes: Testing final + Deploy a Producción"
git push origin main
```

---

## 11. VERCEL - VARIABLES DE ENTORNO

**Dashboard de Vercel → Project Settings → Environment Variables**

Agregar:
```
DB_HOST = [tu-host.com]
DB_USER = [tu-usuario]
DB_PASS = [tu-contraseña]
DB_NAME = provivir_db
NODE_ENV = production
CORS_ORIGIN = https://provivirpanama.com
```

---

## 12. BASH - LIGHTHOUSE AUDIT

```bash
# Instalar Lighthouse CLI
npm install -g lighthouse

# Ejecutar audit en local
lighthouse http://localhost:3000 \
  --output html \
  --output-path ./lighthouse-report.html

# Ver report
open ./lighthouse-report.html  # Mac
start ./lighthouse-report.html # Windows
xdg-open ./lighthouse-report.html # Linux
```

---

## 13. BASH - MONITOREAR LOGS

```bash
# Seguir logs de Vercel en tiempo real
vercel logs

# O
npm install -g vercel
vercel logs --follow

# Ver últimos errores
vercel logs --tail
```

---

## 14. MYSQL - BACKUP DE DATOS

```bash
# Backup completo
mysqldump -h [HOST] -u [USER] -p [DB_NAME] > backup-$(date +%Y%m%d).sql

# Restaurar desde backup
mysql -h [HOST] -u [USER] -p [DB_NAME] < backup-20260203.sql

# Exportar leads a CSV
mysql -h [HOST] -u [USER] -p [DB_NAME] \
  -e "SELECT * FROM leads" \
  --header \
  --quick > leads-export.csv
```

---

## 15. JAVASCRIPT - GOOGLE ANALYTICS TRACKING

Para agregar tracking manual de eventos en formulario:

```javascript
// En form-handler.js después de éxito
if (typeof gtag !== 'undefined') {
  gtag('event', 'lead_submission', {
    'event_category': 'engagement',
    'event_label': 'contact_form_submit',
    'value': propertyId,
    'lead_email': email // CUIDADO: datos sensibles, usar con cautela
  });
  
  gtag('event', 'conversion', {
    'event_category': 'lead',
    'conversion_id': leadId
  });
}
```

---

**Lista completa de scripts listos para usar. ¡Copiar y pegar según necesites!**
