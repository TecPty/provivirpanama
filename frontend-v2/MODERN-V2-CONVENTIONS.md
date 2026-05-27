# 🏛️ Provivir V2 — Modern Knowledge Base

Este documento captura las decisiones arquitectónicas y aprendizajes clave establecidos durante el desarrollo de la versión 2.0.

## 🛠️ Stack & Arquitectura
- **Build Tool:** Vite (Dev server en puerto 5173).
- **CSS Architecture:** Modular Components (Pattern: `src/css/components/`). Cada sección tiene su propio `.css`.
- **Naming:** Metodología semi-BEM (`header__nav`, `btn--primary`) para evitar colisiones de estilo.
- **JS Strategy:** Manipulación de DOM con componentes aislados en `src/js/components/`.

## 🎨 Diseño & UI (Modern V2)
- **Visual Language:** Glassmorphism & Blur.
  - Uso intensivo de `backdrop-filter: blur(10px)` con fallback `-webkit-backdrop-filter`.
  - Fondos semitransparentes `rgba(255, 255, 255, 0.8)`.
- **Tipografía:** Figtree como fuente principal.
- **Animaciones:** AOS (Animate On Scroll) configurado globalmente.

## 🔧 Workflow & DevOps
- **Exposure:** `tunnelmole` para feedback público inmediato.
- **Asset Management:** Sincronización de carpetas de fotos cuando hay inconsistencias entre modelos de casas similares.
- **Minimalismo:** Decisión estratégica de priorizar navegación limpia sobre secciones de contenido redundante (ej. enlace de testimonios vs sección dedicada).

## 🧠 Aprendizajes Personales (hp 15)
1. **Contexto de Servidor:** Siempre distinguir entre `/frontend` (legacy) y `/frontend-v2` (modern).
2. **Feedback Loop:** Exponer el trabajo en vivo acelera la aprobación de la diseñadora.
3. **Optimización de Assets:** El uso de `.webp` es obligatorio para mantener el performance en la V2.
