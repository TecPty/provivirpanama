# ROADMAP SEMANAL - Provivir Panamá
# Semana: 09 Febrero - 13 Febrero, 2026
# Horario: Lunes a Viernes, 8:00am - 6:00pm

## Estado General (Auditoría Inicial)
- Backend local responde `/api/health` (OK).
- MySQL real NO verificado (bloqueado).
- Dependencias externas pendientes:
  - Acceso a cPanel GoDaddy para configurar DB y credenciales.
  - Marketing debe entregar renders de propiedades.

## Bloqueos (Dependencias Externas)
1) Acceso a cPanel GoDaddy (DB + credenciales + host) para configurar backend.
2) Renders finales de propiedades (marketing) para completar assets visuales.

## Roadmap Ajustado (Semana Actual)

### Lunes 09 Feb
Objetivo: Auditoría + desbloqueo parcial sin cPanel
- Auditoría funcional local (frontend + backend local sin DB). ✅
- Revisar UX del formulario y validaciones (sin tocar backend real).
- Preparar checklist de producción: DB, credenciales, CORS, seguridad.
- Dejar registro formal de bloqueos.

### Martes 10 Feb
Objetivo: UX y Frontend (no dependiente de cPanel)
- Ajustes UI/UX pendientes (si aplica).
- Revisión accesibilidad básica (labels, foco, contraste, aria).
- Optimización de assets actuales (lazy loading, tamaños, orden).

### Miércoles 11 Feb
Objetivo: Seguridad + Preparación deploy
- Integrar Helmet + rate limit (pendiente de validación).
- Revisar variables de entorno y configuración.
- Preparar guía de despliegue y checklist.

### Jueves 12 Feb
Objetivo: QA y pruebas
- QA manual cross-browser.
- Revisión mobile (layout, touch targets).
- Validación de formularios y mensajes.

### Viernes 13 Feb
Objetivo: Cierre y entrega
- Lighthouse audit (con assets actuales).
- Documentación final.
- Reporte de estado final + pendientes.

## Pendientes Críticos
- Validar `/api/leads/test` con DB real (requiere cPanel).
- Configurar DB y credenciales definitivas.
- Cargar renders finales en frontend.
