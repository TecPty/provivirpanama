<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', '1');

ob_start();

try {
    define('ACCESS_ALLOWED', true);
    require_once __DIR__ . '/config.php';
    
    echo json_encode([
        'status' => 'config loaded OK',
        'environment' => ENVIRONMENT,
        'admin_email' => ADMIN_EMAIL
    ]);
} catch (Throwable $e) {
    echo json_encode([
        'error' => 'Exception in config',
        'message' => $e->getMessage(),
        'line' => $e->getLine(),
        'file' => $e->getFile()
    ]);
}

ob_end_flush();
?>
