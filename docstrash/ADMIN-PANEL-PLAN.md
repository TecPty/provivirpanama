# 🛠️ ADMIN PANEL - PLAN DE DESARROLLO

## 🎯 OBJETIVO

Crear interfaz visual para que **tú (o personas sin conocimiento de programación)** pueda:
1. ✏️ Crear/Editar/Eliminar propiedades
2. ✏️ Crear/Editar/Eliminar testimonios
3. 📱 Crear/Editar/Eliminar posts de redes sociales
4. 📊 Ver/gestionar leads capturados

---

## 📂 ESTRUCTURA PROPUESTA

```
backend/
├── api/
│   ├── config.php (existente)
│   ├── leads.php (existente)
│   ├── properties.php (existente)
│   ├── testimonials.php (existente)
│   ├── social-posts.php (existente)
│   └── leads-list.php (NUEVA - para admin)
│
├── admin/
│   ├── index.php (LOGIN página)
│   ├── dashboard.php (Panel principal)
│   ├── auth.php (Funciones de autenticación)
│   ├── css/
│   │   └── admin.css (Estilos simples)
│   └── js/
│       └── admin.js (Lógica del panel)
│
└── database/
    └── schema.sql (ya creado)
```

---

## 🔐 SEGURIDAD: AUTENTICACIÓN SIMPLE

Para mañana, implementaremos autenticación básica:

```php
// Simple: Usuario + Password hasheado en código
$ADMIN_USERS = [
    'admin' => password_hash('tu-password-aqui', PASSWORD_BCRYPT)
];
```

**Credenciales propuestas:**
- Usuario: `admin`
- Password: `provivir2026` (cambiar después)

*Nota: En producción, esto debería estar en base de datos con sesiones PHP*

---

## 📋 PÁGINAS DEL ADMIN PANEL

### 1. LOGIN (`/admin/index.php`)
- ✅ Formulario simple (usuario/password)
- ✅ Sesión PHP
- ✅ Redirección a dashboard si está logueado
- ✅ Logout button

### 2. DASHBOARD (`/admin/dashboard.php`)
- 📊 Resumen de leads (últimos 5)
- 📊 Cantidad total de propiedades
- 📊 Cantidad total de testimonios
- 📊 Links a CRUD de cada módulo

### 3. PROPIEDADES CRUD
```
/admin/propiedades.php
├── Listar todas (tabla)
├── Crear nueva (form modal)
├── Editar (form modal)
└── Eliminar (confirmación)
```

Campos:
- Título
- Ubicación
- Precio
- Habitaciones / Baños
- Descripción
- Imagen (upload)
- Estado (active/sold/reserved)
- Badge

### 4. TESTIMONIOS CRUD
```
/admin/testimonios.php
├── Listar todos
├── Crear nuevo
├── Editar
└── Eliminar
```

Campos:
- Nombre
- Proyecto/Ubicación
- Testimonio (texto)
- Rating (1-5)
- Foto (opcional)
- Estado

### 5. SOCIAL POSTS CRUD
```
/admin/social-posts.php
├── Listar todos
├── Crear nuevo
├── Editar
└── Eliminar
```

Campos:
- Platform (Instagram/TikTok)
- Imagen URL
- Caption
- Post URL
- Likes / Comments
- Trending (checkbox)

### 6. LEADS LISTADO
```
/admin/leads.php
├── Tabla con todos los leads
├── Filtros: Status, Fecha
├── Acciones: 
│   ├── Ver detalles
│   ├── Cambiar status (new → contacted → qualified → converted)
│   └── Eliminar
└── Export a Excel (futuro)
```

---

## 🎨 DISEÑO MINIMALISTA

Usaremos **Bootstrap 5** para UI rápida:

```html
<!-- CDN Bootstrap para no agregar dependencias -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

**Layout básico:**
```
┌─────────────────────────────────────┐
│ PROVIVIR ADMIN PANEL                │
├─────────────┬───────────────────────┤
│             │                       │
│  MENÚ LADO  │   CONTENIDO PRINCIPAL │
│             │                       │
│ • Dashboard │                       │
│ • Props     │   (tabla/formulario)  │
│ • Testim.   │                       │
│ • Social    │                       │
│ • Leads     │                       │
│ • Logout    │                       │
└─────────────┴───────────────────────┘
```

---

## ⚡ IMPLEMENTACIÓN: FASE 1 (Mañana)

### PRIORIDAD 1: MVP (2 horas)
- ✅ Login con sesión
- ✅ Dashboard básico
- ✅ Listar leads capturados

### PRIORIDAD 2: CRUD Propiedades (1 hora)
- ✅ Listar propiedades
- ✅ Crear nueva (sin upload de imagen)
- ✅ Editar propiedades
- ✅ Cambiar status

### PRIORIDAD 3: CRUD Testimonios (1 hora)
- ✅ Listar testimonios
- ✅ Crear nuevo
- ✅ Editar

### Futuro (Escalamiento)
- 📸 Upload de imágenes directo (con validación)
- 📊 Gráficas de leads por fecha
- 📧 Plantillas de email personalizadas
- 🔄 Integración con CRM (Salesforce/Pipedrive)

---

## 🔌 APIS NECESARIAS

Las APIs que ya existen cubren todo:

| Función | API Existente | Método |
|---------|---------------|--------|
| Listar leads | ❌ NUEVA | GET |
| Ver lead detalle | ❌ NUEVA | GET |
| Cambiar status lead | ❌ NUEVA | PUT |
| Listar propiedades | ✅ properties.php | GET |
| Crear propiedad | ❌ NUEVA | POST |
| Editar propiedad | ❌ NUEVA | PUT |
| Eliminar propiedad | ❌ NUEVA | DELETE |
| Listar testimonios | ✅ testimonials.php | GET |
| Crear testimonio | ✅ testimonials.php | POST |
| Editar testimonio | ❌ NUEVA | PUT |
| Eliminar testimonio | ❌ NUEVA | DELETE |

---

## 📝 TABLA ADMIN PARA TRACKING

| Endpoint | Status | Tiempo Est. | Complejidad |
|----------|--------|-------------|-------------|
| GET /api/leads-list.php | ❌ | 30min | 🟢 Baja |
| GET /api/leads.php?id={id} | ❌ | 20min | 🟢 Baja |
| PUT /api/leads.php | ❌ | 30min | 🟢 Baja |
| POST /api/properties.php | ❌ | 45min | 🟡 Media |
| PUT /api/properties.php | ❌ | 45min | 🟡 Media |
| DELETE /api/properties.php | ❌ | 30min | 🟢 Baja |
| PUT /api/testimonials.php | ❌ | 45min | 🟡 Media |
| DELETE /api/testimonials.php | ❌ | 30min | 🟢 Baja |
| `/admin/index.php` (Login) | ❌ | 45min | 🟡 Media |
| `/admin/dashboard.php` | ❌ | 30min | 🟢 Baja |
| `/admin/propiedades.php` | ❌ | 1.5h | 🟡 Media |
| `/admin/testimonios.php` | ❌ | 1.5h | 🟡 Media |
| `/admin/leads.php` | ❌ | 1h | 🟡 Media |

**Total estimado:** 8-9 horas de desarrollo

---

## 🎬 DIAGRAMA DE FLUJO

```
┌─────────────────────────────────────────────────────┐
│ Usuario accede a /admin/index.php                   │
└────────────────────┬────────────────────────────────┘
                     │
         ┌───────────▼────────────┐
         │ ¿Sesión activa?        │
         └───────┬────────┬───────┘
                 │ No     │ Sí
                 ▼        ▼
            [LOGIN]   [DASHBOARD]
              │            │
              │      ┌──────┴──────────┬────────┬─────┐
              │      ▼                 ▼        ▼     ▼
              │   Propiedades    Testimonios  Social Leads
              │      │
              │      ├─→ [Listar]
              │      ├─→ [Crear] → POST /api/properties.php
              │      ├─→ [Editar] → PUT /api/properties.php
              │      └─→ [Eliminar] → DELETE /api/properties.php
              │
              └──→ [LOGOUT] → Destruir sesión
```

---

## 📋 CHECKLIST IMPLEMENTACIÓN

- [ ] Crear estructura carpetas `/backend/admin/`
- [ ] Crear `/admin/auth.php` (funciones de login)
- [ ] Crear `/admin/index.php` (login form)
- [ ] Crear `/admin/dashboard.php` (panel principal)
- [ ] Crear API `/api/leads-list.php` (GET todos los leads)
- [ ] Crear `/admin/leads.php` (tabla de leads)
- [ ] Crear `/admin/propiedades.php` (CRUD props)
- [ ] Crear `/admin/testimonios.php` (CRUD testim)
- [ ] Crear `/admin/social-posts.php` (CRUD social)
- [ ] Crear `/admin/css/admin.css` (estilos)
- [ ] Crear `/admin/js/admin.js` (lógica cliente)
- [ ] Testear todo end-to-end

---

## 🚀 MAÑANA: ORDEN DE EJECUCIÓN

**8:00 - 9:00:** Setup schema + bugs testing
**9:00 - 10:00:** Login + Dashboard
**10:00 - 11:00:** Leads admin
**11:00 - 12:00:** Propiedades CRUD
**12:00 - 13:00:** Testimonios CRUD
**13:00 - 14:00:** Testing + Adjustments
**14:00:** Ready to deploy 🎉

---

¿Quieres que comience a implementar esto después de que confirmes que funciona el schema.sql? 🚀
