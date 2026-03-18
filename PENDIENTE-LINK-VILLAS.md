## 🔗 INSTRUCCIONES: Cuando recibas el link de Google Maps de Villas del Este

**ARCHIVO A MODIFICAR:** 
`frontend/js/components/project-gallery.js`

---

### 📍 PASO 1: Localizar la línea a cambiar

**Línea 41 actual:**
```javascript
const VILLAS_DEL_ESTE_LOCATION = DEFAULT_PROJECT_LOCATION;
```

**Cambiar a:**
```javascript
const VILLAS_DEL_ESTE_LOCATION = 'https://[LINK-QUE-TE-PASEN-DE-MARKETING]';
```

---

### ✅ EJEMPLO COMPLETO:

**ANTES (Líneas 40-42):**
```javascript
const DEFAULT_PROJECT_LOCATION = 'https://maps.app.goo.gl/YcTLaREUbRt7VuvT8?g_st=ic';
const VILLAS_DEL_ESTE_LOCATION = DEFAULT_PROJECT_LOCATION;
```

**DESPUÉS (cuando tengas el link):**
```javascript
const DEFAULT_PROJECT_LOCATION = 'https://maps.app.goo.gl/YcTLaREUbRt7VuvT8?g_st=ic';
const VILLAS_DEL_ESTE_LOCATION = 'https://maps.app.goo.gl/[NUEVO-LINK-AQUI]';
```

---

### 🚀 PASO 2: Commit y Push

```bash
# En la terminal de VS Code o Git Bash:
git add frontend/js/components/project-gallery.js
git commit -m "fix: actualizar ubicación de Villas del Este"
git push origin main
```

**Si usas GitHub Desktop:**
1. Verás el archivo modificado en la lista
2. Escribir mensaje: "fix: actualizar ubicación de Villas del Este"
3. Click "Commit to main"
4. Click "Push origin"

---

### ✅ VERIFICAR QUE FUNCIONA:

1. **Si ya hiciste deploy en Vercel:**
   - Vercel detectará el push automáticamente
   - Hará un nuevo deploy (1-2 minutos)
   - Verificar en: `https://tu-proyecto.vercel.app`

2. **Probar el link:**
   - Abrir la landing page
   - Click en card "Villas del Este"
   - Click en el botón de ubicación (icono de mapa)
   - Debe abrir el link correcto en Google Maps

---

### 📞 SI NECESITAS AYUDA:
Mándame un mensaje con:
- El link que te pasaron
- Screenshot del error (si lo hay)
