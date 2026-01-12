<?php
/**
 * ============================================================================
 * EXAMPLE CONFIGURATION FILE - Provivir Panama
 * 
 * INSTRUCCIONES:
 * 1. Copia este archivo como 'config.php'
 * 2. Actualiza los valores con tus credenciales reales
 * 3. NUNCA subas config.php a Git (debe estar en .gitignore)
 * ============================================================================
 */

define('ENVIRONMENT', 'development'); // development | production

$dbConfig = [
    'host' => 'localhost',
    'database' => 'provivir_db',
    'username' => 'TU_USUARIO_DB',
    'password' => 'TU_PASSWORD_DB',
    'charset' => 'utf8mb4',
];

define('API_KEY', 'GENERA_UNA_CLAVE_SEGURA_AQUI');
define('ADMIN_EMAIL', 'tu-email@ejemplo.com');
define('FROM_EMAIL', 'noreply@provivirpanama.com');
define('FROM_NAME', 'Provivir Panama');

$allowedOrigins = [
    'http://localhost',
    'https://tudominio.com',
];
