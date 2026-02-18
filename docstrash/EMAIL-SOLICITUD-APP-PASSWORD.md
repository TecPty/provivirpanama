# 📧 Email a Marketing/Admin - Solicitud App Password Gmail

---

## ASUNTO: [IMPORTANTE] Solicitud App Password Gmail - Notificaciones Landing Page

---

## CUERPO DEL EMAIL:

Hola [Nombre],

Espero se encuentren bien. Para completar la **configuración de notificaciones automáticas** del sitio web (cuando llegan leads desde el formulario de contacto), necesito un dato de seguridad de la cuenta de Gmail.

### ¿Qué necesito?

Necesito el **App Password** de la cuenta **ventas2@provivirpanama.com**

### ¿Qué es un App Password?

Es una **contraseña especial de 16 caracteres** que Google genera para que aplicaciones externas (como nuestro sitio web) accedan a Gmail de forma segura **sin exponer la contraseña real**.

**Ventajas:**
- ✅ **Más seguro** que usar la contraseña principal
- ✅ **No expone credenciales reales** si se compromete
- ✅ **Se puede revocar fácilmente** en cualquier momento
- ✅ **Acceso limitado** (solo para enviar emails)
- ✅ **Cumple con requisitos de Google** para autenticación

### ¿Para qué se usa?

El App Password se usará para que el servidor web pueda:
1. **Enviar notificaciones por email** cuando llegue un nuevo lead desde el formulario
2. **Notificar automáticamente** al equipo de ventas (ventas2@provivirpanama.com) de nuevas consultas
3. **Enviar confirmación** al cliente que rellenó el formulario

**Ejemplo de flujo:**
- Cliente llena formulario en provivirpanama.com
- Servidor web recibe datos y los guarda en BD
- **Servidor envía email automáticamente** a ventas2@provivirpanama.com
- El equipo recibe notificación en tiempo real

---

## 📋 PASOS PARA OBTENER EL APP PASSWORD

Si no lo tienen generado, pueden crearlo así:

1. **Ir a:** https://myaccount.google.com/apppasswords
   - (O ir a Google Account → Security → App passwords)

2. **Seleccionar:**
   - Device type: "Windows Computer" (o lo que corresponda)
   - Select app: "Mail"

3. **Google generará un password de 16 caracteres** (sin espacios)
   - Ejemplo: `abcd1234efgh5678`

4. **Enviarme ese password** (puedes enviarlo por email directo)

---

## ⚠️ INFORMACIÓN IMPORTANTE

- **No comparta este password con nadie** más que conmigo
- Se almacenará de forma **encriptada** en el servidor
- **Se puede revocar en cualquier momento** si lo necesitan
- El password es **específico solo para Gmail**, no permite acceso a Google Drive, Fotos, etc.

---

## 🎯 TIMELINE

| Tarea | Responsable | Fecha Entrega |
|-------|-----------|---------------|
| Generar App Password | Admin/Marketing | Hoy si es posible |
| Completar Phase 2 (email) | Dev (yo) | Mañana después de recibir |
| Deployment | Dev (yo) | Después de testing |

---

## 📞 DUDAS O AYUDA

Si necesitan ayuda para generarlo, pueden:
- Revisar la guía oficial: https://support.google.com/accounts/answer/185833
- O escribirme para guiarlos por videollamada (5 minutos)

---

**Gracias por el apoyo. Sin esto, el sistema de notificaciones no podrá funcionar.** ✅

Saludos,  
[Tu Nombre]

---

## 💡 VERSIÓN ULTRA CORTA (Si prefieres algo más breve):

---

**ASUNTO:** App Password Gmail Necesario

Hola,

Para que el sitio web envíe notificaciones automáticas por email cuando llegan leads, necesito el **App Password de ventas2@provivirpanama.com**.

**Cómo obtenerlo:**
1. Ir a: https://myaccount.google.com/apppasswords
2. Seleccionar: Device = "Windows Computer", App = "Mail"
3. Copiar el password de 16 caracteres que Google genera
4. Enviarme el resultado

**¿Para qué?** Permite que el servidor web envíe emails de forma segura sin usar la contraseña real.

Gracias,  
[Tu Nombre]

---

## 📌 ALTERNATIVA (Si por alguna razón no pueden usar App Password):

Si la cuenta de Gmail no está configurada para permitir App Passwords (ej: cuenta corporativa), avísame y usamos una alternativa:
- **SendGrid** (recomendado - gratis hasta 100 emails/día)
- **Mailgun** (alternativa profesional)
- **Mailtrap** (para testing)

---
