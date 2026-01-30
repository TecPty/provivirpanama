# 📋 Prompt: Implementar Google Tag Manager en Sitio Web

---

## 🎯 OBJETIVO
Integrar Google Tag Manager (GTM) en el sitio web para centralizar la gestión de pixeles y etiquetas de tracking (Google Analytics 4, Meta Pixel, TikTok Pixel) sin necesidad de modificar código cada vez que se agrega/actualiza un pixel.

---

## 📋 TAREAS A REALIZAR

### **1. Crear Contenedor en Google Tag Manager**
- Ir a: https://tagmanager.google.com/
- Crear nuevo contenedor (Container)
- Nombre: `[NOMBRE-DE-TU-SITIO]`
- Plataforma: Web
- Copiar el **Container ID** generado (formato: `GTM-XXXXXXXXX`)

### **2. Integrar GTM en el Archivo HTML Principal**

**Ubicación 1: En la sección `<head>` (al final, antes de cerrar)**

Pega este código:
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','TU_CONTAINER_ID_AQUI');</script>
<!-- End Google Tag Manager -->
```

**⚠️ REEMPLAZA:** `'TU_CONTAINER_ID_AQUI'` con tu Container ID (ej: `'GTM-ABC123XYZ'`)

---

**Ubicación 2: Inmediatamente después de `<body>` (primer elemento del body)**

Pega este código:
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=TU_CONTAINER_ID_AQUI"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

**⚠️ REEMPLAZA:** `TU_CONTAINER_ID_AQUI` con tu Container ID en ambos lugares

---

### **3. Verificar la Integración**

**En navegador (Chrome):**
1. Abre DevTools: F12
2. Ir a Console
3. Ejecuta: `gtag` (debería estar disponible)
4. Ejecuta: `console.log(window.dataLayer)` (debería mostrar eventos)

**En Google Tag Manager:**
1. Ve a tu contenedor en https://tagmanager.google.com/
2. Click en **Preview**
3. Copia el link
4. Abre tu sitio web en una pestaña nueva
5. GTM debugger debería estar activo mostrando eventos en tiempo real

---

### **4. Agregar Tags (Pixeles/Scripts)**

Una vez GTM está integrado, puedes agregar desde el dashboard:

#### **Tag: Google Analytics 4**
- Tipo: Google Analytics - GA4 Configuration
- Measurement ID: `G-XXXXXXXXXX`
- Trigger: All Pages

#### **Tag: Meta Pixel**
- Tipo: Custom HTML
- Contenido: Script de Meta Pixel
- Trigger: All Pages

#### **Tag: TikTok Pixel**
- Tipo: Custom HTML
- Contenido: Script de TikTok Pixel
- Trigger: All Pages

---

### **5. Publicar Cambios**

1. Click: **SUBMIT**
2. Click: **PUBLISH**
3. GTM publicará la versión
4. En ~30 segundos estará activo en producción

---

## 🎯 RESULTADO FINAL

| Antes | Después |
|-------|---------|
| Código HTML con GA4 directo | GTM en HTML |
| Código HTML con Meta Pixel | Meta Pixel via GTM |
| Código HTML con TikTok Pixel | TikTok Pixel via GTM |
| Cambios requieren redeploy | Cambios instantáneos desde GTM |

---

## ✅ CHECKLIST

- [ ] Container GTM creado
- [ ] Container ID obtenido
- [ ] Script GTM pegado en `<head>`
- [ ] Script noscript pegado después de `<body>`
- [ ] DevTools verifica dataLayer
- [ ] Preview mode funciona
- [ ] Tags agregados (GA4, Meta, TikTok)
- [ ] Versión publicada
- [ ] Testing en sitio live

---

## 📞 REFERENCIAS

- GTM Setup Guide: https://support.google.com/tagmanager/answer/6103696
- GTM Container ID: https://support.google.com/tagmanager/answer/7107324
- Debug con Preview: https://support.google.com/tagmanager/answer/7693332

---

## 💡 NOTAS

- El Container ID es único por sitio web
- GTM no reemplaza Google Analytics, lo gestiona
- Puedes tener múltiples tags en un contenedor
- Cada cambio genera una versión (historial disponible)
- Versión más reciente = la que está en producción

---
