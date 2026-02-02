# ⚡ GUÍA RÁPIDA - PRIMEROS PASOS (LUNES)

**Duración total:** ~4 horas (Mañana)

---

## 🎯 MISIÓN DEL DÍA
**Hacer que el formulario funcione y guarde datos en MySQL**

---

## PASO 1: Verificar conexión MySQL (15 min)

### 1.1 Verificar variables de entorno
```bash
# Abrir archivo .env en la raíz del proyecto
cat .env
```

Debe tener:
```env
DB_HOST=xxx.xxx.xxx.xxx
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=provivir_db
NODE_ENV=development
```

**Si no existe .env:**
```bash
# Crear desde ejemplo
cp .env.example .env
# Editar con datos reales
```

### 1.2 Crear tabla leads en MySQL
```bash
# Conectar a MySQL (reemplazar con tus credenciales)
mysql -h [DB_HOST] -u [DB_USER] -p [DB_NAME]

# Copiar y pegar en terminal MySQL:
```sql
CREATE TABLE IF NOT EXISTS leads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT,
  property_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
```
```

### 1.3 Test conexión desde Node.js
```bash
# En terminal, posicionarse en raíz del proyecto
cd c:\Users\HP\ 15\provivir

# Instalar mysql2 si falta
npm install mysql2

# Crear archivo test-db.js temporal
```

**Crear archivo temporal:** `test-db.js`
```javascript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
    
    console.log('✅ Conexión a MySQL exitosa');
    
    const [results] = await connection.query('SELECT 1 as ok');
    console.log('✅ Query exitosa:', results);
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testConnection();
```

```bash
# Ejecutar
node test-db.js

# Salida esperada: ✅ Conexión a MySQL exitosa
```

**Si falla:**
- Verificar credenciales en .env
- Verificar que MySQL está corriendo
- Revisar firewalls/restricciones de red

---

## PASO 2: Crear ruta API `/api/leads` (1 hora)

### 2.1 Crear archivo `api/routes/leads.js`

**Crear nuevo archivo:**

```javascript
/**
 * ============================================================================
 * LEADS ROUTE - API para guardar formulario de contacto
 * ============================================================================
 */

import express from 'express';
import mysql from 'mysql2/promise';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Crear pool de conexiones (IMPORTANTE: pooling, no conexión individual)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * POST /api/leads
 * Guardar formulario de contacto
 */
router.post(
  '/',
  // Middleware de validación
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Nombre debe tener 3-100 caracteres')
    .escape(),
  
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .matches(/^[\d\s\-\+\(\)]{7,20}$/)
    .withMessage('Teléfono debe tener 7-20 caracteres')
    .escape(),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Mensaje debe tener 10-5000 caracteres')
    .escape(),
  
  body('property_id')
    .optional()
    .isInt()
    .withMessage('Property ID debe ser un número'),
  
  // Handler
  async (req, res) => {
    try {
      // Verificar errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { name, email, phone, message, property_id } = req.body;

      // Obtener conexión del pool
      const connection = await pool.getConnection();

      try {
        // Usar prepared statement para prevenir SQL injection
        const query = `
          INSERT INTO leads (name, email, phone, message, property_id, created_at)
          VALUES (?, ?, ?, ?, ?, NOW())
        `;

        const result = await connection.execute(query, [
          name,
          email,
          phone,
          message,
          property_id || null
        ]);

        // Log de auditoría (no incluir datos sensibles)
        console.log(`✅ Lead creado: ID ${result[0].insertId} de ${email}`);

        return res.status(201).json({
          success: true,
          id: result[0].insertId,
          message: 'Lead guardado exitosamente'
        });

      } finally {
        connection.release();
      }

    } catch (error) {
      console.error('❌ Error al guardar lead:', error);

      return res.status(500).json({
        success: false,
        error: 'Error al guardar formulario. Intenta de nuevo más tarde.'
      });
    }
  }
);

/**
 * GET /api/leads/:id
 * Obtener un lead específico (solo para verificación)
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const connection = await pool.getConnection();

    try {
      const query = 'SELECT id, name, email, phone, created_at FROM leads WHERE id = ?';
      const [rows] = await connection.execute(query, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Lead no encontrado' });
      }

      return res.json({ success: true, lead: rows[0] });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Error fetching lead:', error);
    return res.status(500).json({ error: 'Error al buscar lead' });
  }
});

export default router;
```

**Guardar como:** `c:\Users\HP 15\provivir\api\routes\leads.js`

### 2.2 Actualizar `api/index.js`

**Agregar import al inicio:**
```javascript
import leadsRouter from './routes/leads.js';
```

**Agregar ruta antes de 404 handler (línea 19, después de social-posts):**
```javascript
app.use('/api/leads', leadsRouter);
```

**Resultado esperado en api/index.js:**
```javascript
// Rutas
import socialPostsRouter from './routes/social-posts.js';
import leadsRouter from './routes/leads.js';

app.use('/api/social-posts', socialPostsRouter);
app.use('/api/leads', leadsRouter);

app.get('/api/health', ...
```

### 2.3 Instalar dependencia faltante
```bash
npm install express-validator
```

---

## PASO 3: Remover "modo demo" del formulario (15 min)

### 3.1 Editar `frontend/js/components/form-handler.js`

**Buscar líneas 197-200:**
```javascript
// Check if backend is available (not in Vercel demo)
if (CONFIG.IS_VERCEL) {
  // Vercel demo mode - show demo message
  setTimeout(() => {
    alert('✅ En el modo de demostración.\n\nEsta versión es solo de visualización...');
    setLoading(leadForm, false);
  }, 1500);
  return;
}
```

**Reemplazar por:**
```javascript
// ✅ Removed IS_VERCEL check - API always available
```

**Resultado:** El código continúa directamente al `try { const response = await API.submitLead(leadData);`

---

## PASO 4: Test end-to-end local (1.5 horas)

### 4.1 Iniciar servidor local
```bash
# Terminal 1: Backend API
cd c:\Users\HP\ 15\provivir
npm install  # Si falta alguna dependencia
npm start

# Salida esperada: 🚀 Provivir API running on port 3000
```

### 4.2 Abrir frontend en navegador
```
http://localhost:3000/frontend/index.html
```

O si está en Vercel local development:
```bash
# Terminal 2: Setup local development (opcional, si Vercel CLI instalado)
vercel dev
# Salida: Abrir http://localhost:3000
```

### 4.3 Test formulario
1. **Navegar a sección "Contacto"** (scroll down o click en nav)
2. **Llenar formulario:**
   - Nombre: "Juan Pérez"
   - Email: "juan@example.com"
   - Teléfono: "+507-6371-2652"
   - Proyecto: "Altos de los Guayacanes"
   - Mensaje: "Estoy interesado en conocer más detalles"
   - Check terms
3. **Click "Enviar"**
4. **Verificar:**
   - ✅ Botón muestra "Enviando..."
   - ✅ Mensaje de éxito aparece
   - ✅ DevTools Network: POST /api/leads status 201
   - ✅ DevTools Console: Ningún error

### 4.4 Verificar en MySQL
```bash
# Terminal 3: MySQL query
mysql -h [DB_HOST] -u [DB_USER] -p [DB_NAME]

# En MySQL:
SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;

# Salida esperada:
# id=1, name=Juan Pérez, email=juan@example.com, phone=+507-6371-2652, created_at=2026-02-03 15:30:00
```

### 4.5 Test validación

**Test 1: Email inválido**
- Ingresar: "juanabc.com" (sin @)
- Resultado: ❌ Error en input, no envía

**Test 2: Nombre muy corto**
- Ingresar: "AB"
- Resultado: ❌ Error "Nombre debe tener 3-100 caracteres"

**Test 3: Mensaje < 10 caracteres**
- Ingresar: "Hola"
- Resultado: ❌ Error "Mensaje debe tener 10-5000 caracteres"

**Test 4: Términos no aceptados**
- No check terms
- Resultado: ❌ Error, botón disabled

**Test 5: Script injection (seguridad)**
- Mensaje: `<script>alert('XSS')</script>`
- Resultado: ✅ Se escapea automáticamente, guardado limpio en DB

---

## PASO 5: Preparar para mañana (15 min)

### Archivo checklist para imprimir/revisar

- [ ] ✅ MySQL tabla creada
- [ ] ✅ Ruta `/api/leads` creada
- [ ] ✅ express-validator instalado
- [ ] ✅ Ruta agregada a api/index.js
- [ ] ✅ Modo demo removido
- [ ] ✅ Test local exitoso
- [ ] ✅ Datos en MySQL verificados
- [ ] ✅ Validación funcionando
- [ ] ✅ Injection testing OK
- [ ] ✅ Console limpia de errores

### Preparar para MARTES

```bash
# Descargar si no existe: ImageMagick o FFmpeg
# Windows: https://imagemagick.org/script/download.php
# O Squoosh online: https://squoosh.app
# O HandBrake para video: https://handbrake.fr/
```

---

## ❌ TROUBLESHOOTING

### Error: "Can't find module 'express-validator'"
```bash
npm install express-validator
npm install mysql2
```

### Error: "ECONNREFUSED - MySQL connection failed"
- Verificar: `npm start` muestra error DB
- Solución: Revisar credenciales en .env
- Test: `mysql -h [host] -u [user] -p`

### Formulario no envía (DevTools Network shows 400/500)
- Revisar DevTools Console por errores
- Revisar request body en Network tab
- Verificar API response JSON

### "Database error: ER_NO_REFERENCED_TABLE"
- Tabla leads no existe
- Solución: Crear tabla con SQL del paso 1.2

---

**Listo para iniciar LUNES mañana temprano! 💪**

Después de esto, martes será optimización de imágenes (mucho más relajado, solo convertir PNGs a WebP).
