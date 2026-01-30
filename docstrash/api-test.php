<?php
/**
 * Simple test file to debug API routing
 */

error_reporting(E_ALL);
ini_set('display_errors', '1');

echo "API Test Debug\n";
echo "==================\n";
echo "REQUEST_URI: " . $_SERVER['REQUEST_URI'] . "\n";
echo "SCRIPT_FILENAME: " . $_SERVER['SCRIPT_FILENAME'] . "\n";
echo "__DIR__: " . __DIR__ . "\n";
echo "\n";

// Test direct file access
$test_file = __DIR__ . '/backend/api/social-posts-db.php';
echo "Test file path: " . $test_file . "\n";
echo "File exists: " . (file_exists($test_file) ? "YES" : "NO") . "\n";
echo "Is readable: " . (is_readable($test_file) ? "YES" : "NO") . "\n";
echo "\n";

// Test database connection
echo "Testing DB connection...\n";
try {
    $dsn = "mysql:host=localhost;dbname=provivir_db;charset=utf8mb4";
    $db = new PDO($dsn, 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    echo "✓ Database connection successful\n";
    
    // Test simple query
    $stmt = $db->query("SELECT COUNT(*) as count FROM social_posts");
    $result = $stmt->fetch();
    echo "✓ Social posts in DB: " . $result['count'] . "\n";
    
} catch (Exception $e) {
    echo "✗ Database connection failed: " . $e->getMessage() . "\n";
}
