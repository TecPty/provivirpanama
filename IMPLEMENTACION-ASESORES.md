# Implementación: Selección de Asesor en Formulario

## 📋 Resumen

Implementación completa para que cuando un cliente haga clic en el botón de consulta de un asesor específico, sea llevado al formulario con ese asesor pre-seleccionado.

---

## ✅ Cambios Implementados

### 1. **Frontend - HTML** (`frontend/index.html`)
- ✅ Agregado atributo `data-advisor` a los 6 botones de asesores
- ✅ Agregado campo select "Asesor de Preferencia" en el formulario
- Opciones: Alanis Gutierrez, Jacmily Figuera, Anny Navas, Kenia Vergara, Alberto Valencia, Veronica Barboza

### 2. **Frontend - JavaScript** (`frontend/js/components/form-handler.js`)
- ✅ Nueva función `handleAdvisorSelection()` que captura clics en botones de asesores
- ✅ Pre-selección automática del asesor en el formulario cuando se hace clic
- ✅ Feedback visual con clase `pre-selected` durante 1 segundo
- ✅ Campo `advisor` incluido en el objeto `leadData` enviado al backend

### 3. **Frontend - CSS** (`frontend/css/components/cta-section.css`)
- ✅ Estilo `.form-select.pre-selected` para feedback visual
- Verde suave (`#f1f8f4`) con borde verde (`#4caf50`)
- Transición suave de 0.3s

### 4. **Backend - API** (`api/routes/leads.js`)
- ✅ Agregada validación para campo `advisor` (opcional, máx 100 caracteres)
- ✅ Campo `advisor` extraído de `req.body`
- ✅ Campo `advisor` incluido en la query INSERT a la base de datos

### 5. **Base de Datos - Migración**
- ✅ Creado archivo SQL: `docstrash/backend/database/add-advisor-column.sql`
- ✅ Creado script de migración: `migrate-advisor.js`
- ✅ Agregado comando npm: `npm run migrate:advisor`

---

## 🚀 Pasos para Completar (Producción)

### **Paso 1: Ejecutar Migración de Base de Datos**

Cuando estés listo para desplegar a producción (GoDaddy), necesitas agregar la columna `advisor` a la tabla `leads`:

#### Opción A: Usando phpMyAdmin (Recomendado para GoDaddy)
1. Accede a cPanel → phpMyAdmin
2. Selecciona la base de datos `provivir_db`
3. Ve a la pestaña "SQL"
4. Ejecuta este SQL:

```sql
-- Add advisor column to leads table
ALTER TABLE leads 
ADD COLUMN advisor VARCHAR(100) NULL AFTER employment_status
COMMENT 'Preferred sales advisor selected by the client';

-- Create index for faster queries
CREATE INDEX idx_advisor ON leads(advisor);
```

5. Verifica que la columna se creó correctamente en la tabla `leads`

#### Opción B: Localmente (si tienes MySQL corriendo)
```bash
npm run migrate:advisor
```

### **Paso 2: Verificar en Producción**

Una vez desplegado:

1. **Probar flujo de asesor:**
   - Ir a la sección "Nuestros Asesores"
   - Hacer clic en "Consulta" de cualquier asesor
   - El formulario debe bajar automáticamente (scroll)
   - El select "Asesor de Preferencia" debe tener pre-seleccionado el asesor clickeado
   - Ver feedback visual verde durante 1 segundo

2. **Probar envío de formulario:**
   - Completar todos los campos requeridos
   - Enviar formulario
   - Verificar en phpMyAdmin que el registro en la tabla `leads` tenga el campo `advisor` con el nombre correcto

3. **Probar sin seleccionar asesor:**
   - Ir directamente al formulario sin hacer clic en ningún asesor
   - El campo "Asesor de Preferencia" debe estar vacío (opcional)
   - El formulario debe enviarse correctamente sin error

---

## 📊 Estructura de Datos

### Tabla `leads` - Columna `advisor`
```sql
advisor VARCHAR(100) NULL
```

**Valores posibles:**
- `"Alanis Gutierrez"`
- `"Jacmily Figuera"`
- `"Anny Navas"`
- `"Kenia Vergara"`
- `"Alberto Valencia"`
- `"Veronica Barboza"`
- `NULL` (si el usuario no seleccionó asesor)

---

## 🎨 Experiencia de Usuario

### Flujo 1: Cliente clickea asesor específico
```
1. Usuario ve tarjeta de "Alanis Gutierrez"
2. Cliente hace clic en botón "Consulta"
3. Página hace scroll suave hasta el formulario
4. Campo "Asesor de Preferencia" muestra "Alanis Gutierrez" pre-seleccionado
5. Campo tiene fondo verde suave por 1 segundo (feedback visual)
6. Cliente completa resto del formulario
7. Al enviar, el backend recibe: advisor: "Alanis Gutierrez"
```

### Flujo 2: Cliente usa formulario directamente
```
1. Usuario hace scroll hasta el formulario
2. Campo "Asesor de Preferencia" está vacío
3. Cliente puede seleccionar manualmente un asesor (opcional)
4. Cliente completa formulario
5. Al enviar, el backend recibe: advisor: "Nombre del Asesor" o null
```

---

## 🔧 Código Técnico

### JavaScript - Función de Pre-selección
```javascript
const handleAdvisorSelection = () => {
    const advisorButtons = document.querySelectorAll('[data-advisor]');
    const advisorSelect = document.getElementById('advisor');
    
    advisorButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const advisorName = button.dataset.advisor;
            if (advisorName) {
                // Pre-select the advisor
                advisorSelect.value = advisorName;
                
                // Visual feedback
                advisorSelect.classList.add('pre-selected');
                setTimeout(() => {
                    advisorSelect.classList.remove('pre-selected');
                }, 1000);
            }
        });
    });
};
```

### Backend - Validación
```javascript
body('advisor')
  .optional({ checkFalsy: true })
  .trim()
  .isLength({ max: 100 })
  .withMessage('Asesor inválido'),
```

### Backend - INSERT Query
```javascript
INSERT INTO leads (
  name, email, phone, message,
  salary, employment_status,
  advisor,  // 👈 NUEVO CAMPO
  project_name, property_id,
  ...
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ...)
```

---

## 📝 Notas Importantes

1. **Campo Opcional:** El campo `advisor` es opcional. Si el cliente no selecciona ningún asesor, se guarda `NULL` en la base de datos.

2. **Compatibilidad:** Los cambios son retrocompatibles. Los leads antiguos sin asesor tendrán `advisor = NULL`.

3. **Validación:** El backend valida que el nombre del asesor no exceda 100 caracteres.

4. **Analytics:** Considera agregar tracking de Google Analytics para saber qué asesores generan más conversiones:
   ```javascript
   gtag('event', 'advisor_selected', {
     'advisor_name': advisorName,
     'event_category': 'engagement'
   });
   ```

---

## 🧪 Testing Checklist

Antes de marcar como completo:

- [ ] Migración de base de datos ejecutada en producción
- [ ] Columna `advisor` existe en tabla `leads`
- [ ] Clic en botón de asesor pre-selecciona el asesor en formulario
- [ ] Feedback visual verde aparece durante 1 segundo
- [ ] Formulario se envía correctamente con asesor seleccionado
- [ ] Formulario se envía correctamente sin asesor seleccionado
- [ ] Registro en base de datos muestra nombre correcto del asesor
- [ ] Los 6 asesores funcionan correctamente
- [ ] Funciona en desktop y mobile
- [ ] No hay errores en la consola del navegador

---

## 📦 Archivos Modificados

1. `frontend/index.html` - Botones de asesores + campo de formulario
2. `frontend/js/components/form-handler.js` - Lógica de pre-selección
3. `frontend/css/components/cta-section.css` - Estilo visual
4. `api/routes/leads.js` - Backend API
5. `package.json` - Script de migración
6. `migrate-advisor.js` - Script de migración (nuevo)
7. `docstrash/backend/database/add-advisor-column.sql` - SQL de migración (nuevo)
8. `IMPLEMENTACION-ASESORES.md` - Este documento (nuevo)

---

## 🎯 Beneficios de la Implementación

✅ **Mejor experiencia de usuario:** Cliente no tiene que escribir el nombre del asesor
✅ **Datos más limpios:** Nombres estandarizados, sin errores tipográficos
✅ **Tracking mejorado:** Saber qué asesores generan más leads
✅ **Asignación automática:** El sistema sabe qué asesor debe contactar al cliente
✅ **Reportes más fáciles:** Filtrar leads por asesor en la base de datos

---

**Implementado por:** GitHub Copilot  
**Fecha:** 10 de Marzo, 2026  
**Status:** ✅ Código completo - Pendiente: Ejecutar migración en producción
