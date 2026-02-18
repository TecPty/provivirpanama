<?php
/**
 * ============================================================================
 * CONFIGURATION FILE - Provivir Panama
 * AMBIENTE: Desarrollo (XAMPP Local)
 * 
 * IMPORTANTE:
 * - Este archivo NO debe subirse a Git (verificar .gitignore)
 * - Cambiar ENVIRONMENT a 'production' antes de deploy
 * - Actualizar credenciales cuando tengas hosting en producción
 * ============================================================================
 */

// Detectar ambiente
define('ENVIRONMENT', 'development'); // Cambiar a 'production' en hosting

// ============================================================================
// DATABASE CONFIGURATION (XAMPP Local)
// ============================================================================
$dbConfig = [
    'host' => 'localhost',
    'database' => 'provivir_db',
    'username' => 'root',           // Usuario por defecto XAMPP
    'password' => '',               // Sin password por defecto XAMPP
    'charset' => 'utf8mb4',
];

// ============================================================================
// EMAIL CONFIGURATION
// ============================================================================
define('ADMIN_EMAIL', 'ventas2@provivirpanama.com');
define('FROM_EMAIL', 'noreply@provivirpanama.com');
define('FROM_NAME', 'Provivir Panama');

// Configuración SMTP - REEMPLAZAR CON CREDENCIALES REALES
// 
// INSTRUCCIONES:
// 1. Si usas Gmail: 
//    - Host: smtp.gmail.com
//    - Port: 587
//    - Username: ventas2@provivirpanama.com
//    - Password: Tu App Password (16 caracteres, sin espacios)
//    - USE_SMTP: true
//
// 2. Si usas Mailtrap (testing):
//    - Host: sandbox.smtp.mailtrap.io
//    - Port: 587
//    - Username: tu_usuario_mailtrap
//    - Password: tu_password_mailtrap
//    - USE_SMTP: true
//
// 3. Si usas mail() función PHP (desarrollo local):
//    - Dejar vacío y USE_SMTP: false

define('SMTP_HOST', 'smtp.gmail.com');                    // Gmail SMTP
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'mercadeo@provivirpanama.com');  // Email de mercadeo (configurado por Alejandro)
define('SMTP_PASSWORD', 'xech zscn tpuv ykrb');          // App Password de Gmail (26 Enero 2026)
define('USE_SMTP', true);                                 // ✅ SMTP ACTIVO (fallback a mail() si falla)
define('FALLBACK_TO_MAIL', true);                         // Usar mail() si SMTP falla

// ============================================================================
// SECURITY & API
// ============================================================================
define('API_KEY', 'dev-key-change-in-production-2026');
define('RATE_LIMIT_REQUESTS', 100);      // 100 requests
define('RATE_LIMIT_WINDOW', 3600);       // por hora

// CORS - Dominios permitidos
$allowedOrigins = [
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:3000',
    'http://provivirpanama.local',
    'https://provivirpanama.com',          // Producción
    'https://www.provivirpanama.com',      // Producción www
];

// ============================================================================
// LOGGING
// ============================================================================
define('LOG_ERRORS', true);
define('LOG_FILE', __DIR__ . '/../../logs/errors.log');

// ============================================================================
// FILE UPLOADS
// ============================================================================
define('MAX_UPLOAD_SIZE', 10 * 1024 * 1024); // 10 MB
define('ALLOWED_UPLOAD_TYPES', ['jpg', 'jpeg', 'png', 'gif', 'webp']);
define('UPLOAD_DIR', __DIR__ . '/../../assets/uploads/');

// ============================================================================
// FUNCIONES GLOBALES
// ============================================================================

/**
 * Obtener conexión a la base de datos
 */
function getDatabase() {
    global $dbConfig;
    
    try {
        $dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['database']};charset={$dbConfig['charset']}";
        $pdo = new PDO($dsn, $dbConfig['username'], $dbConfig['password']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }
}

/**
 * Sanitizar entrada de usuario
 */
function sanitizeInput($input) {
    if (is_array($input)) {
        return array_map('sanitizeInput', $input);
    }
    
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Validar email
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validar teléfono
 */
function isValidPhone($phone) {
    $cleaned = preg_replace('/[^0-9+\-\s]/', '', $phone);
    return strlen($cleaned) >= 7;
}

/**
 * Manejo de CORS
 */
function handleCORS() {
    global $allowedOrigins;
    
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    // En desarrollo, permitir todos
    if (ENVIRONMENT === 'development') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');
        return;
    }
    
    // En producción, validar origen
    if (in_array($origin, $allowedOrigins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
    
    // Responder a preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

/**
 * Rate limiting
 */
function checkRateLimit() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $key = 'rate_limit_' . $ip;
    
    if (ENVIRONMENT === 'production') {
        // Implementar con Redis o sesiones en producción
        // Por ahora es placeholder
    }
}

/**
 * Logging
 */
function logRequest($endpoint, $method, $data = []) {
    if (!LOG_ERRORS) return;
    
    $log = date('Y-m-d H:i:s') . " | {$method} {$endpoint} | " . 
           json_encode($data) . " | IP: {$_SERVER['REMOTE_ADDR']}\n";
    
    @file_put_contents(LOG_FILE, $log, FILE_APPEND);
}

/**
 * Enviar respuesta JSON
 */
function jsonResponse($success, $message = '', $data = [], $httpCode = 200) {
    http_response_code($httpCode);
    header('Content-Type: application/json');
    
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

// ============================================================================
// VERIFICAR REQUISITOS (Opcional en desarrollo)
// ============================================================================
// if (!extension_loaded('pdo_mysql')) {
//     die('ERROR: Extensión PDO MySQL no está habilitada en PHP');
// }

?>
