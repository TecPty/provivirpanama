<?php
header('Content-Type: application/json; charset=UTF-8');
error_reporting(E_ALL);
ini_set('display_errors', '0');

ob_start();

define('ACCESS_ALLOWED', true);
require_once __DIR__ . '/config.php';

ob_end_clean();

// Simular POST data
$_SERVER['REQUEST_METHOD'] = 'POST';

// Test data
$testData = [
    'name' => 'Test User',
    'email' => 'test@ejemplo.com',
    'phone' => '6123456789',
    'message' => 'Este es un mensaje de prueba'
];

try {
    // Validaciones básicas
    if (empty($testData['name'])) {
        throw new Exception("El campo 'name' es requerido");
    }
    if (empty($testData['email'])) {
        throw new Exception("El campo 'email' es requerido");
    }
    if (empty($testData['phone'])) {
        throw new Exception("El campo 'phone' es requerido");
    }
    
    // Sanitizar
    $name = sanitizeInput($testData['name']);
    $email = sanitizeInput($testData['email']);
    $phone = sanitizeInput($testData['phone']);
    $message = isset($testData['message']) ? sanitizeInput($testData['message']) : '';
    
    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Email inválido");
    }
    
    // Obtener BD
    $db = getDatabase();
    
    // Insertar lead
    $stmt = $db->prepare("
        INSERT INTO leads 
        (name, email, phone, message, source, status, created_at) 
        VALUES (:name, :email, :phone, :message, 'test_api', 'new', NOW())
    ");
    
    $result = $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':message' => $message
    ]);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Lead insertado correctamente',
            'lead_id' => $db->lastInsertId()
        ]);
    } else {
        throw new Exception("Error al insertar lead");
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

?>
