<?php
/**
 * API Configuration - Provivir Panama
 * Production Environment - GoDaddy Hosting
 */

// Environment
const ENVIRONMENT = 'production';

// Database Configuration
$dbConfig = [
    'host' => 'localhost',
    'database' => 'provivir_db',
    'username' => 'dev_provivir_user',
    'password' => '$c.r2+1(4vN^',
    'charset' => 'utf8mb4'
];

// CORS - Allowed Origins
$allowedOrigins = [
    'https://provivirpanama.com',
    'https://www.provivirpanama.com',
    'http://provivirpanama.com',
    'http://www.provivirpanama.com'
];

// Email Configuration (for notifications)
const EMAIL_FROM = 'noreply@provivirpanama.com';
const EMAIL_TO = 'ventas2@provivirpanama.com'; // Main sales email
const EMAIL_CC = ''; // Optional: additional recipients separated by comma

// Site Configuration
const SITE_NAME = 'Provivir Panama';
const SITE_URL = 'https://provivirpanama.com';

/**
 * Get Database Connection
 * @return PDO
 */
function getDatabase() {
    global $dbConfig;

    try {
        $dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['database']};charset={$dbConfig['charset']}";
        $pdo = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ]);

        return $pdo;
    } catch (PDOException $e) {
        error_log('Database connection error: ' . $e->getMessage());
        throw new Exception('Database connection failed');
    }
}

/**
 * Sanitize Input
 * @param mixed $value
 * @return mixed
 */
function sanitizeInput($value) {
    if (is_array($value)) {
        return array_map('sanitizeInput', $value);
    }

    return htmlspecialchars(trim((string)$value), ENT_QUOTES, 'UTF-8');
}

/**
 * Handle CORS
 */
function handleCors() {
    global $allowedOrigins;

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    // Allow requests from allowed origins
    if (in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        // Fallback for same-origin or local development
        header("Access-Control-Allow-Origin: *");
    }

    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

/**
 * Send JSON Response
 * @param bool $success
 * @param string $message
 * @param array $data
 * @param int $statusCode
 */
function jsonResponse($success, $message, $data = [], $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Send Email Notification
 * @param array $leadData
 * @return bool
 */
function sendLeadNotification($leadData) {
    $to = EMAIL_TO;
    $subject = '🔥 Nuevo Lead - ' . SITE_NAME;
    
    // Email body
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .field { margin: 15px 0; padding: 12px; background: white; border-radius: 4px; }
            .label { font-weight: bold; color: #374151; }
            .value { color: #111827; margin-top: 5px; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Nuevo Lead - " . SITE_NAME . "</h2>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <div class='label'>👤 Nombre:</div>
                    <div class='value'>" . htmlspecialchars($leadData['name']) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>📧 Email:</div>
                    <div class='value'><a href='mailto:" . htmlspecialchars($leadData['email']) . "'>" . htmlspecialchars($leadData['email']) . "</a></div>
                </div>
                
                <div class='field'>
                    <div class='label'>📱 Teléfono:</div>
                    <div class='value'><a href='tel:" . htmlspecialchars($leadData['phone']) . "'>" . htmlspecialchars($leadData['phone']) . "</a></div>
                </div>
                
                " . (!empty($leadData['salary']) ? "
                <div class='field'>
                    <div class='label'>💰 Salario:</div>
                    <div class='value'>" . htmlspecialchars($leadData['salary']) . "</div>
                </div>
                " : "") . "
                
                " . (!empty($leadData['employment_status']) ? "
                <div class='field'>
                    <div class='label'>💼 Estabilidad Laboral:</div>
                    <div class='value'>" . htmlspecialchars($leadData['employment_status']) . "</div>
                </div>
                " : "") . "
                
                " . (!empty($leadData['project_name']) ? "
                <div class='field'>
                    <div class='label'>🏠 Proyecto de Interés:</div>
                    <div class='value'>" . htmlspecialchars($leadData['project_name']) . "</div>
                </div>
                " : "") . "
                
                <div class='field'>
                    <div class='label'>💬 Mensaje:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($leadData['message'])) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>🌐 Origen:</div>
                    <div class='value'>" . htmlspecialchars($leadData['source']) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>⏰ Fecha:</div>
                    <div class='value'>" . date('d/m/Y H:i:s') . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>📍 IP:</div>
                    <div class='value'>" . htmlspecialchars($leadData['ip_address']) . "</div>
                </div>
            </div>
            
            <div class='footer'>
                <p>Este es un email automático de " . SITE_NAME . "<br>
                ID del Lead: #" . $leadData['id'] . "</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: " . EMAIL_FROM . "\r\n";
    
    if (EMAIL_CC) {
        $headers .= "Cc: " . EMAIL_CC . "\r\n";
    }
    
    // Send email
    $sent = mail($to, $subject, $message, $headers);
    
    if (!$sent) {
        error_log('Failed to send lead notification email');
    }
    
    return $sent;
}
