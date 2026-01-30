<?php
/**
 * API Social Posts - Conexión a Base de Datos Real
 * Este archivo se puede usar tanto localmente como en producción
 */

// NOTE: Headers are set by api-router.php before including this file
// Do NOT set headers again to avoid "headers already sent" error

// Manejar CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Configuración de BD
$db_config = [
    'local' => [
        'host' => 'localhost',
        'db' => 'provivir_db',
        'user' => 'root',
        'pass' => ''
    ],
    'production' => [
        'host' => getenv('DB_HOST') ?: 'localhost',
        'db' => getenv('DB_NAME') ?: 'provivir_db',
        'user' => getenv('DB_USER') ?: 'root',
        'pass' => getenv('DB_PASS') ?: ''
    ]
];

$env = getenv('VERCEL') ? 'production' : 'local';
$config = $db_config[$env];

try {
    $dsn = "mysql:host={$config['host']};dbname={$config['db']};charset=utf8mb4";
    $db = new PDO($dsn, $config['user'], $config['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed',
        'message' => $e->getMessage()
    ]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $platform = $_GET['platform'] ?? null;
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;

        $query = "SELECT * FROM social_posts WHERE is_active = 1";
        $params = [];

        if ($platform) {
            $query .= " AND platform = :platform";
            $params[':platform'] = $platform;
        }

        $query .= " ORDER BY is_trending DESC, created_at DESC LIMIT :limit";
        $params[':limit'] = $limit;

        $stmt = $db->prepare($query);
        
        foreach ($params as $key => $value) {
            if ($key === ':limit') {
                $stmt->bindValue($key, $value, PDO::PARAM_INT);
            } else {
                $stmt->bindValue($key, $value);
            }
        }

        $stmt->execute();
        $posts = $stmt->fetchAll();

        // Formatear datos
        foreach ($posts as &$post) {
            $post['is_trending'] = (bool)$post['is_trending'];
            $post['is_active'] = (bool)$post['is_active'];
            $post['likes_count'] = intval($post['likes_count']);
            $post['comments_count'] = intval($post['comments_count']);
        }

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $posts,
            'count' => count($posts)
        ]);

    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error',
        'message' => $e->getMessage()
    ]);
}
