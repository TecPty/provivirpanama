# Social Feed - Sistema Manual de Publicaciones

## Descripción
Sistema para gestionar publicaciones de Instagram y TikTok de forma manual con capacidad de escalamiento a automático.

## Base de Datos

### 1. Crear la tabla
Ejecuta el archivo SQL en phpMyAdmin:
```
backend/database/social_posts_table.sql
```

Esto creará la tabla `social_posts` con 3 posts de ejemplo.

## Cómo Agregar Nuevas Publicaciones

### Opción 1: Directamente en MySQL (phpMyAdmin)

1. Abre phpMyAdmin (http://localhost/phpmyadmin)
2. Selecciona tu base de datos
3. Ve a la tabla `social_posts`
4. Haz clic en "Insertar"
5. Llena los campos:
   - **platform**: `instagram` o `tiktok`
   - **image_url**: Ruta de la imagen (ej: `./assets/images/social/mi-post.jpg`)
   - **video_url**: Si es video, la ruta (opcional)
   - **caption**: Texto del post
   - **likes_count**: Número de likes
   - **comments_count**: Número de comentarios
   - **post_url**: URL al post real en Instagram/TikTok
   - **is_trending**: 1 para mostrar badge "TRENDING", 0 para no mostrar
   - **display_order**: Orden de aparición (menor número = primero)

### Opción 2: Via API (Postman/curl)

**Crear nuevo post:**
```bash
POST http://localhost/provivirpanama/backend/api/social-posts.php

{
  "platform": "instagram",
  "post_id": "unique_post_id",
  "image_url": "./assets/images/social/post-4.jpg",
  "video_url": null,
  "caption": "Nueva casa entregada 🏡",
  "likes_count": 523,
  "comments_count": 28,
  "post_url": "https://www.instagram.com/p/xxxxx",
  "is_trending": 1,
  "display_order": 4
}
```

**Actualizar post:**
```bash
PUT http://localhost/provivirpanama/backend/api/social-posts.php

{
  "id": 1,
  "platform": "instagram",
  "image_url": "./assets/images/social/post-1-updated.jpg",
  "caption": "Actualizado! 🏡✨",
  "likes_count": 1350,
  "comments_count": 92,
  ...
}
```

**Eliminar post (soft delete):**
```bash
DELETE http://localhost/provivirpanama/backend/api/social-posts.php?id=1
```

## Agregar Imágenes

1. Coloca las imágenes en: `frontend/assets/images/social/`
2. Usa nombres descriptivos: `post-proyecto-chorrera.jpg`
3. Para el avatar de Provivir: usa `logo-icon-provivir.png` (ya existe en `/logo/`)

## Campos Importantes

- **is_trending**: Mostrar badge morado "TRENDING"
- **display_order**: Controla el orden (1 = primero)
- **is_active**: 1 = visible, 0 = oculto (para eliminar sin borrar)
- **platform**: Cambia el estilo de la tarjeta (Instagram violeta, TikTok negro)

## Plan de Escalamiento a Automático

Cuando estés listo para automatizar, implementaremos:

### Fase 1: Instagram Basic Display API
- Auto-sincronización con tus últimos posts
- Actualización automática de likes/comentarios
- Se ejecuta cada X horas vía cron job

### Fase 2: TikTok Content Posting API
- Integración similar a Instagram
- Sincronización de videos
- Estadísticas en tiempo real

### Fase 3: Webhook en tiempo real
- Notificación instantánea cuando publicas
- Landing page actualizada automáticamente

## Estructura Actual

```
backend/
  └── api/
      └── social-posts.php          # API CRUD para posts
  └── database/
      └── social_posts_table.sql    # Tabla MySQL

frontend/
  └── js/
      └── components/
          └── social-feed-loader.js  # Carga dinámica de posts
  └── assets/
      └── images/
          └── social/                # Imágenes de posts
```

## Testing

1. Abre: http://localhost/provivirpanama/frontend/index.html
2. Desplázate a la sección "Caught on Camera"
3. Verás los 3 posts de ejemplo cargándose dinámicamente
4. Prueba la navegación (flechas y swipe en móvil)

## Notas

- El carrusel se actualiza automáticamente cada 5 segundos
- Máximo 6 posts se muestran por defecto (puedes cambiar el límite)
- Los posts inactivos (`is_active = 0`) no se muestran
