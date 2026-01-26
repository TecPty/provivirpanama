<?php
/**
 * PHP Built-in Server Router
 * Redirige las peticiones apropiadamente a archivos PHP
 */

// Rutas permitidas
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request = str_replace('/provivirpanama/', '', $request);
$request = ltrim($request, '/');

// Si es un archivo estático (html, css, js, imagen), servir normalmente
$staticExtensions = ['html', 'css', 'js', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif', 'json', 'woff', 'woff2', 'ttf'];
$extension = pathinfo($request, PATHINFO_EXTENSION);

if (in_array($extension, $staticExtensions) || empty($extension)) {
    // Archivo estático o raíz
    if (file_exists($request) && is_file($request)) {
        return false; // Dejar que PHP sirva el archivo
    }
    // Si no existe, mostrar index.html
    if ($request === '' || strpos($request, '/') === 0) {
        $_GET['_route'] = $request ?: 'index.html';
        include 'index.html';
        return true;
    }
}

// Si es una petición PHP (API), servir el archivo
if (file_exists($request)) {
    include $request;
    return true;
}

// Si no existe, devolver 404
http_response_code(404);
echo json_encode(['error' => 'Not found']);
return true;
?>
