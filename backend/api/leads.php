<?php
/**
 * ============================================================================
 * LEADS API ENDPOINT
 * Handles lead capture and management
 * ============================================================================
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

/**
 * Database connection
 */
function getDBConnection() {
    global $dbConfig;
    
    try {
        $dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['database']};charset=utf8mb4";
        $pdo = new PDO($dsn, $dbConfig['username'], $dbConfig['password']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch (PDOException $e) {
        sendResponse(false, 'Database connection failed', [], 500);
        exit();
    }
}

/**
 * Send JSON response
 */
function sendResponse($success, $message = '', $data = [], $httpCode = 200) {
    http_response_code($httpCode);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit();
}

/**
 * Validate email
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Send email notification to admin
 */
function sendEmailNotification($leadData) {
    $to = ADMIN_EMAIL;
    $subject = 'Nuevo Lead - Provivir Panama';
    
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #005B96; color: white; padding: 20px; text-align: center; }
            .content { background: #f8f9fa; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2C3E50; }
            .value { color: #6C757D; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🏠 Nuevo Lead</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Email:</span>
                    <span class='value'>{$leadData['email']}</span>
                </div>
                <div class='field'>
                    <span class='label'>Fuente:</span>
                    <span class='value'>{$leadData['source']}</span>
                </div>
                <div class='field'>
                    <span class='label'>Fecha:</span>
                    <span class='value'>" . date('Y-m-d H:i:s') . "</span>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>' . "\r\n";
    
    // Send email (configure mail server in production)
    @mail($to, $subject, $message, $headers);
}

/**
 * POST - Create new lead
 */
function handlePost($pdo) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate email
        if (!isset($input['email']) || !isValidEmail($input['email'])) {
            sendResponse(false, 'Invalid email address', [], 400);
        }
        
        // Get client info
        $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
        
        // Insert lead
        $stmt = $pdo->prepare('
            INSERT INTO leads 
            (email, name, phone, message, property_id, source, utm_source, utm_medium, utm_campaign, ip_address, user_agent, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "new")
        ');
        
        $stmt->execute([
            $input['email'],
            $input['name'] ?? null,
            $input['phone'] ?? null,
            $input['message'] ?? null,
            $input['property_id'] ?? null,
            $input['source'] ?? 'website',
            $input['utm_source'] ?? null,
            $input['utm_medium'] ?? null,
            $input['utm_campaign'] ?? null,
            $ipAddress,
            $userAgent
        ]);
        
        $leadId = $pdo->lastInsertId();
        
        // Send email notification
        sendEmailNotification($input);
        
        sendResponse(true, 'Lead captured successfully', ['id' => $leadId], 201);
    } catch (PDOException $e) {
        sendResponse(false, 'Error capturing lead', [], 500);
    }
}

/**
 * Route request to appropriate handler
 */
$pdo = getDBConnection();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        handlePost($pdo);
        break;
    
    default:
        sendResponse(false, 'Method not allowed', [], 405);
        break;
}

?>