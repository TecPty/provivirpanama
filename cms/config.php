<?php
/**
 * Admin Configuration & Auth Helper
 * Panel de administración para Provivir
 */

session_start();

// Credenciales de admin (en producción, usar BD con hashes)
define('ADMIN_USERNAME', 'provivir_admin');
define('ADMIN_PASSWORD', 'Provivir2026!Panama'); // CAMBIAR EN PRODUCCIÓN

// Verificar si está autenticado
function isAdminAuthenticated() {
    return isset($_SESSION['admin_authenticated']) && $_SESSION['admin_authenticated'] === true;
}

// Autenticar admin
function authenticateAdmin($username, $password) {
    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
        $_SESSION['admin_authenticated'] = true;
        $_SESSION['admin_login_time'] = time();
        return true;
    }
    return false;
}

// Logout
function logoutAdmin() {
    session_destroy();
    header('Location: /cms/login.php');
    exit;
}

// Redirigir si no está autenticado
function requireAdminAuth() {
    if (!isAdminAuthenticated()) {
        header('Location: /cms/login.php');
        exit;
    }
}

// Base de datos
function getDatabase() {
    try {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $db = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        return $db;
    } catch (PDOException $e) {
        die('Database connection failed: ' . $e->getMessage());
    }
}

// HTML Head
function renderHead($title = 'Admin Panel') {
    return <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title - Provivir Admin</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        header {
            background: white;
            border-bottom: 2px solid #00a86b;
            padding: 20px 0;
            margin-bottom: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #00a86b;
        }

        .logout-btn {
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }

        .logout-btn:hover {
            background: #ff5252;
        }

        .nav {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }

        .nav a {
            color: #00a86b;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 4px;
            transition: background 0.3s;
        }

        .nav a:hover,
        .nav a.active {
            background: #00a86b;
            color: white;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="number"],
        input[type="url"],
        textarea,
        select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            font-family: inherit;
        }

        textarea {
            resize: vertical;
            min-height: 100px;
        }

        input:focus,
        textarea:focus,
        select:focus {
            outline: none;
            border-color: #00a86b;
            box-shadow: 0 0 0 3px rgba(0, 168, 107, 0.1);
        }

        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }

        button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s;
        }

        .btn-primary {
            background: #00a86b;
            color: white;
        }

        .btn-primary:hover {
            background: #008c54;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,168,107,0.3);
        }

        .btn-secondary {
            background: #e0e0e0;
            color: #333;
        }

        .btn-secondary:hover {
            background: #d0d0d0;
        }

        .btn-danger {
            background: #ff6b6b;
            color: white;
        }

        .btn-danger:hover {
            background: #ff5252;
        }

        .alert {
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
            display: none;
        }

        .alert.show {
            display: block;
        }

        .alert-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .alert-error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .alert-info {
            background: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        table thead {
            background: #f8f9fa;
            border-bottom: 2px solid #dee2e6;
        }

        table th {
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #333;
        }

        table td {
            padding: 12px;
            border-bottom: 1px solid #dee2e6;
        }

        table tr:hover {
            background: #f9f9f9;
        }

        .actions {
            display: flex;
            gap: 8px;
        }

        .actions button {
            padding: 6px 12px;
            font-size: 12px;
        }

        .image-preview {
            max-width: 200px;
            max-height: 200px;
            margin-top: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
            padding: 5px;
        }

        .file-input-wrapper {
            position: relative;
            display: inline-block;
        }

        .file-input-wrapper input[type="file"] {
            position: absolute;
            left: -9999px;
        }

        .file-input-label {
            display: inline-block;
            padding: 10px 20px;
            background: #00a86b;
            color: white;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .file-input-label:hover {
            background: #008c54;
        }

        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }

            header .container {
                flex-direction: column;
                gap: 10px;
            }

            .nav {
                flex-wrap: wrap;
            }

            table {
                font-size: 13px;
            }

            table th,
            table td {
                padding: 8px;
            }

            .actions {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
HTML;
}

// HTML Footer
function renderFooter() {
    return '</body></html>';
}
