import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('🔍 Testing MySQL connection...\n');
    console.log('Connection details:');
    console.log(`  Host: ${process.env.DB_HOST}`);
    console.log(`  User: ${process.env.DB_USER}`);
    console.log(`  Port: ${process.env.DB_PORT || 3306}`);
    console.log(`  Database: ${process.env.DB_NAME}\n`);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
      port: process.env.DB_PORT || 3306,
      connectTimeout: 10000
    });

    console.log('✅ Connection successful!\n');

    // Try to create database
    try {
      await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'provivir_db'}\``);
      console.log(`✅ Database created/verified: ${process.env.DB_NAME || 'provivir_db'}\n`);
    } catch (err) {
      console.log(`✅ Database already exists: ${err.message}\n`);
    }

    await connection.end();
    console.log('✅ All tests passed!');

  } catch (error) {
    console.error('❌ Connection failed!');
    console.error(`Error: ${error.message}\n`);
    
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('MySQL server is not running or cannot be reached.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('Credentials are incorrect: user or password invalid.');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('MySQL service is not running on the specified host:port.');
    }
    
    process.exit(1);
  }
}

testConnection();
