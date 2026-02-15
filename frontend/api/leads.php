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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed', [], 405);
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || json_last_error() !== JSON_ERROR_NONE) {
    jsonResponse(false, 'Invalid JSON', [], 400);
}

// Honeypot
if (!empty($data['website'])) {
    jsonResponse(true, 'Thanks', [], 200);
}

$name = sanitizeInput($data['name'] ?? $data['fullName'] ?? '');
$email = sanitizeInput($data['email'] ?? '');
$phone = sanitizeInput($data['phone'] ?? '');
$message = sanitizeInput($data['message'] ?? '');
$project = sanitizeInput($data['project'] ?? '');
$salary = sanitizeInput($data['salary'] ?? '');
$employment = sanitizeInput($data['employment'] ?? '');

$utmSource = sanitizeInput($data['utm_source'] ?? '');
$utmMedium = sanitizeInput($data['utm_medium'] ?? '');
$utmCampaign = sanitizeInput($data['utm_campaign'] ?? '');

$propertyId = $data['property_id'] ?? null;
$propertyId = (is_numeric($propertyId) && (int)$propertyId > 0) ? (int)$propertyId : null;

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    jsonResponse(false, 'Missing required fields', [], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, 'Invalid email', [], 400);
}

$phonePattern = '/^(\+507)?[\s-]?\d{4}[\s-]?\d{4}$/';
if (!preg_match($phonePattern, $phone)) {
    jsonResponse(false, 'Invalid phone', [], 400);
}

// Keep project separate in its own column (don't merge with message)

$ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

try {
    $db = getDatabase();

    $stmt = $db->prepare(
        'INSERT INTO leads (email, name, phone, message, salary, employment_status, project_name, property_id, source, utm_source, utm_medium, utm_campaign, ip_address, user_agent, created_at)\n'
        . 'VALUES (:email, :name, :phone, :message, :salary, :employment_status, :project_name, :property_id, :source, :utm_source, :utm_medium, :utm_campaign, :ip_address, :user_agent, NOW())'
    );

    $source = 'website_form';

    try {
        $stmt->execute([
            ':email' => $email,
            ':name' => $name,
            ':phone' => $phone,
            ':message' => $message,
            ':salary' => $salary,
            ':employment_status' => $employment,
            ':project_name' => $project,
            ':property_id' => $propertyId,
            ':source' => $source,
            ':utm_source' => $utmSource,
            ':utm_medium' => $utmMedium,
            ':utm_campaign' => $utmCampaign,
            ':ip_address' => $ipAddress,
            ':user_agent' => $userAgent
        ]);
    } catch (PDOException $insertError) {
        $errorCode = $insertError->getCode();
        $isFkError = $errorCode === '23000' || strpos($insertError->getMessage(), 'foreign key') !== false;

        if ($isFkError && $propertyId !== null) {
            $stmt->execute([
                ':email' => $email,
                ':salary' => $salary,
                ':employment_status' => $employment,
                ':project_name' => $project,
                ':name' => $name,
                ':phone' => $phone,
                ':message' => $message,
                ':property_id' => null,
                ':source' => $source,
                ':utm_source' => $utmSource,
                ':utm_medium' => $utmMedium,
                ':utm_campaign' => $utmCampaign,
                ':ip_address' => $ipAddress,
                ':user_agent' => $userAgent
            ]);
        } else {
            throw $insertError;
        }
    }

    $leadId = $db->lastInsertId();

    // Send email notification to sales team
    $emailData = [
        'id' => $leadId,
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'message' => $message,
        'salary' => $salary,
        'employment_status' => $employment,
        'project_name' => $project,
        'source' => $source,
        'ip_address' => $ipAddress
    ];
    
    // Send notification (non-blocking - don't fail if email fails)
    try {
        sendLeadNotification($emailData);
    } catch (Exception $emailError) {
        error_log('Email notification failed: ' . $emailError->getMessage());
    }

    jsonResponse(true, 'Gracias por tu interés. Te contactaremos pronto.', [
        'id' => $leadId
    ], 201);

} catch (Throwable $e) {
    error_log('Lead insert error: ' . $e->getMessage());
    jsonResponse(false, 'Server error', [], 500);
}
?>
