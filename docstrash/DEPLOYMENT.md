# 🚀 Guía de Deployment - Provivir Panamá

## Checklist Pre-Deployment

### ✅ Seguridad
- [ ] Cambiar todas las contraseñas de base de datos
- [ ] Generar nuevas API keys
- [ ] Configurar variables de entorno
- [ ] Habilitar HTTPS con certificado SSL
- [ ] Configurar CORS correctamente
- [ ] Implementar rate limiting
- [ ] Configurar firewall del servidor

### ✅ Configuración
- [ ] Actualizar `backend/api/config.php` con credenciales de producción
- [ ] Configurar `ENVIRONMENT = 'production'`
- [ ] Actualizar URLs en `frontend/js/config.js`
- [ ] Configurar emails de notificación
- [ ] Configurar Google Analytics
- [ ] Configurar CMS (si aplica)

### ✅ Base de Datos
- [ ] Crear base de datos en producción
- [ ] Importar schema.sql
- [ ] Configurar usuario y permisos
- [ ] Configurar backups automáticos
- [ ] Verificar conexión desde servidor

### ✅ Assets
- [ ] Optimizar todas las imágenes
- [ ] Subir logo y favicon
- [ ] Subir imágenes de propiedades
- [ ] Subir logos de partners
- [ ] Verificar rutas de assets

### ✅ Testing
- [ ] Probar formularios
- [ ] Verificar carga de propiedades
- [ ] Verificar testimonios
- [ ] Probar en múltiples navegadores
- [ ] Probar en múltiples dispositivos
- [ ] Verificar velocidad de carga
- [ ] Probar emails de notificación

---

## Deployment en Servidor Propio

### 1. Preparar Servidor

#### Requisitos del Servidor
- Ubuntu 20.04+ / CentOS 7+ / Debian 10+
- PHP 8.0+
- MySQL 8.0+ / MariaDB 10.5+
- Apache 2.4+ o Nginx 1.18+
- SSL Certificate (Let's Encrypt recomendado)
- Mínimo 2GB RAM
- Mínimo 20GB disco

#### Instalar Dependencias (Ubuntu/Debian)

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Apache, PHP y MySQL
sudo apt install -y apache2 php8.0 php8.0-mysql php8.0-curl php8.0-json php8.0-mbstring mysql-server

# Habilitar módulos de Apache
sudo a2enmod rewrite ssl headers deflate expires

# Instalar Certbot para SSL
sudo apt install -y certbot python3-certbot-apache
```

### 2. Configurar MySQL

```bash
# Acceder a MySQL
sudo mysql

# Crear base de datos y usuario
mysql> CREATE DATABASE provivir_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
mysql> CREATE USER 'provivir_user'@'localhost' IDENTIFIED BY 'PASSWORD_SEGURA_AQUI';
mysql> GRANT ALL PRIVILEGES ON provivir_db.* TO 'provivir_user'@'localhost';
mysql> FLUSH PRIVILEGES;
mysql> EXIT;

# Importar schema
mysql -u provivir_user -p provivir_db < backend/database/schema.sql
```

### 3. Subir Archivos al Servidor

```bash
# Desde tu máquina local
scp -r provivirpanama.com/ usuario@tu-servidor:/var/www/

# O usar SFTP/FTP
# O usar Git deploy
```

### 4. Configurar Permisos

```bash
# En el servidor
sudo chown -R www-data:www-data /var/www/provivirpanama.com
sudo chmod -R 755 /var/www/provivirpanama.com
sudo chmod -R 775 /var/www/provivirpanama.com/frontend/assets/images
```

### 5. Configurar Apache VirtualHost

```bash
# Crear archivo de configuración
sudo nano /etc/apache2/sites-available/provivirpanama.conf
```

```apache
<VirtualHost *:80>
    ServerName provivirpanama.com
    ServerAlias www.provivirpanama.com
    
    DocumentRoot /var/www/provivirpanama.com/frontend
    
    <Directory /var/www/provivirpanama.com/frontend>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # API Routing
    Alias /api /var/www/provivirpanama.com/backend/api
    <Directory /var/www/provivirpanama.com/backend/api>
        Options -Indexes
        AllowOverride None
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/provivir_error.log
    CustomLog ${APACHE_LOG_DIR}/provivir_access.log combined
</VirtualHost>
```

```bash
# Habilitar sitio
sudo a2ensite provivirpanama
sudo a2dissite 000-default
sudo systemctl restart apache2
```

### 6. Configurar SSL con Let's Encrypt

```bash
# Obtener certificado SSL gratuito
sudo certbot --apache -d provivirpanama.com -d www.provivirpanama.com

# Certbot configurará automáticamente HTTPS
# Verificar renovación automática
sudo certbot renew --dry-run
```

### 7. Optimizar PHP para Producción

```bash
# Editar php.ini
sudo nano /etc/php/8.0/apache2/php.ini
```

```ini
# Configuraciones recomendadas
upload_max_filesize = 10M
post_max_size = 10M
max_execution_time = 60
memory_limit = 256M
display_errors = Off
error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT
log_errors = On
error_log = /var/log/php/error.log
```

```bash
# Reiniciar Apache
sudo systemctl restart apache2
```

### 8. Configurar Backups Automáticos

```bash
# Crear script de backup
sudo nano /usr/local/bin/backup-provivir.sh
```

```bash
#!/bin/bash

# Variables
BACKUP_DIR="/var/backups/provivir"
DB_NAME="provivir_db"
DB_USER="provivir_user"
DB_PASS="TU_PASSWORD"
DATE=$(date +%Y%m%d_%H%M%S)

# Crear directorio si no existe
mkdir -p $BACKUP_DIR

# Backup Base de Datos
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Backup Archivos
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/provivirpanama.com

# Eliminar backups antiguos (mantener últimos 7 días)
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

echo "Backup completado: $DATE"
```

```bash
# Dar permisos de ejecución
sudo chmod +x /usr/local/bin/backup-provivir.sh

# Programar en crontab (backup diario a las 2am)
sudo crontab -e
```

```cron
0 2 * * * /usr/local/bin/backup-provivir.sh >> /var/log/provivir-backup.log 2>&1
```

### 9. Configurar Firewall

```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 10. Monitoreo y Logs

```bash
# Ver logs en tiempo real
sudo tail -f /var/log/apache2/provivir_error.log
sudo tail -f /var/log/mysql/error.log
sudo tail -f /var/log/php/error.log

# Configurar logrotate para evitar logs gigantes
sudo nano /etc/logrotate.d/provivir
```

```
/var/log/apache2/provivir*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 640 www-data adm
    sharedscripts
    postrotate
        systemctl reload apache2 > /dev/null 2>&1
    endscript
}
```

---

## Verificación Post-Deployment

### Tests Esenciales

1. **Conectividad**
```bash
curl -I https://provivirpanama.com
# Debe retornar 200 OK
```

2. **API Endpoints**
```bash
curl https://provivirpanama.com/api/properties.php
# Debe retornar JSON con propiedades
```

3. **SSL/HTTPS**
```bash
# Verificar certificado SSL
openssl s_client -connect provivirpanama.com:443 -servername provivirpanama.com
```

4. **Performance**
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

5. **SEO**
- Google Search Console
- Bing Webmaster Tools

### Métricas Objetivo

- ✅ Lighthouse Performance: 90+
- ✅ Lighthouse Accessibility: 95+
- ✅ Lighthouse SEO: 100
- ✅ Time to First Byte: < 600ms
- ✅ First Contentful Paint: < 1.8s
- ✅ Largest Contentful Paint: < 2.5s
- ✅ Cumulative Layout Shift: < 0.1

---

## Mantenimiento

### Tareas Diarias
- Revisar logs de errores
- Monitorear uso de recursos (CPU, RAM, disco)
- Verificar backups automáticos

### Tareas Semanales
- Revisar analytics y métricas
- Verificar formularios de leads
- Revisar emails de notificación

### Tareas Mensuales
- Actualizar dependencias (PHP, MySQL)
- Revisar y optimizar base de datos
- Auditoría de seguridad
- Verificar certificado SSL

### Tareas Trimestrales
- Revisar y actualizar contenido
- Análisis de performance
- A/B testing de conversión

---

## Troubleshooting

### Problema: 500 Internal Server Error

```bash
# Revisar logs
sudo tail -50 /var/log/apache2/provivir_error.log

# Verificar permisos
sudo chown -R www-data:www-data /var/www/provivirpanama.com

# Verificar PHP
php -v
php -m  # Ver módulos instalados
```

### Problema: Base de Datos no Conecta

```bash
# Verificar MySQL
sudo systemctl status mysql

# Probar conexión
mysql -u provivir_user -p

# Verificar credenciales en config.php
```

### Problema: Assets no Cargan

```bash
# Verificar permisos de carpeta
ls -la /var/www/provivirpanama.com/frontend/assets/

# Verificar rutas en navegador
```

---

## Contacto de Soporte

Para asistencia técnica:
- Email: luisrissopa@gmail.com
- Emergencias: +507 6456-0263

---

**¡Deployment exitoso! 🎉**