import mysql from 'mysql2/promise';

const toBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return normalized === 'true' || normalized === '1' || normalized === 'yes';
  }
  return false;
};

const buildPoolConfig = () => {
  const sslEnabled = toBoolean(process.env.DB_SSL);

  return {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    connectTimeout: 10000,
    ssl: sslEnabled ? { rejectUnauthorized: false } : undefined
  };
};

const assertRequiredEnv = () => {
  const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required database env vars: ${missing.join(', ')}`);
  }
};

export const getPool = () => {
  assertRequiredEnv();

  if (!globalThis.__provivirMysqlPool) {
    globalThis.__provivirMysqlPool = mysql.createPool(buildPoolConfig());
  }

  return globalThis.__provivirMysqlPool;
};

export const execute = async (sql, params = []) => {
  const pool = getPool();
  const [rows] = await pool.execute(sql, params);
  return rows;
};

let leadColumnsCache;

export const getLeadColumns = async () => {
  if (leadColumnsCache) {
    return leadColumnsCache;
  }

  const columns = await execute('SHOW COLUMNS FROM leads');
  leadColumnsCache = new Set(columns.map((col) => col.Field));
  return leadColumnsCache;
};