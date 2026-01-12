<?php
/**
 * ============================================================================
 * LEADS API - Provivir Panama
 * POST /api/leads.php - Capturar leads de contacto
 * ============================================================================
 */

define('ACCESS_ALLOWED', true);
require_once __DIR__ . '/config.php';

// Manejo de CORS y validación
handleCORS();
checkRateLimit();

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

try {
    // Leer datos JSON
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'JSON inválido']);
        exit;
    }
    
    // Validar campos requeridos
    $requiredFields = ['name', 'email', 'phone'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => "El campo '{$field}' es requerido"]);
            exit;
        }
    }
    
    // Sanitizar inputs
    $name = sanitizeInput($data['name']);
    $email = sanitizeInput($data['email']);
    $phone = sanitizeInput($data['phone']);
    $message = isset($data['message']) ? sanitizeInput($data['message']) : '';
    $propertyId = isset($data['property_id']) ? (int)$data['property_id'] : null;
    $source = isset($data['source']) ? sanitizeInput($data['source']) : 'website';
    
    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Email inválido']);
        exit;
    }
    
    // Obtener base de datos
    $db = getDatabase();
    
    // Información del cliente
    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    // Insertar lead
    $stmt = $db->prepare("
        INSERT INTO leads 
        (name, email, phone, message, property_id, source, ip_address, user_agent, status, created_at) 
        VALUES (:name, :email, :phone, :message, :property_id, :source, :ip_address, :user_agent, 'new', NOW())
    ");
    
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':message' => $message,
        ':property_id' => $propertyId,
        ':source' => $source,
        ':ip_address' => $ipAddress,
        ':user_agent' => $userAgent
    ]);
    
    $leadId = $db->lastInsertId();
    
    // Log en desarrollo
    if (ENVIRONMENT === 'development') {
        logRequest('POST /api/leads.php', 'POST', [
            'lead_id' => $leadId,
            'name' => $name,
            'email' => $email
        ]);
    }
    
    // Respuesta exitosa
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => '¡Gracias por tu interés! Te contactaremos pronto.',
        'data' => [
            'id' => $leadId
        ]
    ]);
    
} catch (PDOException $e) {
    logError('Database error in leads.php', $e);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error al procesar tu solicitud'
    ]);
} catch (Exception $e) {
    logError('Error in leads.php', $e);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error interno del servidor'
    ]);
}
