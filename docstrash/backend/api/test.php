<?php
// Test simple
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', '1');

ob_start();

echo json_encode([
    'test' => 'OK',
    'php_version' => phpversion(),
    'pdo_loaded' => extension_loaded('pdo') ? 'yes' : 'no',
    'pdo_mysql_loaded' => extension_loaded('pdo_mysql') ? 'yes' : 'no'
]);

ob_end_flush();
?>
