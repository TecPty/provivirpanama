# 🎨 GUÍA DE LOGOS - PROVIVIR PANAMÁ

## 📁 ARCHIVOS DE LOGO DISPONIBLES

### Logo Principal
```
📂 frontend/assets/images/logo/
├── logo-provivir.png          ← LOGO PRINCIPAL (usado en header y footer)
├── logo-word-provivir.png     ← Versión solo texto
└── logo-icon-provivir.png     ← Versión solo ícono
```

### Favicons
```
📂 frontend/assets/images/icons/
├── favicon.ico                ← Favicon estándar (16x16, 32x32)
├── favicon-16x16.png          ← Favicon 16x16 PNG
├── favicon-32x32.png          ← Favicon 32x32 PNG
├── apple-touch-icon.png       ← Icono para iOS/Safari (180x180)
├── android-chrome-192x192.png ← Icono Android/PWA 192x192
├── android-chrome-512x512.png ← Icono Android/PWA 512x512
└── site.webmanifest           ← Configuración PWA
```

---

## 🎯 USO ACTUAL EN EL SITIO

### Header/Navegación
- **Archivo usado:** `logo-provivir.png`
- **Ubicación:** Header superior (esquina izquierda)
- **Tamaño recomendado:** 150px ancho, altura automática

### Footer
- **Archivo usado:** `logo-provivir.png`
- **Ubicación:** Footer (primera columna)
- **Tamaño:** Ajustado por CSS

### Favicon (pestaña navegador)
- **Archivos usados:** Todos los de la carpeta `icons/`
- **Formatos:** ICO, PNG 16x16, PNG 32x32
- **Ubicación:** Se ve en la pestaña del navegador

### PWA/Móvil
- **Android:** `android-chrome-192x192.png`, `android-chrome-512x512.png`
- **iOS:** `apple-touch-icon.png`
- **Cuando se usa:** Al agregar el sitio a la pantalla de inicio del móvil

---

## 🔄 VERSIONES ALTERNATIVAS DISPONIBLES

### 1. Logo Word (solo texto)
- **Archivo:** `logo-word-provivir.png`
- **Cuándo usar:** 
  - Footer en móviles (espacio reducido)
  - Headers compactos
  - Versiones impresas

### 2. Logo Icon (solo ícono)
- **Archivo:** `logo-icon-provivir.png`
- **Cuándo usar:**
  - Botón "volver arriba"
  - Loader/spinner personalizado
  - Watermark en imágenes
  - Redes sociales como avatar

---

## 💡 CÓMO CAMBIAR EL LOGO EN EL FUTURO

### Opción 1: Reemplazar archivo existente
Simplemente reemplaza `logo-provivir.png` con tu nuevo logo (manteniendo el mismo nombre).

### Opción 2: Usar versión alternativa
Edita `frontend/index.html` línea ~34:

```html
<!-- Cambiar de: -->
<img src="./assets/images/logo/logo-provivir.png" alt="Provivir Logo">

<!-- A: -->
<img src="./assets/images/logo/logo-word-provivir.png" alt="Provivir Logo">
```

### Opción 3: Agregar nuevo logo
1. Coloca el nuevo archivo en `frontend/assets/images/logo/`
2. Actualiza la ruta en el HTML

---

## 🎨 RECOMENDACIONES DE DISEÑO

### Para mejor rendimiento:
- ✅ Usar SVG si es posible (vectorial, escalable, peso ligero)
- ✅ Comprimir PNG con TinyPNG.com antes de subir
- ✅ Tamaño máximo recomendado: 50KB

### Para mejor visualización:
- ✅ Fondo transparente en PNG
- ✅ Resolución 2x para pantallas retina (logo@2x.png)
- ✅ Versión monocromática para imprimir

---

## 📱 RESPONSIVE

El logo se adapta automáticamente:
- **Desktop:** 150px ancho
- **Tablet:** 120px ancho
- **Mobile:** 100px ancho

(Configurado en `frontend/css/components/header.css`)

---

## ✅ TODO LISTO

Tu sitio ahora usa:
- ✅ Logo principal en header y footer
- ✅ Favicons completos (5 formatos)
- ✅ Iconos PWA para móviles
- ✅ Manifest configurado correctamente

**Refresca el navegador para ver los cambios:** http://localhost:8000
