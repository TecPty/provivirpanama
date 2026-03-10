import express from 'express';
import { body, validationResult } from 'express-validator';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../../provivir.db');

const router = express.Router();

const ensureLeadAttributionColumns = async () => {
  const desiredColumns = {
    utm_source: 'TEXT',
    utm_medium: 'TEXT',
    utm_campaign: 'TEXT',
    utm_term: 'TEXT',
    utm_content: 'TEXT',
    utm_id: 'TEXT',
    gclid: 'TEXT',
    fbclid: 'TEXT',
    ttclid: 'TEXT',
    msclkid: 'TEXT',
    landing_page: 'TEXT',
    referrer: 'TEXT'
  };

  const tableInfo = await db.all('PRAGMA table_info(leads)');
  const existingColumns = new Set(tableInfo.map((column) => column.name));

  for (const [columnName, columnType] of Object.entries(desiredColumns)) {
    if (!existingColumns.has(columnName)) {
      await db.exec(`ALTER TABLE leads ADD COLUMN ${columnName} ${columnType};`);
    }
  }
};

// Initialize SQLite database
let db;
(async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    
    // Create leads table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        message TEXT,
        salary TEXT,
        employment_status TEXT,
        project_name TEXT,
        property_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await ensureLeadAttributionColumns();
    
    console.log('✅ SQLite database initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing SQLite:', error);
  }
})();

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
    .withMessage('Property ID inválido'),
  
  body('salary')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('Salario inválido'),
  
  body('employment')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('Estabilidad laboral inválida'),
  
  body('advisor')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Asesor inválido'),
    
  body('project')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Proyecto inválido'),

  body('utm_source')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('utm_source inválido'),

  body('utm_medium')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('utm_medium inválido'),

  body('utm_campaign')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('utm_campaign inválido'),

  body('utm_term')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('utm_term inválido'),

  body('utm_content')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('utm_content inválido'),

  body('utm_id')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('utm_id inválido'),

  body('gclid')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('gclid inválido'),

  body('fbclid')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('fbclid inválido'),

  body('ttclid')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('ttclid inválido'),

  body('msclkid')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('msclkid inválido'),

  body('landing_page')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 })
    .withMessage('landing_page inválido'),

  body('referrer')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 })
    .withMessage('referrer inválido')
];

/**
 * POST /api/leads
 * Crear nuevo lead desde el formulario de contacto
 */
router.post('/', leadValidation, async (req, res) => {
  // Honeypot check
  if (req.body.website) {
    console.warn('Honeypot field filled, likely spam.');
    return res.status(200).json({ success: true, message: 'Gracias por tu interés.' });
  }

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

    const {
      name,
      email,
      phone,
      message,
      property_id,
      salary,
      employment,
      advisor,
      project,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_id,
      gclid,
      fbclid,
      ttclid,
      msclkid,
      landing_page,
      referrer
    } = req.body;

    // Check if DB is available
    if (!db) {
      console.error('❌ Database not initialized');
      return res.status(500).json({
        success: false,
        error: 'Error de configuración del servidor'
      });
    }

    // Insert lead into database
    const result = await db.run(
      `INSERT INTO leads (
        name,
        email,
        phone,
        message,
        salary,
        employment_status,
        advisor,
        project_name,
        property_id,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        utm_id,
        gclid,
        fbclid,
        ttclid,
        msclkid,
        landing_page,
        referrer
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        phone,
        message,
        salary || null,
        employment || null,
        advisor || null,
        project || null,
        property_id || null,
        utm_source || null,
        utm_medium || null,
        utm_campaign || null,
        utm_term || null,
        utm_content || null,
        utm_id || null,
        gclid || null,
        fbclid || null,
        ttclid || null,
        msclkid || null,
        landing_page || null,
        referrer || null
      ]
    );

    console.log('✅ Lead created:', { id: result.lastID, email });

    res.status(201).json({
      success: true,
      message: 'Gracias por tu interés. Te contactaremos pronto.',
      leadId: result.lastID
    });

  } catch (error) {
    console.error('❌ Error creating lead:', error);
    
    // Handle duplicate email
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({
        success: false,
        error: 'Este email ya está registrado'
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
    if (!db) {
      return res.status(500).json({
        success: false,
        error: 'Database not initialized'
      });
    }

    const result = await db.get('SELECT 1 as test');
    
    console.log('✅ Database test query successful:', result);
    res.json({
      success: true,
      message: 'Database connection OK',
      test: result
    });
  } catch (error) {
    console.error('❌ Database test failed:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Database connection failed',
      details: process.env.NODE_ENV === 'development' ? error.toString() : 'Check server logs'
    });
  }
});

export default router;
