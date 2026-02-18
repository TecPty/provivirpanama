<?php
/**
 * Social Posts API Endpoint
 * Maneja las operaciones CRUD para posts de redes sociales
 */

header('Content-Type: application/json');

define('ACCESS_ALLOWED', true);
require_once __DIR__ . '/config.php';

// Manejo de CORS
handleCORS();

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    $db = getDatabase();
    
    switch ($method) {
        case 'GET':
            getSocialPosts($db);
            break;
            
        case 'POST':
            createSocialPost($db);
            break;
            
        case 'PUT':
            updateSocialPost($db);
            break;
            
        case 'DELETE':
            deleteSocialPost($db);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error del servidor',
        'message' => $e->getMessage()
    ]);
}

/**
 * Obtener posts de redes sociales
 */
function getSocialPosts($db) {
    $platform = isset($_GET['platform']) ? $_GET['platform'] : null;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
    
    $query = "SELECT 
                id,
                platform,
                post_id,
                image_url,
                video_url,
                caption,
                likes_count,
                comments_count,
                post_url,
                is_trending,
                display_order,
                created_at
              FROM social_posts 
              WHERE is_active = 1";
    
    if ($platform) {
        $query .= " AND platform = :platform";
    }
    
    $query .= " ORDER BY display_order ASC, created_at DESC LIMIT :limit";
    
    $stmt = $db->prepare($query);
    
    if ($platform) {
        $stmt->bindParam(':platform', $platform);
    }
    
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Formatear datos
    foreach ($posts as &$post) {
        $post['is_trending'] = (bool) $post['is_trending'];
        $post['is_video'] = !empty($post['video_url']);
        
        // Determinar el tipo de medio
        $post['media_type'] = $post['platform'] === 'tiktok' ? 'video' : 'image';
        if ($post['platform'] === 'instagram' && !empty($post['video_url'])) {
            $post['media_type'] = 'video';
        }
    }
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'count' => count($posts),
        'data' => $posts
    ]);
}

/**
 * Crear nuevo post
 */
function createSocialPost($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validaciones
    if (!isset($data['platform']) || !isset($data['image_url']) || !isset($data['post_url'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos incompletos']);
        return;
    }
    
    $query = "INSERT INTO social_posts 
              (platform, post_id, image_url, video_url, caption, likes_count, comments_count, post_url, is_trending, display_order) 
              VALUES 
              (:platform, :post_id, :image_url, :video_url, :caption, :likes_count, :comments_count, :post_url, :is_trending, :display_order)";
    
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(':platform', $data['platform']);
    $stmt->bindParam(':post_id', $data['post_id']);
    $stmt->bindParam(':image_url', $data['image_url']);
    $stmt->bindParam(':video_url', $data['video_url']);
    $stmt->bindParam(':caption', $data['caption']);
    $stmt->bindParam(':likes_count', $data['likes_count']);
    $stmt->bindParam(':comments_count', $data['comments_count']);
    $stmt->bindParam(':post_url', $data['post_url']);
    $stmt->bindParam(':is_trending', $data['is_trending']);
    $stmt->bindParam(':display_order', $data['display_order']);
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Post creado exitosamente',
            'id' => $db->lastInsertId()
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al crear el post']);
    }
}

/**
 * Actualizar post existente
 */
function updateSocialPost($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID requerido']);
        return;
    }
    
    $query = "UPDATE social_posts SET 
              platform = :platform,
              image_url = :image_url,
              video_url = :video_url,
              caption = :caption,
              likes_count = :likes_count,
              comments_count = :comments_count,
              post_url = :post_url,
              is_trending = :is_trending,
              display_order = :display_order,
              is_active = :is_active
              WHERE id = :id";
    
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(':id', $data['id']);
    $stmt->bindParam(':platform', $data['platform']);
    $stmt->bindParam(':image_url', $data['image_url']);
    $stmt->bindParam(':video_url', $data['video_url']);
    $stmt->bindParam(':caption', $data['caption']);
    $stmt->bindParam(':likes_count', $data['likes_count']);
    $stmt->bindParam(':comments_count', $data['comments_count']);
    $stmt->bindParam(':post_url', $data['post_url']);
    $stmt->bindParam(':is_trending', $data['is_trending']);
    $stmt->bindParam(':display_order', $data['display_order']);
    $stmt->bindParam(':is_active', $data['is_active']);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Post actualizado exitosamente'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al actualizar el post']);
    }
}

/**
 * Eliminar post (soft delete)
 */
function deleteSocialPost($db) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID requerido']);
        return;
    }
    
    $query = "UPDATE social_posts SET is_active = 0 WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Post eliminado exitosamente'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al eliminar el post']);
    }
}
