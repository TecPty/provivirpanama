/**
 * Vercel Serverless Function - Social Posts API
 * Reemplaza backend/api/social-posts.php
 */

// Mock data - En producción, conectar a la BD
const mockSocialPosts = [
  {
    id: 1,
    platform: "instagram",
    post_id: "ABC123",
    image_url: "https://images.unsplash.com/photo-1600880668058-31a19f25e8bb?w=500&h=500&fit=crop",
    video_url: null,
    caption: "¡Explora nuestras hermosas comunidades! 🏡 Villas Oeste te espera con el mejor estilo de vida.",
    likes_count: 245,
    comments_count: 18,
    post_url: "https://instagram.com/provivirpanama/p/ABC123",
    is_trending: true,
    display_order: 1,
    created_at: "2026-01-20T10:30:00Z",
    is_video: false
  },
  {
    id: 2,
    platform: "instagram",
    post_id: "DEF456",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=500&fit=crop",
    video_url: null,
    caption: "Altos Guayacanes: Donde el lujo se encuentra con la naturaleza 🌳✨",
    likes_count: 189,
    comments_count: 24,
    post_url: "https://instagram.com/provivirpanama/p/DEF456",
    is_trending: false,
    display_order: 2,
    created_at: "2026-01-19T14:20:00Z",
    is_video: false
  },
  {
    id: 3,
    platform: "facebook",
    post_id: "GHI789",
    image_url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&h=500&fit=crop",
    video_url: null,
    caption: "Ciudad Este: Tu nuevo hogar en el corazón de Panamá 🌆",
    likes_count: 156,
    comments_count: 12,
    post_url: "https://facebook.com/provivirpanama/posts/GHI789",
    is_trending: false,
    display_order: 3,
    created_at: "2026-01-18T09:15:00Z",
    is_video: false
  },
  {
    id: 4,
    platform: "instagram",
    post_id: "JKL012",
    image_url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=500&h=500&fit=crop",
    video_url: null,
    caption: "Colinas del Este: Amplias áreas verdes y seguridad 24/7 🏠💚",
    likes_count: 203,
    comments_count: 31,
    post_url: "https://instagram.com/provivirpanama/p/JKL012",
    is_trending: true,
    display_order: 4,
    created_at: "2026-01-17T16:45:00Z",
    is_video: false
  },
  {
    id: 5,
    platform: "tiktok",
    post_id: "MNO345",
    image_url: "https://images.unsplash.com/photo-1600567595334-be391e96a87c?w=500&h=500&fit=crop",
    video_url: "https://example.com/videos/tour-villas-oeste.mp4",
    caption: "Tour virtual de Villas Oeste 🎥 #provivirpanama",
    likes_count: 1250,
    comments_count: 89,
    post_url: "https://tiktok.com/@provivirpanama/video/MNO345",
    is_trending: true,
    display_order: 5,
    created_at: "2026-01-16T12:00:00Z",
    is_video: true
  }
];

export default function handler(req, res) {
  // Habilitar CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Manejar preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "GET") {
      const { platform, limit = 10 } = req.query;

      let posts = mockSocialPosts;

      // Filtrar por plataforma si se proporciona
      if (platform) {
        posts = posts.filter(p => p.platform.toLowerCase() === platform.toLowerCase());
      }

      // Aplicar límite
      posts = posts.slice(0, parseInt(limit, 10));

      res.status(200).json({
        success: true,
        data: posts,
        count: posts.length
      });
    } else {
      res.status(405).json({ error: "Método no permitido" });
    }
  } catch (error) {
    console.error("Error en social-posts API:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener social posts",
      message: error.message
    });
  }
}
