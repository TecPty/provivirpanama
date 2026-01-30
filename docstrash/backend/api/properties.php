<?php
/**
 * ============================================================================
 * PROPERTIES API - Provivir Panama
 * GET /api/properties.php - Obtener lista de propiedades
 * ============================================================================
 */

define('ACCESS_ALLOWED', true);
require_once __DIR__ . '/config.php';

// Manejo de CORS y validación
handleCORS();
checkRateLimit();

// Solo permitir GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

try {
    // Obtener base de datos
    $db = getDatabase();
    
    // Parámetros opcionales para filtrado
    $location = isset($_GET['location']) ? sanitizeInput($_GET['location']) : null;
    $minPrice = isset($_GET['min_price']) ? (float)$_GET['min_price'] : null;
    $maxPrice = isset($_GET['max_price']) ? (float)$_GET['max_price'] : null;
    $bedrooms = isset($_GET['bedrooms']) ? (int)$_GET['bedrooms'] : null;
    $status = isset($_GET['status']) ? sanitizeInput($_GET['status']) : 'active';
    
    // Construir query
    $query = "SELECT 
        id,
        title,
        slug,
        location,
        price,
        description,
        image,
        bedrooms,
        bathrooms,
        sqft,
        badge,
        badge_type,
        status,
        created_at
    FROM properties 
    WHERE status = :status";
    
    $params = ['status' => $status];
    
    // Filtros opcionales
    if ($location) {
        $query .= " AND location LIKE :location";
        $params['location'] = "%$location%";
    }
    
    if ($minPrice) {
        $query .= " AND price >= :min_price";
        $params['min_price'] = $minPrice;
    }
    
    if ($maxPrice) {
        $query .= " AND price <= :max_price";
        $params['max_price'] = $maxPrice;
    }
    
    if ($bedrooms) {
        $query .= " AND bedrooms = :bedrooms";
        $params['bedrooms'] = $bedrooms;
    }
    
    // Ordenar por fecha de creación (más recientes primero)
    $query .= " ORDER BY created_at DESC";
    
    // Ejecutar query
    $stmt = $db->prepare($query);
    $stmt->execute($params);
    $properties = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Formatear respuesta
    $formattedProperties = array_map(function($property) {
        return [
            'id' => (int)$property['id'],
            'title' => $property['title'],
            'slug' => $property['slug'],
            'location' => $property['location'],
            'price' => (float)$property['price'],
            'priceFormatted' => 'B/. ' . number_format($property['price'], 2),
            'description' => $property['description'],
            'image' => $property['image'],
            'bedrooms' => (int)$property['bedrooms'],
            'bathrooms' => (int)$property['bathrooms'],
            'sqft' => (int)$property['sqft'],
            'badge' => $property['badge'],
            'badgeType' => $property['badge_type'],
            'status' => $property['status']
        ];
    }, $properties);
    
    // Log request en desarrollo
    if (ENVIRONMENT === 'development') {
        logRequest('GET /api/properties.php', 'GET', [
            'count' => count($formattedProperties),
            'filters' => array_filter([
                'location' => $location,
                'min_price' => $minPrice,
                'max_price' => $maxPrice,
                'bedrooms' => $bedrooms
            ])
        ]);
    }
    
    // Respuesta exitosa
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'count' => count($formattedProperties),
        'data' => $formattedProperties
    ]);
    
} catch (PDOException $e) {
    logError('Database error in properties.php', $e);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error al obtener propiedades'
    ]);
} catch (Exception $e) {
    logError('Error in properties.php', $e);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error interno del servidor'
    ]);
}
