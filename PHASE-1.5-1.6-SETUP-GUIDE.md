# ✅ FASE 1.5 & 1.6 - INSTRUCCIONES DE CONFIGURACIÓN

## 🔐 FASE 1.6: Google Analytics 4 - PENDIENTE CONFIGURACIÓN

### Estado Actual:
```
archivo: frontend/js/config.js (línea 84)
valor actual: GOOGLE_ANALYTICS_ID: ''

archivo: frontend/index.html (línea 80)
valor actual: id=G-XXXXXXXXXX
```

### Pasos para Configurar GA4:

1. **Ir a Google Analytics 4**
   ```
   https://analytics.google.com
   ```

2. **Crear Property (si no existe)**
   - Nombre: "Provivir Panamá"
   - URL: https://provivirpanama.com
   - Tipo: Web

3. **Obtener el Measurement ID**
   - Admin → Property Settings
   - Buscar "Measurement ID" (formato: G-XXXXXXXXXX)
   - Copiar el ID

4. **Actualizar config.js**
   ```javascript
   GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX', // Reemplazar con tu ID
   ```

5. **Actualizar index.html**
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

6. **Verificar en Google Analytics**
   - Esperar 24-48 horas para primeros datos
   - En "Real-time" debería aparecer después de unos minutos
   - En "Home" → "User acquisition" después de 24h

### Eventos Pre-Configurados:
- ✅ Form submission (leads)
- ✅ Button clicks (CTA)
- ✅ Page scrolls
- ✅ Social media clicks

---

## 🖼️ FASE 1.5: OG Image - PENDIENTE CREACIÓN

### Estado Actual:
```
archivo: frontend/index.html (línea 11)
valor actual: og:image content="./assets/images/og-image.jpg"

archivo actual: NO EXISTE
```

### Especificaciones Requeridas:
```
Nombre: og-image.jpg (o og-image.png)
Ubicación: /frontend/assets/images/og-image.jpg
Dimensiones: 1200 x 630 píxeles (CRÍTICO)
Formato: JPEG o PNG
Tamaño máximo: 300 KB
Ratio: 1.9:1
```

### Contenido Recomendado:
```
- Logo Provivir (esquina superior)
- Texto principal: "Tu Nuevo Hogar está Más Cerca"
- Subtítulo: "Soluciones de vivienda asequible con subsidios"
- Colores: Azul corporativo (#0077C2) + blanco
- Fondo: Hero image o gradiente azul
- Branding: "provivirpanama.com" en pie de página
```

### Cómo Crear:
**Opción 1: Canva (Recomendado)**
```
1. Ir a https://www.canva.com
2. Crear → "Open Graph Image" (1200x630)
3. Agregar:
   - Fondo: Azul (#0077C2) o hero image
   - Logo Provivir
   - Texto: "Tu Nuevo Hogar está Más Cerca"
   - Descargar como JPG
4. Renombrar a: og-image.jpg
5. Subir a: /frontend/assets/images/
6. Comprimir: https://tinypng.com
```

**Opción 2: Adobe Express (Alternativa)**
```
1. Ir a https://www.adobe.com/express
2. Buscar plantilla: "Social Media Graphics"
3. Personalizar con datos de Provivir
4. Descargar en 1200x630px
```

**Opción 3: Script Python (Automatizado)**
```python
from PIL import Image, ImageDraw, ImageFont

# Crear imagen
img = Image.new('RGB', (1200, 630), color='#0077C2')
draw = ImageDraw.Draw(img)

# Agregar texto
draw.text((100, 250), "Tu Nuevo Hogar está Más Cerca", 
          fill='white', font=...)
draw.text((100, 350), "provivirpanama.com", 
          fill='#ddd', font=...)

img.save('og-image.jpg')
```

### Verificar OG Image:
```
1. Ir a: https://www.opengraphcheck.com
2. Ingresar URL: https://provivirpanama.com
3. Debe mostrar la imagen en preview
```

---

## 📋 CHECKLIST - FASES 1.5 & 1.6

### GA4 Configuration:
- [ ] Google Analytics 4 account creado
- [ ] Measurement ID obtenido
- [ ] config.js actualizado
- [ ] index.html actualizado
- [ ] Real-time data visible en GA4
- [ ] Conversion goals configurados

### OG Image:
- [ ] Imagen creada (1200x630px)
- [ ] Guardada como og-image.jpg
- [ ] Ubicación: /frontend/assets/images/og-image.jpg
- [ ] Tamaño < 300 KB
- [ ] Verificado en https://www.opengraphcheck.com
- [ ] Social preview funciona en Facebook/Twitter/WhatsApp

---

## 📝 ACTUALIZACIONES REQUERIDAS

### Archivo: frontend/js/config.js (línea 84)
**ANTES:**
```javascript
GOOGLE_ANALYTICS_ID: '', // Tu GA4 ID
```

**DESPUÉS:**
```javascript
GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX', // Tu GA4 ID (reemplazar)
```

### Archivo: frontend/index.html (líneas 80-89)
**REEMPLAZAR:** `G-XXXXXXXXXX` con tu ID real

---

## ⏱️ TIEMPO ESTIMADO
- GA4 Setup: 5-10 minutos
- OG Image Creation: 10-15 minutos
- Total: 15-25 minutos

---

## 📞 SOPORTE

Si necesitas ayuda:
1. **GA4**: https://support.google.com/analytics
2. **Open Graph**: https://ogp.me
3. **Image Tools**: https://tinypng.com, https://compressor.io

---

Última actualización: 14 de Enero 2026
