# 🎨 ASSETS NECESARIOS PARA PROVIVIR PANAMÁ

## 📋 CHECKLIST DE IMÁGENES Y RECURSOS

### ✅ COMPLETADO
- [x] Estructura de carpetas creada

### 🔴 CRÍTICO - Sin estos, el sitio no funcionará correctamente

#### Branding / Logo
- [ ] **Logo principal** (SVG preferiblemente)
  - Archivo: `frontend/assets/images/logo.svg`
  - Dimensiones sugeridas: 150x50px
  - Formato: SVG (vectorial, escalable)
  - Alternativa: PNG con fondo transparente

- [ ] **Favicon**
  - Archivo: `frontend/assets/images/favicon.png`
  - Dimensiones: 32x32px, 64x64px
  - Formato: PNG o ICO
  - Herramienta: https://realfavicongenerator.net/

#### Hero Section
- [ ] **Ilustración principal del hero**
  - Archivo: `frontend/assets/images/hero/hero-illustration.png`
  - Dimensiones sugeridas: 1200x800px
  - Tamaño: < 200KB (optimizada)
  - Contenido sugerido: Familia feliz frente a casa, ilustración moderna
  - Fuentes gratuitas: 
    - Undraw.co (ilustraciones)
    - Freepik.com
    - Pexels.com (fotos)

#### Partners / Logos de Socios
- [ ] **Logo CityBank**
  - Archivo: `frontend/assets/images/partners/citybank.svg`
  - Dimensiones: 150x60px
  - Formato: SVG o PNG

- [ ] **Logo National Trust**
  - Archivo: `frontend/assets/images/partners/national-trust.svg`
  - Dimensiones: 150x60px

- [ ] **Logo HomeFund**
  - Archivo: `frontend/assets/images/partners/homefund.svg`
  - Dimensiones: 150x60px

- [ ] **Logo GovHousing**
  - Archivo: `frontend/assets/images/partners/govhousing.svg`
  - Dimensiones: 150x60px

### 🟡 IMPORTANTE - Para contenido dinámico

#### Propiedades
Necesitas mínimo 6 imágenes de propiedades (2 filas de 3):

- [ ] **Propiedad 1**
  - Archivo: `frontend/assets/images/properties/property-1.jpg`
  - Dimensiones: 800x600px (4:3)
  - Tamaño: < 150KB

- [ ] **Propiedad 2**
  - Archivo: `frontend/assets/images/properties/property-2.jpg`

- [ ] **Propiedad 3**
  - Archivo: `frontend/assets/images/properties/property-3.jpg`

- [ ] **Propiedad 4**
  - Archivo: `frontend/assets/images/properties/property-4.jpg`

- [ ] **Propiedad 5**
  - Archivo: `frontend/assets/images/properties/property-5.jpg`

- [ ] **Propiedad 6**
  - Archivo: `frontend/assets/images/properties/property-6.jpg`

**Alternativa temporal:** Usar placeholders de https://placehold.co/800x600

#### Testimonios
- [ ] **Foto testimonio 1**
  - Archivo: `frontend/assets/images/testimonials/person-1.jpg`
  - Dimensiones: 300x300px (cuadrado)
  - Tamaño: < 50KB

- [ ] **Foto testimonio 2**
  - Archivo: `frontend/assets/images/testimonials/person-2.jpg`

- [ ] **Foto testimonio 3**
  - Archivo: `frontend/assets/images/testimonials/person-3.jpg`

**Alternativa temporal:** Usar avatars de https://ui-avatars.com/

### 🟢 OPCIONAL - Para SEO y redes sociales

- [ ] **Open Graph Image**
  - Archivo: `frontend/assets/images/og-image.jpg`
  - Dimensiones: 1200x630px (requerido por Facebook)
  - Contenido: Logo + texto clave + imagen atractiva
  - Herramienta: Canva.com

- [ ] **PWA Icons** (si implementas Progressive Web App)
  - `frontend/assets/images/icons/icon-192x192.png`
  - `frontend/assets/images/icons/icon-512x512.png`

---

## 🎨 OPCIONES PARA CONSEGUIR ASSETS

### Opción 1: Fotos de stock GRATUITAS
- **Unsplash.com**: Fotos de alta calidad, gratis para comercial
- **Pexels.com**: Más de 3 millones de fotos gratis
- **Pixabay.com**: Imágenes y vectores libres

**Búsquedas sugeridas:**
- "modern house exterior panama"
- "happy family new home"
- "affordable housing"
- "residential community"

### Opción 2: Ilustraciones GRATUITAS
- **Undraw.co**: Ilustraciones SVG personalizables por color
- **DrawKit.com**: Ilustraciones vectoriales gratis
- **Humaaans.com**: Ilustraciones de personas

### Opción 3: Logos de Partners
**IMPORTANTE:** Si son logos reales de bancos/instituciones:
- Contactar a cada empresa para permiso de uso
- Descargar logos oficiales de sus sitios web (sección "prensa" o "media kit")
- Respetar guías de marca (no modificar colores, proporciones)

**Alternativa temporal:**
- Usar nombres genéricos y logos placeholders
- Crear logos ficticios con Canva

### Opción 4: Herramientas de diseño
- **Canva.com**: Para crear OG images, banners, logos simples
- **Figma.com**: Diseño profesional (requiere aprendizaje)
- **Photopea.com**: Photoshop gratis en el navegador

---

## 🚀 PLACEHOLDERS TEMPORALES (Desarrollo)

Mientras consigues las imágenes reales, usa estos servicios:

### Logos y branding
```html
<!-- Logo temporal -->
<img src="https://via.placeholder.com/150x50/005B96/FFFFFF?text=PROVIVIR" alt="Provivir">
```

### Hero illustration
```html
<img src="https://placehold.co/1200x800/005B96/FFFFFF?text=Tu+Nuevo+Hogar" alt="Hero">
```

### Propiedades
```html
<img src="https://placehold.co/800x600/00A651/FFFFFF?text=Propiedad+1" alt="Property">
```

### Testimonios (avatares)
```html
<img src="https://ui-avatars.com/api/?name=Maria+Lopez&background=005B96&color=fff&size=300" alt="Maria Lopez">
```

---

## 📐 GUÍA DE OPTIMIZACIÓN DE IMÁGENES

### Antes de subir cualquier imagen:

1. **Redimensionar** al tamaño exacto necesario
2. **Comprimir** sin perder calidad visible
3. **Convertir** a formato adecuado

### Herramientas de optimización:
- **TinyPNG.com**: Compresión automática (reduce 70% sin pérdida visual)
- **Squoosh.app**: Control total sobre compresión
- **ImageOptim** (Mac) o **FileOptimizer** (Windows)

### Reglas generales:
- **Fotos**: JPG (calidad 80-85%)
- **Logos/iconos**: SVG (vectorial) > PNG (transparencia)
- **Fondos**: WebP (moderno, mejor compresión)

---

## ✅ PRÓXIMOS PASOS

1. **Revisa este checklist** y marca lo que ya tengas
2. **Prioriza**: Logo + Hero + Propiedades
3. **Descarga** assets temporales o reales
4. **Optimiza** todas las imágenes antes de subirlas
5. **Organiza** en las carpetas correctas
6. **Prueba** que todas cargan correctamente

---

## 💡 NECESITAS AYUDA?

Si necesitas que te ayude a:
- Generar placeholders específicos
- Optimizar imágenes
- Crear estructuras de carpetas adicionales
- Configurar lazy loading de imágenes

¡Solo dime y seguimos!
