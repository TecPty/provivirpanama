/**
 * Vercel Serverless Function - Properties API
 * Reemplaza backend/api/properties.php
 */

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
      // Por ahora, retornar estado OK
      res.status(200).json({
        success: true,
        message: "Properties endpoint operational",
        data: []
      });
    } else {
      res.status(405).json({ error: "Método no permitido" });
    }
  } catch (error) {
    console.error("Error en properties API:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener propiedades"
    });
  }
}
