# 🏠 Provivir Panamá - Demo Landing Page

## 🌟 Demo URL
[https://provivir-demo.vercel.app](https://provivir-demo.vercel.app)

---

## 📋 Descripción

Landing page para **Provivir Panamá** - Constructora especializada en viviendas asequibles con subsidios gubernamentales y financiamiento flexible.

### Características principales:
- ✅ **Formulario de captura de leads** con validación avanzada
- ✅ **Anti-spam** (honeypot + rate limiting)
- ✅ **Calificación financiera** (salario + estabilidad laboral)
- ✅ **Responsive design** (móvil + desktop)
- ✅ **Notificaciones por email** automáticas
- ✅ **Base de datos MySQL** (GoDaddy)
- ✅ **API REST** (Node.js + Express)

---

## 🚀 Stack Tecnológico

### Frontend:
- HTML5 semántico
- CSS3 (custom, sin frameworks)
- JavaScript Vanilla (modular)
- Lazy loading de imágenes
- WebP + fallback PNG

### Backend:
- Node.js 18.x
- Express.js 4.x
- MySQL 5.7+
- express-validator
- Helmet.js (seguridad)
- Rate limiting

### Deployment:
- **Demo:** Vercel (serverless functions)
- **Producción:** GoDaddy shared hosting (PHP)

---

## 📁 Estructura del Proyecto

```
provivir/
├── frontend/              # Landing page
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── assets/
│   └── api/              # PHP backend (producción)
├── api/                  # Node.js backend (demo)
│   ├── index.js
│   └── routes/
│       └── leads.js
├── vercel.json           # Config Vercel
├── package.json
└── README.md
```

---

## 🔧 Configuración Local

### 1. Clonar repositorio:
```bash
git clone https://github.com/TU-USUARIO/provivir-demo.git
cd provivir-demo
```

### 2. Instalar dependencias:
```bash
npm install
```

### 3. Configurar variables:
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

### 4. Ejecutar en desarrollo:
```bash
npm run dev
```

Abrir: http://localhost:3000

---

## 📊 Variables de Entorno

```env
NODE_ENV=production
DB_HOST=your-mysql-host
DB_USER=dev_provivir_user
DB_PASSWORD=your-password
DB_NAME=provivir_db
DB_PORT=3306
CORS_ORIGIN=*
```

---

## 🎯 Endpoints API

### Health Check:
```
GET /api/health
Response: { "status": "ok", "timestamp": "..." }
```

### Submit Lead:
```
POST /api/leads
Body: {
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+507-6234-5678",
  "message": "Interesado en Modelo Roble",
  "salary": "901-1000",
  "employment": "permanente",
  "project": "modelo-roble"
}
Response: {
  "success": true,
  "message": "Gracias por tu interés...",
  "leadId": 123
}
```

### Test Database:
```
GET /api/leads/test
Response: {
  "success": true,
  "message": "Database connection OK"
}
```

---

## 🧪 Testing

### Test formulario:
1. Abrir demo en navegador
2. Llenar formulario con datos válidos
3. Verificar mensaje de éxito
4. Revisar en phpMyAdmin que el lead se guardó

### Test API:
```bash
# Health check
curl https://provivir-demo.vercel.app/api/health

# Database test
curl https://provivir-demo.vercel.app/api/leads/test
```

---

## 🚀 Deployment

### Demo en Vercel:
Ver guía completa: [VERCEL-DEPLOYMENT.md](VERCEL-DEPLOYMENT.md)

```bash
# Push a GitHub
git add .
git commit -m "Ready for deploy"
git push origin main

# Vercel auto-deploys
```

### Producción en GoDaddy:
Ver guía completa: [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

---

## 📧 Contacto

**Provivir Panamá**
- 📞 Teléfono: +507-390-9094
- 📧 Email: ventas2@provivirpanama.com
- 🌐 Web: https://provivirpanama.com

---

## 📄 Licencia

© 2026 Provivir Panamá. Todos los derechos reservados.

---

## 🛠️ Soporte Técnico

Para issues o preguntas técnicas:
1. Revisar guías de deployment
2. Verificar logs en Vercel Dashboard
3. Contactar al desarrollador

---

## 🎉 Estado del Proyecto

- ✅ Frontend completo
- ✅ Backend funcional
- ✅ Base de datos configurada
- ✅ API endpoints operativos
- ⏳ Demo en revisión
- ⏳ Deploy producción pendiente
