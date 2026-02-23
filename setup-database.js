import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Script to verify MySQL connection and create/update leads table
 * Run with: node setup-database.js
 */

async function setupDatabase() {
  try {
    console.log('🔧 Iniciando setup de base de datos...\n');

    // Create connection to set up database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectTimeout: 10000,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    });

    console.log('✅ Conexión a MySQL exitosa\n');

    // Create database
    try {
      await connection.execute(`
        CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'provivir_db'}\`
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci;
      `);
      console.log(`✅ Database '${process.env.DB_NAME || 'provivir_db'}' verificada/creada\n`);
    } catch (err) {
      console.error('Error creando database:', err.message);
    }

    // Close and reconnect to the database
    await connection.end();

    // Create connection to specific database
    const dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'provivir_db',
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectTimeout: 10000,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    });

    console.log(`✅ Conectado a database: ${process.env.DB_NAME || 'provivir_db'}\n`);

    // Create properties table
    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS properties (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE,
        location VARCHAR(255) NOT NULL,
        price DECIMAL(12, 2) NOT NULL,
        description TEXT NOT NULL,
        full_description LONGTEXT,
        image VARCHAR(500),
        gallery JSON,
        bedrooms TINYINT UNSIGNED NOT NULL,
        bathrooms TINYINT UNSIGNED NOT NULL,
        sqft INT UNSIGNED NOT NULL,
        badge VARCHAR(100),
        badge_type ENUM('success', 'warning', 'info') DEFAULT 'success',
        status ENUM('active', 'sold', 'reserved', 'inactive') DEFAULT 'active',
        features JSON,
        amenities JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        INDEX idx_status (status),
        INDEX idx_price (price),
        INDEX idx_location (location),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tabla "properties" verificada/creada');

    // Create leads table with all required fields
    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        phone VARCHAR(50),
        message TEXT,
        salary VARCHAR(100),
        employment_status VARCHAR(100),
        project_name VARCHAR(255),
        property_id INT UNSIGNED,
        source VARCHAR(100) DEFAULT 'website',
        utm_source VARCHAR(100),
        utm_medium VARCHAR(100),
        utm_campaign VARCHAR(100),
        status ENUM('new', 'contacted', 'qualified', 'converted', 'lost') DEFAULT 'new',
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_created (created_at),
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tabla "leads" verificada/creada');

    // Add missing columns if they don't exist
    try {
      const [columns] = await dbConnection.execute(`
        SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'leads' AND TABLE_SCHEMA = '${process.env.DB_NAME || 'provivir_db'}'
      `);
      
      const columnNames = columns.map(col => col.COLUMN_NAME);

      if (!columnNames.includes('salary')) {
        await dbConnection.execute(`ALTER TABLE leads ADD COLUMN salary VARCHAR(100) DEFAULT NULL AFTER message`);
        console.log('✅ Columna "salary" agregada');
      }

      if (!columnNames.includes('employment_status')) {
        await dbConnection.execute(`ALTER TABLE leads ADD COLUMN employment_status VARCHAR(100) DEFAULT NULL AFTER salary`);
        console.log('✅ Columna "employment_status" agregada');
      }

      if (!columnNames.includes('project_name')) {
        await dbConnection.execute(`ALTER TABLE leads ADD COLUMN project_name VARCHAR(255) DEFAULT NULL AFTER employment_status`);
        console.log('✅ Columna "project_name" agregada');
      }
    } catch (err) {
      if (err.code !== 'ER_DUP_FIELDNAME') {
        console.warn('⚠️ Aviso al agregar columnas:', err.message);
      }
    }

    // Test insert
    console.log('\n🧪 Testeando inserción de lead...');
    try {
      const testLead = {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        phone: '6371-2652',
        message: 'Mensaje de prueba',
        salary: 'Más de $2000',
        employment_status: 'Empleado Formal',
        project_name: 'Test Project'
      };

      const [result] = await dbConnection.execute(
        `INSERT INTO leads (name, email, phone, message, salary, employment_status, project_name, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
        [testLead.name, testLead.email, testLead.phone, testLead.message, testLead.salary, testLead.employment_status, testLead.project_name]
      );

      console.log(`✅ Test lead creado correctamente (ID: ${result.insertId})`);
    } catch (err) {
      console.error('❌ Error al test insertar lead:', err.message);
    }

    // Verify table structure
    console.log('\n📋 Estructura actual de tabla "leads":');
    const [tableStructure] = await dbConnection.execute(`DESCRIBE leads`);
    tableStructure.forEach(col => {
      console.log(`   ${col.Field}: ${col.Type} ${col.Null === 'YES' ? '(nullable)' : '(NOT NULL)'}`);
    });

    console.log('\n✅ ¡Setup de base de datos completado!\n');

    await dbConnection.end();

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
