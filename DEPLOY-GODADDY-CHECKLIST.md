# ✅ Checklist Deploy GoDaddy - Provivir Panamá
**Fecha:** 9 de Marzo, 2026  
**Desarrollador:** Jorge Luis Risso Patrón  
**Versión:** 2.0 (Optimizaciones de velocidad)

---

## 📋 PRE-DEPLOY

- [x] ✅ Commit realizado: `6008b68`
- [x] ✅ Optimizaciones implementadas (FCP -47%, LCP -32%)
- [x] ✅ Documentación completa
- [ ] 🔄 Push a repositorio remoto
- [ ] 🔄 Backup del sitio actual descargado

---

## 🚀 PASO 1: ACCESO A CPANEL

### Instrucciones:
1. Abre navegador (Chrome/Edge recomendado)
2. Ve a: **https://sso.godaddy.com**
3. Login con credenciales de GoDaddy:
   - Email: [tu email asociado a GoDaddy]
   - Password: [tu contraseña]
4. En el dashboard, busca "**Web Hosting**" o "**cPanel**"
5. Click en "**Manage**" junto a provivirpanama.com
6. Click en "**cPanel Admin**" (botón verde/azul)

**✅ Verificación:** Deberías ver el panel de cPanel con múltiples iconos

---

## 🔄 PASO 2: BACKUP DEL SITIO ACTUAL

### ⚠️ CRÍTICO - NO OMITIR

1. En cPanel, busca el icono "**File Manager**"
2. Click en "File Manager" → se abrirá en nueva pestaña
3. En el panel izquierdo, navega a: **`/public_html/`**
4. Selecciona TODOS los archivos actuales:
   - Click en la primera casilla para seleccionar todo
   - O presiona: `Ctrl+A` (Windows) / `Cmd+A` (Mac)
5. Click derecho → "**Compress**"
6. Opciones:
   - Tipo de archivo: **ZIP** (recomendado)
   - Nombre: `backup-provivir-2026-03-09.zip`
   - Ubicación: `/public_html/`
7. Click "**Compress File(s)**" → esperar
8. Una vez creado, selecciona `backup-provivir-2026-03-09.zip`
9. Click en "**Download**" → guardar en tu computadora
10. Verifica que el archivo .zip se descargó correctamente

**✅ Verificación:** Deberías tener `backup-provivir-2026-03-09.zip` en tu carpeta de Descargas (~10-15 MB)

**✅ Checklist:**
- [ ] Backup creado en servidor
- [ ] Backup descargado a mi computadora
- [ ] Archivo .zip se puede abrir sin errores

---

## 📤 PASO 3: SUBIR ARCHIVOS OPTIMIZADOS

### 3.1 Preparar archivos locales

**En tu computadora:**
```powershell
# 1. Navega al directorio del proyecto
cd "C:\Users\HP 15\provivir"

# 2. Verifica que estás en la carpeta correcta
Get-Location

# 3. Abre el explorador de Windows en la carpeta frontend
explorer frontend
```

**✅ Verificación:** Se abrió el explorador en `C:\Users\HP 15\provivir\frontend`

### 3.2 Subir archivos HTML principal

**En File Manager de cPanel:**
1. Asegúrate de estar en `/public_html/`
2. Localiza el archivo `index.html` actual
3. Click derecho en `index.html` → "**Delete**" (confirmamos porque tenemos backup)
4. Click en botón "**Upload**" (esquina superior derecha)
5. Se abrirá ventana de upload
6. **Arrastra** o **selecciona** desde tu computadora:
   ```
   C:\Users\HP 15\provivir\frontend\index.html
   ```
7. Espera la barra de progreso (100%)
8. Click en "**Go Back**" para volver a File Manager

**✅ Verificación:** 
- [ ] `index.html` nuevo aparece en `/public_html/`
- [ ] Tamaño ~25-30 KB (verificar que es la versión optimizada)

### 3.3 Subir .htaccess (CRÍTICO)

**⚠️ MUY IMPORTANTE - Este archivo tiene todas las optimizaciones de cache**

1. En `/public_html/`, busca archivo `.htaccess` (puede estar oculto)
2. Si existe `.htaccess` actual:
   - Click derecho → "**Rename**"
   - Renombrar a: `.htaccess.old`
3. Click en "**Upload**"
4. Selecciona desde tu computadora:
   ```
   C:\Users\HP 15\provivir\frontend\.htaccess
   ```
5. Espera que suba (100%)
6. Click "Go Back"

**✅ Verificación:**
- [ ] `.htaccess` nuevo está en `/public_html/`
- [ ] `.htaccess.old` existe como backup
- [ ] Tamaño del nuevo .htaccess ~3-4 KB

### 3.4 Subir carpeta CSS

1. En File Manager, ve a `/public_html/`
2. Si existe carpeta `css/` antigua:
   - Click derecho → "**Rename**"
   - Renombrar a: `css.old`
3. Click en "**Upload**"
4. Selecciona **TODA la carpeta `css/`** desde:
   ```
   C:\Users\HP 15\provivir\frontend\css\
   ```
   - Arrastra toda la carpeta al área de upload
   - O selecciona todos los archivos CSS (~21 archivos)
5. Espera que todos suban (puede tardar 1-2 minutos)

**Archivos CSS a verificar:**
```
css/
├── 01-custom-properties.css
├── 02-global.css
├── 03-animations.css
├── 04-utilities.css
├── components/
│   ├── button.css
│   ├── financing.css
│   ├── footer.css
│   ├── hero.css
│   ├── mission.css
│   ├── navbar.css
│   ├── projects.css
│   ├── stats-bar.css
│   └── team.css
└── main.css
```

**✅ Verificación:**
- [ ] Carpeta `css/` recreada en `/public_html/css/`
- [ ] ~21 archivos CSS dentro
- [ ] Tamaño total ~117 KB

### 3.5 Subir carpeta JS

1. En `/public_html/`, renombra carpeta `js/` a `js.old` (si existe)
2. Click "Upload"
3. Selecciona todos los archivos desde:
   ```
   C:\Users\HP 15\provivir\frontend\js\
   ```
4. Espera que suban (~19 archivos)

**Archivos JS principales:**
```
js/
├── components/
│   ├── form-validation.js
│   ├── navbar.js
│   ├── team-carousel.js
│   └── ...
├── utils/
│   └── ...
└── main.js
```

**✅ Verificación:**
- [ ] Carpeta `js/` en `/public_html/js/`
- [ ] ~19 archivos JavaScript
- [ ] Tamaño total ~126 KB

### 3.6 Subir carpeta Assets (IMPORTANTE - 9.72 MB)

**⚠️ Esta es la carpeta más pesada, puede tardar 5-10 minutos**

1. En `/public_html/`, renombra `assets/` a `assets.old`
2. Click "Upload"
3. Arrastra carpeta completa:
   ```
   C:\Users\HP 15\provivir\frontend\assets\
   ```
4. Espera pacientemente (45 archivos de imágenes, ~9.72 MB)
5. Monitorea la barra de progreso

**Estructura assets:**
```
assets/
├── images/
│   ├── properties/ (imágenes principales)
│   ├── team/ (fotos asesores)
│   ├── logo-provivir.png
│   └── ... (45 archivos totales)
└── animations/
    └── construction.json (Lottie)
```

**✅ Verificación:**
- [ ] Carpeta `assets/` en `/public_html/assets/`
- [ ] ~45 archivos de imágenes
- [ ] Tamaño total ~9.72 MB
- [ ] Subcarpetas: `images/properties/`, `images/team/`

### 3.7 Subir carpeta Legal

1. En `/public_html/`, sube carpeta:
   ```
   C:\Users\HP 15\provivir\frontend\legal\
   ```

**Archivos:**
```
legal/
├── aviso-legal.html
├── politica-privacidad.html
└── terminos-condiciones.html
```

**✅ Verificación:**
- [ ] Carpeta `legal/` con 3 archivos HTML

### 3.8 Subir robots.txt y sitemap.xml

1. Sube individualmente:
   ```
   C:\Users\HP 15\provivir\frontend\robots.txt
   C:\Users\HP 15\provivir\frontend\sitemap.xml
   ```

**✅ Verificación:**
- [ ] `robots.txt` en `/public_html/`
- [ ] `sitemap.xml` en `/public_html/`

---

## 🧹 PASO 4: LIMPIEZA (OPCIONAL)

**Puedes eliminar carpetas antiguas para liberar espacio:**

1. En File Manager, selecciona:
   - `css.old/`
   - `js.old/`
   - `assets.old/`
2. Click derecho → "**Delete**"
3. Confirmar eliminación

**⚠️ MANTENER:** `backup-provivir-2026-03-09.zip` (no eliminar)

---

## 🔍 PASO 5: VERIFICACIÓN POST-DEPLOY

### 5.1 Verificar estructura de archivos

**En File Manager, verifica que `/public_html/` tiene:**

```
/public_html/
├── .htaccess                     ✅ 3-4 KB
├── index.html                    ✅ 25-30 KB
├── robots.txt                    ✅ <1 KB
├── sitemap.xml                   ✅ 2-3 KB
├── backup-provivir-2026-03-09.zip ✅ ~10-15 MB (backup)
├── assets/                       ✅ ~9.72 MB (45 archivos)
├── css/                          ✅ ~117 KB (21 archivos)
├── js/                           ✅ ~126 KB (19 archivos)
├── legal/                        ✅ 3 archivos HTML
└── api/                          ✅ (si existe, no tocar)
```

**✅ Checklist estructura:**
- [ ] .htaccess presente
- [ ] index.html actualizado
- [ ] Carpeta assets/ completa
- [ ] Carpeta css/ completa
- [ ] Carpeta js/ completa
- [ ] Carpeta legal/ presente
- [ ] robots.txt y sitemap.xml

### 5.2 Verificar permisos de archivos

**Permisos recomendados:**
- Archivos: `644` (rw-r--r--)
- Carpetas: `755` (rwxr-xr-x)
- .htaccess: `644`

**Cómo cambiar permisos:**
1. Selecciona archivo/carpeta
2. Click derecho → "**Change Permissions**"
3. Ajusta:
   - Archivos: 644 (Owner: Read+Write, Group: Read, World: Read)
   - Carpetas: 755 (Owner: Read+Write+Execute, Group: Read+Execute, World: Read+Execute)

**✅ Checklist permisos:**
- [ ] .htaccess = 644
- [ ] index.html = 644
- [ ] Carpetas (css, js, assets, legal) = 755
- [ ] Archivos CSS/JS = 644
- [ ] Imágenes = 644

### 5.3 Verificar .htaccess está activo

**En cPanel:**
1. Ve a "**Software**" section
2. Click en "**MultiPHP INI Editor**" o "**Apache Handlers**"
3. Verifica que Apache está usando .htaccess

**O verifica en File Manager:**
1. Abre `.htaccess`
2. Confirma que contiene las líneas:
   ```apache
   # Enable Gzip compression
   <IfModule mod_deflate.c>
   
   # Browser Caching
   <IfModule mod_expires.c>
   
   # Cache-Control Headers
   <IfModule mod_headers.c>
   ```

**✅ Verificación:** .htaccess tiene optimizaciones de cache y Gzip

---

## 🌐 PASO 6: PRUEBAS EN PRODUCCIÓN

### 6.1 Probar sitio web

**Abre en navegador de incógnito:**
```
https://provivirpanama.com
```

**✅ Checklist visual:**
- [ ] Página carga correctamente
- [ ] Logo Provivir visible
- [ ] Video hero se reproduce (o poster visible)
- [ ] Sección de 2 proyectos (Villas del Este, Ciudad del Este)
- [ ] 6 asesores visibles en cuadrícula
- [ ] Formulario de contacto funcional
- [ ] Footer con información completa
- [ ] No hay errores en la consola (F12)

### 6.2 Probar formulario de leads

1. Scroll al formulario de contacto
2. Completa con datos de prueba:
   ```
   Nombre: Test Deploy
   Email: test@example.com
   Teléfono: +507 6000 0000
   Proyecto: Villas del Este
   Presupuesto: $150,000 - $200,000
   Mensaje: Prueba post-deploy optimizaciones
   ```
3. Click "Enviar Consulta"
4. Verificar mensaje de éxito

**✅ Verificación:**
- [ ] Formulario envía correctamente
- [ ] Mensaje de confirmación aparece
- [ ] Lead guardado en base de datos (verificar en phpMyAdmin)

### 6.3 Probar responsive (mobile)

**Abre DevTools (F12):**
1. Click en icono de teléfono (responsive mode)
2. Selecciona dispositivos:
   - iPhone 12 Pro (390x844)
   - Samsung Galaxy S20 (360x800)
   - iPad (768x1024)

**✅ Checklist responsive:**
- [ ] Menú hamburguesa funciona
- [ ] Imágenes se adaptan
- [ ] Texto legible
- [ ] Botones accesibles
- [ ] Formulario usable en mobile

### 6.4 Verificar velocidad del sitio

**Herramientas online:**

1. **Google PageSpeed Insights:**
   ```
   https://pagespeed.web.dev/
   ```
   - Pegar: https://provivirpanama.com
   - Click "Analyze"
   - Esperar resultados

   **Métricas esperadas:**
   - Mobile: 85-92/100
   - Desktop: 95-98/100
   - FCP: ~0.8s
   - LCP: ~1.9s

2. **GTmetrix:**
   ```
   https://gtmetrix.com/
   ```
   - Analizar URL
   - Verificar grado A o B

**✅ Verificación performance:**
- [ ] Lighthouse Mobile > 85
- [ ] Lighthouse Desktop > 95
- [ ] FCP < 1.0s
- [ ] LCP < 2.5s
- [ ] Cache headers activos (verificar en Network tab)

### 6.5 Verificar cache headers

**En Chrome/Edge DevTools:**
1. Abre sitio: https://provivirpanama.com
2. Presiona F12 → pestaña "**Network**"
3. Refresca página (Ctrl+R)
4. Click en cualquier archivo CSS/JS/imagen
5. Ve a tab "**Headers**"
6. Busca "**Response Headers**"
7. Verifica:
   ```
   Cache-Control: public, max-age=31536000, immutable
   Content-Encoding: gzip
   ```

**Archivos a verificar:**
- `main.css` → Cache-Control: 1 año
- `main.js` → Cache-Control: 1 año
- Imágenes .webp → Cache-Control: 1 año
- `index.html` → Cache-Control: no-cache

**✅ Verificación cache:**
- [ ] CSS tiene max-age=31536000
- [ ] JS tiene max-age=31536000
- [ ] Imágenes tienen max-age=31536000
- [ ] Gzip activo (Content-Encoding: gzip)

---

## 🔐 PASO 7: VERIFICAR BASE DE DATOS

### En cPanel:

1. Busca "**phpMyAdmin**"
2. Click para abrir
3. Selecciona base de datos: `provivir_panama` (o nombre actual)
4. Click en tabla: `leads`
5. Verifica que el lead de prueba está guardado

**✅ Verificación:**
- [ ] Base de datos accesible
- [ ] Tabla `leads` existe
- [ ] Lead de prueba insertado con timestamp actual
- [ ] Tabla `properties` tiene 2 proyectos
- [ ] Tabla `testimonials` tiene datos

---

## 📊 PASO 8: MONITOREO POST-DEPLOY

### Inmediato (Primeros 15 minutos):

- [ ] SSL activo (https:// funciona sin warnings)
- [ ] Sitio carga en < 2 segundos
- [ ] No hay errores 404 en consola
- [ ] Todas las imágenes cargan
- [ ] Video hero funciona
- [ ] Formulario envía correctamente

### Primera hora:

- [ ] Probar desde diferentes dispositivos (móvil, tablet, desktop)
- [ ] Probar desde diferentes navegadores (Chrome, Safari, Firefox, Edge)
- [ ] Verificar Google Analytics recibe tráfico (si está configurado)
- [ ] Pedir a 2-3 personas que prueben el sitio

### Primer día:

- [ ] Revisar logs de errores en cPanel
- [ ] Verificar que leads están llegando
- [ ] Monitorear uptime (sitio no se cayó)
- [ ] Run Lighthouse audit nuevamente

### Primera semana:

- [ ] Analizar métricas de velocidad en Google Search Console
- [ ] Verificar indexación en Google
- [ ] Revisar Core Web Vitals
- [ ] Backup semanal (repetir PASO 2)

---

## 🚨 ROLLBACK (Si algo sale mal)

### Si el sitio tiene problemas después del deploy:

1. **Accede a File Manager**
2. Ve a `/public_html/`
3. Elimina archivos nuevos problemáticos
4. Extrae el backup:
   - Selecciona `backup-provivir-2026-03-09.zip`
   - Click derecho → "**Extract**"
   - Destino: `/public_html/`
   - Sobrescribir: **Sí**
5. Click "Extract Files"
6. Refresca sitio: https://provivirpanama.com

**✅ Sitio restaurado a versión anterior**

---

## 📝 PASO 9: DOCUMENTAR DEPLOY

Llenar esta información:

**Deploy realizado:**
- [  ] Fecha: ___________
- [  ] Hora inicio: ___________
- [  ] Hora fin: ___________
- [  ] Duración total: ___________ minutos

**Resultados Lighthouse:**
- [  ] Mobile Score: _____ / 100
- [  ] Desktop Score: _____ / 100
- [  ] FCP: _____ s
- [  ] LCP: _____ s

**Issues encontrados:**
- [  ] Ninguno ✅
- [  ] Problemas: _______________________________

**Notas adicionales:**
_____________________________________________
_____________________________________________

---

## 🎯 PASO 10: PUSH A REPOSITORIO

**Después de confirmar que todo funciona:**

```powershell
# En tu terminal local
cd "C:\Users\HP 15\provivir"

# Push del commit de optimizaciones
git push origin main

# Verificar
git log --oneline -1
```

**✅ Verificación:**
- [ ] Commit `6008b68` pusheado a GitHub
- [ ] Repositorio actualizado con optimizaciones

---

## ✅ CHECKLIST FINAL

### Archivos subidos:
- [ ] index.html
- [ ] .htaccess (CRÍTICO)
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] Carpeta css/ completa (~21 archivos)
- [ ] Carpeta js/ completa (~19 archivos)
- [ ] Carpeta assets/ completa (~45 archivos, 9.72 MB)
- [ ] Carpeta legal/ completa (3 archivos)

### Verificaciones técnicas:
- [ ] Cache headers activos (max-age=31536000)
- [ ] Gzip compression activo
- [ ] SSL funcionando (https://)
- [ ] Base de datos conectada
- [ ] Formulario de leads funcional
- [ ] Lighthouse Mobile > 85
- [ ] Lighthouse Desktop > 95

### Pruebas funcionales:
- [ ] Sitio carga correctamente
- [ ] Responsive en mobile/tablet/desktop
- [ ] Video hero funciona
- [ ] 6 asesores visibles
- [ ] 2 proyectos visibles
- [ ] Formulario envía y guarda en BD
- [ ] Links del footer funcionan

### Post-Deploy:
- [ ] Backup descargado y guardado
- [ ] Lighthouse audit realizado
- [ ] Monitoreo configurado
- [ ] Commit pusheado a GitHub
- [ ] Cliente notificado
- [ ] Documento de entrega enviado

---

## 📞 SOPORTE

Si encuentras algún problema durante el deploy:

**Jorge Luis Risso Patrón**
- Email: luisrissopa@gmail.com
- WhatsApp: +507 6456 0263
- Horario: Lun-Vie, 9 AM - 6 PM (GMT-5)

---

## 🎉 ¡DEPLOY COMPLETADO!

Una vez todos los checks están marcados, el sitio está en producción con todas las optimizaciones de velocidad.

**Próximos pasos:**
1. Monitorear métricas durante la primera semana
2. Configurar Google Analytics 4 (si aún no está)
3. Configurar Facebook/TikTok Pixels
4. Enviar sitemap a Google Search Console
5. Planificar siguientes optimizaciones (comprimir imágenes manualmente)

---

**Versión del documento:** 1.0  
**Última actualización:** 9 de Marzo, 2026  
**Desarrollador:** Jorge Luis Risso Patrón
