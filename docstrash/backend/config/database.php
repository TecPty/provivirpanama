<?php
/**
 * Database Configuration
 * Configuración de conexión a MySQL para XAMPP
 */

class Database {
    // Parámetros de conexión XAMPP por defecto
    private $host = "localhost";
    private $database_name = "provivir_db";
    private $username = "root";
    private $password = "";
    private $charset = "utf8mb4";
    
    public $conn;

    /**
     * Obtener la conexión a la base de datos
     */
    public function getConnection() {
        $this->conn = null;

        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->database_name . ";charset=" . $this->charset;
            
            $this->conn = new PDO($dsn, $this->username, $this->password);
            
            // Configurar PDO para lanzar excepciones en caso de error
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Configurar modo de fetch por defecto
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
            // Deshabilitar emulación de prepared statements para usar prepared statements reales
            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            throw new Exception("Database connection failed");
        }

        return $this->conn;
    }
}
