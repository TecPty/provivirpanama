<?php
/**
 * API Router - Routes /api/* requests to appropriate handlers
 * This allows local development with PHP while maintaining Vercel compatibility
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Extract API endpoint
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/provivirpanama/api/', '', $path);
$endpoint = explode('?', $path)[0];

// Route to appropriate handler
switch ($endpoint) {
    case 'social-posts':
        include __DIR__ . '/backend/api/social-posts-db.php';
        break;
    
    case 'properties':
        include __DIR__ . '/backend/api/properties.php';
        break;
    
    case 'testimonials':
        include __DIR__ . '/backend/api/testimonials.php';
        break;
    
    case 'leads':
        include __DIR__ . '/backend/api/leads.php';
        break;
    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}
