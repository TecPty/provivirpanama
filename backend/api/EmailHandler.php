<?php
/**
 * ============================================================================
 * EMAIL HANDLER CLASS - Provivir Panama
 * ============================================================================
 * 
 * Maneja el envío de emails usando SMTP (Gmail, SendGrid, etc.)
 * Soporta templates HTML y texto plano
 * 
 * Uso:
 *   $email = new EmailHandler();
 *   $email->send($to, $subject, $templatePath, $data);
 * 
 */

class EmailHandler {
    
    private $smtpHost;
    private $smtpPort;
    private $smtpUsername;
    private $smtpPassword;
    private $fromEmail;
    private $fromName;
    private $useSmtp;
    private $errors = [];
    
    /**
     * Constructor - Obtiene credenciales SMTP
     */
    public function __construct() {
        $this->smtpHost = defined('SMTP_HOST') ? SMTP_HOST : '';
        $this->smtpPort = defined('SMTP_PORT') ? SMTP_PORT : 587;
        $this->smtpUsername = defined('SMTP_USERNAME') ? SMTP_USERNAME : '';
        $this->smtpPassword = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';
        $this->fromEmail = defined('FROM_EMAIL') ? FROM_EMAIL : 'noreply@provivirpanama.com';
        $this->fromName = defined('FROM_NAME') ? FROM_NAME : 'Provivir Panama';
        $this->useSmtp = defined('USE_SMTP') ? USE_SMTP : false;
    }
    
    /**
     * Enviar email con template
     * 
     * @param string $to Destinatario
     * @param string $subject Asunto
     * @param string $templatePath Ruta al template HTML
     * @param array $data Variables para reemplazar en template
     * @param string $replyTo Email para responder (opcional)
     * @return bool
     */
    public function send($to, $subject, $templatePath, $data = [], $replyTo = null) {
        
        // Validar email destinatario
        if (!$this->validateEmail($to)) {
            $this->errors[] = "Email inválido: $to";
            return false;
        }
        
        // Obtener contenido del template
        $htmlContent = $this->loadTemplate($templatePath, $data);
        if (!$htmlContent) {
            $this->errors[] = "No se pudo cargar el template: $templatePath";
            return false;
        }
        
        // Crear headers
        $headers = $this->createHeaders($replyTo);
        
        // Intentar enviar
        if ($this->useSmtp) {
            return $this->sendViaSMTP($to, $subject, $htmlContent, $headers);
        } else {
            return $this->sendViaPhpMail($to, $subject, $htmlContent, $headers);
        }
    }
    
    /**
     * Enviar email simple (sin template)
     * 
     * @param string $to Destinatario
     * @param string $subject Asunto
     * @param string $message Cuerpo del mensaje
     * @param bool $isHtml Si es HTML
     * @return bool
     */
    public function sendSimple($to, $subject, $message, $isHtml = true) {
        
        if (!$this->validateEmail($to)) {
            $this->errors[] = "Email inválido: $to";
            return false;
        }
        
        $headers = $this->createHeaders();
        
        if ($this->useSmtp) {
            return $this->sendViaSMTP($to, $subject, $message, $headers);
        } else {
            return $this->sendViaPhpMail($to, $subject, $message, $headers);
        }
    }
    
    /**
     * Enviar email vía SMTP (Gmail, SendGrid, etc.)
     * 
     * @param string $to
     * @param string $subject
     * @param string $message
     * @param array $headers
     * @return bool
     */
    private function sendViaSMTP($to, $subject, $message, $headers) {
        
        try {
            // Crear contexto SMTP
            $context = stream_context_create([
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                ]
            ]);
            
            // Conectar a servidor SMTP
            $smtp = fsockopen(
                'tls://' . $this->smtpHost,
                $this->smtpPort,
                $errno,
                $errstr,
                10
            );
            
            if (!$smtp) {
                $this->errors[] = "Error SMTP: $errstr ($errno)";
                return false;
            }
            
            // Leer respuesta inicial
            $response = fgets($smtp, 1024);
            
            if (strpos($response, '220') === false) {
                $this->errors[] = "SMTP: Respuesta inválida del servidor";
                fclose($smtp);
                return false;
            }
            
            // EHLO
            fputs($smtp, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
            fgets($smtp, 1024);
            
            // AUTH LOGIN
            fputs($smtp, "AUTH LOGIN\r\n");
            fgets($smtp, 1024);
            
            // Username
            fputs($smtp, base64_encode($this->smtpUsername) . "\r\n");
            fgets($smtp, 1024);
            
            // Password
            fputs($smtp, base64_encode($this->smtpPassword) . "\r\n");
            $response = fgets($smtp, 1024);
            
            if (strpos($response, '235') === false) {
                $this->errors[] = "SMTP: Autenticación fallida";
                fclose($smtp);
                return false;
            }
            
            // MAIL FROM
            fputs($smtp, "MAIL FROM:<" . $this->fromEmail . ">\r\n");
            fgets($smtp, 1024);
            
            // RCPT TO
            fputs($smtp, "RCPT TO:<" . $to . ">\r\n");
            fgets($smtp, 1024);
            
            // DATA
            fputs($smtp, "DATA\r\n");
            fgets($smtp, 1024);
            
            // Construir mensaje completo
            $fullMessage = "From: " . $this->fromName . " <" . $this->fromEmail . ">\r\n";
            $fullMessage .= "To: " . $to . "\r\n";
            $fullMessage .= "Subject: " . $subject . "\r\n";
            $fullMessage .= $headers . "\r\n";
            $fullMessage .= "\r\n" . $message . "\r\n";
            
            fputs($smtp, $fullMessage . "\r\n.\r\n");
            $response = fgets($smtp, 1024);
            
            if (strpos($response, '250') === false) {
                $this->errors[] = "SMTP: Error al enviar mensaje";
                fclose($smtp);
                return false;
            }
            
            // QUIT
            fputs($smtp, "QUIT\r\n");
            fclose($smtp);
            
            return true;
            
        } catch (Exception $e) {
            $this->errors[] = "Excepción SMTP: " . $e->getMessage();
            return false;
        }
    }
    
    /**
     * Enviar email vía función mail() de PHP
     * (Funciona en desarrollo local con logs)
     * 
     * @param string $to
     * @param string $subject
     * @param string $message
     * @param array $headers
     * @return bool
     */
    private function sendViaPhpMail($to, $subject, $message, $headers) {
        
        try {
            $result = mail($to, $subject, $message, $headers);
            
            if (!$result) {
                // Log del intento fallido
                $logMessage = "[" . date('Y-m-d H:i:s') . "] Email fallido a: $to\n";
                error_log($logMessage, 3, __DIR__ . '/../../logs/email-errors.log');
                $this->errors[] = "Error al enviar email vía mail()";
                return false;
            }
            
            // Log exitoso
            $logMessage = "[" . date('Y-m-d H:i:s') . "] Email exitoso a: $to\n";
            error_log($logMessage, 3, __DIR__ . '/../../logs/email-success.log');
            
            return true;
            
        } catch (Exception $e) {
            $this->errors[] = "Excepción mail(): " . $e->getMessage();
            return false;
        }
    }
    
    /**
     * Cargar template HTML y reemplazar variables
     * 
     * @param string $templatePath
     * @param array $data
     * @return string|false
     */
    private function loadTemplate($templatePath, $data = []) {
        
        // Resolver ruta absoluta
        if (strpos($templatePath, '/') !== 0 && strpos($templatePath, ':\\') === false) {
            $templatePath = __DIR__ . '/' . $templatePath;
        }
        
        if (!file_exists($templatePath)) {
            $this->errors[] = "Template no existe: $templatePath";
            return false;
        }
        
        // Obtener contenido
        $content = file_get_contents($templatePath);
        
        // Reemplazar variables {{variable}}
        foreach ($data as $key => $value) {
            $content = str_replace('{{' . $key . '}}', $value, $content);
        }
        
        return $content;
    }
    
    /**
     * Crear headers de email
     * 
     * @param string $replyTo
     * @return string
     */
    private function createHeaders($replyTo = null) {
        
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $headers .= "From: " . $this->fromName . " <" . $this->fromEmail . ">\r\n";
        
        if ($replyTo) {
            if ($this->validateEmail($replyTo)) {
                $headers .= "Reply-To: " . $replyTo . "\r\n";
            }
        }
        
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $headers .= "X-Priority: 3\r\n";
        
        return $headers;
    }
    
    /**
     * Validar dirección de email
     * 
     * @param string $email
     * @return bool
     */
    private function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
    
    /**
     * Obtener errores
     * 
     * @return array
     */
    public function getErrors() {
        return $this->errors;
    }
    
    /**
     * Obtener último error
     * 
     * @return string|null
     */
    public function getLastError() {
        return end($this->errors) ?: null;
    }
    
    /**
     * Limpiar errores
     */
    public function clearErrors() {
        $this->errors = [];
    }
    
    /**
     * Verificar si hay errores
     * 
     * @return bool
     */
    public function hasErrors() {
        return !empty($this->errors);
    }
}

?>
