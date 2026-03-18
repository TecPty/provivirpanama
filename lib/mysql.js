import mysql from 'mysql2/promise';

const toBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return normalized === 'true' || normalized === '1' || normalized === 'yes';
  }
  return false;
};

const getEnv = (...keys) => {
  for (const key of keys) {
    if (process.env[key]) return process.env[key];
  }
  return undefined;
};

const buildPoolConfig = () => {
  const sslEnabled = toBoolean(process.env.DB_SSL);

  return {
    host: getEnv('DB_HOST'),
    user: getEnv('DB_USER', 'DB_USERNAME'),
    password: getEnv('DB_PASSWORD', 'DB_PASS'),
    database: getEnv('DB_NAME'),
    port: Number(process.env.DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    connectTimeout: 10000,
    ssl: sslEnabled ? { rejectUnauthorized: false } : undefined
  };
};

const assertRequiredEnv = () => {
  const requiredGroups = [
    ['DB_HOST'],
    ['DB_USER', 'DB_USERNAME'],
    ['DB_PASSWORD', 'DB_PASS'],
    ['DB_NAME']
  ];

  const missing = requiredGroups
    .filter((group) => !group.some((key) => process.env[key]))
    .map((group) => group[0]);

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