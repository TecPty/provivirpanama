# 🚀 GUÍA DE PRODUCCIÓN - PROVIVIR PANAMÁ

## ✅ CHECKLIST PRE-LANZAMIENTO

### 1. Google Analytics 4
- [ ] Crear cuenta en [Google Analytics](https://analytics.google.com)
- [ ] Obtener ID de GA4 (formato: `G-XXXXXXXXXX`)
- [ ] Reemplazar en `frontend/index.html` línea ~80 las dos instancias de `G-XXXXXXXXXX` con tu ID
- [ ] Verificar que tracking funciona: DevTools → Network → buscar "collect"

### 2. Dominio & Hosting
- [ ] Contratar hosting que soporte:
  - PHP 8.2+
  - MySQL 5.7+
  - SSH access
  - SSL (HTTPS)
- [ ] Apuntar DNS de `provivirpanama.com` a servidor
- [ ] Esperar propagación DNS (24-48 horas)

### 3. Base de Datos
- [ ] Crear base de datos `provivir_db` en hosting
- [ ] Cargar schema: `backend/database/schema.sql`
- [ ] Cargar datos: `backend/database/seed-real-data.sql`

### 4. Configuración Backend
- [ ] Actualizar `backend/api/config.php`:
  ```php
  define('ENVIRONMENT', 'production');
  // Actualizar credenciales de base de datos
  // Configurar SMTP para emails
  ```

### 5. Certificado SSL
- [ ] Generar/instalar SSL (Let's Encrypt es gratis)
- [ ] Redirigir HTTP → HTTPS en `.htaccess`

### 6. SEO
- [ ] Verificar Schema markup: [Schema.org Validator](https://validator.schema.org/)
- [ ] Enviar sitemap a Google: [Google Search Console](https://search.google.com/search-console)
- [ ] Verificar robots.txt: `https://provivirpanama.com/robots.txt`

### 7. Performance
- [ ] Ejecutar Lighthouse en producción
- [ ] Activar GZIP en servidor web
- [ ] Configurar cache HTTP headers

### 8. Testing Final
- [ ] Pruebas en navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Pruebas en móvil (iOS y Android)
- [ ] Verificar formulario de contacto envía emails
- [ ] Verificar todas las APIs funcionan

---

## 📁 ESTRUCTURA DE ARCHIVOS PARA DEPLOY

```
/home/usuario/public_html/provivirpanama.com/
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── assets/
│   ├── sitemap.xml
│   ├── robots.txt
│   └── .htaccess
├── backend/
│   ├── api/
│   │   ├── config.php (⚠️ ACTUALIZAR CREDENCIALES)
│   │   ├── leads.php
│   │   ├── properties.php
│   │   ├── testimonials.php
│   │   ├── social-posts.php
│   │   └── config.example.php
│   ├── config/
│   │   └── database.php
│   └── database/
│       ├── schema.sql
│       └── seed-real-data.sql
└── .gitignore
```

---

## 🔐 SEGURIDAD

### Archivos a proteger
- ✅ `backend/api/config.php` - NO subir a Git (incluir en .gitignore)
- ✅ `backend/database/` - Proteger con `.htaccess`
- ✅ `/logs/` - Crear directorio fuera de public_html

### .htaccess para backend
```apache
<Directory /backend/database>
    Deny from all
</Directory>

<Directory /backend/config>
    Deny from all
</Directory>

# Redirigir HTTP a HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 📧 EMAIL CONFIGURATION

Si quieres que funcionen los emails (notificaciones de leads):

1. Opción A: SMTP (recomendado)
   - Usar servicio: Mailgun, SendGrid, AWS SES
   - Actualizar `backend/api/config.php` con credenciales SMTP

2. Opción B: PHP Mail (si hosting lo permite)
   - Asegurar que `php.ini` tiene `sendmail` configurado
   - Funciona automáticamente si hosting lo activa

---

## 🚀 DEPLOY CON GIT

```bash
# En servidor
cd /home/usuario/public_html
git clone https://github.com/tuusuario/provivir-panama.git provivirpanama.com
cd provivirpanama.com

# Crear config.php (copia segura)
cp backend/api/config.example.php backend/api/config.php
# EDITAR con credenciales reales

# Permisos
chmod 755 backend/api
chmod 644 backend/api/*.php

# Base de datos
mysql -u root -p provivir_db < backend/database/schema.sql
mysql -u root -p provivir_db < backend/database/seed-real-data.sql
```

---

## 📊 MONITOREO POST-LANZAMIENTO

- [ ] Google Analytics configurado y tracking datos
- [ ] Google Search Console indexando páginas
- [ ] Verificar logs de errores regularmente
- [ ] Responder leads en menos de 2 horas
- [ ] Hacer backup diario de base de datos

---

## 💬 PRÓXIMAS MEJORAS

- [ ] Admin panel para actualizar proyectos sin código
- [ ] Chat en vivo (Intercom, Drift)
- [ ] Email automático confirmando lead
- [ ] Integración con CRM (Pipedrive, HubSpot)
- [ ] Publicidad Google Ads/Facebook Ads

---

**Última actualización**: 13 Enero 2026
**Estado**: Listo para producción ✅
