<?php
error_reporting(E_ALL);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=UTF-8');

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Missing config.php']);
    exit;
}

require_once $configPath;

handleCors();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $db = getDatabase();
    $stmt = $db->query('SELECT 1');
    $stmt->fetch();

    jsonResponse(true, 'ok', [
        'timestamp' => date('c')
    ], 200);
} catch (Throwable $e) {
    error_log('Health check error: ' . $e->getMessage());
    jsonResponse(false, 'db_error', [], 500);
}
?>
