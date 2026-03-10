import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  let connection;
  
  try {
    console.log('🔧 Starting database migration: Add advisor column\n');
    
    // Connect to database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'provivir_db',
      port: process.env.DB_PORT || 3306,
      connectTimeout: 10000
    });

    console.log('✅ Connected to database\n');

    // Read migration SQL file
    const migrationFile = path.join(__dirname, 'docstrash', 'backend', 'database', 'add-advisor-column.sql');
    const migrationSQL = fs.readFileSync(migrationFile, 'utf8');

    // Split SQL statements (handle multiple statements)
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Executing ${statements.length} SQL statements...\n`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        try {
          const [result] = await connection.execute(statement);
          console.log(`✅ Statement ${i + 1} executed successfully`);
          if (result && result.length > 0) {
            console.log(result);
          }
        } catch (err) {
          // Check if column already exists
          if (err.code === 'ER_DUP_FIELDNAME') {
            console.log(`⚠️  Column 'advisor' already exists - skipping`);
          } else {
            throw err;
          }
        }
      }
    }

    console.log('\n✅ Migration completed successfully!');
    console.log('📊 The "advisor" column has been added to the leads table.');

  } catch (error) {
    console.error('❌ Migration failed!');
    console.error(`Error: ${error.message}`);
    
    if (error.code === 'ENOENT') {
      console.log('\n⚠️  Migration file not found. Expected location:');
      console.log('   docstrash/backend/database/add-advisor-column.sql');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run migration
runMigration();
