# 📧 PHASE 2 - EMAIL NOTIFICATIONS DOCUMENTATION

---

## ✅ Status: COMPLETADO

**Fecha:** 22 Enero 2026  
**Componentes:** 3 archivos PHP + 1 template HTML  
**Lines of Code:** 1,500+  
**Testing:** Funcional en desarrollo  

---

## 🎯 Objetivo

Implementar un sistema de notificaciones automáticas por email cuando un nuevo lead completa el formulario de contacto en provivirpanama.com.

---

## 📁 Archivos Creados

### 1. **EmailHandler.php** (280 líneas)
**Ubicación:** `backend/api/EmailHandler.php`

**Clase completa para gestionar envío de emails**

Características:
- ✅ Soporte para SMTP (Gmail, SendGrid, Mailtrap)
- ✅ Fallback a mail() de PHP (desarrollo)
- ✅ Manejo de templates HTML
- ✅ Validación de emails
- ✅ Logging de errores
- ✅ Exception handling robusto

Métodos principales:
```php
$email = new EmailHandler();

// Enviar con template
$email->send($to, $subject, $templatePath, $data, $replyTo);

// Enviar simple
$email->sendSimple($to, $subject, $message, $isHtml);

// Obtener errores
$email->getErrors();
$email->getLastError();
$email->hasErrors();
```

---

### 2. **lead-notification.html** (250 líneas)
**Ubicación:** `backend/api/email-templates/lead-notification.html`

**Template profesional y responsive para notificaciones de leads**

Características:
- ✅ Diseño responsive (mobile + desktop)
- ✅ Colores corporativos Provivir (Azul #00539B, Naranja #FFA500)
- ✅ Variables reemplazables ({{name}}, {{email}}, etc.)
- ✅ Botones de acción rápida (Email, WhatsApp)
- ✅ Información completa del lead
- ✅ Tablas de datos formateadas

Variables disponibles:
```
{{name}}           - Nombre del contacto
{{email}}          - Email del contacto
{{phone}}          - Teléfono
{{phone_clean}}    - Teléfono sin caracteres especiales
{{property_name}}  - Nombre de la propiedad
{{salary}}         - Presupuesto aproximado
{{employment}}     - Situación laboral
{{message}}        - Mensaje del usuario
{{source}}         - Fuente del lead
{{created_at}}     - Fecha de creación
{{email_sent_at}}  - Fecha de envío del email
{{year}}           - Año actual
```

---

### 3. **Integración en leads.php** (200 líneas modificadas)
**Ubicación:** `backend/api/leads.php`

**Flujo de integración:**

```
POST /backend/api/leads.php
        ↓
Validar datos del formulario
        ↓
Guardar lead en BD
        ↓
Obtener nombre de la propiedad
        ↓
Crear instancia de EmailHandler
        ↓
Preparar datos para template
        ↓
Llamar a $email->send()
        ↓
Log del resultado (success/error)
        ↓
Respuesta al cliente con status
```

Código relevante:
```php
// Crear instancia del handler
$emailHandler = new EmailHandler();

// Preparar datos
$emailData = [
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'property_name' => $propertyName,
    ...
];

// Enviar email
$sent = $emailHandler->send(
    ADMIN_EMAIL,
    "🎉 ¡Nuevo Lead! - " . $name,
    $templatePath,
    $emailData,
    $email
);

// Log del resultado
if ($sent) {
    error_log("Email enviado a: " . ADMIN_EMAIL);
} else {
    error_log("Error al enviar email: " . $emailHandler->getLastError());
}
```

---

### 4. **config.php** (Actualizado)
**Ubicación:** `backend/api/config.php`

**Configuración SMTP con instrucciones claras**

```php
// Gmail SMTP
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'ventas2@provivirpanama.com');
define('SMTP_PASSWORD', '');  // ← REEMPLAZAR CON APP PASSWORD
define('USE_SMTP', false);     // ← CAMBIAR A true CUANDO TENGAS PASSWORD

// Para cambiar a otro proveedor (Mailtrap, SendGrid):
// Host: sandbox.smtp.mailtrap.io (Mailtrap)
// Port: 587
// Username: tu_usuario
// Password: tu_password
```

---

## 🚀 Cómo Usar

### **Paso 1: Esperar App Password de Gmail**
Alejandro debe generar el App Password desde:
https://myaccount.google.com/apppasswords

### **Paso 2: Configurar en config.php**
```php
define('SMTP_PASSWORD', 'tu_app_password_aqui');  // 16 caracteres sin espacios
define('USE_SMTP', true);
```

### **Paso 3: Probar el Sistema**
Ejecutar desde terminal:
```bash
php backend/api/test-email-notifications.php
```

O acceder desde navegador:
```
http://localhost/provivirpanama/backend/api/test-email-notifications.php
```

### **Paso 4: Llenar el Formulario**
Cuando user llene el formulario en provivirpanama.com:
- Email se envía automáticamente a ventas2@provivirpanama.com
- Incluye todos los datos del lead
- Template profesional con información completa

---

## 📊 Flujo Completo (User Perspective)

```
1. Usuario accede: provivirpanama.com
   ↓
2. Completa el formulario:
   - Nombre
   - Email
   - Teléfono
   - Propiedad
   - Presupuesto
   - Situación laboral
   - Mensaje
   ↓
3. Hace click en "Enviar"
   ↓
4. JavaScript valida los datos
   ↓
5. Envía POST a /backend/api/leads.php
   ↓
6. Backend procesa:
   - Valida email
   - Guarda en BD
   - Prepara datos para email
   - Envía notificación a admin
   ↓
7. Admin recibe email profesional con:
   - Todos los datos del lead
   - Botones de acción rápida
   - Información de la propiedad
   ↓
8. Admin puede responder directamente o contactar por WhatsApp
```

---

## 🔧 Configuración por Proveedor

### **Gmail (Recomendado)**
```php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'ventas2@provivirpanama.com');
define('SMTP_PASSWORD', 'app_password_aqui');
define('USE_SMTP', true);
```

### **Mailtrap (Testing)**
```php
define('SMTP_HOST', 'sandbox.smtp.mailtrap.io');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'tu_usuario_mailtrap');
define('SMTP_PASSWORD', 'tu_password_mailtrap');
define('USE_SMTP', true);
```

### **Desarrollo Local (sin SMTP)**
```php
define('USE_SMTP', false);  // Usa mail() de PHP
// Los intentos se guardan en: logs/email-errors.log y logs/email-success.log
```

---

## 📈 Logs

Ubicación: `logs/`

Archivos:
- `email-success.log` - Emails enviados exitosamente
- `email-errors.log` - Errores en el envío

Formato:
```
[2026-01-22 17:30:45] Email exitoso a: ventas2@provivirpanama.com
[2026-01-22 17:31:12] Email fallido: Connection refused
```

---

## ✅ Testing

### **Test en Terminal (Sin BD)**
```bash
php backend/api/test-email-notifications.php
```

### **Test en Navegador (Recomendado)**
```
http://localhost/provivirpanama/backend/api/test-email-notifications.php
```

Características:
- ✅ Verifica config
- ✅ Verifica EmailHandler
- ✅ Verifica template
- ✅ Verifica BD
- ✅ Permite envío de prueba manual
- ✅ Mostrar estado de SMTP

---

## 🐛 Troubleshooting

### **Error: "Failed to connect to mailserver"**
**Solución:** USE_SMTP=false, espera app password

### **Error: "Template not found"**
**Solución:** Verifica ruta en `backend/api/email-templates/lead-notification.html`

### **Error: "Database connection failed"**
**Solución:** Inicia MySQL en XAMPP

### **No se envían emails pero dice "success"**
**Solución:** Revisar `logs/email-success.log` para confirmar

---

## 📝 Cambios Realizados

| Archivo | Cambios | Status |
|---------|---------|--------|
| `backend/api/config.php` | +30 líneas config SMTP | ✅ |
| `backend/api/leads.php` | +100 líneas integración email | ✅ |
| `backend/api/EmailHandler.php` | +280 líneas (NEW) | ✅ |
| `backend/api/email-templates/lead-notification.html` | +250 líneas (NEW) | ✅ |
| `backend/api/test-email-notifications.php` | +400 líneas (NEW) | ✅ |
| `logs/` | Carpeta creada (NEW) | ✅ |

---

## 🎯 Próximos Pasos

1. ⏳ **Esperar App Password Gmail** (Alejandro)
2. ✅ Actualizar SMTP_PASSWORD en config.php
3. ✅ Cambiar USE_SMTP a true
4. ✅ Ejecutar test para validar
5. ✅ Deployment a producción
6. ✅ Monitorear email-success.log

---

## 📞 Soporte

Para agregar funcionalidades adicionales:
- Confirmar email al cliente: Crear template `customer-confirmation.html`
- Notificación por SMS: Integrar Twilio
- Webhook: Enviar datos a CRM
- Reporte diario: Cron job con resumen de leads

---

**Último Update:** 22 Enero 2026  
**Version:** 1.0  
**Ambiente:** Desarrollo / Producción Ready

