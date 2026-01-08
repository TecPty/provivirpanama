<?php
/**
 * ============================================================================
 * TESTIMONIALS API ENDPOINT
 * Handles testimonial operations
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
        sendResponse(false, 'Database connection failed: ' . $e->getMessage(), [], 500);
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
 * GET - Fetch all testimonials
 */
function handleGet($pdo) {
    try {
        $stmt = $pdo->prepare('
            SELECT * FROM testimonials 
            WHERE status = "active"
            ORDER BY display_order ASC, created_at DESC
        ');
        $stmt->execute();
        $testimonials = $stmt->fetchAll();
        
        sendResponse(true, 'Testimonials fetched successfully', $testimonials);
    } catch (PDOException $e) {
        sendResponse(false, 'Error fetching testimonials: ' . $e->getMessage(), [], 500);
    }
}

/**
 * POST - Create new testimonial (Admin only)
 */
function handlePost($pdo) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        $required = ['name', 'testimonial'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || empty($input[$field])) {
                sendResponse(false, "Missing required field: $field", [], 400);
            }
        }
        
        $stmt = $pdo->prepare('
            INSERT INTO testimonials 
            (name, location, project, testimonial, image, rating, display_order, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, "active")
        ');
        
        $stmt->execute([
            $input['name'],
            $input['location'] ?? '',
            $input['project'] ?? '',
            $input['testimonial'],
            $input['image'] ?? '',
            $input['rating'] ?? 5,
            $input['display_order'] ?? 0
        ]);
        
        $testimonialId = $pdo->lastInsertId();
        
        sendResponse(true, 'Testimonial created successfully', ['id' => $testimonialId], 201);
    } catch (PDOException $e) {
        sendResponse(false, 'Error creating testimonial: ' . $e->getMessage(), [], 500);
    }
}

/**
 * Route request to appropriate handler
 */
$pdo = getDBConnection();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        handleGet($pdo);
        break;
    
    case 'POST':
        handlePost($pdo);
        break;
    
    default:
        sendResponse(false, 'Method not allowed', [], 405);
        break();
}

?>