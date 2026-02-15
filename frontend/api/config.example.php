<?php
/**
 * API CONFIG (example)
 * Copy to config.php and fill real credentials on the server.
 */

// Environment: development | production
const ENVIRONMENT = 'production';

// Database config
$dbConfig = [
    'host' => 'localhost',
    'database' => 'provivir_db',
    'username' => 'provivir_user',
    'password' => 'CHANGE_ME',
    'charset' => 'utf8mb4'
];

// Allowed origins for CORS
$allowedOrigins = [
    'https://provivirpanama.com',
    'https://www.provivirpanama.com'
];

function getDatabase() {
    global $dbConfig;

    $dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['database']};charset={$dbConfig['charset']}";
    $pdo = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);

    return $pdo;
}

function sanitizeInput($value) {
    if (is_array($value)) {
        return array_map('sanitizeInput', $value);
    }

    return htmlspecialchars(trim((string)$value), ENT_QUOTES, 'UTF-8');
}

function handleCors() {
    global $allowedOrigins;

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (ENVIRONMENT === 'development') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        return;
    }

    if ($origin && in_array($origin, $allowedOrigins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
    }
}

function jsonResponse($success, $message, $data = [], $httpCode = 200) {
    http_response_code($httpCode);
    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}
?>
