# Provivir Panamá - Landing Page

Sitio web moderno y responsivo para Provivir Panamá, una empresa constructora de viviendas asequibles en Panamá.

## 🚀 Tecnología

**Frontend:**
- HTML5 semántico
- CSS3 modular y escalable
- JavaScript vanilla (sin frameworks)

**Backend:**
- Node.js 18.x
- Express.js
- MySQL 5.7+

**Deployment:**
- Frontend: Vercel
- Backend: Vercel Functions + Node.js
- Database: MySQL (GoDaddy o alternativa)

---

## 📁 Estructura del Proyecto

```
provivir/
├── api/                      # Backend Node.js
│   ├── index.js             # Servidor Express
│   └── routes/
│       └── social-posts.js  # API endpoints
│
├── frontend/                # Landing page
│   ├── index.html          # Página principal
│   ├── css/                # Estilos modulares
│   │   ├── main.css        # Import principal
│   │   ├── components/     # Estilos por componente
│   │   └── 0X-*.css        # Base styles
│   ├── js/                 # JavaScript
│   │   ├── main.js         # Inicializador
│   │   ├── api.js          # Cliente HTTP
│   │   ├── config.js       # Configuración
│   │   ├── components/     # Componentes interactivos
│   │   └── utils/          # Utilidades
│   └── assets/
│       ├── images/         # Imágenes optimizadas
│       └── fonts/          # Tipografías
│
├── .env                    # Variables de entorno
├── package.json           # Dependencias Node.js
├── vercel.json           # Configuración Vercel
└── docstrash/            # Archivos archivados (no usados)
```

---

## 🎨 Secciones de la Landing Page

1. **Hero** - Video de fondo con título principal
2. **Proyectos** - Tarjetas con imágenes (Villas del Este, Ciudad del Este)
3. **Socios Financieros** - Logos de bancos (La Hipotecaria, Banco Nacional, etc.)
4. **Equipo de Asesores** - Carrusel con asesores de ventas
5. **Misión y Visión** - Valores de la empresa con iconos
6. **Contacto** - Formulario de leads + Footer con mapa

---

## 🔧 Setup Local

### Requisitos
- Node.js 18.x o superior
- MySQL 5.7 o superior
- XAMPP (para desarrollo local con Apache + MySQL)

### Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd provivir

# Instalar dependencias Node.js
npm install

# Copiar variables de entorno
cp .env.example .env

# Editar .env con credenciales locales
# DB_HOST=localhost
# DB_USER=root
# DB_PASS=
# DB_NAME=provivir_db
```

### Ejecutar Localmente

```bash
# Terminal 1: Iniciar MySQL (XAMPP)
cd C:\xampp\mysql\bin
mysqld.exe

# Terminal 2: Iniciar Node.js (API)
npm start
# API disponible en http://localhost:3000/api

# Terminal 3: Abrir navegador
http://localhost/provivirpanama/
```

---

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "mysql2": "^3.2.0",
    "body-parser": "^1.20.2"
  }
}
```

---

## 🌐 API Endpoints

### Health Check
```
GET /api/health
```

### Social Posts (Future)
```
GET /api/social-posts
GET /api/social-posts/:id
POST /api/social-posts
```

---

## 📝 Formulario de Contacto

El formulario captura:
- Nombre completo
- Email
- Teléfono
- Salario
- Estabilidad laboral
- Proyecto de interés
- Mensaje

Los datos se envían vía API al backend Node.js.

---

## 🎬 Videos

- `frontend/assets/images/hero/hero-video-desktop.mp4` - Video hero (formato MP4 optimizado)

---

## 📸 Imágenes Utilizadas

### Proyectos
- `frontend/assets/images/properties/villas.png` - Villas del Este
- `frontend/assets/images/properties/ciudad.png` - Ciudad del Este

### Equipo
- `frontend/assets/images/team/alanis-gutierrez.webp`
- `frontend/assets/images/team/jacmily-figuera.webp`
- `frontend/assets/images/team/anny-navas.webp`
- `frontend/assets/images/team/kenia-bergara.webp`

### Socios Financieros
- `frontend/assets/images/partners/la-hipotecaria.png`
- `frontend/assets/images/partners/banco-nacional.png`
- `frontend/assets/images/partners/caja-de-ahorro.png`
- `frontend/assets/images/partners/banco-mercantil.png`
- `frontend/assets/images/partners/banco-general.png`

---

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Login a Vercel
npm install -g vercel
vercel login

# Deploy
vercel --prod
```

### Variables de Entorno (Vercel)
```
DB_HOST=tu-host-mysql
DB_USER=tu-usuario
DB_PASS=tu-contraseña
DB_NAME=provivir_db
NODE_ENV=production
CORS_ORIGIN=https://tu-dominio.com
```

---

## 📞 Contacto

**Email:** ventas2@provivirpanama.com  
**Teléfono:** +507 390-9094 / 6371-2652  
**Ubicación:** Vía España, Ciudad de Panamá

---

## 📄 Licencia

Propietario: Provivir Panamá

---

## 🗂️ Archivos Archivados

Todos los archivos antiguos, no utilizados, documentación desactualizada y scripts de prueba se encuentran en la carpeta `docstrash/` para referencia y recuperación futura.

Ver `docstrash/AUDIT-CLEANUP.md` para detalles completos de la auditoría.

---

**Última actualización:** 30 de Enero, 2026
