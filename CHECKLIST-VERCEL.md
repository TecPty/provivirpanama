# ✅ CHECKLIST DEPLOYMENT DEMO - VERCEL

---

## 🎯 OBJETIVO
Deploy demo funcional en Vercel para aprobación del cliente.
URL esperada: `https://provivir-demo.vercel.app`

---

## 📋 PASOS NECESARIOS (en orden)

### ☑️ PASO 1: Configurar MySQL Remoto en GoDaddy (10 min)

**Acción:**
1. Login a cPanel de GoDaddy
2. Buscar: "Remote MySQL" o "MySQL Remoto"
3. Agregar: `0.0.0.0/0` (permite todas las IPs)
4. **COPIAR el hostname** que aparece (ejemplo: `p3plzcpnl504722.prod.phx3.secureserver.net`)

**Por qué:** Vercel necesita conectarse a tu base de datos desde sus servidores.

**Screenshot recomendado:** Pantalla de Remote MySQL con el hostname visible.

---

### ☑️ PASO 2: Crear cuenta en GitHub (5 min)

**Si ya tienes cuenta:** ✅ Skip este paso

**Si NO tienes:**
1. Ve a: https://github.com/signup
2. Crear cuenta gratuita
3. Verificar email

---

### ☑️ PASO 3: Subir código a GitHub (15 min)

**Opción más fácil: GitHub Desktop**

1. **Descargar GitHub Desktop:**
   - https://desktop.github.com/
   - Instalar y login con tu cuenta

2. **Agregar repositorio:**
   ```
   File → Add Local Repository
   Buscar: C:\Users\HP 15\provivir
   ```

3. **Crear repositorio:**
   ```
   Repository → Repository Settings
   Nombre: provivir-demo
   Privacidad: Private
   Publish repository
   ```

4. **Commit inicial:**
   ```
   Summary: "Initial commit - Demo ready"
   Commit to main
   Push origin
   ```

**Alternativa: Git Bash**
```bash
cd "C:\Users\HP 15\provivir"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/provivir-demo.git
git push -u origin main
```

---

### ☑️ PASO 4: Crear cuenta en Vercel (3 min)

1. **Ir a:** https://vercel.com/signup
2. **Click en:** "Continue with GitHub"
3. **Autorizar** Vercel a acceder a tu GitHub

---

### ☑️ PASO 5: Importar proyecto en Vercel (2 min)

1. **En Vercel Dashboard:**
   - Click en "Add New..." → "Project"

2. **Buscar tu repositorio:**
   - Buscar: `provivir-demo`
   - Click en "Import"

3. **NO hacer deploy todavía** - primero configurar variables

---

### ☑️ PASO 6: Configurar Variables de Entorno (5 min)

**IMPORTANTE:** Antes de hacer deploy, agregar estas variables en Vercel:

```
NODE_ENV = production

DB_HOST = [HOSTNAME QUE COPIASTE EN PASO 1]
Ejemplo: p3plzcpnl504722.prod.phx3.secureserver.net

DB_USER = dev_provivir_user

DB_PASSWORD = 

DB_NAME = provivir_db

DB_PORT = 3306

DB_SSL = false

CORS_ORIGIN = *
```

**Cómo agregar:**
1. En página de configuración (antes de deploy)
2. Sección "Environment Variables"
3. Agregar una por una
4. **Aplicar a:** Production, Preview, Development (todas)

**Screenshot recomendado:** Variables configuradas (censurar password).

---

### ☑️ PASO 7: Deploy (3 min)

1. **Verificar configuración:**
   ```
   Framework Preset: Other
   Root Directory: ./
   Build Command: (vacío)
   Output Directory: frontend
   Install Command: npm install
   ```

2. **Click en "Deploy"**

3. **Esperar 2-3 minutos** ⏳

4. **Vercel te dará una URL:**
   ```
   https://provivir-demo-xxxxx.vercel.app
   ```

---

### ☑️ PASO 8: Verificar que funcione (10 min)

**Test 1: Health Check**
```
Abrir: https://tu-url.vercel.app/api/health

✅ Debe responder:
{
  "status": "ok",
  "timestamp": "2026-02-15T..."
}
```

**Test 2: Database Connection**
```
Abrir: https://tu-url.vercel.app/api/leads/test

✅ Debe responder:
{
  "success": true,
  "message": "Database connection OK",
  "test": { "test": 1 }
}
```

**Test 3: Frontend**
```
Abrir: https://tu-url.vercel.app/

✅ Debe cargar la landing page completa
```

**Test 4: Formulario**
```
1. Scroll al formulario de contacto
2. Llenar todos los campos:
   - Nombre: Test Demo
   - Email: test@demo.com
   - Teléfono: 6234-5678
   - Salario: 901-1000
   - Estabilidad: Permanente
   - Proyecto: modelo-roble
   - Mensaje: Prueba de demo

3. Click en "Enviar"

✅ Debe ver: "Gracias por tu interés. Te contactaremos pronto."
```

**Test 5: Verificar en Base de Datos**
```
1. cPanel → phpMyAdmin
2. Base de datos: provivir_db
3. Tabla: leads
4. Click en "Browse"

✅ Debe aparecer el lead "Test Demo" con todos sus datos
```

---

## ⚠️ SI ALGO FALLA

### ❌ Error: "Database connection failed"

**Causas posibles:**
1. MySQL remoto NO habilitado en cPanel
2. Hostname incorrecto en DB_HOST
3. Credenciales incorrectas

**Solución:**
```
1. Verificar cPanel → Remote MySQL → 0.0.0.0/0 agregado
2. Verificar hostname (NO usar "localhost")
3. Copiar/pegar password exacto (cuidado con espacios)
4. En Vercel → Settings → Environment Variables → Verificar todas
5. Redeploy: Deployments → ... → Redeploy
```

### ❌ Error: "500 Internal Server Error"

**Solución:**
```
1. Vercel Dashboard → tu proyecto → "View Function Logs"
2. Ver error específico
3. Screenshot del error y consultarme
```

### ❌ Formulario no envía

**Solución:**
```
1. F12 → Console → ver errores
2. Verificar Network → XHR → ver request fallida
3. Posible problema de CORS → verificar headers
```

---

## 📊 TIEMPO TOTAL ESTIMADO

- ⏱️ Configuración: **30-40 minutos**
- ⏱️ Testing: **10-15 minutos**
- **TOTAL: ~1 hora** (primera vez)

---

## 🎉 RESULTADO FINAL

Al terminar tendrás:

✅ **URL pública:** `https://provivir-demo.vercel.app`
✅ **SSL activado** (https)
✅ **Formulario funcional** capturando leads
✅ **Base de datos** guardando información
✅ **Performance optimizada** (CDN global de Vercel)
✅ **Listo para mostrar** al cliente

---

## 📱 COMPARTIR CON CLIENTE

**Mensaje sugerido:**

```
Hola [Nombre Cliente],

Te comparto el demo de la landing page de Provivir Panamá:

🔗 https://provivir-demo.vercel.app

Características implementadas:
✅ Formulario de captura de leads
✅ Calificación financiera (salario/empleo)
✅ Diseño responsive (móvil + desktop)
✅ Integración con base de datos
✅ Notificaciones automáticas

Por favor revisa y dame tu feedback para:
- Diseño y colores
- Textos y contenido
- Funcionalidad del formulario
- Cambios o ajustes necesarios

Una vez apruebes, procederemos con el deploy en el servidor 
de producción (provivirpanama.com).

Saludos,
[Tu nombre]
```

---

## 🔄 DESPUÉS DE LA APROBACIÓN

1. **Deploy a GoDaddy:**
   - Usar guía: `DEPLOYMENT-GUIDE.md`
   - Cambiar a backend PHP
   - Configurar dominio final

2. **Seguridad:**
   - Deshabilitar MySQL remoto público
   - Habilitar solo IPs específicas
   - Cambiar contraseña de MySQL

3. **Emails:**
   - Configurar cuenta corporativa
   - Activar notificaciones reales

---

## 📞 ¿NECESITAS AYUDA?

Si te trabas en algún paso:

1. **Screenshot del problema**
2. **Error específico** (texto completo)
3. **Paso donde te trabaste**

Y continuamos desde ahí 🚀
