<?php
/**
 * Admin Dashboard - Gestión de Social Posts
 */

require_once __DIR__ . '/config.php';
requireAdminAuth();

// Configuración de BD local
define('DB_HOST', 'localhost');
define('DB_NAME', 'provivir_db');
define('DB_USER', 'root');
define('DB_PASS', '');

$error = '';
$success = '';
$action = $_GET['action'] ?? 'list';

try {
    $db = getDatabase();
} catch (Exception $e) {
    $error = 'Error de conexión a la BD: ' . $e->getMessage();
}

// Procesar formulario de nuevo post
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_post'])) {
    $platform = $_POST['platform'] ?? '';
    $caption = $_POST['caption'] ?? '';
    $likes = intval($_POST['likes_count'] ?? 0);
    $comments = intval($_POST['comments_count'] ?? 0);
    $post_url = $_POST['post_url'] ?? '';
    $is_trending = isset($_POST['is_trending']) ? 1 : 0;

    // Manejar upload de imagen
    $image_url = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['image'];
        $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if (in_array($ext, $allowed) && $file['size'] <= 5242880) { // 5MB
            $filename = 'social_' . time() . '.' . $ext;
            $upload_path = __DIR__ . '/../frontend/assets/images/social/' . $filename;

            if (move_uploaded_file($file['tmp_name'], $upload_path)) {
                $image_url = 'assets/images/social/' . $filename;
            } else {
                $error = 'Error al subir la imagen';
            }
        } else {
            $error = 'Archivo inválido. Máximo 5MB. Formatos: JPG, PNG, GIF, WebP';
        }
    }

    if (!$error && $db) {
        try {
            $stmt = $db->prepare("
                INSERT INTO social_posts 
                (platform, image_url, caption, likes_count, comments_count, post_url, is_trending, is_active) 
                VALUES 
                (:platform, :image_url, :caption, :likes, :comments, :post_url, :trending, 1)
            ");

            $stmt->execute([
                ':platform' => $platform,
                ':image_url' => $image_url,
                ':caption' => $caption,
                ':likes' => $likes,
                ':comments' => $comments,
                ':post_url' => $post_url,
                ':trending' => $is_trending
            ]);

            $success = '✓ Post agregado exitosamente';
            $action = 'list';
        } catch (Exception $e) {
            $error = 'Error al guardar: ' . $e->getMessage();
        }
    }
}

// Eliminar post
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $id = intval($_GET['delete']);
    
    if ($db) {
        try {
            // Obtener imagen para eliminarla
            $stmt = $db->prepare("SELECT image_url FROM social_posts WHERE id = :id");
            $stmt->execute([':id' => $id]);
            $post = $stmt->fetch();

            // Eliminar de BD
            $stmt = $db->prepare("DELETE FROM social_posts WHERE id = :id");
            $stmt->execute([':id' => $id]);

            // Eliminar archivo de imagen
            if ($post && $post['image_url']) {
                $file_path = __DIR__ . '/../frontend/' . $post['image_url'];
                if (file_exists($file_path)) {
                    unlink($file_path);
                }
            }

            $success = '✓ Post eliminado exitosamente';
        } catch (Exception $e) {
            $error = 'Error al eliminar: ' . $e->getMessage();
        }
    }
}

// Obtener posts
$posts = [];
if ($db) {
    try {
        $stmt = $db->query("
            SELECT * FROM social_posts 
            ORDER BY is_trending DESC, created_at DESC 
            LIMIT 50
        ");
        $posts = $stmt->fetchAll();
    } catch (Exception $e) {
        $error = 'Error al obtener posts: ' . $e->getMessage();
    }
}

echo renderHead('Social Posts');
?>

<header>
    <div class="container">
        <div class="logo">🏡 PROVIVIR - Admin Panel</div>
        <form method="POST" style="margin: 0;">
            <input type="hidden" name="logout" value="1">
            <button type="submit" class="logout-btn">Cerrar Sesión</button>
        </form>
    </div>
</header>

<div class="container">
    <div class="nav">
        <a href="/cms/dashboard.php" class="<?php echo $action === 'list' ? 'active' : ''; ?>">📋 Ver Posts</a>
        <a href="/cms/dashboard.php?action=new" class="<?php echo $action === 'new' ? 'active' : ''; ?>">➕ Nuevo Post</a>
    </div>

    <?php if ($success): ?>
        <div class="alert alert-success show"><?php echo htmlspecialchars($success); ?></div>
    <?php endif; ?>

    <?php if ($error): ?>
        <div class="alert alert-error show"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <?php if ($action === 'new'): ?>
        <!-- Formulario de nuevo post -->
        <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 20px;">Agregar Nuevo Post</h2>

            <form method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="platform">Plataforma</label>
                    <select name="platform" id="platform" required>
                        <option value="">-- Selecciona una plataforma --</option>
                        <option value="instagram">📷 Instagram</option>
                        <option value="tiktok">🎵 TikTok</option>
                        <option value="facebook">👥 Facebook</option>
                        <option value="youtube">▶️ YouTube</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="image">Imagen del Post</label>
                    <div class="file-input-wrapper">
                        <label for="image" class="file-input-label">Seleccionar Imagen</label>
                        <input type="file" id="image" name="image" accept="image/*" onchange="previewImage(this)">
                    </div>
                    <img id="preview" src="" alt="Preview" style="display: none;" class="image-preview">
                </div>

                <div class="form-group">
                    <label for="caption">Caption / Descripción</label>
                    <textarea name="caption" id="caption" placeholder="Escribe el caption del post..." required></textarea>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label for="likes_count">Likes</label>
                        <input type="number" name="likes_count" id="likes_count" value="0" min="0">
                    </div>

                    <div class="form-group">
                        <label for="comments_count">Comentarios</label>
                        <input type="number" name="comments_count" id="comments_count" value="0" min="0">
                    </div>
                </div>

                <div class="form-group">
                    <label for="post_url">URL del Post</label>
                    <input type="url" name="post_url" id="post_url" placeholder="https://instagram.com/..." required>
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" name="is_trending" value="1">
                        ⭐ Marcar como Trending
                    </label>
                </div>

                <div class="button-group">
                    <button type="submit" name="add_post" class="btn-primary">Guardar Post</button>
                    <a href="/cms/dashboard.php" class="btn-secondary" style="padding: 10px 20px; text-decoration: none; display: inline-block;">Cancelar</a>
                </div>
            </form>
        </div>

    <?php else: ?>
        <!-- Listado de posts -->
        <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 20px;">Posts Publicados (<?php echo count($posts); ?>)</h2>

            <?php if (empty($posts)): ?>
                <div style="text-align: center; padding: 40px; color: #666;">
                    <p style="font-size: 18px;">No hay posts aún</p>
                    <p style="margin-top: 10px;">
                        <a href="/cms/dashboard.php?action=new" style="color: #00a86b; text-decoration: none;">Crear el primer post →</a>
                    </p>
                </div>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Plataforma</th>
                            <th>Caption</th>
                            <th>Likes / Comentarios</th>
                            <th>Trending</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($posts as $post): ?>
                            <tr>
                                <td>
                                    <?php if ($post['image_url']): ?>
                                        <img src="/<?php echo htmlspecialchars($post['image_url']); ?>" alt="Post" style="max-width: 60px; max-height: 60px; border-radius: 4px;">
                                    <?php else: ?>
                                        <span style="color: #999;">Sin imagen</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <strong><?php echo ucfirst(htmlspecialchars($post['platform'])); ?></strong>
                                </td>
                                <td>
                                    <small><?php echo substr(htmlspecialchars($post['caption']), 0, 50) . '...'; ?></small>
                                </td>
                                <td>
                                    <small>👍 <?php echo $post['likes_count']; ?> / 💬 <?php echo $post['comments_count']; ?></small>
                                </td>
                                <td>
                                    <?php echo $post['is_trending'] ? '⭐ Sí' : '—'; ?>
                                </td>
                                <td>
                                    <small><?php echo date('d/m/y', strtotime($post['created_at'])); ?></small>
                                </td>
                                <td>
                                    <div class="actions">
                                        <a href="/cms/dashboard.php?delete=<?php echo $post['id']; ?>" class="btn-danger" onclick="return confirm('¿Eliminar este post?');">Eliminar</a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</div>

<script>
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Manejar logout
document.querySelectorAll('form input[name="logout"]').forEach(input => {
    if (input.value === '1') {
        input.closest('form').addEventListener('submit', () => {
            fetch('/cms/logout.php');
        });
    }
});
</script>

<?php echo renderFooter(); ?>
