<?php
error_reporting(E_ALL);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=UTF-8');
ob_start();

define('ACCESS_ALLOWED', true);

try {
    require_once __DIR__ . '/config.php';
    require_once __DIR__ . '/EmailHandler.php';
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
    $salary = isset($data['salary']) ? sanitizeInput($data['salary']) : 'No especificado';
    $employment = isset($data['employment']) ? sanitizeInput($data['employment']) : 'No especificado';
    $source = 'website_form';
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email']);
        exit;
    }
    
    $db = getDatabase();
    
    // Obtener nombre de la propiedad para el email
    $propertyName = 'No especificada';
    if ($propertyId) {
        $propStmt = $db->prepare("SELECT name FROM properties WHERE id = :id LIMIT 1");
        $propStmt->execute([':id' => $propertyId]);
        $prop = $propStmt->fetch(PDO::FETCH_ASSOC);
        if ($prop) {
            $propertyName = $prop['name'];
        }
    }
    
    // Insertar lead en BD
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
    
    // ========================================================================
    // ENVIAR EMAIL DE NOTIFICACIÓN AL ADMIN
    // ========================================================================
    
    try {
        $emailHandler = new EmailHandler();
        
        // Preparar datos para el template
        $emailData = [
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'phone_clean' => preg_replace('/[^0-9]/', '', $phone),
            'message' => $message,
            'property_name' => $propertyName,
            'salary' => $salary,
            'employment' => $employment,
            'source' => 'Formulario Web',
            'created_at' => date('d/m/Y H:i:s'),
            'email_sent_at' => date('d/m/Y H:i:s'),
            'year' => date('Y')
        ];
        
        // Ruta al template
        $templatePath = __DIR__ . '/email-templates/lead-notification.html';
        
        // Enviar email al admin
        $sent = $emailHandler->send(
            ADMIN_EMAIL,
            "🎉 ¡Nuevo Lead! - " . $name,
            $templatePath,
            $emailData,
            $email
        );
        
        if (!$sent) {
            // Log del error pero no romper el flujo
            error_log("Email no enviado para lead ID $leadId: " . $emailHandler->getLastError());
        } else {
            error_log("Email enviado exitosamente para lead ID $leadId a " . ADMIN_EMAIL);
        }
        
    } catch (Exception $emailError) {
        // Log del error pero continuar
        error_log("Excepción al enviar email del lead $leadId: " . $emailError->getMessage());
    }
    
    // ========================================================================
    // ENVIAR EMAIL DE CONFIRMACIÓN AL CLIENTE (opcional)
    // ========================================================================
    
    // Descomentar si deseas enviar confirmación al cliente
    /*
    try {
        $emailHandler = new EmailHandler();
        $confirmationData = [
            'name' => $name,
            'property_name' => $propertyName,
            'year' => date('Y')
        ];
        
        $confirmationTemplate = __DIR__ . '/email-templates/customer-confirmation.html';
        // Este template no existe aún, crear si es necesario
        
        $emailHandler->send(
            $email,
            "Confirmamos tu solicitud - Provivir Panamá",
            $confirmationTemplate,
            $confirmationData
        );
    } catch (Exception $e) {
        error_log("No se envió confirmación al cliente: " . $e->getMessage());
    }
    */
    
    // ========================================================================
    // RESPUESTA AL CLIENTE
    // ========================================================================
    
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => '¡Gracias por tu interés! Te contactaremos pronto.',
        'data' => [
            'id' => $leadId,
            'email_sent' => true
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    error_log("Error en leads.php: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Server error']);
}
?>


