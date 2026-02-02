import express from 'express';
import { body, validationResult } from 'express-validator';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Create MySQL connection pool
// Nota: Configurar cuando tengas credenciales de GoDaddy
let pool;
try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'provivir',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
} catch (error) {
  console.error('❌ Error creating MySQL pool:', error);
}

// Validation rules
const leadValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nombre debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Nombre solo puede contener letras'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Teléfono inválido')
    .isLength({ min: 7, max: 20 })
    .withMessage('Teléfono debe tener entre 7 y 20 caracteres'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Mensaje debe tener entre 10 y 1000 caracteres'),
  
  body('property_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Property ID inválido')
];

/**
 * POST /api/leads
 * Crear nuevo lead desde el formulario de contacto
 */
router.post('/', leadValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const { name, email, phone, message, property_id } = req.body;

    // Check if DB pool is available
    if (!pool) {
      console.error('❌ Database pool not initialized');
      return res.status(500).json({
        success: false,
        error: 'Error de configuración del servidor'
      });
    }

    // Insert lead into database (prepared statement prevents SQL injection)
    const [result] = await pool.execute(
      `INSERT INTO leads (name, email, phone, message, property_id, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [name, email, phone, message, property_id || null]
    );

    console.log('✅ Lead created:', { id: result.insertId, email });

    // Return success
    res.status(201).json({
      success: true,
      message: 'Gracias por tu interés. Te contactaremos pronto.',
      leadId: result.insertId
    });

  } catch (error) {
    console.error('❌ Error creating lead:', error);
    
    // Handle duplicate email (if unique constraint exists)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        error: 'Este email ya está registrado'
      });
    }

    // Handle connection errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return res.status(503).json({
        success: false,
        error: 'Servicio temporalmente no disponible. Intenta más tarde.'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error al procesar tu solicitud'
    });
  }
});

/**
 * GET /api/leads/test
 * Test database connection
 */
router.get('/test', async (req, res) => {
  try {
    if (!pool) {
      return res.status(500).json({
        success: false,
        error: 'Database pool not initialized'
      });
    }

    const [rows] = await pool.execute('SELECT 1 as test');
    
    res.json({
      success: true,
      message: 'Database connection OK',
      test: rows[0]
    });
  } catch (error) {
    console.error('❌ Database test failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
