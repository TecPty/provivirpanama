/**
 * Vercel Serverless Function - Testimonials API
 * Reemplaza backend/api/testimonials.php
 */

const mockTestimonials = [
  {
    id: 1,
    name: "María González",
    role: "Propietaria de Altos Guayacanes",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    testimonial: "Provivir superó todas mis expectativas. La comunidad es hermosa y segura.",
    rating: 5,
    date: "2026-01-15"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Inversionista - Ciudad Este",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    testimonial: "Excelente inversión. Los valores están en constante aumento.",
    rating: 5,
    date: "2026-01-10"
  },
  {
    id: 3,
    name: "Laura Espinoza",
    role: "Residente - Villas Oeste",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    testimonial: "Nuestro nuevo hogar. El equipo de Provivir fue muy profesional.",
    rating: 5,
    date: "2026-01-08"
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
      const { limit = 10 } = req.query;
      
      const testimonials = mockTestimonials.slice(0, parseInt(limit, 10));

      res.status(200).json({
        success: true,
        data: testimonials,
        count: testimonials.length
      });
    } else {
      res.status(405).json({ error: "Método no permitido" });
    }
  } catch (error) {
    console.error("Error en testimonials API:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener testimonios"
    });
  }
}
