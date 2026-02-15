# 🚀 GUÍA DE DEPLOYMENT - PROVIVIR PANAMÁ
## Subir archivos a GoDaddy (cPanel)

---

## 📦 ARCHIVOS A SUBIR

### 1️⃣ **CARPETA API** (Backend)
Subir a: `public_html/api/` o `public_html/provivirpanama.com/api/`

```
api/
├── config.php          ✅ CREADO (con tus credenciales)
├── leads.php           ✅ ACTUALIZADO (con salary y employment)
├── .htaccess          ✅ ACTUALIZADO (seguridad)
└── health.php         (opcional - para testing)
```

### 2️⃣ **CARPETA FRONTEND** (HTML, CSS, JS)
Subir a: `public_html/` o `public_html/provivirpanama.com/`

```
frontend/
├── index.html
├── robots.txt
├── sitemap.xml
├── .htaccess          ✅ ACTUALIZADO
├── assets/            (toda la carpeta)
├── css/              (toda la carpeta)
└── js/               (toda la carpeta)
```

---

## 🔧 PASO A PASO - SUBIR ARCHIVOS

### **OPCIÓN A: Usar File Manager de cPanel (Más fácil)**

1. **Login a cPanel** → Click en "Administrador de archivos" / "File Manager"

2. **Navega a tu carpeta principal:**
   - Si tu dominio apunta a una carpeta específica, ve ahí
   - Usualmente es: `public_html/` o `public_html/provivirpanama.com/`

3. **Crear carpeta API:**
   ```
   Click derecho → "New Folder" → nombre: api
   ```

4. **Subir archivos de API:**
   ```
   Entrar a carpeta "api"
   Click en "Upload"
   Arrastra estos archivos:
     - config.php
     - leads.php
     - .htaccess
   ```

5. **Subir archivos de Frontend:**
   ```
   Volver a public_html/
   Click en "Upload"
   Arrastra:
     - index.html
     - robots.txt
     - sitemap.xml
     - .htaccess
   ```

6. **Subir carpetas completas:**
   ```
   Comprimir en tu PC:
     - assets/ → assets.zip
     - css/ → css.zip
     - js/ → js.zip
   
   Subir los .zip a cPanel
   Click derecho en cada .zip → "Extract"
   Eliminar los .zip después
   ```

---

### **OPCIÓN B: Usar FTP (FileZilla)**

1. **Instalar FileZilla** (si no lo tienes)
   - Descargar: https://filezilla-project.org/

2. **Conectar a tu servidor:**
   ```
   Host: ftp.provivirpanama.com (o el que te da GoDaddy)
   Usuario: (tu usuario de cPanel)
   Contraseña: (tu contraseña de cPanel)
   Puerto: 21
   ```

3. **Abrir dos ventanas:**
   - Izquierda: `C:\Users\HP 15\provivir\frontend\`
   - Derecha: `/public_html/`

4. **Arrastrar carpetas:**
   - Carpeta `api/` → `/public_html/api/`
   - Carpeta `assets/` → `/public_html/assets/`
   - Carpeta `js/` → `/public_html/js/`
   - Carpeta `css/` → `/public_html/css/`
   - Archivos sueltos → `/public_html/`

---

## ✅ VERIFICAR QUE TODO FUNCIONE

### **Test 1: Verificar API**
Abrir en navegador:
```
https://provivirpanama.com/api/health.php
```

✅ Debería responder: `{"status":"ok"}`

### **Test 2: Verificar conexión a base de datos**
Crear archivo temporal `test-db.php`:

```php
<?php
require_once 'config.php';
try {
    $db = getDatabase();
    echo json_encode(['success' => true, 'message' => 'Database OK']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
```

Subir a: `/public_html/api/test-db.php`
Abrir: `https://provivirpanama.com/api/test-db.php`

✅ Debería responder: `{"success":true,"message":"Database OK"}`

**IMPORTANTE:** Eliminar `test-db.php` después de verificar.

### **Test 3: Verificar formulario**
1. Abrir: `https://provivirpanama.com/`
2. Scroll al formulario de contacto
3. Llenar todos los campos
4. Click en "Enviar"

✅ Debería ver mensaje: "Gracias por tu interés. Te contactaremos pronto."

### **Test 4: Verificar email**
Revisar la bandeja de entrada de: `ventas2@provivirpanama.com`

✅ Debería haber llegado un email con los datos del lead.

### **Test 5: Verificar datos en BD**
1. cPanel → phpMyAdmin
2. Base de datos: `provivir_db`
3. Tabla: `leads`
4. Click en "Browse"

✅ Debería ver el lead que acabas de enviar con todos los campos llenos.

---

## 🔐 PERMISOS DE ARCHIVOS (Importante)

En cPanel File Manager, verificar permisos:

```
config.php → 644 o 640 (NO 777)
leads.php → 644
.htaccess → 644
Carpetas → 755
```

Para cambiar permisos:
- Click derecho en archivo → "Change Permissions"
- Usar: Owner Read+Write, Group Read, World Read

---

## ⚠️ TROUBLESHOOTING

### **Error: 500 Internal Server Error**
✅ **Solución:**
- Revisar permisos de archivos (deben ser 644)
- Revisar `.htaccess` (puede tener sintaxis incorrecta)
- Ver logs en: cPanel → "Error Log"

### **Error: Database connection failed**
✅ **Solución:**
- Verificar credenciales en `config.php`
- Verificar que usuario `dev_provivir_user` tenga privilegios en `provivir_db`
- En cPanel → "Bases de datos MySQL" → Verificar vinculación

### **Error: CORS / Cross-Origin**
✅ **Solución:**
- Verificar que `.htaccess` en `/api/` tenga headers CORS
- Limpiar caché del navegador (Ctrl + Shift + R)

### **Email no llega**
✅ **Solución:**
- Verificar que `ventas2@provivirpanama.com` existe en cPanel
- Revisar carpeta SPAM
- Cambiar EMAIL_TO en `config.php` a tu email personal para testing
- PHP mail() a veces es bloqueado por GoDaddy, si no funciona avisa

---

## 📊 ESTRUCTURA FINAL EN GODADDY

```
public_html/
├── index.html
├── robots.txt
├── sitemap.xml
├── .htaccess
├── api/
│   ├── config.php      ✅ Con tus credenciales
│   ├── leads.php       ✅ Actualizado
│   └── .htaccess       ✅ CORS + Seguridad
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── css/
│   ├── main.css
│   └── components/
└── js/
    ├── main.js
    ├── api.js
    ├── config.js
    └── components/
```

---

## 🎯 SIGUIENTE PASO

**¿Qué prefieres hacer primero?**

A) Subir archivos a GoDaddy ahora (te guío paso a paso)
B) Probar todo en local primero 
C) Configurar email corporativo primero

**Yo recomiendo: OPCIÓN A** → Subir directo y probar en producción.

---

## 📞 CONTACTO DE EMERGENCIA

Si algo falla y necesitas ayuda urgente:
- Screenshot del error
- Screenshot de File Manager (estructura de carpetas)
- Logs de error (cPanel → Error Log)
