# 📋 TABLA DE VERIFICACIÓN RÁPIDA - TODAS LAS TAREAS

## 🗓️ LUNES - 4 HORAS

| # | Tarea | Duración | Archivos | Status | Notes |
|---|-------|----------|----------|--------|-------|
| 1 | Verificar MySQL + crear tabla | 15 min | DB | ⏳ | `CREATE TABLE leads ...` |
| 2 | Crear API endpoint `/api/leads` | 2 h | `api/routes/leads.js` `api/index.js` | ⏳ | Validación + sanitización |
| 3 | Remover \"modo demo\" | 15 min | `frontend/js/components/form-handler.js` | ⏳ | Línea 197-200 |
| 4 | Test end-to-end local | 1.5 h | Navegador + MySQL | ⏳ | Verificar en DB |

### ✅ Checklist Lunes
- [ ] MySQL tabla `leads` creada
- [ ] Ruta POST `/api/leads` responde
- [ ] Validación rechaza datos inválidos
- [ ] Formulario envía sin \"modo demo\"
- [ ] Datos aparecen en MySQL
- [ ] Console sin errores

---

## 🗓️ MARTES - 4 HORAS

| # | Tarea | Duración | Archivos | Status | Notes |
|---|-------|----------|----------|--------|-------|
| 1 | Convertir PNG a WebP | 1.5 h | `frontend/assets/images/properties/*.png` → `.webp` | ⏳ | Quality 85% |
| 2 | Optimizar video hero | 2.5 h | `frontend/assets/images/hero/hero-video-desktop.mp4` | ⏳ | Comprimir + versión mobile |
| 3 | Implementar lazy loading | 1.5 h | `frontend/index.html` | ⏳ | `loading=\"lazy\"` |
| 4 | Optimizar fuentes | 1 h | `frontend/index.html` | ⏳ | Reducir a wght 400,600,700 |
| 5 | Remover console.logs | 1 h | `frontend/js/**/*.js` | ⏳ | Buscar y eliminar |
| 6 | Minificar CSS/JS | 1.5 h | `frontend/css/` `frontend/js/` | ⏳ | Para producción |

### ✅ Checklist Martes
- [ ] Todas las imágenes en WebP
- [ ] Fallback PNG presente
- [ ] Video comprimido < 3MB
- [ ] Lazy loading en todas las imágenes
- [ ] Fonts optimizadas
- [ ] Sin console.logs en código
- [ ] Lighthouse Performance ≥ 80

---

## 🗓️ MIÉRCOLES - 4 HORAS

| # | Tarea | Duración | Archivos | Status | Notes |
|---|-------|----------|----------|--------|-------|
| 1 | Schema markup JSON-LD | 1.5 h | `frontend/index.html` (línea 59-78) | ⏳ | LocalBusiness + Organization |
| 2 | Google Analytics 4 | 1 h | `frontend/index.html` (línea 88) | ⏳ | Reemplazar ID placeholder |
| 3 | Google Tag Manager | 0.5 h | `frontend/index.html` (línea 72) | ⏳ | Verificar configurado |
| 4 | Optimizar heading hierarchy | 0.5 h | `frontend/index.html` | ⏳ | H1, H2, H3 correcto |
| 5 | Mobile-first responsive | 2 h | `frontend/css/` | ⏳ | 320px, 768px, 1280px, 1920px |
| 6 | Verificar alt text | 1 h | `frontend/index.html` | ⏳ | Todas imágenes con alt |
| 7 | Actualizar robots.txt + sitemap | 0.5 h | `frontend/robots.txt` `frontend/sitemap.xml` | ⏳ | URLs correctas |

### ✅ Checklist Miércoles
- [ ] Schema LocalBusiness con datos reales
- [ ] Google Analytics tracking
- [ ] Google Tag Manager funcionando
- [ ] H1 único + heading hierarchy correcto
- [ ] Mobile responsive en todos los breakpoints
- [ ] Alt text descriptivo en todas las imágenes
- [ ] Robots.txt y sitemap.xml actualizados
- [ ] Lighthouse SEO ≥ 95

---

## 🗓️ JUEVES - 4 HORAS

| # | Tarea | Duración | Archivos | Status | Notes |
|---|-------|----------|----------|--------|-------|
| 1 | Helmet.js headers | 1 h | `api/index.js` | ⏳ | Security headers |
| 2 | Rate limiting | 1 h | `api/index.js` `api/routes/leads.js` | ⏳ | 5 req / 15 min |
| 3 | CSRF protection | 1.5 h | `api/index.js` `frontend/js/components/form-handler.js` | ⏳ | Tokens en formulario |
| 4 | Mejorar UX formulario | 1 h | `frontend/css/components/cta-section.css` | ⏳ | Loading state, feedback visual |
| 5 | ARIA labels | 1.5 h | `frontend/index.html` | ⏳ | Accesibilidad |
| 6 | Verificar contraste colores | 0.5 h | Auditoría visual | ⏳ | WCAG AA |
| 7 | Keyboard navigation | 0.5 h | Testing manual | ⏳ | Tab, Enter, Escape |

### ✅ Checklist Jueves
- [ ] Helmet.js instalado y configurado
- [ ] Rate limiting activo en /api/leads
- [ ] CSRF tokens en formulario
- [ ] Loading spinner en botón submit
- [ ] Success/error messages claros
- [ ] ARIA labels en botones y navs
- [ ] Color contrast ≥ 4.5:1
- [ ] Keyboard navigation funciona

---

## 🗓️ VIERNES - 4 HORAS

| # | Tarea | Duración | Archivos | Status | Notes |
|---|-------|----------|----------|--------|-------|
| 1 | Lighthouse audit completo | 1 h | Auditoría | ⏳ | Performance, SEO, A11y, Best Practices |
| 2 | Testing end-to-end | 2 h | Manual testing | ⏳ | Todas funcionalidades |
| 3 | Cross-browser testing | 1 h | Chrome, Firefox, Safari, Edge | ⏳ | Desktop + Mobile |
| 4 | Deploy a Vercel | 1 h | `vercel --prod` | ⏳ | Variables de entorno configuradas |
| 5 | Documentación | 1 h | `README.md` `API-ROUTES.md` `MAINTENANCE.md` | ⏳ | Para el equipo |
| 6 | Limpieza final | 0.5 h | Código, git | ⏳ | Commits limpios |
| 7 | Reporte final | 0.5 h | Email | ⏳ | Para cliente |

### ✅ Checklist Viernes
- [ ] Lighthouse Performance ≥ 85
- [ ] Lighthouse SEO ≥ 95
- [ ] Lighthouse Accessibility ≥ 85
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Todas las funcionalidades testeadas
- [ ] Cross-browser OK (4+ navegadores)
- [ ] Deploy exitoso en Vercel
- [ ] Documentación actualizada
- [ ] Código limpio (sin logs, sin comentarios innecesarios)

---

## 📊 RESUMEN POR CATEGORÍA

### 🔴 CRÍTICO (Resuelve lunes)
| Issue | Prioridad | Archivo | ETC |
|-------|-----------|---------|-----|
| Formulario roto en producción | 🔴 | `form-handler.js` | 2 h |
| Backend sin validación | 🔴 | `api/routes/leads.js` | 2 h |
| Ningún endpoint para leads | 🔴 | `api/index.js` | 1 h |

### 🟡 IMPORTANTE (Resuelve martes-miércoles)
| Issue | Prioridad | Archivo | ETC |
|-------|-----------|---------|-----|
| Imágenes PNG sin optimizar | 🟡 | properties/*.png | 1.5 h |
| Video hero sin comprimir | 🟡 | hero/*.mp4 | 2.5 h |
| Analytics sin configurar | 🟡 | index.html L88 | 0.5 h |
| Mobile video consume datos | 🟡 | index.html L139 | 1 h |
| Lazy loading no implementado | 🟡 | index.html | 1.5 h |

### 🟢 DESEABLE (Resuelve jueves-viernes)
| Issue | Prioridad | Archivo | ETC |
|-------|-----------|---------|-----|
| Console.logs en producción | 🟢 | js/**/*.js | 1 h |
| ARIA labels incompletos | 🟢 | index.html | 1 h |
| Documentación falta | 🟢 | docs/*.md | 1 h |

---

## ⏱️ ESTIMACIONES TOTALES

```
Lunes:     4 horas  ████ (Crítico)
Martes:    4 horas  ████ (Performance)
Miércoles: 4 horas  ████ (SEO + Mobile)
Jueves:    4 horas  ████ (Seguridad + A11y)
Viernes:   4 horas  ████ (Testing + Deploy)
─────────────────────────
TOTAL:    20 horas reales
BUFFER:   20 horas (para unexpected issues)
TOTAL:    40 horas disponibles ✅
```

---

## 🎯 MÉTRICAS FINALES

### Lighthouse (Expected Friday)
| Métrica | Lunes | Viernes | Meta |
|---------|-------|---------|------|
| Performance | ~70 | 85-90 | ✅ 85+ |
| SEO | ~85 | 95+ | ✅ 95+ |
| Accessibility | ~80 | 85+ | ✅ 85+ |
| Best Practices | ~75 | 90+ | ✅ 90+ |

### Funcionalidad
| Función | Lunes | Viernes |
|---------|-------|---------|
| Formulario envía | ❌ | ✅ |
| Datos en MySQL | ❌ | ✅ |
| Imágenes optimizadas | ❌ | ✅ |
| Video comprimido | ❌ | ✅ |
| SEO implementado | ⚠️ | ✅ |
| Seguridad completa | ❌ | ✅ |

---

## 🚨 PROBLEMAS COMUNES & SOLUCIONES RÁPIDAS

| Problema | Solución | Tiempo |
|----------|----------|--------|
| MySQL conexión falla | Revisar .env credenciales | 15 min |
| API no responde | Verificar `npm start` corre | 10 min |
| Formulario aún bloqueado | Buscar `IS_VERCEL` en form-handler.js | 5 min |
| Imagen no carga | Verificar ruta correcta en HTML | 10 min |
| Video muy grande | Re-comprimir con FFmpeg CRF 25-28 | 30 min |
| Lighthouse bajo | Remover console.logs, lazy load images | 1 h |
| Analytics no registra | Verificar ID en HTML, reload page | 15 min |

---

## 📞 CONTACTO RÁPIDO

Cuando dudes:
1. Busca en AUDITORIA-ROADMAP-2026-02-03.md (sección del día)
2. Busca en SCRIPTS-COPIAR-PEGAR.md (script rápido)
3. Busca en INICIO-RAPIDO-LUNES.md (troubleshooting)

---

**Estado:** 🟢 Pronto a comenzar  
**Complejidad:** 🟡 Media  
**Viabilidad:** 🟢 ALTA  
**Fecha:** 3 de Febrero, 2026

¡A trabajar! 💪
