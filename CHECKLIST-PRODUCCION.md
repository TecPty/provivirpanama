# Checklist de Producción - Provivir Panamá
# Fecha: 09 Febrero, 2026

## 1) Base de Datos (GoDaddy / MySQL)
- [ ] Acceso a cPanel GoDaddy confirmado (usuario + permisos).
- [ ] Credenciales DB: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`.
- [ ] Base de datos creada en GoDaddy.
- [ ] Usuario DB con permisos correctos (SELECT/INSERT/UPDATE/DELETE).
- [ ] Importar schema.sql (tablas + índices).
- [ ] Probar conexión local contra DB real.
- [ ] Validar endpoint `/api/leads/test`.

## 2) Backend (API)
- [ ] `.env` configurado en producción.
- [ ] `CORS_ORIGIN` definido para dominio final.
- [ ] Helmet habilitado (headers de seguridad).
- [ ] Rate limiting activo en `/api/leads`.
- [ ] Logs básicos habilitados (errores + tráfico).
- [ ] Endpoint `/api/health` OK.

## 3) Frontend (Landing)
- [ ] URL de API en producción confirmada.
- [ ] Formularios funcionando contra backend real.
- [ ] Assets optimizados (imágenes + video).
- [ ] Lazy loading funcionando (sin errores).
- [ ] SEO: meta tags + Open Graph.
- [ ] JSON-LD validado.

## 4) Seguridad / Compliance
- [ ] HTTPS activo.
- [ ] Política de privacidad accesible.
- [ ] Consentimiento de datos en formulario (si aplica).
- [ ] Protección básica anti-spam (honeypot o timing).

## 5) Analítica
- [ ] GA4 ID real configurado.
- [ ] Eventos de conversión activos (lead_submission).
- [ ] Pixel u otras integraciones (si aplica).

## 6) QA Final
- [ ] Verificar formulario en mobile.
- [ ] Cross-browser (Chrome, Edge, Safari).
- [ ] Lighthouse (mobile > 90).
- [ ] Revisión de errores en consola.
