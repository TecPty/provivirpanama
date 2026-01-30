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
    echo json_encode(['success' => false, 'error' => 'Error al cargar configuración']);
    exit;
}

ob_end_clean();
handleCORS();
checkRateLimit();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

try {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'JSON inválido']);
        exit;
    }
    
    $requiredFields = ['name', 'email', 'phone'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => "Campo requerido: {$field}"]);
            exit;
        }
    }
    
    $name = sanitizeInput($data['name']);
    $email = sanitizeInput($data['email']);
    $phone = sanitizeInput($data['phone']);
    $message = isset($data['message']) ? sanitizeInput($data['message']) : '';
    $propertyId = isset($data['property_id']) ? (int)$data['property_id'] : null;
    $source = isset($data['source']) ? sanitizeInput($data['source']) : 'website';
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Email inválido']);
        exit;
    }
    
    $db = getDatabase();
    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    $stmt = $db->prepare("
        INSERT INTO leads (name, email, phone, message, property_id, source, ip_address, user_agent, status, created_at) 
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
    sendLeadNotification($name, $email, $phone, $message, $propertyId);
    
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => '¡Gracias por tu interés! Te contactaremos pronto.',
        'data' => ['id' => $leadId]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error interno']);
}

function sendLeadNotification($name, $email, $phone, $message, $propertyId) {
    $to = ADMIN_EMAIL;
    $subject = "Nuevo Lead: " . $name . " - Provivir";
    
    $body = "<html><head><meta charset='UTF-8'><style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { background-color: #f4f4f4; padding: 20px; }
        .content { background-color: #fff; padding: 20px; border-radius: 5px; max-width: 600px; margin: 0 auto; }
        .header { border-bottom: 3px solid #007bff; padding-bottom: 10px; margin-bottom: 20px; }
        .header h2 { color: #007bff; margin: 0; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #007bff; }
        .value { margin-top: 5px; }
    </style></head><body>
        <div class='container'>
            <div class='content'>
                <div class='header'><h2>✉️ Nuevo Lead Capturado</h2></div>
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
                </div>";
    
    if ($propertyId) {
        try {
            $db = getDatabase();
            $stmt = $db->prepare("SELECT title FROM properties WHERE id = ?");
            $stmt->execute([$propertyId]);
            $property = $stmt->fetch();
            if ($property) {
                $body .= "<div class='field'><div class='label'>Propiedad:</div><div class='value'>" . htmlspecialchars($property['title']) . "</div></div>";
            }
        } catch (Exception $e) {}
    }
    
    if ($message) {
        $body .= "<div class='field'><div class='label'>Mensaje:</div><div class='value'>" . nl2br(htmlspecialchars($message)) . "</div></div>";
    }
    
    $body .= "<div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;'>
        <p>Email automático - " . date('Y-m-d H:i:s') . " | IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'N/A') . "</p>
    </div></div></div></body></html>";
    
    $headers = "MIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . FROM_EMAIL . " <" . FROM_EMAIL . ">\r\nReply-To: " . $email . "\r\n";
    
    @mail($to, $subject, $body, $headers);
}

?>

