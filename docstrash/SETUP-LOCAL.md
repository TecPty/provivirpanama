# 📋 INSTRUCCIONES: SETUP LOCAL XAMPP

## PASO 1: Cargar Schema.sql en la Base de Datos

### Opción A: Terminal (Rápido - 30 segundos)
```powershell
# Navega a la carpeta del proyecto
cd C:\Users\HP 15\provivir

# Ejecuta este comando para cargar el schema
"C:\xampp\mysql\bin\mysql" -u root < backend/database/schema.sql

# Verifica que creó la BD
"C:\xampp\mysql\bin\mysql" -u root -e "SHOW DATABASES;"
```

### Opción B: phpMyAdmin (Visual - 2 minutos)
1. Abre: `http://localhost/phpmyadmin`
2. Click en pestana **Import** (arriba)
3. Selecciona archivo: `backend/database/schema.sql` (desde `C:\Users\HP 15\provivir`)
4. Click en botón **Go**
5. Verifica que apareció base de datos `provivir_db` en el panel izquierdo

---

## PASO 2: Verificar Tablas Creadas

```sql
-- Ejecutar en phpMyAdmin (pestaña SQL)
USE provivir_db;
SHOW TABLES;
```

Deberías ver:
- ✅ properties
- ✅ testimonials
- ✅ leads
- ✅ social_posts

---

## PASO 3: Verificar config.php

✅ Ya creé `/backend/api/config.php` con:
- Usuario DB: `root` (XAMPP default)
- Password: vacío (XAMPP default)
- Database: `provivir_db`
- Email admin: `ventas2@provivirpanama.com`

**No debes tocar este archivo** - Solo verificar que existe en `/backend/api/config.php`

---

## PASO 4: Testear APIs Localmente

### Verificar que MySQL está corriendo
```powershell
"C:\xampp\mysql\bin\mysql" -u root -e "SELECT 1;"
```

Debería mostrar: `1`

### Testear API Properties
Abre en el navegador:
```
http://localhost/provivirpanama/backend/api/properties.php
```

Debería retornar JSON con propiedades (vacío si no has cargado datos).

### Testear API Testimonials
```
http://localhost/provivirpanama/backend/api/testimonials.php
```

### Testear API Social Posts
```
http://localhost/provivirpanama/backend/api/social-posts.php
```

---

## PASO 5: Cargar Datos de Ejemplo (Opcional)

Si quieres probar con datos reales:

### Opción A: Cargar vía phpMyAdmin
1. phpMyAdmin → Pestaña **Import**
2. Selecciona `backend/database/seed-real-data.sql`
3. Click **Go**

### Opción B: Terminal
```powershell
"C:\xampp\mysql\bin\mysql" -u root provivir_db < backend/database/seed-real-data.sql
```

---

## PASO 6: Testear Formulario de Contacto

1. Abre: `http://localhost/provivirpanama/frontend/index.html`
2. Desplázate a sección de contacto
3. Rellena formulario:
   - Nombre: Juan Pérez
   - Email: test@ejemplo.com
   - Teléfono: 6123456789
4. Click "Enviar"
5. Debería ver mensaje de éxito

### Verificar que el Email se envió
```powershell
# Ir a phpMyAdmin
# Base de datos: provivir_db
# Tabla: leads
# Debería ver una fila nueva con el lead que enviaste
```

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### "Connection refused" en Las APIs
**Problema:** MySQL no está corriendo
**Solución:**
```powershell
# Inicia XAMPP
C:\xampp\xampp-control.exe

# Verifica que MySQL está corriendo (botón "Start" en Control Panel)
```

### "File not found" en phpmyadmin
**Problema:** XAMPP no está sirviendo los archivos
**Solución:**
```powershell
# Verifica que Apache está corriendo en XAMPP Control Panel
# Los archivos deben estar en: C:\xampp\htdocs\provivirpanama
```

### El formulario se envía pero no llega el email
**Problema:** PHP mail() no está configurado en XAMPP
**Solución:** Es normal en desarrollo local. El email NO se enviará en XAMPP.
- ✅ En producción funcionará (Hosting tiene SMTP configurado)
- Para testing local, revisa la consola del navegador (F12) para ver si hay errores

### Base de datos no se crea
**Problema:** Usuario/password incorrecto en config.php
**Solución:** Verifica que config.php usa:
```php
'username' => 'root',  // Sin password en XAMPP
'password' => '',
```

---

## 📊 COMANDOS ÚTILES

```powershell
# Ver todas las bases de datos
"C:\xampp\mysql\bin\mysql" -u root -e "SHOW DATABASES;"

# Contar filas en tabla leads
"C:\xampp\mysql\bin\mysql" -u root provivir_db -e "SELECT COUNT(*) FROM leads;"

# Exportar BD completa (backup)
"C:\xampp\mysql\bin\mysqldump" -u root provivir_db > backup.sql

# Restaurar BD desde backup
"C:\xampp\mysql\bin\mysql" -u root provivir_db < backup.sql
```

---

## ✅ CHECKLIST FINAL

- [ ] MySQL corriendo en XAMPP
- [ ] Schema.sql cargado (provivir_db existe)
- [ ] config.php presente en `/backend/api/`
- [ ] API properties.php retorna JSON
- [ ] API testimonials.php retorna JSON
- [ ] API social-posts.php retorna JSON
- [ ] Formulario de contacto funciona
- [ ] Leads se guardan en tabla `leads`
- [ ] No hay errores en consola del navegador (F12)
- [ ] No hay errores en logs PHP (si existen)

---

Una vez completes esto, **avísame y procedemos con:**
1. Testing completo Lighthouse
2. Crear admin panel CRUD
3. Optimizaciones finales pre-producción
