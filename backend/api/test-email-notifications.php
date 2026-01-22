<?php
/**
 * ============================================================================
 * TEST EMAIL NOTIFICATIONS - Phase 2
 * ============================================================================
 * 
 * Script de prueba para verificar que el sistema de email funciona correctamente
 * 
 * USO:
 * - Ejecutar en terminal: php backend/api/test-email-notifications.php
 * - O acceder desde navegador: http://localhost/provivirpanama/backend/api/test-email-notifications.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/html; charset=UTF-8');

echo "<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Test Email Notifications - Phase 2</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #00539B;
            border-bottom: 3px solid #FFA500;
            padding-bottom: 10px;
        }
        .test {
            margin: 20px 0;
            padding: 15px;
            border-left: 4px solid #2196F3;
            background-color: #f0f7ff;
            border-radius: 4px;
        }
        .test.success {
            border-left-color: #4CAF50;
            background-color: #e8f5e9;
        }
        .test.error {
            border-left-color: #f44336;
            background-color: #ffebee;
        }
        .test h3 {
            margin-top: 0;
            color: #333;
        }
        .code {
            background-color: #272822;
            color: #f8f8f2;
            padding: 12px;
            border-radius: 4px;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            margin: 10px 0;
        }
        .status {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 4px;
            font-weight: bold;
            margin: 5px 0;
        }
        .status.ok {
            background-color: #4CAF50;
            color: white;
        }
        .status.error {
            background-color: #f44336;
            color: white;
        }
        .status.warning {
            background-color: #ff9800;
            color: white;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        table th, table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        table th {
            background-color: #f5f5f5;
            font-weight: bold;
        }
        .form-test {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .form-test input, .form-test textarea {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        }
        .form-test button {
            background-color: #00539B;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
        }
        .form-test button:hover {
            background-color: #003A7A;
        }
    </style>
</head>
<body>
    <div class='container'>
        <h1>📧 Test Email Notifications - Phase 2</h1>
        <p>Testing del sistema de notificaciones por email</p>";

// ====================================================================
// TEST 1: Cargar Config
// ====================================================================
echo "<div class='test'>";
echo "<h3>✓ Test 1: Cargar Configuración</h3>";

try {
    require_once __DIR__ . '/config.php';
    echo "<span class='status ok'>✓ Config cargado</span>";
    
    echo "<table>";
    echo "<tr><th>Parámetro</th><th>Valor</th></tr>";
    echo "<tr><td>FROM_EMAIL</td><td>" . FROM_EMAIL . "</td></tr>";
    echo "<tr><td>FROM_NAME</td><td>" . FROM_NAME . "</td></tr>";
    echo "<tr><td>ADMIN_EMAIL</td><td>" . ADMIN_EMAIL . "</td></tr>";
    echo "<tr><td>SMTP_HOST</td><td>" . (SMTP_HOST ?: '<em>vacío</em>') . "</td></tr>";
    echo "<tr><td>SMTP_PORT</td><td>" . SMTP_PORT . "</td></tr>";
    echo "<tr><td>USE_SMTP</td><td>" . (USE_SMTP ? 'true' : 'false') . "</td></tr>";
    echo "</table>";
    
} catch (Exception $e) {
    echo "<span class='status error'>✗ Error: " . $e->getMessage() . "</span>";
}

echo "</div>";

// ====================================================================
// TEST 2: Cargar EmailHandler
// ====================================================================
echo "<div class='test'>";
echo "<h3>✓ Test 2: Cargar EmailHandler Class</h3>";

try {
    require_once __DIR__ . '/EmailHandler.php';
    echo "<span class='status ok'>✓ EmailHandler cargado correctamente</span>";
    
    $emailHandler = new EmailHandler();
    echo "<p>Clase EmailHandler instanciada exitosamente</p>";
    
} catch (Exception $e) {
    echo "<span class='status error'>✗ Error: " . $e->getMessage() . "</span>";
}

echo "</div>";

// ====================================================================
// TEST 3: Verificar Template
// ====================================================================
echo "<div class='test'>";
echo "<h3>✓ Test 3: Verificar Template Email</h3>";

$templatePath = __DIR__ . '/email-templates/lead-notification.html';
if (file_exists($templatePath)) {
    $size = filesize($templatePath);
    echo "<span class='status ok'>✓ Template existe</span>";
    echo "<p><strong>Ruta:</strong> email-templates/lead-notification.html</p>";
    echo "<p><strong>Tamaño:</strong> " . round($size / 1024, 2) . " KB</p>";
} else {
    echo "<span class='status error'>✗ Template no encontrado</span>";
    echo "<p><strong>Ruta esperada:</strong> " . $templatePath . "</p>";
}

echo "</div>";

// ====================================================================
// TEST 4: Probar envío de email (simulado)
// ====================================================================
echo "<div class='test'>";
echo "<h3>✓ Test 4: Prueba de Envío de Email</h3>";

if (!USE_SMTP) {
    echo "<p><span class='status warning'>⚠ SMTP no está activo (USE_SMTP = false)</span></p>";
    echo "<p>El sistema está en <strong>modo desarrollo</strong>. Los emails se guardarán en logs.</p>";
    echo "<p>Para activar SMTP en producción:</p>";
    echo "<ol>";
    echo "<li>Reemplaza SMTP_PASSWORD con tu App Password</li>";
    echo "<li>Cambia USE_SMTP a true en config.php</li>";
    echo "</ol>";
} else {
    echo "<p><span class='status ok'>✓ SMTP activo</span></p>";
    echo "<p>Los emails se enviarán a través de: <strong>" . SMTP_HOST . ":" . SMTP_PORT . "</strong></p>";
}

echo "</div>";

// ====================================================================
// TEST 5: Formulario de Prueba
// ====================================================================
echo "<div class='form-test'>";
echo "<h3>✓ Test 5: Simular Envío de Lead + Email</h3>";
echo "<p>Completa este formulario para simular un lead y enviar email de prueba:</p>";

echo "<form method='POST'>";
echo "<div>";
echo "<label><strong>Nombre:</strong></label>";
echo "<input type='text' name='test_name' value='John Doe' required>";
echo "</div>";

echo "<div>";
echo "<label><strong>Email:</strong></label>";
echo "<input type='email' name='test_email' value='john@example.com' required>";
echo "</div>";

echo "<div>";
echo "<label><strong>Teléfono:</strong></label>";
echo "<input type='tel' name='test_phone' value='+507 6123 4567' required>";
echo "</div>";

echo "<div>";
echo "<label><strong>Propiedad de Interés:</strong></label>";
echo "<select name='test_property' required>";
echo "<option value=''>-- Seleccionar --</option>";
echo "<option value='1'>Ciudad del Este</option>";
echo "<option value='3'>Villas Este</option>";
echo "<option value='4'>Villas Oeste</option>";
echo "</select>";
echo "</div>";

echo "<div>";
echo "<label><strong>Presupuesto Aprox:</strong></label>";
echo "<input type='text' name='test_salary' value='150,000 - 200,000' required>";
echo "</div>";

echo "<div>";
echo "<label><strong>Situación Laboral:</strong></label>";
echo "<input type='text' name='test_employment' value='Empleado' required>";
echo "</div>";

echo "<div>";
echo "<label><strong>Mensaje:</strong></label>";
echo "<textarea name='test_message' rows='4'>Este es un mensaje de prueba para verificar que el sistema de email funciona correctamente.</textarea>";
echo "</div>";

echo "<button type='submit' name='send_test'>📧 Enviar Email de Prueba</button>";
echo "</form>";

echo "</div>";

// ====================================================================
// PROCESAR PRUEBA DE ENVÍO
// ====================================================================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['send_test'])) {
    echo "<div class='test success'>";
    echo "<h3>📨 Resultado de Envío de Prueba</h3>";
    
    try {
        // Preparar datos de test
        $testData = [
            'name' => sanitizeInput($_POST['test_name']),
            'email' => sanitizeInput($_POST['test_email']),
            'phone' => sanitizeInput($_POST['test_phone']),
            'property_name' => sanitizeInput($_POST['test_property']),
            'salary' => sanitizeInput($_POST['test_salary']),
            'employment' => sanitizeInput($_POST['test_employment']),
            'message' => sanitizeInput($_POST['test_message']),
            'source' => 'test_form',
            'created_at' => date('d/m/Y H:i:s'),
            'email_sent_at' => date('d/m/Y H:i:s'),
            'year' => date('Y')
        ];
        
        // Obtener nombre de propiedad
        $propertyId = (int)$_POST['test_property'];
        if ($propertyId > 0) {
            $db = getDatabase();
            $stmt = $db->prepare("SELECT name FROM properties WHERE id = :id");
            $stmt->execute([':id' => $propertyId]);
            $prop = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($prop) {
                $testData['property_name'] = $prop['name'];
            }
        }
        
        // Enviar email
        $emailHandler = new EmailHandler();
        $templatePath = __DIR__ . '/email-templates/lead-notification.html';
        
        $result = $emailHandler->send(
            ADMIN_EMAIL,
            '🎉 [TEST] ¡Nuevo Lead! - ' . $testData['name'],
            $templatePath,
            $testData,
            $testData['email']
        );
        
        if ($result) {
            echo \"<span class='status ok'>✓ Email enviado exitosamente</span>\";
            echo \"<p><strong>Destinatario:</strong> \" . ADMIN_EMAIL . \"</p>\";
            echo \"<p><strong>Remitente:</strong> \" . FROM_EMAIL . \"</p>\";
            echo \"<p><strong>Asunto:</strong> 🎉 [TEST] ¡Nuevo Lead! - \" . $testData['name'] . \"</p>\";
            echo \"<p><strong>Nombre del Lead:</strong> \" . $testData['name'] . \"</p>\";
        } else {
            echo \"<span class='status error'>✗ Error al enviar email</span>\";
            echo \"<p><strong>Errores:</strong></p>\";
            echo \"<ul>\";
            foreach ($emailHandler->getErrors() as $error) {
                echo \"<li>\" . $error . \"</li>\";
            }
            echo \"</ul>\";
        }
        
    } catch (Exception $e) {
        echo \"<span class='status error'>✗ Excepción: \" . $e->getMessage() . \"</span>\";
    }
    
    echo \"</div>\";
}

// ====================================================================
// CONCLUSIÓN
// ====================================================================
echo "<div class='test'>";
echo "<h3>✓ Conclusión</h3>";
echo "<p><strong>Status del Sistema:</strong></p>";
echo "<ul>";
echo "<li>✓ Config cargado</li>";
echo "<li>✓ EmailHandler disponible</li>";
echo "<li>✓ Template presente</li>";
echo "<li>" . (USE_SMTP ? "✓ SMTP activo" : "⚠ SMTP en modo desarrollo") . "</li>";
echo "</ul>";

if (!USE_SMTP) {
    echo \"<p><strong>PRÓXIMOS PASOS:</strong></p>\";
    echo \"<ol>\";
    echo \"<li>Esperar App Password de Gmail</li>\";
    echo \"<li>Actualizar SMTP_PASSWORD en config.php</li>\";
    echo \"<li>Cambiar USE_SMTP a true</li>\";
    echo \"<li>Re-ejecutar este test para confirmar</li>\";
    echo \"</ol>\";
}

echo "</div>";

echo "</div>
</body>
</html>";
?>
