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
    
    // Enviar notificación por email al equipo de ventas
    sendLeadNotification($name, $email, $phone, $message, $propertyId);
    
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

/**
 * ============================================================================
 * FUNCIÓN: Enviar notificación de lead por email
 * ============================================================================
 */
function sendLeadNotification($name, $email, $phone, $message, $propertyId) {
    $to = ADMIN_EMAIL;
    $subject = "Nuevo Lead: " . $name . " - Provivir";
    
    // Construir cuerpo del email
    $body = "
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { background-color: #f4f4f4; padding: 20px; }
            .content { background-color: #fff; padding: 20px; border-radius: 5px; max-width: 600px; margin: 0 auto; }
            .header { border-bottom: 3px solid #007bff; padding-bottom: 10px; margin-bottom: 20px; }
            .header h2 { color: #007bff; margin: 0; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #007bff; }
            .value { margin-top: 5px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='content'>
                <div class='header'>
                    <h2>✉️ Nuevo Lead Capturado</h2>
                </div>
                
                <div class='field'>
                    <div class='label'>Nombre:</div>
                    <div class='value'>" . htmlspecialchars($name) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></div>
                </div>
                
                <div class='field'>
                    <div class='label'>Teléfono:</div>
                    <div class='value'><a href='tel:" . htmlspecialchars($phone) . "'>" . htmlspecialchars($phone) . "</a></div>
                </div>
    ";
    
    // Si hay ID de propiedad, obtener nombre de la propiedad
    if ($propertyId) {
        try {
            $db = getDatabase();
            $stmt = $db->prepare("SELECT title FROM properties WHERE id = ?");
            $stmt->execute([$propertyId]);
            $property = $stmt->fetch();
            
            if ($property) {
                $body .= "
                <div class='field'>
                    <div class='label'>Propiedad de Interés:</div>
                    <div class='value'>" . htmlspecialchars($property['title']) . "</div>
                </div>
                ";
            }
        } catch (Exception $e) {
            // Silenciar errores al obtener propiedad
        }
    }
    
    // Mensaje del usuario
    if ($message) {
        $body .= "
                <div class='field'>
                    <div class='label'>Mensaje:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
        ";
    }
    
    $body .= "
                <div class='footer'>
                    <p>Este email fue generado automáticamente desde provivir.com</p>
                    <p>Fecha: " . date('Y-m-d H:i:s') . " | IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'N/A') . "</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Headers del email
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . FROM_EMAIL . " <" . FROM_EMAIL . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Priority: 1\r\n";
    
    // Enviar email
    $emailSent = @mail($to, $subject, $body, $headers);
    
    // Log de envío de email
    if (ENVIRONMENT === 'development') {
        $logMsg = ($emailSent ? 'EMAIL ENVIADO' : 'EMAIL FALLÓ') . " a {$to} para lead {$name}\n";
        @file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " | " . $logMsg, FILE_APPEND);
    }
    
    return $emailSent;
}

function logError($context, $exception) {
    if (!LOG_ERRORS) return;
    
    $log = date('Y-m-d H:i:s') . " | ERROR | {$context} | " . 
           $exception->getMessage() . " | File: " . $exception->getFile() . 
           ":" . $exception->getLine() . "\n";
    
    @file_put_contents(LOG_FILE, $log, FILE_APPEND);
