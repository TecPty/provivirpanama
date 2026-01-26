<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/EmailHandler.php';
echo "====================================================\n";
echo "TEST RÁPIDO - SISTEMA DE EMAIL\n";
echo "====================================================\n\n";
echo "1  CONFIGURACIÓN:\n";
echo "    SMTP: " . SMTP_USERNAME . " @ " . SMTP_HOST . "\n";
echo "    USE_SMTP: " . (USE_SMTP ? " ACTIVO" : " INACTIVO") . "\n";
echo "    ADMIN_EMAIL: " . ADMIN_EMAIL . "\n";
echo "\n2  EmailHandler cargado\n";
$emailHandler = new EmailHandler();
echo "3  Template: ";
$path = __DIR__ . '/email-templates/lead-notification.html';
echo (file_exists($path) ? "\n" : "\n");
echo "\n4  Enviando email de prueba...\n";
$data = ['name' => 'Test', 'email' => 'test@example.com', 'phone' => '+507 6123-4567', 'message' => 'Test email', 'property_name' => 'Ciudad del Este', 'salary' => '150,000', 'employment' => 'Empleado', 'source' => 'test', 'created_at' => date('d/m/Y H:i:s'), 'email_sent_at' => date('d/m/Y H:i:s'), 'year' => date('Y')];
$result = $emailHandler->send(ADMIN_EMAIL, '[TEST] ¡Nuevo Lead!', $path, $data, $data['email']);
if ($result) {
    echo " EMAIL ENVIADO EXITOSAMENTE!\n";
} else {
    echo " Error: " . implode(", ", $emailHandler->getErrors()) . "\n";
}
?>
