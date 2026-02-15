# 🚀 DEPLOYMENT DEMO - VERCEL
## Guía paso a paso para deployar el demo

---

## 📋 PRE-REQUISITOS

1. ✅ Cuenta en GitHub (gratis)
2. ✅ Cuenta en Vercel (gratis - login con GitHub)
3. ✅ MySQL remoto habilitado en GoDaddy

---

## PASO 1: HABILITAR MySQL REMOTO EN GODADDY

### **1.1 Buscar Remote MySQL:**
```
cPanel → Buscar "Remote MySQL" o "MySQL Remoto"
```

### **1.2 Agregar Host de Acceso:**
```
Access Host: 0.0.0.0/0
(permite todas las IPs - solo para demo)

Click en "Add"
```

### **1.3 Obtener Hostname:**
Anota el hostname que aparece arriba, ejemplo:
```
p3plzcpnl504722.prod.phx3.secureserver.net
```

**Screenshot recomendado:** Toma captura de esta pantalla.

---

## PASO 2: SUBIR CÓDIGO A GITHUB

### **2.1 Crear repositorio en GitHub:**
1. Ve a: https://github.com/new
2. Nombre: `provivir-demo`
3. Privacidad: **Private** (recomendado para demo)
4. ❌ NO inicializar con README (ya tienes archivos)
5. Click en "Create repository"

### **2.2 Subir código (desde tu PC):**

**Opción A: GitHub Desktop (más fácil)**
```
1. Descargar: https://desktop.github.com/
2. File → Add Local Repository
3. Buscar carpeta: C:\Users\HP 15\provivir
4. Commit todos los archivos
5. Publish repository
```

**Opción B: Git Bash / Terminal**
```bash
# Abrir PowerShell en: C:\Users\HP 15\provivir\

# Crear archivo .gitignore primero
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "*.log" >> .gitignore

# Inicializar Git
git init
git add .
git commit -m "Initial commit - Provivir demo"

# Conectar con GitHub (usar tu URL del paso 2.1)
git remote add origin https://github.com/TU-USUARIO/provivir-demo.git
git branch -M main
git push -u origin main
```

---

## PASO 3: DEPLOY EN VERCEL

### **3.1 Crear cuenta / Login:**
```
1. Ve a: https://vercel.com/signup
2. Click en "Continue with GitHub"
3. Autorizar Vercel
```

### **3.2 Importar proyecto:**
```
1. Click en "Add New..." → "Project"
2. Buscar: "provivir-demo"
3. Click en "Import"
```

### **3.3 Configurar proyecto:**
```
Framework Preset: Other
Root Directory: ./
Build Command: (dejar vacío)
Output Directory: frontend
Install Command: npm install
```

### **3.4 Agregar Variables de Entorno:**

**IMPORTANTE:** Click en "Environment Variables" y agrega estas:

```
NODE_ENV = production

DB_HOST = [TU_HOSTNAME_DE_GODADDY]
Ejemplo: p3plzcpnl504722.prod.phx3.secureserver.net

DB_USER = dev_provivir_user

DB_PASSWORD = $c.r2+1(4vN^

DB_NAME = provivir_db

DB_PORT = 3306

DB_SSL = false

CORS_ORIGIN = *
```

**Screenshot recomendado:** Toma captura de las variables configuradas.

### **3.5 Deploy:**
```
Click en "Deploy"

Esperar ~2-3 minutos ⏳
```

---

## PASO 4: VERIFICAR QUE FUNCIONE

### **4.1 URL del demo:**
Vercel te dará una URL como:
```
https://provivir-demo.vercel.app
```

### **4.2 Probar API:**
```
https://provivir-demo.vercel.app/api/health

✅ Debería responder:
{
  "status": "ok",
  "timestamp": "2026-02-15T..."
}
```

### **4.3 Probar Database:**
```
https://provivir-demo.vercel.app/api/leads/test

✅ Debería responder:
{
  "success": true,
  "message": "Database connection OK"
}
```

### **4.4 Probar Formulario:**
```
1. Abrir: https://provivir-demo.vercel.app
2. Scroll al formulario
3. Llenar todos los campos
4. Click en "Enviar"

✅ Debería ver: "Gracias por tu interés..."
```

### **4.5 Verificar en Base de Datos:**
```
cPanel → phpMyAdmin → provivir_db → leads → Browse

✅ Debería ver el lead que enviaste
```

---

## PASO 5: COMPARTIR DEMO

### **5.1 URL pública:**
```
https://provivir-demo.vercel.app
```

### **5.2 URL personalizada (opcional):**
```
Vercel Dashboard → Settings → Domains
Agregar: demo.provivirpanama.com
```

---

## ⚠️ TROUBLESHOOTING

### **Error: Database connection failed**

**Causa:** MySQL remoto no habilitado o hostname incorrecto.

**Solución:**
```
1. Verificar en cPanel → Remote MySQL que 0.0.0.0/0 está agregado
2. Verificar hostname en Environment Variables
3. Intentar con: localhost (si falla, NO es localhost)
4. Buscar "MySQL hostname" en documentación de GoDaddy
```

### **Error: 500 Internal Server Error en /api/**

**Causa:** Variables de entorno mal configuradas.

**Solución:**
```
1. Vercel Dashboard → Settings → Environment Variables
2. Verificar que TODAS estén configuradas
3. Redeploy: Deployments → ... → Redeploy
```

### **Error: CORS policy**

**Causa:** Frontend no puede conectar con API.

**Solución:**
```
1. Verificar CORS_ORIGIN en Environment Variables
2. Agregar: * (permite todos los orígenes)
3. Redeploy
```

### **Formulario no envía**

**Causa:** JavaScript no apunta a API correcta.

**Solución:**
```
Ya está configurado en /frontend/js/config.js
Si falla, verificar en DevTools (F12) → Console
```

---

## 🎯 CHECKLIST FINAL

Antes de mostrar el demo:

- [ ] ✅ API health check responde OK
- [ ] ✅ Database test responde OK
- [ ] ✅ Formulario envía sin errores
- [ ] ✅ Lead aparece en phpMyAdmin
- [ ] ✅ Diseño se ve bien en móvil
- [ ] ✅ Diseño se ve bien en desktop
- [ ] ✅ Todas las imágenes cargan
- [ ] ✅ URL es presentable

---

## 📊 DESPUÉS DE LA APROBACIÓN

Una vez aprueben el demo:

1. **Migrar a GoDaddy:**
   - Subir archivos PHP (más rápido)
   - Usar guía: `DEPLOYMENT-GUIDE.md`

2. **Configurar dominio final:**
   - `https://provivirpanama.com`

3. **Habilitar emails:**
   - Notificaciones a ventas

4. **Deshabilitar MySQL remoto:**
   - cPanel → Remote MySQL → Eliminar 0.0.0.0/0
   - Más seguro en producción

---

## 🔒 SEGURIDAD POST-DEMO

**Después de aprobar, HACER ESTO:**

```
1. cPanel → Remote MySQL → Eliminar acceso público
2. Cambiar contraseña de MySQL
3. Actualizar .env en ambos lados
4. Habilitar emails reales
5. Configurar respaldos automáticos
```

---

## 📞 ¿NECESITAS AYUDA?

Si algo falla en el deployment:

1. **Screenshot del error** (consola de Vercel)
2. **Screenshot de Environment Variables** (censurar passwords)
3. **Screenshot de cPanel → Remote MySQL**
4. **Resultado de:** `https://tu-demo.vercel.app/api/health`

---

## 🎉 LISTO

Tu demo estará disponible 24/7 en:
```
https://provivir-demo.vercel.app
```

Con SSL, CDN global, y performance optimizada. 🚀
