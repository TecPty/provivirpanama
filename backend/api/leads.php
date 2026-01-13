<?php
error_reporting(E_ALL);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=UTF-8');
ob_start();

define('ACCESS_ALLOWED', true);

try {
    require_once __DIR__ . '/config.php';
} catch (Throwable $e) {
    http_response_code(500);
    ob_end_clean();
    echo json_encode(['success' => false, 'error' => 'Config error']);
    exit;
}

ob_end_clean();
handleCORS();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

try {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data || json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        exit;
    }
    
    if (empty($data['name']) || empty($data['email']) || empty($data['phone'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing required fields']);
        exit;
    }
    
    $name = sanitizeInput($data['name']);
    $email = sanitizeInput($data['email']);
    $phone = sanitizeInput($data['phone']);
    $message = isset($data['message']) ? sanitizeInput($data['message']) : '';
    $propertyId = isset($data['property_id']) ? (int)$data['property_id'] : null;
    $source = 'website';
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email']);
        exit;
    }
    
    $db = getDatabase();
    
    $stmt = $db->prepare("
        INSERT INTO leads (name, email, phone, message, property_id, source, status, created_at) 
        VALUES (:name, :email, :phone, :message, :property_id, :source, 'new', NOW())
    ");
    
    $result = $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':message' => $message,
        ':property_id' => $propertyId,
        ':source' => $source
    ]);
    
    if (!$result) {
        throw new Exception('Failed to insert lead');
    }
    
    $leadId = $db->lastInsertId();
    
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => '¡Gracias por tu interés! Te contactaremos pronto.',
        'data' => ['id' => $leadId]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error']);
}
?>

